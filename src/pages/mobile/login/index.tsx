import { Button, Form, Input } from "antd-mobile";
import React, { FC } from "react";
import {
  AppModelState,
  connect,
  ConnectProps,
  Dispatch,
  history,
  Loading,
  UserModelState,
} from "umi";
import NodeRSA from "node-rsa";
import styles from "./index.less";

interface PageProps extends ConnectProps {
  app: AppModelState;
  user: UserModelState;
  loading: boolean;
}

const LoginPage: FC<PageProps> = ({ user, loading, dispatch }) => {
  const onGoTestClick = () => {
    console.log(APP_ENV);
    history.push("/test");
  };

  const onSetNameClick = () => {
    (dispatch as Dispatch)({ type: "app/query" });
  };

  const onFinish = (values: any) => {
    console.log(values);
    // (dispatch as Dispatch)({
    //   type: "user/fetchPublicKey",
    //   callback: (payload: any) => {

    //   },
    // });
    (dispatch as Dispatch)({
      type: "user/fetchSignUp",
      payload: {
        ...values,
        // password: new NodeRSA(payload).encrypt(values.password, "base64"),
      },
    });
  };

  return (
    <section className={styles["login-page"]}>
      <Form
        footer={
          <Button block type="submit" color="primary">
            提交
          </Button>
        }
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </section>
  );
};

export default connect(
  ({
    app,
    user,
    loading,
  }: {
    app: AppModelState;
    user: UserModelState;
    loading: Loading;
  }) => ({
    app,
    user,
    loading: loading.models.app,
  }),
)(LoginPage);
