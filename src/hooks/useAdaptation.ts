import utils from '@/utils';
import { useCallback, useEffect } from 'react';
import { history } from 'umi';

const useAdaptation = (props: any) => {
  const onresize = useCallback(() => {
    if (utils.tools.isPc()) {
      history.replace(`${props.route.path}/pc`);
    } else if (utils.tools.isMobile()) {
      history.replace(`${props.route.path}/mobile`);
    }
  }, [props.route.path]);

  useEffect(() => {
    if (props.location.pathname === props.route.path) {
      history.replace(`${props.route.path}/pc`);
    }
    onresize();
  }, [props.location.pathname, props.route.path, onresize]);
};

export default useAdaptation;
