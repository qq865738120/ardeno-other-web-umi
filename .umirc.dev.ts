import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    APP_ENV: 'dev',
    API_HOST: ''
  },
  proxy: {
    '/api': {
      'target': 'http://sentry.dev.pt.hydee.cn/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
