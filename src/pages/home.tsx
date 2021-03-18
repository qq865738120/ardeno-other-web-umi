import hooks from '@/hooks';

const HomePage = (props: any) => {
  hooks.useAdaptation(props);
  return <>{props.children}</>;
};

export default HomePage;
