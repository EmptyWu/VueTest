import {AxiosRequestConfig} from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig{
    transform?:AxiosTransform;
    requestOptions?:RequestOptions;
    authenticationScheme?:string;
}

export interface RequestOptions{
    formatDate?:boolean;
    isShowMessage?:boolean;
    isParseToJson?:boolean;
}

export interface Result<T=any>{
    code:number;
    type?:'success' | 'error' |'warning';
    message:string;
    result?:T;
}