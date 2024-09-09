<script setup lang="ts">
import { NDialogProvider, NNotificationProvider, NMessageProvider } from 'naive-ui';

</script>
<template>
    <nDialogProvider>
            <nNotificationProvider>
                <nMessageProvider>
                    <slot name="default"></slot>
                </nMessageProvider>
            </nNotificationProvider>
    </nDialogProvider>
</template>