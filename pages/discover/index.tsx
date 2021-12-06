import MaterialTable from "@material-table/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Container,
  Grid,
  LinearProgress,
  Paper,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

//@ts-ignore
const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getServerSideProps() {
  const response = await fetch(
    `http://localhost:3000/api/search/kibana_sample_data_logs?start_date={}&end_date{}`
  );
  const data = await response.json();

  return {
    props: {
      initialData: data,
    },
  };
}

const Home: NextPage = ({ initialData }) => {
  const dividerRef = useRef<HTMLDivElement>();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { data, error, mutate, isValidating } = useSWR(
    `http://localhost:3000/api/search/kibana_sample_data_logs?start_date=${startDate}&end_date=${endDate}`,
    fetcher,
    { fallbackData: initialData }
  );
  const [value, setValue] = useState([null, null]);
  const handleRefresh = async () => {
    //mutate(data, true);
    // try {
    //   const response = await fetch(
    //     `http://localhost:3000/api/search/kibana_sample_data_logs?start_date=${
    //       startDate + "T05:00:00.000Z"
    //     }&end_date=${endDate + "T05:00:00.000Z"}&size=10&from=0`
    //   );
    //   const data = await response.json();
    //   setData(data);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    // }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {<LinearProgress color="secondary" />}
        </Grid>
      </Grid>

      <Container maxWidth="xl">
        <Grid container style={{ margin: "10px 0px" }} direction="row-reverse">
          <Grid item marginLeft="20px">
            <LoadingButton
              size="large"
              loading={isValidating}
              variant="contained"
              onClick={handleRefresh}
              disableRipple
              disabled={isValidating}
            >
              Refresh
            </LoadingButton>
          </Grid>

          <Grid item xs={2} marginLeft="10px" marginTop="auto">
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} size="small" fullWidth />
              )}
              label="End Date"
              value={endDate}
              disabled={isValidating}
              clearable={false}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
          </Grid>

          <Grid item xs={2} marginLeft="10px" marginTop="auto">
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} size="small" fullWidth />
              )}
              label="Start Date"
              value={startDate}
              disabled={isValidating}
              clearable={false}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
            />
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          elevation={0}
          style={{ margin: "20px 0" }}
          variant="outlined"
        >
          <Typography variant="h6" align="center" gutterBottom>
            <b>{data?.hits?.total?.value}</b> Hits
          </Typography>
          <Typography variant="subtitle1" align="center">{`${new Date(
            startDate
          )?.toLocaleString()} - Hourly`}</Typography>
          {error && (
            <>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "red" }}
                gutterBottom
              >
                <b>Error:</b> {error}
              </Typography>
            </>
          )}
          <ResponsiveContainer width="100%" height={250} debounce={100}>
            <BarChart
              data={data?.aggregations?.hourly?.buckets}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            >
              <XAxis
                dataKey="key_as_string"
                tickFormatter={(value, index) =>
                  new Date(value)?.toLocaleString()
                }
              >
                <Label
                  value="Timestamp per hour"
                  offset={-20}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis interval={0}>
                <Label value="Count" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />

              <Bar
                dataKey="doc_count"
                fill="#00a69a"
                fillOpacity=".5"
                stroke="#00a69b"
              />
            </BarChart>
          </ResponsiveContainer>

          <div ref={dividerRef} />
          <MaterialTable
            data={data?.hits?.hits}
            onPageChange={() => {
              dividerRef?.current?.scrollIntoView();
            }}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
            options={{
              pageSize: 50,
              pageSizeOptions: [50],
              toolbar: false,
              padding: "dense",
              draggable: false,
              emptyRowsWhenPaging: false,
            }}
            columns={[
              { title: "Timestamp", field: "_source.timestamp" },
              { title: "Request", field: "_source.request" },
              { title: "Response", field: "_source.response" },
            ]}
            detailPanel={({ rowData }) => {
              return (
                <pre
                  style={{
                    overflow: "auto",
                    maxHeight: 600,
                    width: "100%",
                  }}
                >
                  {JSON.stringify(rowData?._source, null, 2)}
                </pre>
              );
            }}
          />
          {data?.hits?.total?.value > 500 && (
            <div style={{ backgroundColor: "#ccc", padding: "20px" }}>
              <Typography variant="subtitle2" align="center">
                These are the first 500 documents matching your search, refine
                your search to see others. <a href="#">Back to top.</a>
              </Typography>
            </div>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default Home;
