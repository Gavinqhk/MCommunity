import { HttpConfigInterface } from "../interface/HttpConfigInterface";
import ResponseHelper from "@/utils/httpUtil/impl/ResponseHelper";
import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { extend } from "@utils/commonUtil";
import axios from "axios";
export function createService(
  httpConfig: HttpConfigInterface
): { service: any; request: (option: Record<string | number, any>) => Promise<IResponse> } {
  const responseHelper = new ResponseHelper(httpConfig.ErrorArray);
  const service = axios.create({
    baseURL: httpConfig.baseURL, // url = base url + request url
    withCredentials: httpConfig.withCredentials, // send cookies when cross-domain requests
    timeout: httpConfig.timeout, // request timeout
  });
  // eslint-disable-next-line
  const emptyFunction = function () {};

  function responseHandler(res: IResponse) {
    if (httpConfig.responseInterceptor) {
      if (httpConfig.responseInterceptor(res)) {
        return new Promise(emptyFunction);
      }
    }
    if (res.status) {
      return res;
    } else {
      return Promise.reject(res);
    }
  }
  // 请求拦截
  // request interceptor
  service.interceptors.request.use(
    (config: any) => {
      // do something before request is sent
      httpConfig.requestInterceptor && httpConfig.requestInterceptor(config);
      return config;
    },
    (error: any) => {
      console.log("request-error:", error.response);
      const res = responseHelper.getResponseFromError(error.response);
      return responseHandler(res);
    }
  );
  // 响应拦截
  // response interceptor
  service.interceptors.response.use(
    (response: any): any => {
      const res = responseHelper.getResponse(response);
      return responseHandler(res);
    },
    (error: any) => {
      const res = responseHelper.getResponseFromError(error.response);
      return responseHandler(res);
    }
  );
  function request(option: Record<string | number, any>): Promise<IResponse> {
    return service(option)
      .then(
        (res: any): Promise<IResponse> => {
          if (option.validator && option.validator(res) != true) {
            return Promise.reject(res);
          }
          return Promise.resolve(res);
        }
      )
      .catch(
        (err: IResponse): Promise<IResponse> => {
          if (option.ignoreError != true) {
            httpConfig.errorHandler(err);
          }
          return Promise.reject(err);
        }
      );
  }
  return { service, request };
}
export function createGET(
  request: (option: Record<string | number, any>) => Promise<IResponse>
): (url: string, data?: any, config?: Record<string | number, any>) => Promise<IResponse> {
  return function get(
    url: string,
    data?: any,
    config?: Record<string | number, any>
  ): Promise<IResponse> {
    const option = {
      url,
      method: "get",
      params: data || {},
    };
    extend(option, config);
    return request(option);
  };
}

export function createPOST(
  request: (option: Record<string | number, any>) => Promise<IResponse>
): (url: string, data?: any, config?: Record<string | number, any>) => Promise<IResponse> {
  return function post(
    url: string,
    data?: any,
    config?: Record<string | number, any>
  ): Promise<IResponse> {
    const option = {
      url,
      method: "post",
      data: data || {},
    };
    extend(option, config);
    return request(option);
  };
}

export function createPUT(
  request: (option: Record<string | number, any>) => Promise<IResponse>
): (url: string, data?: any, config?: Record<string | number, any>) => Promise<IResponse> {
  return function put(
    url: string,
    data?: any,
    config?: Record<string | number, any>
  ): Promise<IResponse> {
    const option = {
      url,
      method: "put",
      data: data || {},
    };
    extend(option, config);
    return request(option);
  };
}
export function createDEL(
  request: (option: Record<string | number, any>) => Promise<IResponse>
): (url: string, data?: any, config?: Record<string | number, any>) => Promise<IResponse> {
  return function del(
    url: string,
    data?: any,
    config?: Record<string | number, any>
  ): Promise<IResponse> {
    const option = {
      url,
      method: "delete",
      params: data || {},
    };
    extend(option, config);
    return request(option);
  };
}
export function createPATCH(
  request: (option: Record<string | number, any>) => Promise<IResponse>
): (url: string, data?: any, config?: Record<string | number, any>) => Promise<IResponse> {
  return function patch(
    url: string,
    data?: any,
    config?: Record<string | number, any>
  ): Promise<IResponse> {
    const option = {
      url,
      method: "patch",
      data: data || {},
      headers: { "Content-Type": "x-www-form-urlencoded" },
    };
    extend(option, config);
    return request(option);
  };
}
