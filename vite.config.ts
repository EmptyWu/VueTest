import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {createVitePlugins} from './build/vite/plugin';
import {configMockPlugin} from './build/vite/plugin/mock'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig(({command,mode})=>{
  const isBuild = command === 'build';
  const prodMock = mode === 'production';
  return {
    plugins: [
      vue(),
      vueJsx(), // 使用正确的 JSX 插件
      // ...createVitePlugins({ VITE_USE_MOCK: true }, isBuild, prodMock),
       configMockPlugin(isBuild, prodMock),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});