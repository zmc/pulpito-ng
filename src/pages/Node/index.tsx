import { useParams } from "react-router-dom";
import { useQueryParams, NumberParam } from "use-query-params";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

import DataGrid from "../../components/DataGrid";
import JobList from "../../components/JobList";
import { nodeRowClass, columns as nodeColumns} from "../../components/NodeList";
import type { NodeParams } from "../../lib/paddles.d";

import { useNode, useNodeJobs } from "../../lib/paddles";

export default function Node() {
  const [params, setParams] = useQueryParams({
    page: NumberParam,
    pageSize: NumberParam,
  });
  const { name } = useParams<NodeParams>();
  const detailsQuery = useNode(name === undefined ? "" : name);
  const jobsQuery = useNodeJobs(name === undefined ? "" : name, params);

  if (detailsQuery === null) return <Typography>404</Typography>;
  if (detailsQuery.isError) return null;

  if (jobsQuery === null) return <Typography>404</Typography>;
  if (jobsQuery.isError) return null;
  
  return (
    <div>
      <Helmet>
        <title>Node - Pulpito</title>
      </Helmet>
      <Typography variant="h6" style={{ marginBottom: "20px" }}>
        Node: {name}
      </Typography>

      <div style={{ height: "auto", display: "flex" }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "auto", gap: 30 }}>
      <DataGrid
        columns={nodeColumns}
        rows={[{ id: name, ...detailsQuery.data}] || []}
        loading={detailsQuery.isLoading || detailsQuery.isFetching}
        hideFooter={true}
        getRowClassName={nodeRowClass}
      />
      <JobList query={jobsQuery} params={params} setter={setParams} />
      </div>
      </div>
    </div>
  );
}
