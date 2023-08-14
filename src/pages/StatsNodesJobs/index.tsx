import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Link from '@mui/material/Link';

import DataGrid from "../../components/DataGrid";
import FilterMenu from "../../components/FilterMenu";

import { useStatsNodeJobs } from "../../lib/paddles";
import { useMachineTypes } from "../../lib/paddles";


export const columns: GridColDef[] = [
    {
        field: "name",
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
          return <Link href={`/nodes/${params.value}`} color="inherit">{params.value}</Link>;
        },
    },
    {
        field: "pass",
        width: 125,
    },
    {
        field: "fail",
        width: 125,
    },
    {
        field: "dead",
        width: 125,
    },
    {
        field: "unknown",
        width: 125,
    },
    {
        field: "running",
        width: 125,
    },
    {
        field: "total",
        width: 125,
    },

]

export default function StatsNodesJobs() {
    const [params, setParams] = useQueryParams({
        machine_type: StringParam,
        since_days: NumberParam,
    });
    const machine_type = params["machine_type"];
    const since_days = params["since_days"];
    const query = useStatsNodeJobs(params);

    if (query === null) return <Typography>404</Typography>;
    if (query.isError) return null;

    return (
        <div>
            <Helmet>
                <title>Stats Nodes Jobs - Pulpito</title>
            </Helmet>
            <Typography variant="h6" style={{ marginBottom: "20px" }}>
                {since_days || 14}-day stats for {machine_type || "all"} nodes
            </Typography>

            <div style={{ height: "auto", display: "flex" }}>
                <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "auto" }}>
                    <div>
                        <Typography style={{ padding: "10px" }}>
                            Filter&nbsp;by:
                        </Typography>
                    </div>
                    <FilterMenu
                        type="machine_type"
                        value={machine_type}
                        setter={setParams}
                        optionsHook={useMachineTypes}
                        width={150}
                    />
                </div>
            </div>
            <DataGrid
                columns={columns}
                rows={query.data || []}
                loading={query.isLoading || query.isFetching}
                hideFooter={true}
            />
        </div>
    );
}
