<script setup lang="ts">
import { ref,onMounted,computed} from 'vue';
import axios from 'axios';

import TheWelcome from '../components/TheWelcome.vue'
import {useI18n} from 'vue-i18n'
import i18n from '@/i18n/index';
import { NSpace,NButton,NDialogProvider,useOsTheme,darkTheme  } from 'naive-ui';


const {locale}=useI18n()

const handleChangeLanguage =(e)=>{
  locale.value=e.target.value;
  //console.log(e.target.value);
};

const testmenu=()=>{

  const res= axios.get(`/api/menu/list?locale=${locale.value}`).then(res=>{
    const list =res.data.result;
    i18n.global.locale=locale.value;
    //console.log(i18n.global.locale);
    console.log(list);
  });  
};

const handleError=()=>{
  // dialog.error({
  //         title: '错误',
  //         content: '错了',
  //         positiveText: '啊',
  //         onPositiveClick: () => {
  //           message.success('我就知道')
  //         }
  //       });
};
const osThemeRef=useOsTheme();

const theme=computed(()=>(osThemeRef.value==='daek'?darkTheme:null));

const osTheme=osThemeRef;

onMounted(()=>{
  //handleError();
  //testmenu();
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
  <div>
    <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary" round>
      Tertiary
    </n-button>
    <n-button type="primary">
      Primary
    </n-button>
    <n-button type="info">
      Info
    </n-button>
    <n-button type="success">
      Success
    </n-button>
    <n-button type="warning">
      Warning
    </n-button>
    <n-button type="error">
      Error
    </n-button>
  </n-space>
  </div>
  Theme:{{ osTheme }}
  <div>
    切換語言:
    <select @change="handleChangeLanguage">
      <option value="zh-TW">中文</option>
      <option value="en-US">English</option>
      <option value="ja">日文</option>
    </select>
    <button type="button" @click="testmenu">取得menu</button>
  </div>
  <p>
    {{ $t('hellow',{msg:'XXX'}) }}
  </p>
  
</template>
