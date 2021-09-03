import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { format } from "date-fns";
import SourceBranch from "mdi-material-ui/SourceBranch";

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

function reducer(state, action) {
  let newState;
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
  const { name } = useParams();
  const [state, dispatch] = useReducer(reducer, {});
  const query = useRun(name);
  const setFilter = (key, value) => {
    dispatch({
      type: "set",
      payload: { key, value },
    });
  };
  const suite = query.data?.suite;
  const branch = query.data?.branch;
  const statuses = ["pass", "fail", "dead", "running", "waiting"];
  const date = query.data?.scheduled
    ? format(new Date(query.data.scheduled), "yyyy-MM-dd")
    : null;
  return (
    <div className={classes.root}>
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
            <SourceBranch color="unset" />
          </Typography>
        </Link>
        <Link to={`/runs/?date=${date}`}>
          <Typography>scheduled on {date}</Typography>
        </Link>
      </div>
      <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            setFilter("status", null);
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
