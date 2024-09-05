import {createProdMockServer} from 'vite-plugin-mock/createProdMockServer'

interface IModuleType {
    default:any[];
}

const modules=import.meta.glob<IModuleType>('./**/*.ts',{eager:true});

const mockModules:any[]=[];
Object.keys(modules).forEach((key)=>{
    if(key.includes('/_')){
        return;
    }
    mockModules.push(...modules[key].default);
});

export function setupProdMockServer(){
    createProdMockServer(mockModules);
}