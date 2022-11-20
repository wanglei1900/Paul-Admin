/*
 * @Author: paul
 * @Date: 2022-11-20 17:10:37
 * @LastEditTime: 2022-11-20 22:34:30
 * @LastEditors: your name
 * @Description: 权限相关的仓库
 * @FilePath: \Paul-Admin\src\store\modules\auth.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */
import { defineStore } from "pinia";
import { AuthState } from "@/store/interface";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getShowMenuList } from "@/utils/util";
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
    getters:{
        // 按钮权限列表
        authButtonListGet: state => state.authButtonList,
        // 后端返回的菜单列表
        authMenuListGet: state => state.authMenuList,
        // 后端返回的菜单列表 ，左侧菜单栏的渲染需要剔除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList)
    },
    persist: piniaPersistConfig("AuthState", ["authButtonList"])
})