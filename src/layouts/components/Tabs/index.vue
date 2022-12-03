<template>
    <div class="tabs-box">
        <div class="tabs-menu">
            <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
                <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path"
                    :closable="item.close">
                    <template #label>
                        <el-icon v-if="item.icon && themeConfig.tabsIcon">
                            <component :is="item.icon"></component>
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>
            <MoreButtons />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import { TabsStore } from "@/store/modules/tabs";
import { TabsPaneContext,TabPaneName } from "element-plus";
import MoreButtons from "./components/MoreButtons.vue";

const route = useRoute()
const router = useRouter()
const globalStore = GlobalStore()
const tabsStore = TabsStore()

const tabsMenuValue = ref(route.path)
const tabsMenuList = computed(() => tabsStore.tabsMenuList)
const themeConfig = computed(() => globalStore.themeConfig)

// 监听留有的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
    () => route.path,
    () => {
        tabsMenuValue.value = route.path
        const tabParams = {
            icon: route.meta.icon as string,
            title: route.meta.title as string,
            path: route.path,
            close: !route.meta.isAffix
        }
        tabsStore.addTabs(tabParams)
    },
    {
        immediate: true
    }
)

// 点击tab跳转路由(回调见饿了吗官网)
const tabClick = (pane: TabsPaneContext) => {
    let path = pane.props.name as string
    router.push(path)
}

// 移除Tab标签(回调见饿了吗官网)
const tabRemove = (name: TabPaneName) => {
    let isCurrent = name == route.path
    tabsStore.removeTabs(name as string, isCurrent)
}
</script>

<style lang='scss' scoped>
@import "./index.scss"
</style>