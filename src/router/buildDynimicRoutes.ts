import { CustomRoute } from "./types";
import { walkArray } from "@utils/commonUtil";
let $dynimicRoutes: Array<CustomRoute> = [];

/** 实现自动加载@modules 下的模块里的dynimicRouter文件夹里的文件 */
const dynimicServiceModulesFiles = require.context(
  "../modules",
  true,
  /\.(\/[a-zA-Z0-9_-]+)+\/dynimicRouter\/.+\.ts$/
);
$dynimicRoutes = dynimicServiceModulesFiles.keys().reduce((routes, modulePath) => {
  const value = dynimicServiceModulesFiles(modulePath);
  routes = routes.concat(value.default);
  return routes;
}, $dynimicRoutes);
export const dynimicRoutes = $dynimicRoutes;

function buildRouteMap(
  object: Record<string, any>,
  array: Array<any>,
  config: { deep: boolean; key: string; childKey: string } = {
    deep: true,
    key: "authCode",
    childKey: "children",
  },
  parentPath?: string
) {
  walkArray(array, function (item: any) {
    const key = item[config.key];
    object[key] = item;
    if (/^\//.test(item.path) != true) {
      item.path = parentPath ? parentPath + "/" + item.path : item.path;
    }
    if (config.deep && item[config.childKey]) {
      const tempParentPath = item.path;
      buildRouteMap(object, item[config.childKey], config, tempParentPath);
    }
    object[key] = item;
  });
  return object;
}
/**根据authCode生成 authCode-route map*/
export const dynimicRouteMap = buildRouteMap({}, $dynimicRoutes, {
  deep: true,
  key: "name",
  childKey: "children",
});
console.log(dynimicRouteMap);
export function generateMenuRoutes(container: Array<any>, data: Array<any>) {
  walkArray(data, function (item: any) {
    if (dynimicRouteMap[item.key] && !item.banned) {
      const route = dynimicRouteMap[item.key];
      //替换路由的标题名字
      route.meta.title = item.name;
      route.meta.hidden = !item.showTab;
      const copyRoute = { ...route };
      delete copyRoute.children;
      if (item.children) {
        copyRoute.children = [];
      }
      generateMenuRoutes(copyRoute.children, item.children);
      container.push(copyRoute);
    }
  });
  return container;
}
