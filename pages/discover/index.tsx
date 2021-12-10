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
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_INDEX_NAME,
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_TABLE_COLUMNS,
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_KEY,
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_LABEL,
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_KEY,
  SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_LABEL,
} from "@/constants/index";
import { search, useElasticSearchData } from "@/hooks/index";
import type { ElasticSearchResponse } from "@/types/index";
import { formatDate, isValidDate } from "@/utils/index";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Grid, LinearProgress } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

export const getServerSideProps = async () => {
  const data = await search(
    SAMPLE_DATA_LOGS_ELASTIC_SEARCH_INDEX_NAME,
    MAX_DOCUMENTS_SIZE,
    DEFAULT_START_DATE,
    DEFAULT_END_DATE
  );
  return {
    props: {
      initialData: data,
    },
  };
};

type DiscoverPageProps = {
  initialData: ElasticSearchResponse;
};

const DiscoverPage: NextPage<DiscoverPageProps> = ({ initialData }) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);
  const { data, isLoading, isFetching, error, refetch } = useElasticSearchData({
    initialData,
    indexName: SAMPLE_DATA_LOGS_ELASTIC_SEARCH_INDEX_NAME,
    resultSize: MAX_DOCUMENTS_SIZE,
    startDate,
    endDate,
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ height: "10px" }}>
          {(isLoading || isFetching) && (
            <LinearProgress color="secondary" variant="query" />
          )}
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
          {data?.aggregations &&
            data?.aggregations?.hourly?.buckets?.length > 0 && (
              <BarChart
                data={data?.aggregations?.hourly?.buckets as any[]}
                xAxisKey={SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_KEY}
                yAxisKey={SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_KEY}
                xAxisLabel={SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_LABEL}
                yAxisLabel={SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_LABEL}
                barColor={BAR_CHART_FILL}
                barStroke={BAR_CHART_STROKE}
                formatDate={(date) =>
                  isValidDate(date) ? formatDate(date, "yyyy-MM-dd HH:mm") : ""
                }
              />
            )}
          <DocumentTable
            columns={SAMPLE_DATA_LOGS_ELASTIC_SEARCH_TABLE_COLUMNS}
            data={data?.hits?.hits ?? []}
          />
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
