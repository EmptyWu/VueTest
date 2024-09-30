<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import { NIcon, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import {Home} from '@vicons/ionicons5';
import type { DataTableColumns } from 'naive-ui';
import axios from 'axios';
interface Song {
  no: number
  title: string
  length: string
};
const columns: DataTableColumns<Song>=[
    {title: 'No',key: 'no'},
    {title: 'Title',key: 'title'},
    {title: 'Length',key: 'length'}
];


const dataRef = ref<Song[]>([]);

const paginationReactive  = reactive({
    page:1,
    pageCount: 1,
    pageSize: 10,
    prefix({ itemCount }) {
        return `Total is ${itemCount}.`
      }
});

const query=(page:number, pageSize: 10)=>async()=>{
    try{
        const res = await axios.post('https://localhost:54414/api/RoHSProduct',{
            pageIndex:page,
            pageSize:pageSize
        });
        let ProductData = res.data.data;
       
        const total = ProductData.pagination.totalrows;
        const pageCount = Math.ceil(total / pageSize);
        return {pageCount,data:ProductData.data,total};

    }catch (error){
        console.log(error);
    }
};

const handlePageChange = (currentPage: number) => {
    query(currentPage, paginationReactive .pageSize)()
    .then(result=>{
        const prosuctData:Song[]=result.data.map((item:any)=>({
            no:item.fid,
            title:item.廠商編號,
            length:item.料號
        }));
        dataRef.value=prosuctData;
        paginationReactive.page=currentPage;
        paginationReactive.pageCount = result.pageCount;
        paginationReactive.itemCount = result.total;
    }).catch(error => {
        
    });
}

const fetchRoutes = async () => {
    const res = await axios.get('https://localhost:54414/api/RoHSProduct/all')
    const prosuctData:Song[]=res.data.data.map((item:any)=>({
            no:item.fid,
            title:item.廠商編號,
            length:item.料號
        }));
    dataRef.value.push(...prosuctData);
    paginationReactive .itemCount = dataRef.value.length;
};
onMounted(() => {
    //fetchRoutes();
    query(paginationReactive.page, paginationReactive.pageSize)()
    .then(result=>{
        const prosuctData:Song[]=result.data.map((item:any)=>({
            no:item.fid,
            title:item.廠商編號,
            length:item.料號
        }));
        dataRef.value=prosuctData;
        paginationReactive.pageCount = result.pageCount
        paginationReactive.itemCount = result.total
        console.log(result); // Logs { pageCount, data, total }
    }).catch(error => {
    console.error(error); // Handle any errors
    });
    
});

</script>
<template>
    <div class="section">
        <div class="title">
            <h2>料號資料審核</h2>
        </div>
        <div class="Breadcrumb">
            <nBreadcrumb>
                <nBreadcrumbItem>
                    <nIcon :component="Home" />
                    首頁
                </nBreadcrumbItem>
                <nBreadcrumbItem>料號資料審核</nBreadcrumbItem>
            </nBreadcrumb>
        </div>
        
    </div>
    <n-data-table
    remote
    ref="table"
    :columns="columns"
    :data="dataRef"
    :pagination="paginationReactive"
    @update:page="handlePageChange"
  />

</template>
<style lang="scss" scoped>
.section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

@media screen and (max-width: 768px) {
    .title{
        display: none;
    }
    .section{
        justify-content: flex-start;
    }
}
</style>