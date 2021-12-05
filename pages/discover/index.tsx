import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export async function getServerSideProps() {
  const response = await fetch(
    `http://localhost:3000/api/search/kibana_sample_data_logs?start_date=2021-12-01T05:00:00.000Z&end_date=2021-12-04T05:00:00.000Z`
  );
  const data = await response.json();

  return {
    props: {
      initialData: data,
    },
  };
}

const Home: NextPage = ({ initialData }) => {
  const [startDate, setStartDate] = useState("2021-12-01");
  const [endDate, setEndDate] = useState("2021-12-04");

  const [data, setData] = useState(initialData);

  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/search/kibana_sample_data_logs?start_date=${
          startDate + "T05:00:00.000Z"
        }&end_date=${endDate + "T05:00:00.000Z"}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            inputProps={{
              type: "date",
            }}
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            inputProps={{
              type: "date",
            }}
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleRefresh}>
            Refresh
          </Button>
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
        <ResponsiveContainer width="100%" height={250} debounce={300}>
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
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>timestamp</TableCell>
              <TableCell>request</TableCell>
              <TableCell>response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.hits?.hits?.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell>{row._source.timestamp}</TableCell>
                <TableCell>{row._source.request}</TableCell>
                <TableCell>{row._source.response}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2" align="center">
                  These are the first 500 documents matching your search, refine
                  your search to see others. <a href="#">Back to top.</a>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
