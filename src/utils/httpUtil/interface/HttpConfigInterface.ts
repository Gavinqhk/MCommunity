import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
export interface CustomError {
  code: number;
  msg: string;
}
export interface HttpConfigInterface {
  requestInterceptor: (config: any) => void;
  responseInterceptor: (res: IResponse) => boolean;
  errorHandler: (res: IResponse) => void;
  validator?: (res: IResponse) => boolean; //当http请求状态码时正常的时候全局统一的数据校验拦截;
  baseURL: string;
  timeout: number;
  withCredentials: false;
  ErrorArray: Array<CustomError>;
}
