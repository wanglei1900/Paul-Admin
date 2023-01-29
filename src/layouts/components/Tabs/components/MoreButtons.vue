<template>
    <el-dropdown trigger="click">
        <el-button color="#42b883" size="small" type="primary">
            <span style="color:#fff">更多</span>
            <el-icon style="color:#fff" class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon>
                        <Refresh />
                    </el-icon>刷新
                </el-dropdown-item>
                <el-dropdown-item @click="maximize">
                    <el-icon>
                        <FullScreen />
                    </el-icon>最大化
                </el-dropdown-item>
                <el-dropdown-item divided @click="closeCurrentTab">
                    <el-icon>
                        <Remove />
                    </el-icon>关闭当前
                </el-dropdown-item>
                <el-dropdown-item @click="closeOtherTab">
                    <el-icon>
                        <CircleClose />
                    </el-icon>关闭其他
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon>
                        <FolderDelete />
                    </el-icon>关闭所有
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import { GlobalStore } from "@/store";
import { KeepAliveStore } from "@/store/modules/keepAlive";
import { TabsStore } from "@/store/modules/tabs";
import { useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { ElMessage } from "element-plus";

const route = useRoute()
const router = useRouter()
const globalStore = GlobalStore()
const tabsStore = TabsStore()
const keepAliveStore = KeepAliveStore()
const refreshCurrentPage: Function = inject("refresh") as Function
const themeConfig = computed(() => globalStore.themeConfig)

// 刷新当前嵌套的路由页面
const refresh = () => {
    keepAliveStore.removeKeepAliveName(route.name as string)
    refreshCurrentPage(false)
    nextTick(() => {
        keepAliveStore.addKeepAliveName(route.name as string)
        refreshCurrentPage(true)
        ElMessage.success("当前页面已刷新 🚀")
    })
}

const maximize = () => {
    globalStore.setThemeConfig({ ...themeConfig.value, maximize: true })
}

const closeCurrentTab = () => {
    if (route.meta.isAffix) return
    tabsStore.removeTabs(route.fullPath)
    keepAliveStore.removeKeepAliveName(route.name as string)
}

const closeOtherTab = () => {
    tabsStore.closeMultipleTab(route.path)
    keepAliveStore.setKeepAliveName([route.name] as string[])
}

const closeAllTab = () => {
    tabsStore.closeMultipleTab()
    keepAliveStore.setKeepAliveName()
    router.push(HOME_URL)
}
</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>