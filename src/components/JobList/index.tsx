import DescriptionIcon from "@mui/icons-material/Description";
import type {
  GridCellParams,
  GridFilterModel,
  GridRowClassNameParams,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridRenderCellParams,
  GridColDef,
} from "@mui/x-data-grid";
import type {
  DecodedValueMap,
  QueryParamConfigMap,
  SetQuery,
} from "use-query-params";
import type { UseQueryResult } from "@tanstack/react-query";

import { formatDate, formatDuration } from "../../lib/utils";
import DataGrid from "../../components/DataGrid";
import IconLink from "../../components/IconLink";
import type { Run, NodeJobs } from "../../lib/paddles.d";

import sentryIcon from "./assets/sentry.svg";


const columns: GridColDef[] = [
  {
    field: "status",
    width: 85,
    cellClassName: (params: GridCellParams) => `status-${params.value}`,
  },
  {
    field: "links",
    width: 75,
    valueGetter: (params: GridValueGetterParams) => {
      return {
        log: params.row.log_href,
        sentry: params.row.sentry_event,
      };
    },
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div>
          {params.value.log ? (
            <IconLink to={params.value.log}>
              <DescriptionIcon />
            </IconLink>
          ) : null}
          {params.value.sentry ? (
            <IconLink to={params.value.sentry}>
              <img src={`${sentryIcon}`} alt="Sentry icon" />
            </IconLink>
          ) : null}
        </div>
      );
    },
  },
  {
    field: "job_id",
    headerName: "job ID",
    renderCell: (params: GridRenderCellParams) => {
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
    valueFormatter: (row: GridValueFormatterParams) => formatDate(row.value),
    width: 125,
  },
  {
    field: "started",
    type: "date",
    valueFormatter: (row: GridValueFormatterParams) => formatDate(row.value),
    width: 125,
  },
  {
    field: "updated",
    type: "date",
    valueFormatter: (row: GridValueFormatterParams) => formatDate(row.value),
    width: 125,
  },
  {
    field: "runtime",
    valueGetter: (params: GridValueGetterParams) => {
      const start = Date.parse(params.row.started);
      const end = Date.parse(params.row.updated);
      if (!end || !start) return null;
      return Math.round((end - start) / 1000);
    },
    valueFormatter: (row: GridValueFormatterParams) =>
      formatDuration(row.value),
  },
  {
    field: "duration",
    valueFormatter: (row: GridValueFormatterParams) =>
      formatDuration(row.value),
  },
  {
    field: "waiting",
    headerName: "in waiting",
    valueGetter: (params: GridValueGetterParams) => {
      const start = Date.parse(params.row.started);
      const end = Date.parse(params.row.updated);
      if (!end || !start || !params.row.duration) return null;
      return Math.round((end - start) / 1000 - params.row.duration);
    },
    valueFormatter: (row: GridValueFormatterParams) =>
      formatDuration(row.value),
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
    valueGetter: (params: GridValueGetterParams) => {
      return Object.keys(params.row.targets || {}).length || null;
    },
    width: 85,
  },
];

interface JobListProps {
  query: UseQueryResult<Run> | UseQueryResult<NodeJobs>;
  params: DecodedValueMap<QueryParamConfigMap>;
  setter: SetQuery<QueryParamConfigMap>;
}

export default function JobList({ query, params, setter }: JobListProps) {
  if (query.isError) return null;
  let filterModel: GridFilterModel = { items: [] };
  if (params.status) {
    filterModel = {
      items: [
        {
          field: "status",
          value: params.status,
          operator: "contains",
        },
      ],
    };
  }
  const onFilterModelChange = (model: GridFilterModel) => {
    setter({ status: model.items[0].value || null });
  };
  return (
    <DataGrid
      columns={columns}
      rows={query.data?.jobs || []}
      rowCount={query.data?.jobs?.length || 999}
      loading={query.isLoading || query.isFetching}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: "job_id",
              sort: "asc",
            },
          ],
        },
      }}
      filterMode="client"
      filterModel={filterModel}
      onFilterModelChange={onFilterModelChange}
      paginationMode="client"
      onPaginationModelChange={setter}
      pageSize={params.pageSize}
      page={params.page}
      setter={setter}
      getRowClassName={(params: GridRowClassNameParams) => {
        return `status-${params.row.status}`;
      }}
    />
  );
}
