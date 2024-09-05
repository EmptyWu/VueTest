import type {AxiosRequestConfig,AxiosResponse} from 'axios';
import { CreateAxiosOptions, RequestOptions,Result } from "./types";

export abstract class  AxiosTransform {
    beforeRequestHook?:(config:AxiosRequestConfig,options:RequestOptions)=>AxiosRequestConfig;
    transformRequestData?:(res:AxiosResponse<Result>,options:RequestOptions)=>any;
    requestCatch?:(e:Error)=>Promise<any>;
    requestInterceptors?:(config:AxiosRequestConfig,options:CreateAxiosOptions)=>AxiosRequestConfig;
    responseInterceptors?:(res:AxiosResponse<any>)=>AxiosResponse<any>;
    requestInterceptorsCatch?:(error:Error)=>void;
    responseInterceptorsCatch?:(error:Error)=>void;
}