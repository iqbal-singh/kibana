import { useQuery } from "react-query";
import { API_BASE_URL } from "@/constants/index";
import type { ElasticSearchResponse } from "@/types/index";
import type { UseQueryResult } from "react-query";

const search = async (
  indexName: string,
  resultSize: number,
  startDate: Date,
  endDate: Date
) => {
  const start = startDate.toISOString();
  const end = endDate.toISOString();
  const res = await fetch(
    `${API_BASE_URL}/api/search/${indexName}?start_date=${start}&end_date=${end}&size=${resultSize}`
  );

  if (!res.ok) {
    throw new Error("Error searching");
  }
  return await res.json();
};

type useElasticSearchDataProps = {
  indexName: string;
  startDate: Date;
  endDate: Date;
  resultSize: number;
  initialData?: ElasticSearchResponse;
};

const useElasticSearchData = ({
  indexName,
  resultSize,
  startDate,
  endDate,
  initialData,
}: useElasticSearchDataProps): UseQueryResult<ElasticSearchResponse, Error> => {
  return useQuery<ElasticSearchResponse, Error>(
    ["search", startDate, endDate],
    () => search(indexName, resultSize, startDate, endDate),
    {
      enabled: false,
      staleTime: 90000,
      keepPreviousData: true,
      retry: false,
      initialData,
    }
  );
};

export { search, useElasticSearchData };
