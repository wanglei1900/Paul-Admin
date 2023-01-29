<template>
    <div :class="['breadcrumb-box', !themeConfig.breadcrumbIcon && 'no-icon']">
        <el-breadcrumb :separator-icon="ArrowRight">
            <transition-group name="breadcrumb" mode="out-in">
                <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path:item.path }">
                    <div class="el-breadcrumb__inner is-link">
                        <el-icon class="breadcrumb-icon" v-show="item.meta.icon && themeConfig.breadcrumbIcon">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span class="breadcrumb-title">{{item.meta.title}}</span>
                    </div>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { ArrowRight } from '@element-plus/icons-vue'
import { HOME_URL } from "@/config/config";

const route = useRoute()
const globalStore = GlobalStore()
const authStore = AuthStore()

const themeConfig = computed(() => globalStore.themeConfig)

const breadcrumbList = computed(() => {
    let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length -1].path] ?? []
	// 🙅‍♀️不需要首页面包屑可删除以下判断
	if (breadcrumbData[0].meta.title !== route.meta.title) {
		breadcrumbData = [{ path: HOME_URL, meta: { icon: "HomeFilled", title: "首页" } }, ...breadcrumbData];
	}
	return breadcrumbData;
})

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>