import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import type {IModuleType} from './types';
import { layout, ParentLayout } from './constant';
import axios from 'axios';






const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...list, ...modList];
}, []);

const sortRoute=(a,b)=> (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);

routeModuleList.sort(sortRoute);


export const constantRouter:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: layout,
    children:[
      {
        path: 'about',
        name: 'about',
        component: ()=>import('../views/AboutView.vue')
      }
    ]
  },
  ...routeModuleList
];
  
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRouter
})

const fetchRoutes = async () => {
  const res = await axios.get('/api/menu/list2');
  
  const routes = res.data.result.list;

    routes.forEach(route => {
      router.addRoute({
        path: route.path,
        name: route.name,
        //component: () => import(`../views/${route.component}.vue`) // 动态加载组件
        component : ()=>import(`${route.component}`),
      });
    });
}
//fetchRoutes();

console.log(`路由列表,`,router.getRoutes());

export function setupRouter(app:App) {
  app.use(router);
  
}

export default router
