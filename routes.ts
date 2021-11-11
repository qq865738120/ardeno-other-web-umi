const routes = [
  {
    path: "/",
    title: "索引",
    component: "@/pages/index",
  },
  {
    path: "/home",
    title: "首页",
    component: "@/pages/home",
    routes: [
      {
        path: "/home/pc",
        component: "@/pages/pc/home",
      },
      {
        path: "/home/mobile",
        component: "@/pages/mobile/home",
      },
    ],
  },
  {
    path: "/test",
    title: "测试页",
    component: "@/pages/pc/test",
    wrappers: ["@/wrappers/auth"],
  },
  {
    path: "/login",
    title: "登陆页",
    component: "@/pages/pc/login",
  },
  {
    path: "/propose-marriage",
    title: "待定",
    component: "@/pages/mobile/propose-marriage/index",
  },
  {
    path: "/threejs-test",
    title: "threejs测试",
    component: "@/pages/mobile/threejs-test/index",
  },
];

export default routes;
