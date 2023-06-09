import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Helmet } from "react-helmet";

import FilterMenu from "../../components/FilterMenu";
import RunList from "../../components/RunList";
import { GetURLParams } from "../../lib/paddles.d";

type URLParamsReducerAction = {
  type: string;
  payload: URLParamsReducerPayload;
}

type URLParamsReducerPayload = {
  key: string;
  value: string;
}

function reducer(state: GetURLParams, action: URLParamsReducerAction) {
  let newState: GetURLParams;
  switch (action.type) {
    case "set":
      const key = action.payload.key;
      const value = action.payload.value;
      newState = { ...state };
      if (value) newState[key] = value;
      else delete newState[key];
      const params = new URLSearchParams(Object.entries(newState));
      const paramString = params.toString();
      const history = createBrowserHistory();
      if (history.location.search !== "?" + paramString) {
        history.push({
          ...history.location,
          search: paramString,
        });
      }
      break;
    default:
      newState = state;
  }
  return newState;
}

export default function Runs() {
  const history = createBrowserHistory();
  // We only need useLocation so that the component will render when the URL
  // changes
  // eslint-disable-next-line
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(history.location.search), [
    history.location.search,
  ]);
  const [state, dispatch] = useReducer(
    reducer,
    Object.fromEntries(params.entries())
  );
  const [sha1Valid, sha1Dispatch] = useReducer(
    (_: any, value: boolean) => value, true);
  const onSha1Change = useCallback((evt) => {
    const value = evt.target.value;
    if (value.length === 0 || value.length === 40) {
      dispatch({
        type: "set",
        payload: { key: "sha1", value: evt.target.value },
      });
      sha1Dispatch(true);
    } else {
      sha1Dispatch(false);
    }
  }, []);
  const onDateChange = useCallback((evt) => {
    dispatch({
      type: "set",
      payload: { key: "date", value: evt.target.value },
    });
  }, []);
  useEffect(() => {
    // Update state with search params from the current location
    for (let pair of params.entries()) {
      const [key, value] = pair;
      if (state[key] !== value) {
        dispatch({
          type: "set",
          payload: { key, value },
        });
      }
    }
    // If a param was dropped, remove it from state
    for (let key of Object.keys(state)) {
      if (!params.get(key))
        dispatch({
          type: "set",
          payload: { key, value: "" },
        });
    }
  }, [history, params, state]);
  return (
    <div>
      <Helmet>
        <title>Runs - Pulpito</title>
      </Helmet>
      <Typography variant="h5" style={{ margin: "20px" }}>
        Runs
      </Typography>
      <div style={{ height: "auto", display: "flex" }}>
        <div>
          <Typography style={{ padding: "10px", marginTop: "16px" }}>
            Filter&nbsp;by:
          </Typography>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <TextField
            label="SHA1"
            size="small"
            margin="dense"
            style={{ margin: "10px" }}
            error={!sha1Valid}
            onChange={onSha1Change}
            defaultValue={state.sha1}
          />
          <TextField
            type="date"
            size="small"
            margin="dense"
            style={{ margin: "10px", paddingTop: "16px" }}
            onChange={onDateChange}
            defaultValue={state.date}
          />
          <FilterMenu type="status" state={state} dispatch={dispatch} />
          <FilterMenu type="branch" state={state} dispatch={dispatch} />
          <FilterMenu type="suite" state={state} dispatch={dispatch} />
          <FilterMenu type="machine_type" state={state} dispatch={dispatch} />
        </div>
      </div>
      <RunList state={state} dispatch={dispatch} />
    </div>
  );
}
