/*
 * @Author: paul
 * @Date: 2022-11-11 22:14:56
 * @LastEditTime: 2022-11-20 21:43:11
 * @LastEditors: your name
 * @Description: pinia仓库 interface管理处
 * @FilePath: \Paul-Admin\src\store\interface\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

/* themeConfigProp */
export interface ThemeConfigProps {
	layout: string;
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
	themeConfig: ThemeConfigProps;
}

/* AuthState */
export interface AuthState {
	authButtonList: {
		[key: string]: {
			[key: string]: boolean
		}
	}
	authMenuList: Menu.menuOptions[]
}