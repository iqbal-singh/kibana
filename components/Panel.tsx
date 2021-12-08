import React from "react";

type PanelProps = {
  data: any;
};

const Panel: React.FC<PanelProps> = ({ data }) => {
  return (
    <>
      <pre
        style={{
          overflow: "auto",
          maxHeight: 600,
          width: "100%",
        }}
      >
        {JSON.stringify(data?._source, null, 2)}
      </pre>
    </>
  );
};

export default Panel;
