import Typography from "@material-ui/core/Typography";

import RunList from "../../components/RunList";

export default function Queue() {
  const state = { queued: true };
  return (
    <div>
      <Typography variant="h5" style={{ margin: "20px" }}>
        Queue
      </Typography>
      <RunList state={state} />
    </div>
  );
}
