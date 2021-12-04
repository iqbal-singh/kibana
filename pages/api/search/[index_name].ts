import { ApiResponse, Client } from "@elastic/elasticsearch";
import type { NextApiRequest, NextApiResponse } from "next";

const elasticSearchClient = new Client({
  node: process.env.ELASTIC_SEARCH_NODE,
});

export default async function ElasticSearchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { index_name } = req.query;
  if (!index_name) {
    res.status(400).json({ error: "index_name is required" });
    return;
  }

  try {
    const { body, statusCode } = await elasticSearchClient.search({
      index: index_name,
      body: {
        from: 0,
        size: 500,
        timeout: "5s",
        version: true,
        sort: [{ timestamp: { order: "desc", unmapped_type: "boolean" } }],
        _source: { excludes: [] },
        aggs: {
          hits_hourly: {
            date_histogram: {
              field: "timestamp",
              calendar_interval: "1h",
              time_zone: "America/New_York",
              min_doc_count: 1,
            },
          },
        },
        docvalue_fields: [
          { field: "@timestamp", format: "date_time" },
          { field: "timestamp", format: "date_time" },
          { field: "utc_time", format: "date_time" },
        ],
        query: {
          bool: {
            must: [],
            filter: [
              { match_all: {} },
              {
                range: {
                  timestamp: {
                    format: "strict_date_optional_time",
                    gte: "2020-12-04T02:13:58.519Z",
                    lte: "2021-12-04T02:13:58.519Z",
                  },
                },
              },
            ],
            should: [],
            must_not: [],
          },
        },
      },
    });

    if (statusCode) {
      res.status(statusCode).json(body);
      return;
    }
  } catch (error) {
    const errorResponse = error as ApiResponse;

    if (errorResponse.statusCode && errorResponse.body) {
      res.status(errorResponse.statusCode).json(errorResponse.body);
      return;
    }

    console.error(error);
    res.status(500).json({ error: "An unexpected error occured." });
  }
}
