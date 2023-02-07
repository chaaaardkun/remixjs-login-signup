/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    API_ENDPOINT: process.env.GRAPH_ENDPOINT,
  },
};
