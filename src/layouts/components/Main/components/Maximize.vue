<template>
    <div class="maximize" @click="exitMaximize">
        <el-icon><Close /></el-icon>
    </div>
</template>

<script setup lang='ts'>
import { GlobalStore } from "@/store";

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)

const exitMaximize = () => {
    globalStore.setThemeConfig({ ...themeConfig.value, maximize: false })
}

// 监听当前页面是否是全屏，动态添加 class
watch(
    () => themeConfig.value.maximize,
    () => {
        const app = document.getElementById("app") as HTMLElement
        if (themeConfig.value.maximize) app.classList.add("main-maximize")
        else app.classList.remove("main-maximize")
    },
    { immediate: true }
)
</script>

<style lang='scss' scoped>
@import "../index.scss";
</style>