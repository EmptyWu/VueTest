import type{Plugin,PluginOption} from 'vue';
import Components from 'unplugin-vue-components/vite';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers';

import vue from '@vitejs/plugin-vue';
//import vueJsx from '@vitejs/plugin-vue-jsx';


import { configMockPlugin } from './mock';


export function createVitePlugins(ViteEnv:ViteEnv,isBuild:boolean,prodMock){
    const {VITE_USE_MOCK} =ViteEnv;

    const vitePlugins:(Plugin | Plugin[]|PluginOption[])[]=[
        vue(),
//        vueJsx(),
        Components({
            dts:true,
            resolvers:[NaiveUiResolver()],
        })

    ];
    
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild,prodMock));

    return vitePlugins;
}