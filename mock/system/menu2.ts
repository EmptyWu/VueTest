import { resultSuccess } from "../_util";
//import {useI18n} from 'vue-i18n'
//const {t}=useI18n()
const menuList=()=>{
    const result:any[]=[
        {
            label: '表單',
            key: 'form',
            type: 1,
            subtitle: 'form',
            openType: 1,
            auth: 'form',
            path: '/form',
            component:'HomeView'
        },{
            label: '關於我們',
            key: 'about',
            type: 1,
            subtitle: 'about',
            openType: 1,
            auth: 'about',
            path: '/about',
            component:'../views/AboutView.vue'
        },{
           label: 'layout',
           key: 'layout',
           type: 1,
           subtitle: 'layout',
           openType: 1,
           auth: 'layout',
           path: '/layout',
           component:'../layout/index.vue'
        }
    ]
    return result;
};

export default [{
    url:'/api/menu/list2',
    timeout:1000,
    method:'get',
    response:()=>{
        const list=menuList();
        return resultSuccess({list});
    },
}];