import { request } from "umi";

export interface IQueryLegerParams {
  starttime: string;
  endtime: string;
  type?: string;
}
export const queryLegerType = async () => {
  return await request("v1/ledger/type", {
    method: "get",
  });
};

export const queryLegerData = async (params: IQueryLegerParams) => {
  return await request(`v1/ledger/query`, {
    method: "get",
    params
  });
};
