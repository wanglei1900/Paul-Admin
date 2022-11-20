/*
 * @Author: paul
 * @Date: 2022-11-12 13:37:00
 * @LastEditTime: 2022-11-20 22:30:33
 * @LastEditors: your name
 * @Description: 路由器
 * @FilePath: \Paul-Admin\src\routers\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { createRouter, createWebHashHistory } from "vue-router"
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { staticRouter } from "@/routers/modules/staticRouter";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { LOGIN_URL } from "@/config/config";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import NProgress from "@/config/nprogress";
import { ElNotification } from "element-plus";

const axiosCanceler = new AxiosCanceler()

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @description: 路由拦截  beforeEach
 */
router.beforeEach(async (to, from, next) => {
    // 1.NProgress 开始
    NProgress.start()

    // 2.路由跳转之前，清除所有的请求
    axiosCanceler.removeAllPending()

    // 3.判断是访问登录页，直接方向
    if (to.path === LOGIN_URL) return next()

    // 4.判断是否有token，没有重定向到登录页面
    const globalStore = GlobalStore()
    if (!globalStore.token) return next({ path: LOGIN_URL, replace: true })

    // todo5.如果没有菜单列表，就重新请求菜单列表并添加动态路由
    const authStore = AuthStore()
    if (!authStore.authMenuListGet.length) {
        await initDynamicRouter()
        return next({ ...to, replace: true })
    }
    // 6.放行页面
    next()
})

/**
 * @description: 路由跳转结束  afterEach
 */
router.afterEach(() => {
    NProgress.done()
})

/**
 * @description: 路由跳转错误
 */
router.onError(error => {
    NProgress.done();
    ElNotification({
        title: "路由错误",
        message: error.message
    })
})


export default router

