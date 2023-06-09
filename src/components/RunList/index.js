import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useRuns } from "../../lib/paddles";
import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../DataGrid";
import IconLink from "../../components/IconLink";

function resultsGetter(params) {
  return params.row.results[params.field];
}

const _columns = [
  {
    field: "user",
  },
  {
    field: "name",
    headerName: "link",
    width: 60,
    renderCell: (params) => {
      return (
        <IconLink to={`/runs/${params.value}`}>
          <OpenInNewIcon />
        </IconLink>
      );
    },
  },
  {
    field: "scheduled",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 125,
  },
  {
    field: "started",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 125,
  },
  {
    headerName: "updated",
    field: "posted",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 125,
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
    width: 70,
  },
  {
    field: "suite",
  },
  {
    field: "branch",
  },
  {
    field: "machine_type",
    width: 90,
  },
  {
    field: "sha1",
    headerName: "hash",
    width: 75,
  },
  {
    field: "queued",
    valueGetter: resultsGetter,
    width: 60,
  },
  {
    field: "pass",
    valueGetter: resultsGetter,
    width: 60,
  },
  {
    field: "fail",
    valueGetter: resultsGetter,
    width: 60,
  },
  {
    field: "dead",
    valueGetter: resultsGetter,
    width: 60,
  },
  {
    field: "running",
    valueGetter: resultsGetter,
    width: 60,
  },
];

export default function RunList(props) {
  const state = { ...(props.state || {}) };
  const dispatch = props.dispatch;
  if (!state.page) state.page = 0;
  if (!state.pageSize) state.pageSize = 25;
  const query = useRuns(state);
  if (query.isError) return null;
  const onPageSizeChange = ({ pageSize }) => {
    if (typeof dispatch !== "function") return;
    dispatch({
      type: "set",
      payload: { key: "pageSize", value: pageSize },
    });
  };
  const onPageChange = ({ page }) => {
    if (typeof dispatch !== "function") return;
    dispatch({ type: "set", payload: { key: "page", value: page } });
  };
  const paginationMode = typeof dispatch === "function" ? "server" : "client";
  const columns = [..._columns];
  /*  If we want to automatically size the branch column:
  if (query.isSuccess) {
    const branchLength = Math.max(
      ...query.data.map((item) => item.branch.length)
    );
    columns.forEach((item) => {
      if (item.field === "branch") {
        item.width = Math.max(100, branchLength * 7);
      }
    });
  }
  */
  return (
    <DataGrid
      columns={columns}
      rows={query.data || []}
      loading={query.isLoading || query.isFetching}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: "scheduled",
              sort: "desc",
            },
          ],
        },
      }}
      getRowId={(row) => row.name}
      getRowClassName={(params) => {
        const status = params.row.status.split(" ").pop();
        return `status-${status}`;
      }}
      paginationMode={paginationMode}
      rowCount={paginationMode === "server" ? 9999 : undefined}
      pageSize={state.pageSize}
      onPageSizeChange={
        paginationMode === "server" ? onPageSizeChange : undefined
      }
      page={paginationMode === "server" ? state.page : undefined}
      onPageChange={onPageChange}
    />
  );
}
