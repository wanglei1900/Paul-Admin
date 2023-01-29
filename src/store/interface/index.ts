/*
 * @Author: paul
 * @Date: 2022-11-11 22:14:56
 * @LastEditTime: 2023-01-26 22:17:33
 * @LastEditors: your name
 * @Description: pinia仓库 interface管理处
 * @FilePath: \Paul-Admin\src\store\interface\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

/* themeConfigProp */
export interface ThemeConfigProps {
	layout: LayoutType;
	primary?: string;
	isDark: boolean;
	isGrey: boolean;
	isCollapse: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
	maximize: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string
	userInfo: any
	assemblySize: AssemblySizeType;
	themeConfig: ThemeConfigProps;
}

export type AssemblySizeType = "default" | "small" | "large";

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

/* AuthState */
export interface AuthState {
	authButtonList: {
		[key: string]: string[];
	}
	authMenuList: Menu.MenuOptions[]
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string,
	title: string,
	path: string,
	name: string,
	close: boolean
}

/* TasState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[]
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[]
}