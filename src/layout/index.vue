<script setup lang="ts">
import { ref,h ,computed} from 'vue';
 import { NIcon } from 'naive-ui';
//import { NLayout, NLayoutSider, NLayoutContent, NMenu , NIcon } from 'naive-ui';
import type {Component} from 'vue';
import type { MenuOption } from 'naive-ui';
import{ RouterLink } from 'vue-router';
import {
    BagOutline as BagOutlineIcon,
    FishOutline as FishIcon,
    PawOutline as PawIcon,
    LogOutOutline as HomeIcon,
}from '@vicons/ionicons5';

import { useDialog, useMessage,useNotification,NAvatar } from 'naive-ui';
import type {NotificationType} from 'naive-ui';

const getDarkTheme=ref(false);
const collapsed= ref(false);
const activeKey:ref<string | null> =ref(null);
const leftMenuWidth = computed(()=>collapsed.value ? '64px' : '200px');
const renderIcon=(icon:Component)=> ()=>  h(NIcon, null, {default: () => h(icon)});


const menuOptions: MenuOption[] = [
  {
    label: '鱼',
    key: 'fish',
    icon: renderIcon(FishIcon),
    children: [
      {
        label: '红烧',
        key: 'braise',
        children: [
          {
            label: '加辣',
            key: 'spicy'
          }
        ]
      },
      {
        label: '清蒸',
        key: 'steamed',
        children: [
          {
            label: '不要葱',
            key: 'no-green-onion'
          }
        ]
      }
    ]
  },
  {
    label: '熊掌',
    key: 'bear-paw',
    icon: renderIcon(PawIcon),
    children: [
      {
        label: '保护野生动物',
        key: 'protect-wild-animals'
      }
    ]
  },
  {
    label: ()=>h(RouterLink,{to:{name:'about',params:{lang:'en'}}},
        {default:()=>h('span','About')}
    ),
    key: 'about',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '两个都要',
    key: 'both',
    icon: renderIcon(BagOutlineIcon),
    children: [
      {
        label: '鱼和熊掌不可兼得',
        key: 'can-not'
      }
    ]
  }
]

const dialog = useDialog();
const message = useMessage();
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

const info=()=>{
  message.info('info',{keepAliveOnHover:true});
};

</script>
<template>
    <nSpace vertical>
        <nLayout has-sider class="layout" position="absolute">
            <nLayoutSider 
            
            bordered
            :collapsed-width="64" 
            class="layout-sider"
            show-trigger="bar"
            :width="leftMenuWidth"
            collapsed-mode="width"
            :collapsed="collapsed"
            @collapse="collapsed = true"
            @expand="collapsed = false"
            >
                <div class="logo">
                    <img src="./material.svg" alt="material"  srcset="">
                    <h2  v-show="!collapsed">manuheader</h2>
                </div>
                <nMenu 
                
                v-model:value="activeKey"
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
                accordion />
            </nLayoutSider>
            <nLayout has-sider>
                    <nLayoutHeader :inverted="getDarkTheme" >
                        header
                    </nLayoutHeader>
                    <nLayoutSider :inverted="getDarkTheme" class="layout-content">
                        <RouterView  />
                        <n-button @click="handleConfirm">
                          警告
                        </n-button>
                        <n-button @click="notify('success')">
                          成功
                        </n-button>
                        <n-button @click="info">
                          信息（Hover不消失）
                        </n-button>
                        <nSpace><nSwitch size="large" v-model:value="getDarkTheme" />inverted </nSpace>
                        <div class="layout-content-main layout-content-main-fix fluid-header">
                            內容
                            123
                            collapsed: {{ collapsed }}
                        <BR />
                        activeKey:{{ activeKey }}
                     
                        </div>
                    </nLayoutSider>
                
            </nLayout>
        </nlayout>
    </nSpace>
</template>
<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 64px;
    padding: 12px 24px 12px 24px;
    font-size: 12px;
}
.logo img {
    width: 30px;
    height: 30px;
}
.layout-content {
      flex: auto;
      min-height: 100vh;
      min-width: 100vw;
    }
</style>