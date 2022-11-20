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
import { ref, reactive, computed, onBeforeUnmount } from 'vue';
import { GlobalStore } from "@/store";
import Footer from "@/layouts/components/Footer/index.vue";
import Maximize from "@/layouts/components/Main/components/Maximize.vue";

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)



// 监听窗口大小，折叠侧边栏
const screenWidth = ref<number>(0)
const listeningWindow = () => {
    screenWidth.value = document.body.clientWidth
    if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...globalStore.themeConfig, isCollapse: true })
    if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...globalStore.themeConfig, isCollapse: false })
}
window.addEventListener("resize", listeningWindow)
onBeforeUnmount(() => {
    window.removeEventListener("resize", listeningWindow)
})

</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>