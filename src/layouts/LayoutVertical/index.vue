
<template>
    <el-container class="layout-vertical">
        <el-aside>
            <div class="menu" :style="{width: isCollapse ? '65px' : '210px'}">
                <div class="logo flex-center">
                    <img src="@/assets/images/logo.svg" alt="logo">
                    <span v-show="!isCollapse">Paul Admin</span>
                </div>
                <el-scrollbar>
                    <el-menu
                        :default-active="activeMenu"
                        :router="false"
                        text-color="#bdc3c7"
                        active-text-color="#ffffff"
                        background-color="#1e272e"
                        :collapse="isCollapse"
                        :collapse-transition="true"
                        :unique-opened="true"
                    >
                        <!-- 子菜单 -->
                        <SubMenu :menuList="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header class="flex-space-between">
                <ToolBarLeft />
                <ToolBarRight />
            </el-header>
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang='ts' name="layout">
import { computed } from 'vue';
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const route = useRoute()
const globalStore = GlobalStore()
const authStore = AuthStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)
const activeMenu = computed(()=> route.path)
const menuList = computed(()=> authStore.showMenuListGet)
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>