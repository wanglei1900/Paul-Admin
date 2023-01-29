/*
 * @Author: paul
 * @Date: 2022-11-20 21:57:04
 * @LastEditTime: 2022-12-04 15:53:26
 * @LastEditors: your name
 ! @Description: 动态路由表
 * @FilePath: \Paul-Admin\src\routers\modules\dynamicRouter.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import router from "@/routers";
import { getFlatArr } from "@/utils/util";
import { AuthStore } from "@/store/modules/auth";
import { LOGIN_URL } from "@/config/config";
import { ElNotification } from "element-plus";

// 引入 views 文件夹下所有的 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/* 初始化动态路由 */
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

        // 3.添加动态路由（通过getFlatArr 方法把菜单全部处理成一维数组，方便添加动态路由
        let dynamicRouter = getFlatArr(JSON.parse(JSON.stringify(authStore.authMenuList)))
        dynamicRouter.forEach((item: any) => {
            if (item.children) delete item.children
            if (item.component) item.component = modules["/src/views" + item.component + ".vue"]
			// 判断是否为全屏路由
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				// 添加到父路由layout下面添加新的路由
				router.addRoute("layout", item);
			}
        })

    } catch (error) {
        // 当按钮和菜单 请求出错时，重定向到登录页
        router.replace(LOGIN_URL)
        return Promise.reject(error)
    }
}