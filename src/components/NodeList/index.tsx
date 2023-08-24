import type { UseQueryResult } from "@tanstack/react-query";
import type {
  DecodedValueMap,
  QueryParamConfigMap,
  SetQuery,
} from "use-query-params";
import type {
  GridFilterModel,
  GridRowClassNameParams,
  GridValueFormatterParams,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from '@mui/material/Link';

import type { Node } from "../../lib/paddles.d";
import { formatDate } from "../../lib/utils";
import DataGrid from "../DataGrid";


export const columns: GridColDef[] = [
  {
    field: "name",
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <Link href={`/nodes/${params.value}/`} color="inherit">{params.value?.split(".")[0]}</Link>;
    },
  },
  {
    field: "machine_type",
    width: 90,
  },
  {
    field: "up",
    type: "boolean",
    width: 70,
  },
  {
    field: "locked",
    type: "boolean",
    width: 70,
  },
  {
    headerName: "locked since",
    field: "locked_since",
    type: "date",
    valueFormatter: (row: GridValueFormatterParams) => formatDate(row.value),
    width: 150,
  },
  {
    headerName: "locked by",
    field: "locked_by",
    width: 175,
  },
  {
    headerName: "OS type",
    field: "os_type",
    width: 90,
  },
  {
    headerName: "OS version",
    field: "os_version",
    width: 90,
  },
  {
    field: "arch",
    width: 60,
  },
  {
    field: "description",
    width: 500,
  },
];

interface NodeListProps {
  query: UseQueryResult<Node[]>;
  params: DecodedValueMap<QueryParamConfigMap>;
  setter: SetQuery<QueryParamConfigMap>;
}

export function nodeRowClass(params: GridRowClassNameParams) {
  const isUp = params.row.up;
  const isLocked = params.row.locked;
  if (!isUp) {
      return 'node-down';
  }
  return isLocked ? 'node-locked' : 'node-available';
}

export default function NodeList({ query, params, setter }:NodeListProps) {
  let filterModel: GridFilterModel = { items: [] };
  if (params.machine_type) {
    filterModel = {
      items: [
        {
          field: "machine_type",
          value: params.machine_type,
          operator: "contains",
        },
      ],
    };
  }
  const onFilterModelChange = (model: GridFilterModel) => {
    setter({ machine_type: model.items[0].value || null });
  };
  return (
    <DataGrid
      columns={columns}
      rows={query.data || []}
      loading={query.isLoading || query.isFetching}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: "name",
              sort: "asc",
            },
          ],
        },
      }}
      hideFooter={true}
      filterMode="client"
      filterModel={filterModel}
      onFilterModelChange={onFilterModelChange}
      getRowClassName={nodeRowClass}
    />
  );
}
