import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/search/kibana_sample_data_logs");
      const json = await response.json();
      setData(json);
      console.log(json);
    }

    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>dashboard</h1>
      <h2>Total Hits: {data?.hits?.total?.value}</h2>
      <pre>{JSON.stringify(data, null, 5)}</pre>
    </div>
  );
};

export default Home;
