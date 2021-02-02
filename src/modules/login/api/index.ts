//当一个模块接口比较多，且都比较常用时可以用这种方法，一对象的形式整体导出，但不利于tree shaking
// import * as httpUtil from "@utils/httpUtil";
// const interfaces: Array<Record<string, any>> = [
//   {
//     //desc: "获取主页数据",
//     method: "post",
//     name: "login",
//     url: "/user/login",
//   },
// ];

// function exportsRender(interfacesArr: Array<Record<string, any>>) {
//   const resultExports: Record<string, any> = {};
//   interfacesArr.map((item: Record<string, any>) => {
//     resultExports[item.name] = (data: Record<string | number, any>,config?: Record<string | number, any>) => {
//       return (httpUtil as Record<string, any>)[item.method](item.url, data,config);
//     };
//   });
//   return resultExports;
// }

// export default exportsRender(interfaces);

//有利于tree shaking
import { post } from "@/utils/httpUtil";

export function loginApi(
  data: Record<string | number, any>,
  config?: Record<string | number, any>
) {
  return post("/user/login", data, config);
}
