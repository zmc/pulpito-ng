import { useQuery } from 'react-query';


const PADDLES_SERVER = process.env.PADDLES_SERVER || "http://paddles.front.sepia.ceph.com";

function useRuns (params) {
  const base = new URL("/runs/", PADDLES_SERVER).href;
  const queryString = new URLSearchParams(params).toString();
  const url = queryString? `${base}?${queryString}` : base;
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

export {
  useRuns,
}
