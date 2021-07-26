import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  useBranches,
  useMachineTypes,
  useSuites,
  useStatuses,
} from "../../lib/paddles";

const useStyles = makeStyles({
  filterMenu: {
    padding: "10px",
  },
});

const types = {
  branch: {
    label: "Branch",
    queryHook: useBranches,
    style: { width: 250 },
  },
  suite: {
    label: "Suite",
    queryHook: useSuites,
    style: { width: 250 },
  },
  machine_type: {
    label: "Machine Type",
    queryHook: useMachineTypes,
    style: { width: 150 },
  },
  status: {
    label: "Status",
    queryHook: useStatuses,
    style: { width: 200 },
  },
};

export default function FilterMenu(props) {
  const classes = useStyles();
  const opts = types[props.type];
  const query = opts.queryHook();
  if (query.isError) console.error(query.error);
  const onChange = (_, value) => {
    props.dispatch({ type: "set", payload: { key: props.type, value } });
  };

  return (
    <Autocomplete
      value={props.value}
      loading={query.isLoading}
      onChange={onChange}
      options={query.data || []}
      renderInput={(params) => <TextField {...params} label={opts.label} />}
      className={classes.filterMenu}
      style={opts.style}
      size="small"
    />
  );
}
