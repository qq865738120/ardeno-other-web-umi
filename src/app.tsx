import { RequestConfig } from "umi";

export const request: RequestConfig = {
  prefix: `${API_HOST}/api/0`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};

export interface InitialState {
  userId: string;
  isLogin: boolean;
}

export const getInitialState = async (): Promise<InitialState> => {
  return {
    userId: "test",
    isLogin: false,
  };
};
