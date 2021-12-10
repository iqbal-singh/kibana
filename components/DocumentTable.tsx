import DocumentPanel from "@/components/DocumentPanel";
import type { ElasticSearchData } from "@/types/index";
import { formatDate } from "@/utils/index";
import type { Column, Options } from "@material-table/core";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import React, { useRef } from "react";

type DocumentTableProps = {
  data: ElasticSearchData[];
};

const DEFAULT_TABLE_OPTIONS: Options<ElasticSearchData> = {
  pageSize: 50,
  pageSizeOptions: [50],
  toolbar: false,
  padding: "dense",
  draggable: false,
  emptyRowsWhenPaging: false,
  minBodyHeight: "100vh",
};

const DEFAULT_TABLE_COLUMNS: Column<ElasticSearchData>[] = [
  {
    title: "Timestamp",
    field: "_source.timestamp",
    render: (row) =>
      formatDate(new Date(row?._source?.timestamp), "MMM dd, yyyy @ HH:mm:ss"),
  },
  { title: "Agent", field: "_source.agent" },
  { title: "Message", field: "_source.message" },
  { title: "Request", field: "_source.request" },
  { title: "Response", field: "_source.response" },
];

const DocumentTable: React.FunctionComponent<DocumentTableProps> = ({
  data,
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div id="table-divider" ref={dividerRef} />
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        detailPanel={({ rowData }) => (
          <DocumentPanel obj={rowData?._source ?? {}} />
        )}
        data={data}
        options={DEFAULT_TABLE_OPTIONS}
        columns={DEFAULT_TABLE_COLUMNS}
        onPageChange={() => {
          dividerRef?.current?.scrollIntoView();
        }}
      />
    </>
  );
};

export default DocumentTable;
