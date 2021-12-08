import { Typography } from "@mui/material";
import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({ children }) => {
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

export default Footer;
