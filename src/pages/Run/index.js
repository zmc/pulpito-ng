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
  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ margin: "20px" }}>
        {name}
      </Typography>
      <ButtonGroup>
        <Button
          onClick={() => {
            setFilter("status", null);
          }}
        >
          All
        </Button>
        <Button
          onClick={() => {
            setFilter("status", "pass");
          }}
        >
          Pass
        </Button>
        <Button
          onClick={() => {
            setFilter("status", "fail");
          }}
        >
          Fail
        </Button>
        <Button
          onClick={() => {
            setFilter("status", "dead");
          }}
        >
          Dead
        </Button>
      </ButtonGroup>
      <JobList query={query} state={state} />
    </div>
  );
}
