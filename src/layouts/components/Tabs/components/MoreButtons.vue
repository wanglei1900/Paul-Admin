<template>
    <el-dropdown trigger="click">
        <el-button size="small" type="success">
            <span>更多</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon><Refresh /></el-icon>刷新
                </el-dropdown-item>
                <el-dropdown-item @click="maximize">
                    <el-icon><FullScreen /></el-icon>最大化
                </el-dropdown-item>
                <el-dropdown-item @click="closeCurrentTab">
                    <el-icon><Remove /></el-icon>关闭当前
                </el-dropdown-item>
                <el-dropdown-item @click="closeOtherTab">
                    <el-icon><CircleClose /></el-icon>关闭其他
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon><FolderDelete /></el-icon>关闭所有
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang='ts'>
import { ref, reactive, inject } from 'vue';
import { GlobalStore } from "@/store";
import { TabsStore } from "@/store/modules/tabs";
import { useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { ElMessage } from "element-plus";

const route = useRoute()
const router = useRouter()
const globalStore = GlobalStore()
const tabsStore = TabsStore()
const reload:Function = inject("refresh") as Function


const refresh = ()=>{
    ElMessage({type:"success", message:"当前页面已刷新 🚀"})
    reload()
}

const maximize = ()=>{
    globalStore.setThemeConfig({...globalStore.themeConfig, maximize:true})
}

const closeCurrentTab = ()=>{
    if (route.meta.isAffix) return
    tabsStore.removeTabs(route.path)
}

const closeOtherTab = ()=>{
    tabsStore.removeMultipleTabs(route.path)
}

const closeAllTab = ()=>{
    tabsStore.removeMultipleTabs()
    router.push(HOME_URL)
}

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>