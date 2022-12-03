/*
 * @Author: paul
 * @Date: 2022-11-12 13:30:45
 * @LastEditTime: 2022-11-26 10:31:14
 * @LastEditors: your name
 ! @Description: 全局默认配置项管理，只做导出
 * @FilePath: \Paul-Admin\src\config\config.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

// * 首页地址（默认）
export const HOME_URL: string = "/home/index"

// * 登录页地址（默认）
export const LOGIN_URL: string = "/login"

// *Tabs(白名单地址，不需要添加到 tabs 的路由地址)
export const TABS_WHITE_LIST: string[] = ["./403", "/404", "/500", LOGIN_URL]