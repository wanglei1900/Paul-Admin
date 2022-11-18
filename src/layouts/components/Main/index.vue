<template>
    <Maximize v-if="themeConfig.maximize" />
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-footer>
        <Footer />
    </el-footer>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { GlobalStore } from "@/store";
import Footer from "@/layouts/components/Footer/index.vue";
import Maximize from "@/layouts/components/Main/components/Maximize.vue";

const globalStore = GlobalStore()

const themeConfig = computed(() => globalStore.themeConfig)


</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>