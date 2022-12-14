/*
 * @Author: paul
 * @Date: 2022-11-26 10:23:15
 * @LastEditTime: 2022-11-26 16:13:26
 * @LastEditors: your name
 * @Description: tabsδ»εΊ
 * @FilePath: \Paul-Admin\src\store\modules\tabs.ts
 * ππππππππππππππππππππππππππππ
 */

import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/store/interface";
import { TABS_WHITE_LIST } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";

export const TabsStore = defineStore({
    id: "TabsState",
    state: (): TabsState => ({
        tabsMenuList: []
    }),
    actions: {
        // θ·―η±εεζΆοΌε’ε Tabs
        addTabs(tabItem: TabsMenuProps) {
            // δΈζ·»ε η½εεε° Tabs
            if (TABS_WHITE_LIST.includes(tabItem.path)) return
            if (this.tabsMenuList.every(v => v.path !== tabItem.path)) {
                this.tabsMenuList.push(tabItem)
            }
        },

        /**
         * @description: η§»ι€ Tabs
         * @param {string} tabPath θ¦η§»ι€ηtabsθ·―εΎ
         * @param {boolean} isCurrent ζ―ε¦ζ―ε½ει‘΅ι’
         * @return {*}
         */
        removeTabs(tabPath: string, isCurrent: boolean = true) {
            const tabsMenuList = this.tabsMenuList
            // ε ι€ηζ―ε½ει‘΅tabs
            if (isCurrent) {
                tabsMenuList.forEach((item, index) => {
                    if (item.path !== tabPath) return
                    // nextTab δΈΊδΈδΈδΈͺtabsοΌιθ¦εΊεε ι€ηζ―ε¦ζ―ζεδΈδΈͺtabs
                    const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
                    // ζ tabs
                    if (!nextTab) return
                    router.push(nextTab.path)
                })
            }
            // ε ι€ηδΈζ―ε½ει‘΅
            this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath)
        },

        // η§»ι€ ε€δΈͺtabs      
        removeMultipleTabs(tabsMenuValue?: string) {
            this.tabsMenuList = this.tabsMenuList.filter(item => {
                return item.path === tabsMenuValue || !item.close
            })
        }
    },



    persist: piniaPersistConfig("TabsState")
})