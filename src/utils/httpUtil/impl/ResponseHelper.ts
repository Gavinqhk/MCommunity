import { IResponseHelper, IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { isEmpty, isString, walkArray } from "@utils/commonUtil";
import { CustomError } from "../interface/HttpConfigInterface";
import HttpConfig from "./HttpConfig";
const ErrorArray = HttpConfig.ErrorArray;

export class Response implements IResponse {
  code: number;
  status: boolean;
  message: string;
  data: any;
  origin: Record<string | number, any>;
  constructor(
    code: number,
    status: boolean,
    message: string,
    data: any,
    origin: Record<string | number, any>
  ) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
    this.origin = origin;
  }

  public setMessage(msg: string): IResponse {
    this.message = msg;
    return this;
  }

  public setData(data: any): IResponse {
    this.data = data;
    return this;
  }
}
function walkErrorArray(handler: any, context?: any): void {
  walkArray(ErrorArray, handler, context);
}
class ResponseHelper implements IResponseHelper {
  public getMessage(res: any): string {
    let msg: string = res.message;
    const code: number = this.getCode(res);
    walkErrorArray(function (item: CustomError) {
      if (item.code == code) {
        msg = item.msg;
        return true;
      }
    });
    return msg || "请求出错";
  }

  public getCode(res: any): number {
    return res.status ? res.status : res.code;
  }

  public getData(response: any): any {
    let data: any = response.data;
    if (isString(data) && data) {
      try {
        response.data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (isEmpty(data)) {
      data = {};
    }
    return data;
  }

  public isSuccess(res: any): boolean {
    return this.getCode(res) === 200;
  }

  public getResponse(res: any): IResponse {
    res = this.getResponseData(res);
    let status = false;
    const code: number = this.getCode(res);
    const data: any = this.getData(res);
    const message: string = this.getMessage(res);
    if (this.isSuccess(res)) {
      status = true;
    } else {
      status = false;
    }
    return new Response(code, status, message, data, res);
  }
  public getResponseData(res: any) {
    return res.data;
  }
  public getResponseFromError(error: any): IResponse {
    let status = false;
    const code: number = error.status ? error.status : error.code;
    const data: any = this.getData(error);
    const message: string = this.getMessage(error);
    if (this.isSuccess(error)) {
      status = true;
    } else {
      status = false;
    }
    return new Response(code, status, message, data, error);
  }
}
const responseHelper = new ResponseHelper();
export default responseHelper;
