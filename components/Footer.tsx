import { Typography } from "@mui/material";
import React from "react";

type DocumentTableFooterProps = {};

const DocumentTableFooter: React.FunctionComponent<DocumentTableFooterProps> =
  ({ children }) => {
    return (
      <>
        <div style={{ backgroundColor: "#ccc", padding: "20px" }}>
          <Typography variant="subtitle2" align="center">
            {children}
          </Typography>
        </div>
      </>
    );
  };

export default DocumentTableFooter;
