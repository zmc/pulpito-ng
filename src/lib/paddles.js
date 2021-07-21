import { useQuery } from 'react-query';


const PADDLES_SERVER = process.env.PADDLES_SERVER || "http://paddles.front.sepia.ceph.com";

function getURL (endpoint, params) {
  const queryString = new URLSearchParams(params).toString();
  let uri = queryString? `${endpoint}?${queryString}` : endpoint;
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
