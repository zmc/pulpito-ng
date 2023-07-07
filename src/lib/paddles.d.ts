export type QueryKey = [
  string,
  {
    url: string;
  }
];

export interface GetURLParams {
  [key: string]: string | number | null | undefined;
}

type RunParams = {
  name: string;
};

export type Job = {
  id?: string;
  job_id: number;
  name: string;
  suite: string;
  branch: string;
  scheduled: string;
};

export type Run = {
  name: string;
  branch: string;
  suite: string;
  jobs: Job[];
  scheduled: string;
};
