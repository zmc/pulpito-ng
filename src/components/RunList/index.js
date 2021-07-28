import { useRuns } from "../../lib/paddles";
import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../DataGrid";

function resultsGetter(params) {
  return params.row.results[params.field];
}

const columns = [
  {
    field: "user",
  },
  {
    field: "scheduled",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 150,
  },
  {
    field: "started",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 150,
  },
  {
    headerName: "updated",
    field: "posted",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 150,
  },
  {
    headerName: "runtime",
    field: "",
    valueGetter: (params) => {
      const start = Date.parse(params.row.started);
      const end = Date.parse(params.row.posted);
      if (!end || !start) return null;
      return Math.round((start - end) / 1000);
    },
    valueFormatter: (row) => formatDuration(row.value),
  },
  {
    field: "suite",
  },
  {
    field: "branch",
  },
  {
    field: "machine_type",
  },
  {
    field: "sha1",
    headerName: "hash",
  },
  {
    field: "queued",
    valueGetter: resultsGetter,
  },
  {
    field: "pass",
    valueGetter: resultsGetter,
  },
  {
    field: "fail",
    valueGetter: resultsGetter,
  },
  {
    field: "dead",
    valueGetter: resultsGetter,
  },
  {
    field: "running",
    valueGetter: resultsGetter,
  },
];

export default function RunList(props) {
  const params = props.params;
  const dispatch = props.dispatch;
  const query = useRuns(params);
  if (query.isError) return null;
  return (
    <DataGrid
      columns={columns}
      rows={query.data || []}
      loading={query.isLoading || query.isFetching}
      sortModel={[
        {
          field: "scheduled",
          sort: "desc",
        },
      ]}
      getRowId={(row) => row.name}
      // autoPageSize
      paginationMode="server"
      rowCount={9999}
      hideFooterRowCount
      pageSize={params.pageSize}
      onPageSizeChange={(v) =>
        dispatch({
          type: "set",
          payload: { key: "pageSize", value: v.pageSize },
        })
      }
      page={params.page}
      onPageChange={(v) =>
        dispatch({ type: "set", payload: { key: "page", value: v.page } })
      }
    />
  );
}
