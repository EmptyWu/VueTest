<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppProvider } from './components/Application';
import {zhTW,dateZhTW,enUS,jaJP,dateEnUS,dateJaJP } from 'naive-ui';
import { ref,provide } from 'vue';

const currentLocale = ref(zhTW); // 預設為中文
const currentDateLocale = ref(dateZhTW); // 預設為中文
const toggleLocale = (key:string) => {
  console.log(`currentLocale:${key}`);
  if(key==='en-US'){
    currentLocale.value = enUS;
    currentDateLocale.value = dateEnUS;
  }else if(key==='zh-TW'){
    currentLocale.value = zhTW;
    currentDateLocale.value = dateZhTW;
  }else if(key==='ja-JP'){
    currentLocale.value = jaJP;
    currentDateLocale.value = dateJaJP;
  }
  
};

provide('locale',{
  currentLocale,
  toggleLocale
});
</script>

<template>
  <n-config-provider
  :locale="currentLocale"
  :date-locale="currentDateLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<style scoped>

</style>
