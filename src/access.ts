import type { InitialState } from './app';

/**
 * 更细粒度的权限控制
 */
export default (initialState: InitialState) => {
  const { userId, isLogin } = initialState;

  return {
    isLogin,
    canReadUser: (user: any) => {
      console.log('1112', user.userId === userId, userId, user);
      return user.userId === userId;
    },
  };
};
