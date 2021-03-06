import { Client } from "@elastic/elasticsearch";
import type { ApiError } from "@elastic/elasticsearch";
import type { NextApiRequest, NextApiResponse } from "next";

const elasticSearchClient = new Client({
  node: process.env.ELASTIC_SEARCH_NODE,
});

/**
 *  ElasticSearch API /_search/index_name endpoint
 */
export default async function ElasticSearchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      index_name,
      start_date,
      end_date,
      size = 500,
      from = 0,
    } = req.query;

    const { body, statusCode } = await elasticSearchClient.search({
      index: index_name,
      body: {
        from,
        size,
        timeout: "5s",
        version: true,
        sort: [{ timestamp: { order: "desc", unmapped_type: "boolean" } }],
        _source: { excludes: [] },
        aggs: {
          hourly: {
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
                    gte: start_date,
                    lte: end_date,
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
    const errorResponse = error as ApiError;
    console.error("ElasticSearchHandler Error ", error);

    res.status(500).json(errorResponse);
  }
}
