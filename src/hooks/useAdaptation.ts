import utils from '@/utils';
import { useEffect } from 'react';
import { history } from 'umi';

const useAdaptation = (props: any) => {
  useEffect(() => {
    if (props.location.pathname === props.route.path) {
      history.replace(`${props.route.path}/pc`);
    }
    onresize();
  }, []);

  const onresize = () => {
    if (utils.tools.isPc()) {
      history.replace(`${props.route.path}/pc`);
    } else if (utils.tools.isMobile()) {
      history.replace(`${props.route.path}/mobile`);
    }
  };
};

export default useAdaptation
