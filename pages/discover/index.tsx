import BarChart from "@/components/BarChart";
import DateRangePicker from "@/components/DateRangePicker";
import DocumentTable from "@/components/DocumentTable";
import DocumentTableContainer from "@/components/DocumentTableContainer";
import DocumentTableFooter from "@/components/Footer";
import {
  BAR_CHART_FILL,
  BAR_CHART_STROKE,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  MAX_DOCUMENTS_SIZE,
  SAMPLE_DATA_ELASTIC_SEARCH_INDEX_NAME,
} from "@/constants/index";
import { useElasticSearchData } from "@/hooks/index";
import { formatDate, isValidDate } from "@/utils/index";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Grid, LinearProgress } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

type DiscoverPageProps = {};

const DiscoverPage: NextPage<DiscoverPageProps> = () => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const { data, isLoading, isFetching, error, refetch } = useElasticSearchData({
    indexName: SAMPLE_DATA_ELASTIC_SEARCH_INDEX_NAME,
    resultSize: MAX_DOCUMENTS_SIZE,
    startDate,
    endDate,
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ height: "10px" }}>
          {isLoading ||
            (isFetching && (
              <LinearProgress color="secondary" variant="query" />
            ))}
        </Grid>
      </Grid>
      <Container maxWidth="xl">
        <Grid container justifyContent="flex-end">
          <Grid item xs={6} marginTop="20px">
            <DateRangePicker
              disabled={isLoading}
              defaultStartDate={startDate}
              defaultEndDate={endDate}
              onStartDateChange={(val) => setStartDate(val)}
              onEndDateChange={(val) => setEndDate(val)}
            />
          </Grid>
          <Grid item xs={2} marginLeft="50px" marginTop="30px">
            <LoadingButton
              size="medium"
              fullWidth
              loadingPosition="start"
              variant="contained"
              disableRipple
              disableElevation
              loading={isLoading}
              startIcon={<RefreshIcon />}
              onClick={() => refetch()}
            >
              Refresh
            </LoadingButton>
          </Grid>
        </Grid>

        <DocumentTableContainer
          totalHits={data?.hits?.total?.value ?? 0}
          startDate={startDate}
          endDate={endDate}
        >
          <BarChart
            data={data?.aggregations?.hourly?.buckets as any[]}
            xAxisKey="key_as_string"
            yAxisKey="doc_count"
            xAxisLabel="Timestamp per hour"
            yAxisLabel="Count"
            barColor={BAR_CHART_FILL}
            barStroke={BAR_CHART_STROKE}
            formatDate={(date) =>
              isValidDate(date)
                ? formatDate(date, "yyyy-MM-dd HH:mm")
                : "Invalid Date"
            }
          />
          <DocumentTable data={data?.hits?.hits ?? []} />
          <DocumentTableFooter>
            {data && data?.hits?.total?.value > MAX_DOCUMENTS_SIZE && (
              <>
                These are the first {MAX_DOCUMENTS_SIZE} documents matching your
                search, refine your search to see others.{" "}
                <a href="#">Back to top.</a>
              </>
            )}
          </DocumentTableFooter>
        </DocumentTableContainer>
      </Container>
    </>
  );
};

export default DiscoverPage;
