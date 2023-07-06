import { useQuery } from '@tanstack/react-query';

import type { GetURLParams, Run, Job } from "./paddles.d";

const PADDLES_SERVER =
  import.meta.env.REACT_APP_PADDLES_SERVER ||
  "https://paddles.front.sepia.ceph.com";

function getURL(endpoint: string, params?: GetURLParams) {
  // Because paddles' API is clunky, we have to do extra work. If it were
  // more inuitive, we could replace everything until the next comment with
  // just these lines:
  //   const queryString = new URLSearchParams(params)).toString();
  //   let uri = queryString? `${endpoint}?${queryString}` : endpoint;
  const params_ = JSON.parse(JSON.stringify(params || {}));
  let uri = endpoint;
  let paramEntries = Object.entries(params_ || {});
  paramEntries.forEach((entry) => {
    const [key, value] = entry;
    if (value === null || value === "") {
      delete params_[key];
      return;
    }
    switch (key) {
      case "page":
        params_[key] = (value as number) + 1;
        break;
      case "pageSize":
        params_.count = value as number;
        delete params_[key];
        break;
      case "queued":
        uri += "queued/";
        delete params_[key];
        break;
      default:
        uri += `${key}/${value}/`;
        delete params_[key];
    }
  });
  const queryString = new URLSearchParams(params_).toString();
  if (queryString) uri += `?${queryString}`;
  // end "we could replace everything..."
  return new URL(uri, PADDLES_SERVER).href;
}

function useRuns(params: GetURLParams) {
  const params_ = { ...params };
  if (params_.pageSize) {
    params_.count = params.pageSize;
    delete params_.pageSize;
  }
  const url = getURL("/runs/", params);
  const query = useQuery(["runs", { url }], {
    select: (data: Run[]) =>
      data.map((item) => {
        return { ...item, id: item.name };
      }),
  });
  return query;
}

function useRun(name: string) {
  const url = getURL(`/runs/${name}/`);
  const query = useQuery<Object, Error, Job>(["run", { url }], {});
  return query;
}

function useJob(name: string, job_id: number) {
  const url = getURL(`/runs/${name}/jobs/${job_id}/`);
  const query = useQuery(["job", { url }], {});
  return query;
}

function useBranches() {
  const url = getURL("/runs/branch/");
  return useQuery(["branches", { url }]);
}

function useSuites() {
  const url = getURL("/runs/suite/");
  return useQuery(["suites", { url }]);
}

function useMachineTypes() {
  const url = getURL("/nodes/machine_types/");
  return useQuery(["machine_types", { url }]);
}

function useStatuses() {
  return {
    data: [
      "queued",
      "waiting",
      "running",
      "finished pass",
      "finished fail",
      "finished dead",
    ],
  };
}

export {
  useBranches,
  useMachineTypes,
  useRuns,
  useRun,
  useJob,
  useSuites,
  useStatuses,
};
