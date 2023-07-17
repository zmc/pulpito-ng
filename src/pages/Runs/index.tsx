import { useCallback, ChangeEvent } from "react";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Helmet } from "react-helmet";

import FilterMenu from "../../components/FilterMenu";
import RunList from "../../components/RunList";

import {
  useBranches,
  useMachineTypes,
  useSuites,
  useStatuses,
} from "../../lib/paddles";

export default function Runs() {
  const [params, setParams] = useQueryParams({
    branch: StringParam,
    date: StringParam,
    machine_type: StringParam,
    page: NumberParam,
    pageSize: NumberParam,
    sha1: StringParam,
    status: StringParam,
    suite: StringParam,
    user: StringParam,
  });
  const { branch, date, machine_type, sha1, status, suite } = params;
  const onSha1Change = (evt: ChangeEvent) => {
    const newValue = (evt.target as HTMLTextAreaElement).value;
    setParams({sha1: newValue || null});
  };
  const onDateChange = useCallback((evt: ChangeEvent) => {
    const newValue = (evt.target as HTMLTextAreaElement).value;
    setParams({ date: newValue || null });
  }, []);
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
            onChange={onSha1Change}
            value={sha1 || ""}
          />
          <TextField
            type="date"
            size="small"
            margin="dense"
            style={{ margin: "10px"}}
            onChange={onDateChange}
            value={date || ""}
          />
          <FilterMenu
            type="status"
            value={status}
            setter={setParams}
            optionsHook={useStatuses}
            width={200}
          />
          <FilterMenu
            type="branch"
            value={branch}
            setter={setParams}
            optionsHook={useBranches}
            width={250}
          />
          <FilterMenu
            type="suite"
            value={suite}
            setter={setParams}
            optionsHook={useSuites}
            width={250}
          />
          <FilterMenu
            type="machine_type"
            value={machine_type}
            setter={setParams}
            optionsHook={useMachineTypes}
            width={150}
          />
        </div>
      </div>
      <RunList params={params} setter={setParams} />
    </div>
  );
}
