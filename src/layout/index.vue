<script setup lang="ts">
import { ref,h ,computed,inject } from 'vue';
 import { NIcon,NButton } from 'naive-ui';
//import { NLayout, NLayoutSider, NLayoutContent, NMenu , NIcon } from 'naive-ui';
import {Component} from 'vue';
import type { MenuOption } from 'naive-ui';
import{ RouterLink } from 'vue-router';
import {
    BagOutline as BagOutlineIcon,
    FishOutline as FishIcon,
    PawOutline as PawIcon,
    LogOutOutline as HomeIcon,
    Language,
    Person,
}from '@vicons/ionicons5';

import {FileInvoice,
  GripHorizontal,
  Database,
  ProductHunt,
  Industry,
  Vials,
  Atom,
  Stroopwafel,
  JournalWhills,
  Atlas,
  Tools,UserTie,UserShield,Cogs,MailBulk,ClipboardList,ClipboardCheck,FileAlt
  ,Bars
} from '@vicons/fa';

import { useI18n } from 'vue-i18n';

import { useUserStore } from '@/stores/modules/user';
const userStore= useUserStore();

userStore.setToken('1234567890');

console.log('token',userStore.getToken);

const {currentLocale,toggleLocale} =inject('locale');
 
const {t,locale}=useI18n()

const getDarkTheme=ref(false);
const collapsed= ref(false);
const activeKey:ref<string | null> =ref(null);
const leftMenuWidth = computed(()=>collapsed.value ? '64px' : '250px');
const renderIcon=(icon:Component)=> ()=>  h(NIcon, null, {default: () => h(icon)});


const menuOptions: MenuOption[] = [
  {
    label:()=>h(
      RouterLink,
      {to:{name:'Sample'}},
      {default:()=>h('span',t('Sample'))}
    ),
    key:'Sample',
    icon: renderIcon(BagOutlineIcon),
  },
  {
    label:()=>h(
      RouterLink,
      {to:{name:'viewrohsproductlist'}},
      {default:()=>h('span','料號資料審核')}
    ),
    key:'Grip',
    icon: renderIcon(GripHorizontal),
  },
  {
    label: '檢測報告審核',
    key: 'fish',
    icon: renderIcon(FileInvoice),
  },
  {
    label: '基本資料設定',
    key: 'Database',
    icon: renderIcon(Database),
    children: [
      {
        label: '料號資料',
        key: 'ProductHunt',
        icon: renderIcon(ProductHunt)
      },
      {
        label: '廠商資料',
        key: 'Industry',
        icon: renderIcon(Industry)
      },
      {
        label: '實驗室資料',
        key: 'Vials',
        icon: renderIcon(Vials)
      },
      {
        label: '化學元素資料',
        key: 'Atom',
        icon: renderIcon(Atom)        
      },
      {
        label: '材質資料',
        key: 'Stroopwafel',
        icon: renderIcon(Stroopwafel)
      },
      {
        label: '法規資料',
        key: 'JournalWhills',
        icon: renderIcon(JournalWhills)
      },
      {
        label: '法規材質資料',
        key: 'Atlas',
        icon: renderIcon(Atlas)
      }
    ]
  },
  {
    label: '系統管理',
    key: 'Tools',
    icon: renderIcon(Tools),
    children: [
      {
        label: '系統管理者',
        key: 'UserTie',
        icon: renderIcon(UserTie)
      },{
        label: '權限等級',
        key: 'UserShield',
        icon: renderIcon(UserShield)
      },
      {
        label: '系統定義表',
        key: 'Cogs',
        icon: renderIcon(Cogs)
      },{
        label: '寄發郵件',
        key: 'MailBulk',
        icon: renderIcon(MailBulk)
      },{
        label: '系統操作(紀錄)',
        key: 'ClipboardList',
        icon: renderIcon(ClipboardList)
      },{
        label: '系統歷程(紀錄)',
        key: 'ClipboardCheck',
        icon: renderIcon(ClipboardCheck)
      },{
        label: '報告資料',
        key: 'FileAlt',
        icon: renderIcon(FileAlt)
      }
    ]
  },

]

const handleBars=()=>{
  collapsed.value=!collapsed.value;
};

const options=ref([{
  label:'繁體中文',
  key:'zh-TW',
  
},{
  label:'English',
  key:'en-US',
  
},{
  label:'日本語',
  key:'ja-JP',
}]);

const changLang=(key:string)=>{
  locale.value=key;  
  toggleLocale(key);
};

const person=ref([{
  label: '管理員',
    icon:renderIcon(Person),
    key: 'man'
  },{
    type: 'divider',
    key: 'd1'
  },{
    label:()=>h(NButton,
    { type:'success',
      tertiary :true,
      renderIcon:()=>h(HomeIcon),
      onclick:()=>{
        console.log('登出');
      }
    },
    {default:()=>'登出'}),
  }
]);


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
            <nLayout>
                    <nLayoutHeader :inverted="getDarkTheme" >
                        <n-flex justify="space-between" align="center">
                          <nIcon :component="Bars" @click="handleBars" size="20" style="cursor: pointer;"></nIcon>
                          <n-flex justify="center">
                            <n-dropdown :options="options" trigger="hover" @select="changLang">
                              <n-button> <n-icon :component="Language" /></n-button>
                            </n-dropdown>
                            <n-dropdown :options="person" trigger="hover">
                              <n-button> <n-icon :component="Person" /></n-button>
                            </n-dropdown>
                          </n-flex>
                        </n-flex>
                    </nLayoutHeader>
                    <nLayoutContent content-style="padding: 24px;">
                    
                        <RouterView  />
                  
                    
                  </nLayoutContent>
                
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
      min-width: 80vw;
    }
.n-layout-header,
.n-layout-footer {
  -background: rgba(128, 128, 128, 0.2);
  padding: 16px;
}


</style>