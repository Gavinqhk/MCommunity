import {
  createDEL as $createDEL,
  createGET as $createGET,
  createPATCH as $createPATCH,
  createPOST as $createPOST,
  createPUT as $createPUT,
  createService as $createService,
} from "./impl/createInstance";
import httpConfig from "./impl/HttpConfig";
const { service, request } = $createService(httpConfig);
const getMethod = $createGET(request);
export const defaultInstance = service;
export const get = getMethod;

const delMethod = $createDEL(request);
export const del = delMethod;
const postMethod = $createPOST(request);
export const post = postMethod;
const putMethod = $createPUT(request);
export const put = putMethod;

const patchMethod = $createPATCH(request);
export const patch = patchMethod;

export const createDEL = $createDEL;
export const createGET = $createGET;
export const createPATCH = $createPATCH;
export const createPOST = $createPOST;
export const createPUT = $createPUT;
export const createService = $createService;
