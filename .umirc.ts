import routes from "./routes";
import { defineConfig } from "umi";

export default defineConfig({
  // antd: {
  //   dark: true,
  // },
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: "none",
  },
  extraPostCSSPlugins: [
    require("postcss-px-to-viewport")({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      exclude: [/node_modules/, /src\/pages\/pc/],
    }),
  ],
  routes,
  fastRefresh: {},
});
