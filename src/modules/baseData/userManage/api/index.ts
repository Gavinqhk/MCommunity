import * as httpUtil from "@/utils/httpUtil";

const interfaces: Array<Record<string, any>> = [
  {
    //desc: "获取主页数据",
    method: "get",
    name: "getHomeData",
    url: "/home/getHomeData",
  },
];

function exportsRender(interfacesArr: Array<Record<string, any>>) {
  const resultExports: Record<string, any> = {};
  interfacesArr.map((item: Record<string, any>) => {
    resultExports[item.name] = (data: Record<string | number, any>) => {
      return (httpUtil as Record<string, any>)[item.method](item.url, data);
    };
  });
  return resultExports;
}

export default exportsRender(interfaces);
