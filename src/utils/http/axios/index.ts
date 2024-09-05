import {CreateAxiosOptions} from './types';
function createAxios(opt?:Partial<CreateAxiosOptions>){
    return new Vaxios();
}

export const http=createAxios();