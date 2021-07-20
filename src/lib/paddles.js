import { useQuery } from 'react-query';


const PADDLES_SERVER = process.env.PADDLES_SERVER || "http://paddles.front.sepia.ceph.com";

function useRuns () {
  const query = useQuery(
    ['runs', {url: new URL("/runs/", PADDLES_SERVER).href}],
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
