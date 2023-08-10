import type {
  DecodedValueMap,
  QueryParamConfigMap,
  SetQuery,
} from "use-query-params";
import { useDebounce } from "usehooks-ts";
import type {
  GridFilterModel,
  GridRowClassNameParams,
  GridValueFormatterParams,
  GridColDef,
} from "@mui/x-data-grid";

import { useNodes } from "../../lib/paddles";
import { formatDate } from "../../lib/utils";
import DataGrid from "../DataGrid";


const columns: GridColDef[] = [
  {
    field: "name",
    width: 125,
  },
  {
    field: "machine_type",
    width: 125,
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
    width: 200,
  },
  {
    headerName: "locked by",
    field: "locked_by",
    width: 200,
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
    width: 90,
  },
  {
    field: "description",
    width: 170,
  },
];

interface NodeListProps {
  params: DecodedValueMap<QueryParamConfigMap>;
  setter: SetQuery<QueryParamConfigMap>;
}

export default function NodeList({ params, setter }:NodeListProps) {
  const debouncedParams = useDebounce(params, 500);
  const query = useNodes(debouncedParams);
  if (query.isError) return null;

  let filterModel: GridFilterModel = { items: [] };
  const onFilterModelChange = (model: GridFilterModel) => {
    const params: QueryParamConfigMap = {};
    model.items.forEach((item) => {
      params[item.field] = item.value || null;
    });
    setter(params);
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
              field: "machine_type",
              sort: "asc",
            },
          ],
        },
      }}
      filterMode="client"
      filterModel={filterModel}
      onFilterModelChange={onFilterModelChange}
      getRowClassName={(params: GridRowClassNameParams) => {
        const isUp = params.row.up;
        const isLocked = params.row.locked;
        if (!isUp) {
            return 'node-down';
        }
        return isLocked ? 'node-locked' : 'node-available'
      }}
    />
  );
}
