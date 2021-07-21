import { useReducer } from 'react';
import Typography from '@material-ui/core/Typography';

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
      </div>
      <RunList params={state} dispatch={dispatch} />
    </div>
  )
}
