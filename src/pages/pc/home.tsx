import { Button } from 'antd';
import React, { FC } from 'react';
import { AppModelState, connect, ConnectProps, Dispatch, history, Loading } from 'umi';
import styles from './home.less';

interface PageProps extends ConnectProps {
  app: AppModelState;
  loading: boolean;
}

const HomePage: FC<PageProps> = ({ app, loading, dispatch }) => {
  const onGoTestClick = () => {
    console.log(APP_ENV);
    history.push('/test');
  };


  const onSetNameClick = () => {
    (dispatch as Dispatch)({ type: 'app/query' });
  };

  return (
    <div>
      <h1 className={styles.title}>Page index{APP_ENV}</h1>
      <h1 className={styles.title}>name {app.name}</h1>
      <div onClick={onGoTestClick}>跳转test</div>
      <Button onClick={onSetNameClick} loading={loading}>
        设置name
      </Button>
    </div>
  );
};

export default connect(({ app, loading }: { app: AppModelState; loading: Loading }) => ({
  app,
  loading: loading.models.app,
}))(HomePage);
