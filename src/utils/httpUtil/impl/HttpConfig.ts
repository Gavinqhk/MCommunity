import { getSession } from "@utils/localStorageUtil";
import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { HttpConfigInterface } from "../interface/HttpConfigInterface";
import router from "@router/index";
import { Message } from "element-ui";
const config: HttpConfigInterface = {
  requestInterceptor: (config: any) => {
    // do something before request is sent
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const token = getSession("token");
    // const token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDc3NzI0ODI4NjEsInBheWxvYWQiOiJcIjk0OTA5NTU0N0BxcS5jb21cIiJ9.-crI7fibUOzjOK33oE8nRMnuRc0zeMoebmNq1aQIdo4";
    config.headers["Authorization"] = "Bearer admin=" + token;
    return config;
  },
  responseInterceptor: (res: IResponse) => {
    if (res.code === 401) {
      router.push({ name: "login" });
      return true;
    }
    return false;
  },
  errorHandler: (res: IResponse) => {
    Message.error(res.message);
  },
  baseURL: process.env.VUE_APP_API,
  timeout: 20000,
  withCredentials: false,
  ErrorArray: [
    { code: 9010100, msg: "用户不存在" },
    { code: 9010101, msg: "密码错误" },
    { code: 9010102, msg: "登出失败，预留错误码" },
    { code: 9010103, msg: "手机号已存在" },
    { code: 9010104, msg: "邮箱已存在" },
    { code: 9010200, msg: "部门不存在" },
    { code: 9010400, msg: "角色不存在" },
    { code: 403, msg: "没有权限" },
    { code: 404, msg: "找不到页面或接口" },
    { code: 500, msg: "服务器被外星人带走了！" },
    { code: 20107, msg: "请求参数异常！" },
    { code: 400, msg: "请求参数出错！" },
    { code: 9010200, msg: "部门不存在" },
    { code: 9010201, msg: "当前移动部门不是最新，重新请求后再移动" },
    { code: 9010201, msg: "部门人数不为 0 ，无法删除" },
  ],
};
export default config;
