export type QueryKey = [
  string,
  {
    url: string;
  }
];

export interface GetURLParams {
  [key: string]: string;
}

type RunParams = {
  name: string;
};

export type Run = {
  name: string;
};

export type Job = {
  suite: string;
  branch: string;
  scheduled: string;
};
