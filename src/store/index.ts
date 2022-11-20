/*
 * @Author: paul
 * @Date: 2022-11-11 22:02:27
 * @LastEditTime: 2022-11-19 22:08:11
 * @LastEditors: your name
 * @Description: pinia仓库
 * @FilePath: \Paul-Admin\src\store\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */
import { defineStore, createPinia } from 'pinia'
import { GlobalState, ThemeConfigProps } from "./interface";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore创建仓库，调用后返回一个函数，调用函数后获得store实例
export const GlobalStore = defineStore({
    // id必填，store唯一标识
    id: "GlobalState",
    // state: 返回对象的函数
    state: (): GlobalState => ({
        token: "",
        userInfo: "",
        themeConfig: {
            // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
            layout: "vertical",
            // 默认 primary 主题颜色
            // primary: DEFAULT_PRIMARY,
            // 深色模式
            isDark: false,
            // 灰色模式
            isGrey: false,
            // 色弱模式
            isWeak: false,
            // 折叠菜单
            isCollapse: false,
            // 面包屑导航
            breadcrumb: true,
            // 面包屑导航图标
            breadcrumbIcon: true,
            // 标签页
            tabs: true,
            // 标签页图标
            tabsIcon: true,
            // 页脚
            footer: true,
            // 当前页面是否全屏
            maximize: false
        }
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        setThemeConfig(themeConfig: ThemeConfigProps) {
            this.themeConfig = themeConfig
        }
    },
    getters: {

    },
    persist: piniaPersistConfig("GlobalState")
})

// 创建pinia并持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

export default pinia