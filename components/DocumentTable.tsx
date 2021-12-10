import DocumentPanel from "@/components/DocumentPanel";
import type { ElasticSearchData } from "@/types/index";
import type { Column, Options } from "@material-table/core";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import React, { useRef } from "react";

type DocumentTableProps = {
  columns: Column<ElasticSearchData>[];
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

const DocumentTable: React.FunctionComponent<DocumentTableProps> = ({
  columns,
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
        columns={columns}
        onPageChange={() => {
          dividerRef?.current?.scrollIntoView();
        }}
      />
    </>
  );
};

export default DocumentTable;
