import { resultSuccess } from "../_util";
import i18n from '../../src/i18n/index';
const {t}=i18n.global
const menuList=()=>{
    const result:any[]=[
        {
            label: t('form'),
            key: 'form',
            type: 1,
            subtitle: 'form',
            openType: 1,
            auth: 'form',
            path: '/form',
        }
    ]
    return result;
};

export default [{
    url:'/api/menu/list',
    timeout:1000,
    method:'get',
    response:()=>{
        const list=menuList();
        return resultSuccess({list});
    },
}];