import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { format } from "date-fns";
import SourceBranch from "mdi-material-ui/SourceBranch";
import { Helmet } from "react-helmet";

import type { Job, RunParams } from "../../lib/paddles.d";

import { useRun } from "../../lib/paddles";
import JobList from "../../components/JobList";
import Link from "../../components/Link";


const useStyles = makeStyles(() => ({
  root: {
    "& .MuiButton-root": {
      textTransform: "none",
    },
  },
}));

type StatusFilterState = {
  [key: string]: string;
}

type StatusFilterReducerAction = {
  type: string;
  payload: StatusFilterReducerPayload;
}

type StatusFilterReducerPayload = {
  key: string;
  value: string;
}

function reducer(state: StatusFilterState, action: StatusFilterReducerAction) {
  let newState: StatusFilterState;
  switch (action.type) {
    case "set":
      newState = { ...state };
      const key = action.payload.key;
      const value = action.payload.value;
      if (value) newState[key] = value;
      else delete newState[key];
      break;
    default:
      throw new Error();
  }
  return newState;
}

export default function Run() {
  const classes = useStyles();
  const theme = useTheme();
  const { name } = useParams<RunParams>();
  const [state, dispatch] = useReducer(reducer, {});
  const query = useRun(name === undefined? "" : name);
  if ( query === null ) return (<Typography>404</Typography>);
  if (!query.isSuccess) return null;
  const setFilter = (key: string, value: string) => {
    dispatch({
      type: "set",
      payload: { key, value },
    });
  };
  const data: Job = query.data;
  const suite = data?.suite;
  const branch = query.data?.branch;
  const statuses = ["pass", "fail", "dead", "running", "waiting"];
  const date = query.data?.scheduled
    ? format(new Date(query.data.scheduled), "yyyy-MM-dd")
    : null;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{ `${name} - Pulpito` }</title>
      </Helmet>
      <Typography variant="h5" style={{ margin: "20px 0px" }}>
        {name}
      </Typography>
      <div style={{ margin: "20px 0px" }}>
        <Typography>See similar runs:</Typography>
        <Link to={`/runs/?suite=${suite}&branch=${branch}`}>
          <Typography>
            suite {suite} and branch {branch}
          </Typography>
        </Link>
        <Link to={`/runs/?branch=${branch}`}>
          <Typography>
            <SourceBranch style={{"color": theme.palette.text.primary}}/>
          </Typography>
        </Link>
        <Link to={`/runs/?date=${date}`}>
          <Typography>scheduled on {date}</Typography>
        </Link>
      </div>
      <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            setFilter("status", "");
          }}
        >
          All
        </Button>
        {statuses.map((item) => (
          <Button
            key={item}
            onClick={() => {
              setFilter("status", item);
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
      <JobList query={query} state={state} />
    </div>
  );
}
