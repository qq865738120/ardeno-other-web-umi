export default {
  "GET /api/users": { users: [1, 2] },

  // 支持自定义函数，API 参考 express@4
  "POST /api/users/create": (_req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end("ok");
  },
};
