import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { useRun } from "../../lib/paddles";
import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../../components/DataGrid";

const columns = [
  {
    field: "status",
    width: 85,
  },
  {
    field: "job_id",
    headerName: "job ID",
  },
  // links
  {
    field: "posted",
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
    field: "updated",
    type: "date",
    valueFormatter: (row) => formatDate(row.value),
    width: 125,
  },
  {
    field: "runtime",
    valueGetter: (params) => {
      const start = Date.parse(params.row.started);
      const end = Date.parse(params.row.updated);
      if (!end || !start) return null;
      return Math.round((end - start) / 1000);
    },
    valueFormatter: (row) => formatDuration(row.value),
  },
  {
    field: "duration",
    valueFormatter: (row) => formatDuration(row.value),
  },
  {
    field: "waiting",
    headerName: "in waiting",
    valueGetter: (params) => {
      const start = Date.parse(params.row.started);
      const end = Date.parse(params.row.updated);
      if (!end || !start || !params.row.duration) return null;
      return Math.round((end - start) / 1000 - params.row.duration);
    },
    valueFormatter: (row) => formatDuration(row.value),
  },
  {
    field: "teuthology_branch",
    headerName: "teuthology branch",
  },
  {
    field: "machine_type",
    headerName: "machine type",
  },
  {
    field: "os_type",
    headerName: "OS type",
    width: 85,
  },
  {
    field: "os_version",
    headerName: "OS version",
    width: 85,
  },
  {
    field: "nodes",
    headerName: "nodes",
    valueGetter: (params) => {
      return Object.keys(params.row.targets || {}).length || null;
    },
    width: 85,
  },
];

export default function Run() {
  const { name } = useParams();
  const query = useRun(name);
  if (query.isError) return null;
  return (
    <div>
      <Typography
        variant="h5"
        style={{margin: "20px"}}
      >
        { name }
      </Typography>
      <DataGrid
        columns={columns}
        rows={query.data?.jobs || []}
        loading={query.isLoading || query.isFetching}
        sortModel={[
          {
            field: "job_id",
            sort: "asc",
          },
        ]}
        getRowId={(row) => row.job_id}
      />
    </div>
  );
}
