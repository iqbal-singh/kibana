import MaterialTable from "@material-table/core";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Grid,
  LinearProgress,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import BarChart from "@/components/BarChart";
import DateRangePicker from "@/components/DateRangePicker";
import Footer from "@/components/Footer";
import Panel from "@/components/Panel";

const search = (startDate, endDate) => {
  return fetch(`http:localhost:3000/api/`).then((res) => res.json());
};
export async function getServerSideProps() {
  const data = {};
  return {
    props: {
      initialData: data,
    },
  };
}

const TABLE_OPTIONS = {
  pageSize: 50,
  pageSizeOptions: [50],
  toolbar: false,
  padding: "dense",
  draggable: false,
  emptyRowsWhenPaging: false,
};

const TABLE_COLUMNS = [
  { title: "Timestamp", field: "_source.timestamp" },
  { title: "Request", field: "_source.request" },
  { title: "Response", field: "_source.response" },
];

const DiscoverPage: NextPage = ({ initialData }) => {
  const dividerRef = useRef<HTMLDivElement | null>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data } = {};
  //useQuery("search", (startDate, endDate) => search(startDate, endDate), { initialData });
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {<LinearProgress color="secondary" />}
        </Grid>
      </Grid>

      <Container maxWidth="xl">
        <Grid container justifyContent="flex-end">
          <Grid item xs={4} marginTop="20px">
            <DateRangePicker
              defaultStartDate={startDate}
              defaultEndDate={endDate}
              onStartDateChange={(val) => setStartDate(val)}
              onEndDateChange={(val) => setEndDate(val)}
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
              startIcon={<RefreshIcon />}
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
          <Typography variant="h6" align="center" gutterBottom>
            <b>{data?.hits?.total?.value}</b> Hits
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
          >{`${startDate?.toLocaleString()} - Hourly`}</Typography>
          {/* Bar Chart */}
          <BarChart
            data={data?.aggregations?.hourly?.buckets}
            xAxisKey="key_as_string"
            yAxisKey="doc_count"
            xAxisLabel="Timestamp per hour"
            yAxisLabel="Count"
            barColor="#00a69a"
            barStroke="#00a69b"
          />
          <div ref={dividerRef} />
          {/* Document Table */}
          <MaterialTable
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            detailPanel={({ rowData }) => <Panel data={rowData} />}
            data={data?.hits?.hits}
            options={TABLE_OPTIONS}
            columns={TABLE_COLUMNS}
            onPageChange={() => {
              dividerRef?.current?.scrollIntoView();
            }}
          />
          <Footer>
            {data?.hits?.total?.value > 500 && (
              <>
                These are the first 500 documents matching your search, refine
                your search to see others. <a href="#">Back to top.</a>
              </>
            )}
          </Footer>
        </TableContainer>
      </Container>
    </>
  );
};

export default DiscoverPage;
