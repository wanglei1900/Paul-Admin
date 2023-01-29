/*
 * @Author: paul
 * @Date: 2022-11-20 17:10:37
 * @LastEditTime: 2023-01-26 22:32:34
 * @LastEditors: your name
 * @Description: 权限相关的仓库
 * @FilePath: \Paul-Admin\src\store\modules\auth.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */
import { defineStore } from "pinia";
import { AuthState } from "@/store/interface";
import { getFlatArr } from "@/utils/util";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getShowMenuList, getAllBreadcrumbList } from "@/utils/util";
import piniaPersistConfig from "@/config/piniaPersist";

export const AuthStore = defineStore({
    id: "AuthState",
    state: (): AuthState => ({
        authButtonList: {},
        // menuList 作为动态路由，不会做持久化存储
        authMenuList: []
    }),
    actions: {
        // getAuthButtonList
        async getAuthButtonList() {
            const { data } = await getAuthButtonListApi()
            this.authButtonList = data
        },
        // getAuthMenuList
        async getAuthMenuList() {
            const { data } = await getAuthMenuListApi()
            this.authMenuList = data
        }
    },
    getters: {
        // 按钮权限列表
        authButtonListGet: state => state.authButtonList,
		// 后端返回的菜单列表 ==> 这里没有经过任何处理
        authMenuListGet: state => state.authMenuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.authMenuList),
        // 面包屑导航列表
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
    },
    persist: piniaPersistConfig("AuthState", ["authButtonList"])
})