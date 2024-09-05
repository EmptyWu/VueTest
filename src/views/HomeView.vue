<script setup lang="ts">
import {ref,onMounted} from 'vue';
import axios from 'axios';
import type {AxiosResponse} from 'axios';
import TheWelcome from '../components/TheWelcome.vue'
import {useI18n} from 'vue-i18n'

const {locale}=useI18n()

const handleChangeLanguage =(e)=>{
  locale.value=e.target.value;
  console.log(e.target.value);
};

const testmenu=()=>{
  const res=axios.get('/api/menu/list');
  console.log(res);
};

onMounted(()=>{
  //testmenu();
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
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
