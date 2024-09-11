import { storage } from '@/utils/Storage';
import { defineStore} from 'pinia';
import { ref, computed,reactive } from 'vue';
import { ACCESS_TOKEN } from '@/stores/mutation-types';

export const useUserStore = defineStore('user',()=> {
    const state=reactive({
        token: storage.get(ACCESS_TOKEN),
        username: '',
        welcome: '',
        avatar: '',
        permissions: [],
        info: {},
    });  
    const getToken = computed(() => state.token); // 获取token
    function setToken(token: string) {
        state.token = token;
        const ex=7 * 24 * 60 * 60 * 1000;
        storage.set(ACCESS_TOKEN, token,ex);        
      }
    
    return {
        state,
        getToken,
        setToken,
    };
});

export function useUser(){
    return useUserStore();
}