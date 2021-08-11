import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { useRun } from "../../lib/paddles";
import JobList from "../../components/JobList";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 12,
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
  const statuses = ["pass", "fail", "dead", "running", "waiting"];
  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ margin: "20px 0px" }}>
        {name}
      </Typography>
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
