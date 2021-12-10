import { subDays, addDays } from "@/utils/index";

export * from "./theme";
export const API_BASE_URL = "http://localhost:3000";
export const SAMPLE_DATA_ELASTIC_SEARCH_INDEX_NAME = "kibana_sample_data_logs";

const TODAY = new Date();
// TODAY.setHours(0, 0, 0, 0);

export const DEFAULT_START_DATE = subDays(TODAY, 1);
export const DEFAULT_END_DATE = addDays(TODAY, 1);
export const MAX_DOCUMENTS_SIZE = 500;
