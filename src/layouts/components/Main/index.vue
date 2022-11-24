<template>
    <Maximize v-if="themeConfig.maximize" />
    <el-main>
        <!-- 参考文章  https://router.vuejs.org/zh/api/#router-view-%E7%9A%84-v-slot -->
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <keep-alive :include="authStore.keepAliveRouterGet" >
                    <component :is="Component" :key="route.path" />
                </keep-alive>
            </transition>
        </router-view>
    </el-main>
    <el-footer>
        <Footer />
    </el-footer>
</template>

<script setup lang='ts'>
import { ref, computed, onBeforeUnmount } from 'vue';
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import Maximize from "@/layouts/components/Main/components/Maximize.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const authStore = AuthStore()
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