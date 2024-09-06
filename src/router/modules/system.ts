import type {RouteRecordRaw} from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: '/layout',
        name: 'layout',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/LayoutView.vue'), meta :{
            sort:1,
            title:'系統資訊',
        },
    }
];

export default routes;