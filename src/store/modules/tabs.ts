/*
 * @Author: paul
 * @Date: 2022-11-26 10:23:15
 * @LastEditTime: 2023-01-28 21:55:12
 * @LastEditors: your name
 * @Description: tabs仓库
 * @FilePath: \Paul-Admin\src\store\modules\tabs.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/store/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";

export const TabsStore = defineStore({
    id: "TabsState",
    state: (): TabsState => ({
        tabsMenuList: []
    }),
    actions: {
        // 路由变化时，增加Tabs
        addTabs(tabItem: TabsMenuProps) {
            if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
                this.tabsMenuList.push(tabItem)
            }
        },
        /**
         * @description: 移除 Tabs
         * @param {string} tabPath 要移除的tabs路径
         * @param {boolean} isCurrent 是否是当前页面
         * @return {*}
         */
        removeTabs(tabPath: string, isCurrent: boolean = true) {
            const tabsMenuList = this.tabsMenuList
            // 删除的是当前页tabs
            if (isCurrent) {
                tabsMenuList.forEach((item, index) => {
                    if (item.path !== tabPath) return
                    // nextTab 为下一个tabs，需要区分删除的是否是最后一个tabs
                    const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
                    // 无tabs
                    if (!nextTab) return
                    router.push(nextTab.path)
                })
            }
            // 删除的不是当前页
            this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath)
        },

        // 移除 多个tabs      
        closeMultipleTab(tabsMenuValue?: string) {
            this.tabsMenuList = this.tabsMenuList.filter(item => {
                return item.path === tabsMenuValue || !item.close
            })
        },
        // 编辑tabs
        setTabs(tabsMenuList: TabsMenuProps[]) {
            this.tabsMenuList = tabsMenuList
        }
    },
    persist: piniaPersistConfig("TabsState")
})