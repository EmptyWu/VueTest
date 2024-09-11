import { createI18n} from 'vue-i18n'
import zhTw from './locales/zhTw';
import en from './locales/en';
import ja from './locales/ja';

type MessageSchema = typeof zhTw;

const i18n=createI18n<[MessageSchema], 'zh-TW' | 'en-US'|'ja'>({
    legacy:false,
    locale:'zh-TW',
    fallbackLocale:'zh-TW',
    globalInjection:true,
    messages:{
        'zh-TW': zhTw,
        'en-US': en,
        'ja-JP':ja
    }
});

export default i18n;