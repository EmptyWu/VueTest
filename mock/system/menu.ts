import { resultSuccess } from "../_util";
import i18n from '../../src/i18n/index';
//import {useI18n} from 'vue-i18n'
//const {t}=useI18n()
const menuList=(locale:string)=>{
    i18n.global.locale.value=locale;
    console.log(`Current Locale: ${i18n.global.locale.value}`);
    const result:any[]=[
        {
            label: ()=>i18n.global.t('form'),
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
    response:(config: any)=>{
        const locale = config.query.locale || 'en-US'; // 默认语言是 'en-US'
        const list=menuList(locale);
        return resultSuccess({list});
    },
}];