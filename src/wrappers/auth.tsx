import { Redirect, useAccess } from 'umi'

export default (props: any) => {
  const { isLogin } = useAccess();
  if (isLogin) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="/login" />;
  }
}
