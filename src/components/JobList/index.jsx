import DescriptionIcon from "@mui/icons-material/Description";

import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../../components/DataGrid";
import IconLink from "../../components/IconLink";

import sentryIcon from "./assets/sentry.svg";

const columns = [
  {
    field: "status",
    width: 85,
    cellClassName: (params) => `status-${params.value}`,
  },
  {
    field: "links",
    width: 75,
    valueGetter: (params) => {
      return {
        log: params.row.log_href,
        sentry: params.row.sentry_event,
      };
    },
    renderCell: (params) => {
      return (
        <div>
          {params.value.log ? (
            <IconLink to={params.value.log}>
              <DescriptionIcon />
            </IconLink>
          ) : null}
          {params.value.sentry ? (
            <IconLink to={params.value.sentry}>
              <img src={sentryIcon} alt='Sentry icon' />
            </IconLink>
          ) : null}
        </div>
      );
    },
  },
  {
    field: "job_id",
    headerName: "job ID",
    renderCell: (params) => {
      return (
        <IconLink to={`/runs/${params.row.name}/jobs/${params.value}`}>
          {params.value}
        </IconLink>
      );
    },
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

export default function JobList({ query, state }) {
  if (query.isError) return null;
  let filterModel = { items: [] };
  if (Object.keys(state || {}).length) {
    filterModel = {
      items: [
        {
          field: Object.keys(state)[0],
          value: Object.values(state)[0],
          operator: "equals",
        },
      ],
    };
  }
  return (
    <DataGrid
      columns={columns}
      rows={query.data?.jobs || []}
      pageSize={25}
      loading={query.isLoading || query.isFetching}
      initialState={{
        sorting: {
          sortModel:[
            {
              field: "job_id",
              sort: "asc",
            },
          ],
        },
      }}
      filterModel={filterModel}
      getRowId={(row) => row.job_id}
      getRowClassName={(params) => {
        return `status-${params.row.status}`;
      }}
    />
  );
}
