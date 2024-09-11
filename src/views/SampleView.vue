<script setup lang="ts">
import { useMessage, useDialog, useNotification } from 'naive-ui'
import { dateZhTW, zhTW,enUS } from 'naive-ui'
import { NDateLocale, NLocale } from 'naive-ui'
import type { NotificationType } from 'naive-ui';
import {ref} from 'vue';
import { useI18n } from 'vue-i18n';
const dialog = useDialog();
const message = useMessage();
const {locale }=useI18n();
console.log(locale.value);

const info=()=>{
  message.info('info',{keepAliveOnHover:true});
};
const handleConfirm = () => {
  dialog.warning({
          title: '警告',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          onPositiveClick: () => {
            message.success('确定')
          },
          onNegativeClick: () => {
            message.error('不确定')
          }
        })
};
const notification = useNotification()

const notify = (type: NotificationType) => {
  notification[type]({
    content: '訊息',
    meta: '訊息內容',
    duration: 2500,
    keepAliveOnHover: true
  })
};

const localea = ref<NLocale>(zhTW);
const dateLocale = ref<NDateLocale>(dateZhTW);


</script>
<template>
   <n-button @click="handleConfirm">
                          警告
                        </n-button>
                        <n-button @click="notify('success')">
                          成功
                        </n-button>
                        <n-button @click="info">
                          信息（Hover不消失）
                        </n-button>
    
      <n-date-picker />
    
</template>
<style lang="scss" scoped>
</style>
