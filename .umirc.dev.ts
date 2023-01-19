import { defineConfig } from "umi";

export default defineConfig({
  define: {
    APP_ENV: "dev",
    // API_HOST: "https://server-test.ddnszwj.top",
    API_HOST: "http://10.91.42.89:3001",
  },
  proxy: {
    "/api": {
      target: "https://server.ddnszwj.top/",
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
