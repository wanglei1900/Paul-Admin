/*
 * @Author: paul
 * @Date: 2022-11-20 21:57:04
 * @LastEditTime: 2022-11-20 23:02:28
 * @LastEditors: your name
 ! @Description: 动态路由表
 * @FilePath: \Paul-Admin\src\routers\modules\dynamicRouter.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { AuthStore } from "@/store/modules/auth";
import { LOGIN_URL } from "@/config/config";
import { ElNotification } from "element-plus";
import router from "@/routers";

export const initDynamicRouter = async () => {
    try {
        // 1.获取菜单列表 && 按钮权限
        const authStore = AuthStore()
        await authStore.getAuthButtonList()
        await authStore.getAuthMenuList()

        // 2.判断当前用户有没有菜单权限
        if (!authStore.authMenuListGet.length) {
            ElNotification({
                title: "无权访问",
                message: "当前账号无任何菜单权限，请联系系统管理员！",
                type: "warning",
                duration: 3000
            })
            router.replace(LOGIN_URL)
            return Promise.reject("No permission")
        }

    } catch (error) {
        // 当按钮和菜单 请求出错时，重定向到登录页
        router.replace(LOGIN_URL)
        return Promise.reject(error)
    }
}