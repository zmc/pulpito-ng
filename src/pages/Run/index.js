import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { useRun } from "../../lib/paddles";
import JobList from "../../components/JobList";


export default function Run() {
  const { name } = useParams();
  const query = useRun(name);
  return (
    <div>
      <Typography variant="h5" style={{ margin: "20px" }}>
        {name}
      </Typography>
      <JobList
        query={query}
      />
    </div>
  );
}
