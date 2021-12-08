import BarChart from "@/components/BarChart";
import DateRangePicker from "@/components/DateRangePicker";
import Footer from "@/components/Footer";
import Panel from "@/components/Panel";
import MaterialTable from "@material-table/core";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Grid,
  LinearProgress,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import isValidDate from "date-fns/isValid";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useQuery } from "react-query";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const DEFAULT_START_DATE = subDays(TODAY, 1);
const DEFAULT_END_DATE = addDays(TODAY, 1);

const DOCUMENT_TABLE_OPTIONS = {
  pageSize: 50,
  pageSizeOptions: [50],
  toolbar: false,
  padding: "dense",
  draggable: false,
  emptyRowsWhenPaging: false,
  minBodyHeight: "100vh",
};

const DOCUMENT_TABLE_COLUMNS = [
  {
    title: "Timestamp",
    field: "_source.timestamp",
    render: (row: any) =>
      format(new Date(row?._source?.timestamp), "MMM dd, yyyy @ HH:mm:ss"),
  },

  { title: "Agent", field: "_source.agent" },
  { title: "Message", field: "_source.message" },
  { title: "Request", field: "_source.request" },
  { title: "Response", field: "_source.response" },
];

const MAX_DOCUMENTS_SIZE = 500;

const search = async (startDate?: Date, endDate?: Date) => {
  const start = startDate
    ? startDate.toISOString()
    : DEFAULT_START_DATE.toISOString();
  const end = endDate ? endDate.toISOString() : DEFAULT_END_DATE.toISOString();
  const res = await fetch(
    `http://localhost:3000/api/search/kibana_sample_data_logs?start_date=${start}&end_date=${end}&size=${MAX_DOCUMENTS_SIZE}`
  );

  if (!res.ok) {
    console.log("err searhcing", res);
    throw new Error("Error searching");
  }
  return await res.json();
};

export async function getServerSideProps() {
  const data = await search();
  return {
    props: {
      initialData: data,
    },
  };
}

const DiscoverPage: NextPage<{ initialData: any }> = ({ initialData }) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    ["search", startDate.toDateString(), endDate.toLocaleString()],
    () => search(startDate, endDate),
    {
      //initialData,
      enabled: !!startDate && !!endDate,
      staleTime: 30000,
    }
  );
  const docTableAncestorRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <LinearProgress
            color="secondary"
            variant={isLoading || isFetching ? "query" : "determinate"}
            value={isLoading || isFetching ? undefined : 100}
          />
        </Grid>
      </Grid>

      <Container maxWidth="xl">
        <Grid container justifyContent="flex-end">
          <Grid item xs={4} marginTop="20px">
            <DateRangePicker
              defaultStartDate={startDate}
              defaultEndDate={endDate}
              onStartDateChange={(val) => setStartDate(val as Date)}
              onEndDateChange={(val) => setEndDate(val as Date)}
            />
          </Grid>
          <Grid item xs={1} marginLeft="15px" marginTop="30px">
            <LoadingButton
              size="medium"
              fullWidth
              loadingPosition="start"
              variant="contained"
              disableRipple
              disableElevation
              loading={isLoading || isFetching}
              startIcon={<RefreshIcon />}
              onClick={() => refetch()}
            >
              Refresh
            </LoadingButton>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          elevation={0}
          style={{ margin: "10px 0" }}
          variant="outlined"
        >
          {error && (
            <>
              <pre>
                <Typography variant="body2" color="error">
                  {JSON.stringify(error, null, 2)}
                </Typography>
              </pre>
            </>
          )}
          <Typography variant="h6" align="center" gutterBottom>
            <b>{data?.hits?.total?.value}</b> Hits
          </Typography>
          {data?.aggregations?.hourly?.buckets?.length > 0 && (
            <>
              <Typography variant="subtitle1" align="center">
                {isValidDate(startDate) &&
                  format(startDate, "MMM dd, yyyy @ HH:mm:ss")}
                {" - "}
                {isValidDate(endDate) &&
                  format(endDate, "MMM dd, yyyy @ HH:mm:ss")}
                {" ⁠— Hourly"}
              </Typography>
              {/* Bar Chart */}
              <BarChart
                data={data?.aggregations?.hourly?.buckets}
                xAxisKey="key_as_string"
                yAxisKey="doc_count"
                xAxisLabel="Timestamp per hour"
                yAxisLabel="Count"
                barColor="#00a69a"
                barStroke="#00a69b"
                formatDate={(date) =>
                  isValidDate(date)
                    ? format(date, "yyyy-MM-dd HH:mm")
                    : "Invalid Date"
                }
              />
            </>
          )}
          <div ref={docTableAncestorRef} />
          {/* Document Table */}
          <MaterialTable
            isLoading={isLoading}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            detailPanel={({ rowData }) => <Panel data={rowData} />}
            data={data?.hits?.hits}
            //@ts-ignore
            options={DOCUMENT_TABLE_OPTIONS}
            //@ts-ignore
            columns={DOCUMENT_TABLE_COLUMNS}
            onPageChange={() => {
              docTableAncestorRef?.current?.scrollIntoView();
            }}
          />
          <Footer>
            {data?.hits?.total?.value > MAX_DOCUMENTS_SIZE && (
              <>
                These are the first {MAX_DOCUMENTS_SIZE} documents matching your
                search, refine your search to see others.{" "}
                <a href="#">Back to top.</a>
              </>
            )}
          </Footer>
        </TableContainer>
      </Container>
    </>
  );
};

export default DiscoverPage;
