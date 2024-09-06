import type {RouteRecordRaw} from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/AboutView.vue'),
        meta :{
            sort:9,
            title:'關於我們',
        },
    }
];

export default routes;