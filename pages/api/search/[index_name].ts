import type { NextApiRequest, NextApiResponse } from "next";

import { Client } from "@elastic/elasticsearch";

const elasticSearchClient = new Client({ node: "http://localhost:9200" });

type Data = {
  name: string;
};

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
    const result = await elasticSearchClient.search({
      index: req.query.index_name,
    });

    if (result.statusCode !== 200) {
      res.status(Number(result?.statusCode)).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ error: e.message || "" });
  }
}
