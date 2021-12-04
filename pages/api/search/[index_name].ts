import { ApiResponse, Client } from "@elastic/elasticsearch";
import type { NextApiRequest, NextApiResponse } from "next";

const elasticSearchClient = new Client({
  node: process.env.ELASTIC_SEARCH_NODE,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { index_name } = req.query;
  if (!index_name) {
    res.status(400).json({ error: "index_name is required" });
    return;
  }

  try {
    const { body, statusCode } = await elasticSearchClient.search({
      index: req.query.index_name,
    });

    if (statusCode === 200) {
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
