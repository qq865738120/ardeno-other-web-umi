import { publicKey, signUp } from "@/services/auth";
import type { Effect, ImmerReducer, Subscription } from "umi";
import NodeRSA from "node-rsa";

export interface UserModelState {
  userInfo: any;
  publicKey: any;
}

export interface UserModelType {
  namespace: "user";
  state: UserModelState;
  effects: {
    fetchSignUp: Effect;
    fetchPublicKey: Effect;
  };
  reducers: {
    // save: Reducer<UserModelState>;
    // 启用 immer 之后
    setUserInfo: ImmerReducer<UserModelState>;
    setPublicKey: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup?: Subscription };
}

const UserModel: UserModelType = {
  namespace: "user",
  state: {
    userInfo: null,
    publicKey: null,
  },
  effects: {
    *fetchSignUp({ payload }, { call, put, take, select }) {
      yield put({ type: "fetchPublicKey" });
      yield take("fetchPublicKey/@@end");
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const publicKey = yield select((state: any) => {
        console.log('state', state);

        return state.user.publicKey
      });

      const res = yield call(signUp, {
        ...payload,
        password: new NodeRSA(publicKey).encrypt(payload.password, "base64"),
      });
      yield put({ type: "setUserInfo", payload: res.data });
    },
    *fetchPublicKey(action, effects) {
      const res = yield effects.call(publicKey);
      yield effects.put({ type: "setPublicKey", payload: res.data });
    },
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    setPublicKey(state, action) {
      return {
        ...state,
        publicKey: action.payload,
      };
    },
  },
  subscriptions: {
    // setup(api) {
    //   api.dispatch()
    // }
  },
};

export default UserModel;
