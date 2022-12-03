<template>
    <div class="flex-center">
        <CollapseIcon />
        <Breadcrumb />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import CollapseIcon from "@/layouts/components/Header/components/CollapseIcon.vue";
import Breadcrumb from "@/layouts/components/Header/components/Breadcrumb.vue";
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>