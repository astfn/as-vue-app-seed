export type TApiRes<Data> = {
  code: number;
  message: string;
  data: Data;
  total?: number;
};

export type TCallApiRes<Data> = Promise<TApiRes<Data>>;
