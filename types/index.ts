export type ElasticSearchData = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: any;
};

export type ElasticSearchResponse = {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
    };
    max_score: number;
    hits: ElasticSearchData[];
  };
  aggregations?: {
    hourly: {
      buckets: {
        key: string;
        doc_count: number;
      }[];
    };
  };
};
