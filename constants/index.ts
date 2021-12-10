import type { ElasticSearchData } from "@/types/index";
import { addDays, formatDate, subDays } from "@/utils/index";
import type { Column } from "@material-table/core";
export * from "./theme";
export const API_BASE_URL = "http://localhost:3000";

export const DEFAULT_START_DATE = subDays(new Date(), 1);
export const DEFAULT_END_DATE = addDays(new Date(), 1);
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
    },
    { title: "Agent", field: "_source.agent" },
    { title: "Message", field: "_source.message" },
    { title: "Request", field: "_source.request" },
    { title: "Response", field: "_source.response" },
  ];

export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_KEY = "key_as_string";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_KEY = "doc_count";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_XAXIS_LABEL = "Timestamp per hour";
export const SAMPLE_DATA_LOGS_ELASTIC_SEARCH_YAXIS_LABEL = "Count";
