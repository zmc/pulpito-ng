import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDuration from "date-fns/formatDuration";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism-tomorrow.css";

import YAML from "json-to-pretty-yaml";

import { useJob } from "../../lib/paddles";
import { getDuration } from "../../lib/utils";

function StatusIcon({ status }) {
  const theme = useTheme();
  const statuses = {
    pass: { icon: CheckCircleOutlineIcon, color: theme.palette.success.light },
    fail: { icon: HighlightOffIcon, color: theme.palette.error.light },
    dead: { icon: HighlightOffIcon, color: theme.palette.warning.light },
    running: {
      icon: PlayCircleOutlineIcon,
      theme: theme.palette.warning.light,
    },
    waiting: { icon: ScheduleIcon },
  };
  const conf = statuses[status];
  if (!conf) return null;
  const Icon = conf.icon;
  const style = { alignSelf: "center", margin: "5px" };
  if (conf.color) style.color = conf.color;
  return <Icon style={style} />;
}

function JobHeader({ query }) {
  if (!query.isSuccess) return null;
  return (
    <>
      <Grid item xs={4}>
        <Typography>Status: {query.data.status}</Typography>
        <Typography>
          Started {formatDistanceToNow(new Date(query.data.started))} ago
        </Typography>
        {query.data.duration ? (
          <Typography>
            Took {formatDuration(getDuration(query.data.duration))}
          </Typography>
        ) : null}
      </Grid>
      <Grid item xs={4}>
        <Typography>Ceph Branch: {query.data.branch}</Typography>
        <Typography>
          SHA1: <code>{query.data.sha1.slice(0, 7)}</code>
        </Typography>
        <Typography>
          Teuthology Branch: {query.data.teuthology_branch}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          Nodes:&nbsp;
          {Object.keys(query.data.targets || []).map((item) => {
            return (
              <RouterLink
                to={`/nodes/${item}`}
                component={Link}
                target="_blank"
              >
                {item.split(".")[0]}
              </RouterLink>
            );
          })}
        </Typography>
        <Typography>
          OS: {query.data.os_type} {query.data.os_version}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="span">Description:&nbsp;</Typography>
        <Typography variant="body2" component="span">
          <code>{query.data.description}</code>
        </Typography>
      </Grid>
      {query.data.failure_reason ? (
        <Grid item xs={12}>
          <Typography component="span">Failure reason:&nbsp;</Typography>
          <Typography variant="body2" component="span">
            <code>{query.data.failure_reason}</code>
          </Typography>
        </Grid>
      ) : null}
    </>
  );
}

function JobDetails({ query }) {
  if (query.isLoading) return "...";
  if (query.isError) return "!!!";
  const code = YAML.stringify(query.data);
  return (
    <Editor
      value={code}
      readOnly={true}
      highlight={(code) => highlight(code, languages.yaml)}
      style={{
        fontFamily: [
          "ui-monospace",
          "SFMono-Regular",
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "Liberation Mono",
          '"Lucida Console"',
          "Courier",
          "monospace",
        ].join(","),
        textAlign: "initial",
      }}
    />
  );
}

export default function Job() {
  const { name, job_id } = useParams();
  const query = useJob(name, job_id);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: "flex" }}>
        <StatusIcon status={query.data?.status} />
        <Typography variant="h5">
          <RouterLink to={`/runs/${name}`} component={Link} target="_blank">
            {name}
          </RouterLink>
          /{job_id}
        </Typography>
      </Grid>
      <JobHeader query={query} />
      <Grid item xs={12}>
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          style={{ marginTop: "20px" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Full job details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JobDetails query={query} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
