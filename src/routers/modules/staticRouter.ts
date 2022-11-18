/*
 * @Author: paul
 * @Date: 2022-11-12 14:19:46
 * @LastEditTime: 2022-11-18 21:46:29
 * @LastEditors: your name
 ! @Description: 静态路由表和错误路由页面
 * @FilePath: \Paul-Admin\src\routers\modules\staticRouter.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config/config";

/* 
* staticRouter(静态路由)
*/
export const staticRouter: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: LOGIN_URL
    },
    {
        path: LOGIN_URL,
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: "登录页"
        }
    },
    // 主页框架
    {
        path: HOME_URL,
        name: "layout",
        component: () => import("@/layouts/LayoutVertical/index.vue"),
        // redirect: HOME_URL,
        children: []
    }
]