import { Link as RouterLink } from "react-router-dom";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { useRuns } from "../../lib/paddles";
import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../DataGrid";
import IconLink from "../../components/IconLink";

function resultsGetter(params) {
  return params.row.results[params.field];
}

const columns = [
  {
    field: "user",
  },
  {
    field: "name",
    headerName: "link",
    width: 60,
    renderCell: (params) => {
      return (
        <RouterLink
          to={`/runs/${params.value}`}
          component={IconLink}
          target="_blank"
        >
          <OpenInNewIcon />
        </RouterLink>
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
    width: 85,
  },
  {
    field: "pass",
    valueGetter: resultsGetter,
    width: 85,
  },
  {
    field: "fail",
    valueGetter: resultsGetter,
    width: 85,
  },
  {
    field: "dead",
    valueGetter: resultsGetter,
    width: 85,
  },
  {
    field: "running",
    valueGetter: resultsGetter,
    width: 85,
  },
];

export default function RunList(props) {
  const state = { ...props.state };
  const dispatch = props.dispatch;
  if (!state.page) state.page = 0;
  if (!state.pageSize) state.pageSize = 25;
  const query = useRuns(state);
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
      pageSize={state.pageSize}
      onPageSizeChange={(v) =>
        dispatch({
          type: "set",
          payload: { key: "pageSize", value: v.pageSize },
        })
      }
      page={state.page}
      onPageChange={(v) =>
        dispatch({ type: "set", payload: { key: "page", value: v.page } })
      }
    />
  );
}
