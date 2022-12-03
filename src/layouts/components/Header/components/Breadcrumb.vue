<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <transition-group name="breadcrumb" mode="out-in">
            <el-breadcrumb-item :to="{ path: HOME_URL }" :key="HOME_URL" v-if="breadcrumbList?.[0].meta.title !== '首页'">
                <div class="breadcrumb-item">
                    <el-icon class="breadcrumb-icon" v-if="themeConfig.breadcrumbIcon">
                        <HomeFilled />
                    </el-icon>
                    <span class="breadcrumb-title">首页</span>
                </div>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path:item.path }">
                <div class="breadcrumb-item">
                    <el-icon class="breadcrumb-icon" v-if="item.meta.icon && themeConfig.breadcrumbIcon">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span class="breadcrumb.title">{{item.meta.title}}</span>
                </div>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { HOME_URL } from "@/config/config";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { useRoute } from "vue-router";

const route = useRoute()
const globalStore = GlobalStore()
const authStore = AuthStore()

const themeConfig = computed(() => globalStore.themeConfig)
const breadcrumbList = computed(() => authStore.breadcrumbListGet[route.matched[route.matched.length -1].path])

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>