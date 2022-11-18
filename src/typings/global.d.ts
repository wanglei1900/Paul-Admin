/*
 * @Author: paul
 * @Date: 2022-11-13 21:40:30
 * @LastEditTime: 2022-11-13 21:46:12
 * @LastEditors: your name
 * @Description: 全局接口类型
 * @FilePath: \Paul-Admin\src\typings\global.d.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */



// * Vite
declare type Recordable<T = any> = Record<string, T>


declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}