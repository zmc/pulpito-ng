import { useQueryParams, StringParam } from "use-query-params";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import type { GridColDef } from "@mui/x-data-grid";

import DataGrid from "../../components/DataGrid";
import FilterMenu from "../../components/FilterMenu";

import { useStatsNodeLocks } from "../../lib/paddles";
import { useMachineTypes } from "../../lib/paddles";


export const columns: GridColDef[] = [
    {
        field: "owner",
        width: 200,
    },
    {
        headerName: "machine type",
        field: "machine_type",
        width: 200,
    },
    {
        field: "count",
        width: 125,
    },

]

export default function StatsNodesLock() {
    const [params, setParams] = useQueryParams({
        machine_type: StringParam,
    });
    const machine_type = params["machine_type"];
    const query = useStatsNodeLocks(params);

    if (query === null) return <Typography>404</Typography>;
    if (query.isError) return null;

    return (
        <div>
            <Helmet>
                <title>Stats Nodes Lock - Pulpito</title>
            </Helmet>
            <Typography variant="h6" style={{ marginBottom: "20px" }}>
                Machine usage for up {machine_type || ""} nodes
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
