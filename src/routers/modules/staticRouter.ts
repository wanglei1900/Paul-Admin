/*
 * @Author: paul
 * @Date: 2022-11-12 14:19:46
 * @LastEditTime: 2022-12-04 16:04:49
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
        path: "/layout",
        name: "layout",
        component: () => import("@/layouts/LayoutVertical/index.vue"),
        redirect: HOME_URL,
        children: []
    },
    {
        // hide: true,
        path: '/:pathMatch(.*)*',
        component: () => import('@/components/ErrorMessage/404.vue'),
    }
]

/**
 * errorRouter(错误页面路由)
 */
 export const errorRouter = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			title: "403页面"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			title: "404页面"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			title: "500页面"
		}
	}
];

// /**
//  * notFoundRouter(找不到路由)
//  */
// export const notFoundRouter = {
// 	path: "/:pathMatch(.*)*",
// 	name: "notFound",
// 	redirect: { name: "404" }
// };

