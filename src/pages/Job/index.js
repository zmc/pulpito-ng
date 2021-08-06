import { useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import formatRelative from "date-fns/formatRelative";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDuration from "date-fns/formatDuration";

import YAML from "json-to-pretty-yaml";
import { CodeBlock, tomorrow, tomorrowNight } from "react-code-blocks";

import { useJob } from "../../lib/paddles";
import { formatDate, getDuration } from "../../lib/utils";

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
  const dateFields = ["posted", "started", "updated"];
  const fields = [
    "duration",
    "branch",
    "machine_type",
    "teuthology_branch",
    "os_type",
    "os_version",
  ];
  return (
    <>
      <div>
        Started {formatRelative(new Date(query.data.started), new Date())}
        Started {formatDistanceToNow(new Date(query.data.started))} ago Started{" "}
        {formatDistanceToNowStrict(new Date(query.data.started))} ago Took{" "}
        {formatDuration(getDuration(query.data.duration))}
      </div>
      <div style={{ height: "auto", display: "flex" }}>
        {dateFields.map((field) => {
          return (
            <Typography key={field}>
              {field}: {formatDate(query.data[field])}
            </Typography>
          );
        })}
        {fields.map((field) => {
          return (
            <Typography key={field}>
              {field}: {query.data[field]}
            </Typography>
          );
        })}
      </div>
    </>
  );
}

function JobDetails({ query }) {
  const theme = useTheme();
  if (query.isLoading) return "...";
  if (query.isError) return "!!!";
  return (
    <CodeBlock
      text={YAML.stringify(query.data)}
      language="yaml"
      theme={theme.palette.type === "light" ? tomorrow : tomorrowNight}
      codeContainerStyle={{ textAlign: "initial" }}
      customStyle={{
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
      }}
    />
  );
}

export default function Job() {
  const { name, job_id } = useParams();
  const query = useJob(name, job_id);
  return (
    <div>
      <div
        style={{ display: "flex", margin: "20px", justifyContent: "center" }}
      >
        <StatusIcon
          status={query.data?.status}
          style={{ alignSelf: "center" }}
        />
        <Typography variant="h5">
          {name}/{job_id}
        </Typography>
      </div>
      <JobHeader query={query} />
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        style={{ margin: "20px" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Full job details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <JobDetails query={query} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
