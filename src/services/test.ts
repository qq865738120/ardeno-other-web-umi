import { request } from 'umi';

export const queryEventList = async () => {
  return await request('/projects/hydee-sentry/e-business-ui/events/', {
    method: 'get',
    headers: {
      Authorization:
        'Bearer 727dc1400dfe4575be7e89f1fd0135c28d0b8d910ca44c3a81f52caba22f8faf',
    },
  });
};
