import { CustomRoute } from "./types";
let routes: Array<CustomRoute> = [];
/** 实现自动加载@modules 下的模块里的静态路由router文件夹里的文件 */
const serviceModulesFiles = require.context(
  "../modules",
  true,
  /\.(\/[a-zA-Z0-9_-]+)+\/router\/.+\.ts$/
);
routes = serviceModulesFiles.keys().reduce((routes, modulePath) => {
  const value = serviceModulesFiles(modulePath);
  routes = routes.concat(value.default);
  return routes;
}, routes);
/**加载同级目录下的module里的所有脚本 */
const modulesFiles = require.context("./modules", true, /\.ts$/);
routes = modulesFiles.keys().reduce((routes, modulePath) => {
  const value = modulesFiles(modulePath);
  routes = routes.concat(value.default);
  return routes;
}, routes);
console.log(routes);
export default routes;
