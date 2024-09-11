<script setup lang="ts">
import { NIcon, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import {Home} from '@vicons/ionicons5';
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