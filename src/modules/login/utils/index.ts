//service以整体对象导出的写法，不利于 treeshaking;
// import service from "../service";

import { getSession, setSession } from "@utils/localStorageUtil";
import * as service from "../service";
import { isEmpty, trim } from "@utils/commonUtil";
export function getService() {
  return service;
}

export function getLocalStorage() {
  return {
    getSession,
    setSession,
  };
}

export const loginUtil = {
  getLocalStorage,
  isEmpty,
  trim,
};
