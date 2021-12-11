/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import DiscoverPage from "../pages/discover";
import { ElasticSearchResponse } from "../types";
import { QueryClient, QueryClientProvider } from "react-query";

const initialData: ElasticSearchResponse = {
  took: 1,
  timed_out: false,
  _shards: {
    total: 1,
    successful: 1,
    skipped: 1,
    failed: 1,
  },
  hits: {
    total: {
      value: 1,
    },
    max_score: 1,
    hits: [],
  },
  aggregations: {
    hourly: {
      buckets: [
        {
          key: "a",
          doc_count: 1,
        },
      ],
    },
  },
};

describe("Home page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <QueryClientProvider client={new QueryClient()}>
        <DiscoverPage initialData={initialData} />
      </QueryClientProvider>,
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
