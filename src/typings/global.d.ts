/*
 * @Author: paul
 * @Date: 2022-11-13 21:40:30
 * @LastEditTime: 2022-11-20 21:33:19
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

// * Menu
declare namespace Menu {
	interface menuOptions {
		path: string;
		name: string;
		component?: string | (() => Promise<any>);
		redirect?: string;
		meta: MetaProps;
		children?: menuOptions[];
	}
	interface MetaProps {
		icon: string;
		title: string;
		isLink: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
	}
}
