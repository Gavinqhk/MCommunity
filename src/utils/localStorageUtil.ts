import storage from "good-storage";
import Cookies from "js-cookie";

import { isEmpty } from "./commonUtil";
/**
 * 本地存储工具
 *
 */
export enum scopeNameMap {
  session = "session",
  cookie = "cookie",
}

interface Option {
  scopeName: scopeNameMap;
  prefix?: string;
  default?: any;
}
const config = {
  prefix: "aiwen",
};

/**
 *
 * 获取符合本地存储规则的key,类内部调用的方法，禁止外部调用
 * @param {*} key
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _getKey(key: string, option?: Option): any {
  if (option && !isEmpty(option.prefix)) {
    key = config.prefix + key;
  }
  return key;
}

/**
 *
 *
 * @param {*} key
 * @param {*} val
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _set(key: string, val: any, option?: Option) {
  key = _getKey(key, option);
  getScope(option).set(key, val);
}

/**
 *
 *
 * @param {*} key
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _get(key: string, option?: Option): any {
  key = _getKey(key, option);
  return getScope(option).get(key);
}

/**
 *
 *
 * @param {*} key
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _remove(key: string, option?: Option) {
  key = _getKey(key, option);
  getScope(option).remove(key);
}

/**
 *
 *
 * @param {*} key
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _has(key: string, option?: Option): boolean {
  key = _getKey(key, option);
  return getScope(option).has(key);
}
/**
 *
 *
 * @param {*} callBack
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _forEach(callBack: any, option?: Option): void {
  getScope(option).forEach(callBack);
}

/**
 *
 *
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _clear(option?: Option): void {
  getScope(option).clear();
}

/**
 *
 *
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
function _getAll(option?: Option): Array<any> {
  return getScope(option).getAll();
}

/**
 *
 *
 * @param {*} scopeName
 * @param {*} option
 * @return {*}
 * @memberof LocalStorageUtil
 */
export function getScope(option?: Option) {
  if (!option || isEmpty(option.scopeName)) {
    return storage;
  } else {
    const scopeName = option.scopeName;
    if (scopeName == scopeNameMap.cookie) {
      return Cookies;
    } else if (storage[scopeName]) {
      return storage[scopeName];
    } else {
      console.error("scopeName ", scopeName, " is not defined!");
    }
  }
}

export function forEach(callback: any, option?: Option) {
  return _forEach(callback, option);
}

/**
 *
 * 将key：val存储到本地存储系统中，默认添加到localStorage中
 * @param {string} key
 * @param {*} val
 * @param {Option} [option]
 * @return {*}  {LocalStorageUtil}
 * @memberof LocalStorageUtil
 */
export function set(key: string, val: any, option?: Option): void {
  return _set(key, val, option);
}

export function get(key: string, option?: Option): any {
  return _get(key, option);
}

export function remove(key: string, option?: Option) {
  return _remove(key, option);
}

export function has(key: string, option?: Option): boolean {
  return _has(key, option);
}

export function clear(option?: Option): void {
  return _clear(option);
}

export function getAll(option?: Option): Array<any> {
  return _getAll(option);
}

/**
 *
 * 将key：val存储到sessionStorage中
 * @param {string} key
 * @param {*} val
 * @return {*}  {LocalStorageUtil}
 * @memberof LocalStorageUtil
 */
export function setSession(key: string, val: any): void {
  return _set(key, val, { scopeName: scopeNameMap.session });
}

/**
 *
 * 从sessionStorage 获取某个key所对应得值
 * @param {string} key
 * @param {*} [def] //当没有数据时，返回默认值
 * @return {*}  {*}
 * @memberof LocalStorageUtil
 */
export function getSession(key: string, def?: any) {
  return _get(key, { scopeName: scopeNameMap.session, default: def });
}

/**
 *
 * 判断session中是否含有某个key
 * @param {string} key
 * @return {*}  {boolean}
 * @memberof LocalStorageUtil
 */
export function hasSession(key: string): boolean {
  return _has(key, { scopeName: scopeNameMap.session });
}

/**
 *
 * 从sessionStorage 中移除某个key
 * @param {string} key
 * @return {*}  {LocalStorageUtil}
 * @memberof LocalStorageUtil
 */
export function removeSession(key: string): void {
  return _remove(key, { scopeName: scopeNameMap.session });
}

/**
 *
 * 清除sessionStorage 中的所有数据
 * @return {*}  {LocalStorageUtil}
 * @memberof LocalStorageUtil
 */
export function clearSession(): void {
  return _clear({ scopeName: scopeNameMap.session });
}

export function setCookie(key: string, value: any): void {
  _set(key, value, { scopeName: scopeNameMap.cookie });
}

export function getCookie(key: string): any {
  return _get(key, { scopeName: scopeNameMap.cookie });
}

export function removeCookie(key: string): void {
  return _remove(key, { scopeName: scopeNameMap.cookie });
}
