export interface IResponse {
  code: number;
  status: boolean;
  message: string;
  data: any;
}

export interface IResponseHelper {
  getMessage(res: any): string;
  getCode(res: any): number;
  getData(response: any): any;
  isSuccess(res: any): boolean;
  getResponse(res: any): IResponse;
  getResponseFromError(error: any): IResponse;
}
