import { defineConfig } from "umi";

export default defineConfig({
  define: {
    APP_ENV: "dev",
    // API_HOST: "https://server-test.ddnszwj.top",
    API_HOST: "http://127.0.0.1:3001",
  },
  proxy: {
    "/api": {
      target: "https://server.ddnszwj.top/",
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
