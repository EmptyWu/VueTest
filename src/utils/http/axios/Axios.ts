import type { AxiosRequestConfig,AxionInstance,AxiosResponse} from 'axios';

import {isFunction} from '@/utils/is';

import axios from 'axios';
import { CreateAxiosOptions,RequestOptions,Result } from './types';

export class Vaxios{
    private axiosInstance:AxionInstance;
    private options:CreateAxiosOptions;

    constructor(options:CreateAxiosOptions){
        this.options=options;
        this.axiosInstance =axios.create(options);
        
    }

  
    /**
     * 
     * @param config 
     * @description 創建axios 實例
     */
    private createAxios(config:CreateAxiosOptions):void{
        this.axiosInstance=axios.create(config);
    }
    
    private getTransform(){
        const {transform}=this.options;
        return transform;
    }
}

