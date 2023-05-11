import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

import RunList from "../../components/RunList";

export default function Queue() {
  const state = { queued: true };
  return (
    <div>
      <Helmet>
        <title>Queue - Pulpito</title>
      </Helmet>
      <Typography variant="h5" style={{ margin: "20px" }}>
        Queue
      </Typography>
      <RunList state={state} />
    </div>
  );
}
