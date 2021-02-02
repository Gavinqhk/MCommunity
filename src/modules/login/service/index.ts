/*
负责管理除UI之外的所有所有非响应式数据和不跟ui有关的逻辑处理层，api请求及api请求会的响应数据处理。尽量在具体的vue实例里只负责拿到数据，
再经过一个ui框架和数据之间的一个适配方法如util里的elementDataAdaptor里的方法就可以将数据渲染到页面上。
*/
//一整个对象形式导出，方便但不利于tree shaking
// import api from "../api";
// import { extend} from "@/utils/commonUtil";
// import {Response} from "@dataTypes/impl/ResponseHelper";
// const moduleService: Record<string | number, any> = {
//   name: "login", //名字与模块的文件夹名字保持一致
//   login(identity:string, password:string) {
//     let params:Record<string | number, string>= {};
//     params.identity = identity;
//     params.password = password;
//     return api.login(params).then(function(response:Response){
//       return Promise.resolve(response.data.token);
//     }).catch(function (response:Response){
//       return Promise.reject(response.data.message);
//     });
//   },
// };
// extend(moduleService, api,false,false);
// export default moduleService;

/**有利于tree shaking */
import { IResponse } from "@utils/httpUtil/interface/ResponseHelper";
import { loginApi } from "../api";
import { setSession } from "@utils/localStorageUtil";
export const name = "login"; //名字与模块的文件夹名字保持一致

/**登录api的数据处理 */
export function login(identity: string, password: string, callBack: Function, context?: any) {
  const params: Record<string | number, string> = {};
  params.identity = identity;
  params.password = password;
  return loginApi(params, {
    validator: function (response: IResponse) {
      const token = response.data.token;
      if (token) {
        return true;
      } else {
        response.message = "登录失败!";
        return false;
      }
    },
  })
    .then(function (response: IResponse) {
      const token = response.data.token;
      setSession("token", token);
      callBack && callBack.call(context);
    })
    .catch(function () {}); // eslint-disable-line
}
// /**登录api的数据处理 以下方式要求 最终要有个Page层catch方法，不然控制台会有error*/
// export function login(identity: string, password: string) {
//   let params: Record<string | number, string> = {};
//   params.identity = identity;
//   params.password = password;
//   return loginApi(params, {
//     validator: function (response: IResponse) {
//       let token = response.data.token;
//       if (token) {
//         return true;
//       } else {
//         response.message = "登录失败!";
//         return false;
//       }
//     },
//   })
//     .then(function (response: IResponse) {
//       let token = response.data.token;
//       setSession("token", token);
//       return Promise.resolve(token);
//     })
//     .catch(function (response: IResponse) {
//       return Promise.reject(response.data.message);
//     });
// }
