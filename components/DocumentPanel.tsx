import React from "react";

type DocumentPanelProps = {
  obj: any;
};

const DocumentPanel: React.FunctionComponent<DocumentPanelProps> = ({
  obj,
}) => {
  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: "600px",
        maxWidth: "96%",
      }}
    >
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </div>
  );
};

export default DocumentPanel;
