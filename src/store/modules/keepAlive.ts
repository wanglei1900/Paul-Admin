/*
 * @Author: paul
 * @Date: 2023-01-26 22:13:24
 * @LastEditTime: 2023-01-26 22:30:41
 * @LastEditors: your name
 * @Description: 缓存组件相关的仓库
 * @FilePath: \Paul-Admin\src\store\modules\keepAlive.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { defineStore } from "pinia";
import { keepAliveState } from "@/store/interface";

export const KeepAliveStore = defineStore({
	id: "KeepAliveStore",
	state: (): keepAliveState => ({
		keepAliveName: []
	}),
	actions: {
		addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name)
		},
		removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name)
		},
		setKeepAliveName(keepAliveName: string[] = []) {
			this.keepAliveName = keepAliveName
		}
	}
})