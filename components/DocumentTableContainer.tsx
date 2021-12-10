import { formatDate, isValidDate } from "@/utils/index";
import { Paper, TableContainer, Typography } from "@mui/material";

type DocumentTableContainerProps = {
  totalHits: number;
  startDate: Date;
  endDate: Date;
};

const DocumentTableContainer: React.FunctionComponent<DocumentTableContainerProps> =
  ({ totalHits = 0, startDate, endDate, children }) => {
    return (
      <TableContainer
        component={Paper}
        elevation={0}
        style={{ margin: "10px 0" }}
        variant="outlined"
      >
        <Typography variant="h6" align="center" gutterBottom>
          <b>{totalHits ?? 0}</b> Hits
        </Typography>

        <Typography variant="subtitle1" align="center">
          {isValidDate(startDate) &&
            formatDate(startDate, "MMM dd, yyyy @ HH:mm:ss")}
          {" - "}
          {isValidDate(endDate) &&
            formatDate(endDate, "MMM dd, yyyy @ HH:mm:ss")}
          {" ⁠— Hourly"}
        </Typography>

        {children}
      </TableContainer>
    );
  };

export default DocumentTableContainer;
