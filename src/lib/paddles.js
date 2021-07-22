import { useQuery } from 'react-query';


const PADDLES_SERVER = process.env.PADDLES_SERVER || "http://paddles.front.sepia.ceph.com";

function getURL (endpoint, params) {
  // Because paddles' API is clunky, we have to do extra work. If it were
  // more inuitive, we could replace everything until the next comment with
  // just these lines:
  //   const queryString = new URLSearchParams(params)).toString();
  //   let uri = queryString? `${endpoint}?${queryString}` : endpoint;
  const params_ = JSON.parse(JSON.stringify(params || {}));
  let uri = endpoint;
  let paramEntries = Object.entries(params_ || {});
  paramEntries.forEach(entry => {
    const [key, value] = entry;
    if ( value === null || value === "" ) {
      delete params_[key];
      return;
    }
    switch (key) {
      case "page":
        params_[key] = value + 1;
        break
      case "pageSize":
        params_.count = value;
        delete params_[key];
        break
      case "branch":
      case "date": // TODO does this work? also need to handle date&&to_date
      case "machine_type":
      case "sha1":
      case "status":
      case "suite":
      default:
        uri += `${key}/${value}/`;
        delete params_[key];
    }
  });
  const queryString = new URLSearchParams(params_).toString();
  if ( queryString ) uri += `?${queryString}`;
  // end "we could replace everything..."
  return new URL(uri, PADDLES_SERVER).href;
}

function useRuns (params) {
  const params_ = {...params};
  if ( params_.pageSize ) {
    params_.count = params.pageSize;
    delete params_.pageSize;
  }
  const url = getURL('/runs/', params);
  const query = useQuery(
    ['runs', {url}],
    {
      select: (data) => data.map(item => {
        return {...item, id: item.name};
      })
    }
  );
  return query;
};

function useBranches () {
  const url = getURL('/runs/branch/');
  return useQuery(['branches', {url}]);
}

function useSuites () {
  const url = getURL('/runs/suite/');
  return useQuery(['suites', {url}]);
}

function useMachineTypes () {
  const url = getURL('/nodes/machine_types/');
  return useQuery(['machine_types', {url}]);
}

function useStatuses () {
  return { data: [
    'queued',
    'waiting',
    'running',
    'finished pass',
    'finished fail',
    'finished dead',
  ]}
}

export {
  useBranches,
  useMachineTypes,
  useRuns,
  useSuites,
  useStatuses,
}
