<script setup lang="ts">

import { ref,reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PersonOutline,LockClosedOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import axios from 'axios';



const router = useRouter();
const formRef=ref();
const loading = ref(false);
const message = useMessage();
const formInline=reactive({
    username:'',
    password:'',
});
const rules={
    username:{required:true,message:'請輸入必須數據 - 用戶名稱',trigger:'blur'},
    password:{required:true,message:'請輸入必須數據 - 密碼',trigger:'blur'}
}
interface FormState {
    username: string;
    password: string;
    securitycode:string;
    expire:number;
    permission:number;
  }

const handleSubmit=(e)=>{
    e.preventDefault();
    formRef.value?.validate(async(errors) => {
        if (!errors) {
            message.loading('登入中...');
            loading.value = true;
            const params:FormState={
                username:formInline.username,
                password:formInline.password,
                securitycode:'',
                expire:0,
                permission:0
            }
            try{
               
                message.destroyAll();
                 const res=await axios.post('http://10.164.90.208:8001/api/login',
                 {
                        username:formInline.username,
                        password:formInline.password,
                        securitycode:'',
                        expire:0,
                        permission:0
                    },
                    { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    );
                if(res.status==200){
                    message.success('登入成功');
                    router.push('/');
                }
                console.log('res',res);
            }catch(err){
                console.log('error',err);
                loading.value = false;
                message.info(err.response.data || '登入失敗'); 
            } finally{
                loading.value = false;
            }
        }else {
            message.error('請輸入用戶名稱與密碼');
        }
    });
};

</script>

<template>
    <div class="view-account">
        <div class="view-account-header"></div>
        <div class="view-account-container">
            <div class="view-account-top">
                <div class="view-account-top-logo">Green Product Management System</div>
                <div class="view-account-top-desc">
                    
                </div>
            </div>
            <div class="view-account-form">
                <div class="login-box-msg">
                            登入系統
                </div>
                <n-form ref="formRef" :model="formInline" :rules="rules"
                size="large" label-placment="left"
                >
                    <n-form-item  path="username">
                        <n-input v-model:value="formInline.username" placeholder="用戶名稱">
                            <template #prefix>
                                <n-Icon size="18" color="#808695">
                                    <PersonOutline />
                                </n-Icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input type="password" v-model:value="formInline.password" 
                        showPasswordOn="click"
                        placeholder="密碼">
                            <template #prefix>
                                <n-Icon size="18" color="#808695">
                                    <LockClosedOutline />
                                </n-Icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item>
                        <n-button type="primary" size="large" @click="handleSubmit" :loading="loading" block>
                            登入
                        </n-button>
                    </n-form-item>
                   
                </n-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.n-form-item {
    grid-template-rows: 1fr 1fr 1fr;
    height: 80px;
}
.login-box-msg{
    margin: 0;
    text-align: center;
}
.view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;  

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-logo {
        font-size: larger;
        font-weight: bolder;
        color: green;
      }

      &-desc {
        font-size: large;
        color: green;
      }
    }

    &-form {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
}

@media (min-width: 768px) {

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }

</style>