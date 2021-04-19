import { defineConfig } from "umi";

export default defineConfig({
  define: {
    APP_ENV: "prod",
    API_HOST: "http://sentry.dev.pt.hydee.cn",
  },
  hash: true,
  chunks: ["commons", "libs", "vendors", "umi"],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "commons",
            },
            libs: {
              test: /[\\/]node_modules[\\/](react-redux|react-helment|redux-saga|redux|dva|dva-core|immer|umi-request|umi|core-js)[\\/]/,
              name: "libs",
            },
            vendors: {
              test: /[\\/]node_modules[\\/](react|react-dom|antd|@ant-design|antd-mobile)[\\/]/,
              name: "vendors",
            },
          },
        },
      },
    });

    config.plugin("CompressionPlugin").use(require("compression-webpack-plugin"), [
      {
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        threshold: 1024,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      },
    ]);
  },
});
