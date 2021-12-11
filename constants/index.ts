import type { ElasticSearchData } from "@/types/index";
import { formatDate, subDays } from "@/utils/index";
import type { Column } from "@material-table/core";
export * from "./theme";
export const API_BASE_URL = "http://localhost:3000";

export const DEFAULT_START_DATE = subDays(
  new Date(new Date().setHours(0, 0, 0, 0)),
  3
);
export const DEFAULT_END_DATE = new Date();
export const MAX_DOCUMENTS_SIZE = 500;

export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_INDEX_NAME =
  "kibana_sample_data_logs";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_TABLE_COLUMNS: Column<ElasticSearchData>[] =
  [
    {
      title: "Timestamp",
      field: "_source.timestamp",
      render: (row) =>
        formatDate(
          new Date(row?._source?.timestamp),
          "MMM dd, yyyy @ HH:mm:ss"
        ),
      defaultSort: "desc",
      customSort: (a, b) =>
        new Date(a?._source?.timestamp).getTime() -
        new Date(b?._source?.timestamp).getTime(),
    },
    { title: "Request", field: "_source.request" },
    { title: "Response", field: "_source.response" },
    { title: "Message", field: "_source.message" },
  ];

export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_KEY = "key_as_string";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_KEY = "doc_count";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_LABEL = "Timestamp per hour";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_LABEL = "Count";
