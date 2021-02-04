import { setSession, getSession } from "@utils/localStorageUtil";
import { ls_authMap, ls_authIds } from "./localStorageKeys";
const DB = {
  appCode: "security.service",
  authIds: getSession(ls_authIds) || ([] as Array<number>),
  authMap: getSession(ls_authMap) || {},
};

const runtimeDB = {
  getAppCode() {
    return DB.appCode;
  },
  getAuthIds() {
    return DB.authIds;
  },
  setAuthIds(ids: Array<number>) {
    DB.authIds = ids;
    setSession(ls_authIds, DB.authIds);
  },
  setAuthMap(authMap: any) {
    DB.authMap = authMap;
    setSession(ls_authMap, DB.authMap);
  },
  getAuthMap() {
    return DB.authMap;
  },
  hasAuth(authName: string) {
    return DB.authMap[authName] && !DB.authMap[authName].banned;
  },
};
export default runtimeDB;
