import { queryEventList } from '@/services/test';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface AppModelState {
  name: string;
}

export interface AppModelType {
  namespace: 'app';
  state: AppModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    // save: Reducer<AppModelState>;
    // 启用 immer 之后
    save: ImmerReducer<AppModelState>;
  };
  subscriptions: { setup?: Subscription };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    name: 'test name'
  },
  effects: {
    * query(action, effects) {
      const res = yield effects.call(queryEventList)
      console.log('res', res);

      yield effects.put({ type: 'save', payload: res[0].id })
    }
  },
  reducers: {
    save(state, actions) {
      console.log('actions', actions);

      state.name = actions.payload
    }
  },
  subscriptions: {
    // setup(api) {
    //   api.dispatch()
    // }
  }
}

export default AppModel
