import { request } from "umi";

export interface ISignUpParams {
  username: string;
  password: string;
}
export const signUp = async (data: ISignUpParams) => {
  return await request("v1/auth/sign-up", {
    method: "post",
    data,
  });
};

export const publicKey = async () => {
  return await request("v1/auth/public-key", {
    method: "get",
  });
};
