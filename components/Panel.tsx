import React from "react";

type PanelProps = {
  data: any;
};

const Panel: React.FunctionComponent<PanelProps> = ({ data }) => {
  return (
    <>
      <pre
        style={{
          overflow: "auto",
          maxHeight: 500,
          maxWidth: "100%",
          margin: "10px",
        }}
      >
        {JSON.stringify(data?._source, null, 2)}
      </pre>
    </>
  );
};

export default Panel;
