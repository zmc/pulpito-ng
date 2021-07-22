import { useReducer, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import FilterMenu from '../../components/FilterMenu';
import RunList from '../../components/RunList';


function reducer (state, action) {
  let newState;
  switch (action.type) {
    case "set":
      newState = {...state};
      newState[action.payload.key] = action.payload.value;
      break
    default:
      newState = state;
  }
  console.log(state, action, newState);
  return newState;
};

export default function Runs () {
  const [state, dispatch] = useReducer(reducer, {page: 0, pageSize: 25});
  const [sha1Valid, sha1Dispatch] = useReducer((_, value) => value, true);
  const onSha1Change = useCallback((evt) => {
    const value = evt.target.value;
    if ( value.length === 0 || value.length === 40 ) {
      dispatch(
        {type: 'set', payload: {key: "sha1", value: evt.target.value}}
      );
      sha1Dispatch(true);
    } else {
      sha1Dispatch(false)
    }
  }, []);
  const onDateChange = useCallback((evt) => {
    dispatch(
      {type: 'set', payload: {key: "date", value: evt.target.value}}
    );
  }, []);
  return (
    <div>
      <div style={{height: 'auto', display: 'flex'}}>
        <Typography
          style={{padding: '10px', marginTop: '16px'}}
        >
          Filter by:
        </Typography>
        <FilterMenu type="branch" dispatch={dispatch} />
        <FilterMenu type="status" dispatch={dispatch} />
        <FilterMenu type="suite" dispatch={dispatch} />
        <FilterMenu type="machine_type" dispatch={dispatch} />
        <TextField
          label="SHA1"
          size="small"
          margin="dense"
          style={{margin: '10px'}}
          error={! sha1Valid}
          onChange={onSha1Change}
        />
        <TextField
          label="Date"
          type="date"
          size="small"
          margin="dense"
          style={{margin: '10px'}}
          onChange={onDateChange}
        />
      </div>
      <RunList params={state} dispatch={dispatch} />
    </div>
  )
}
