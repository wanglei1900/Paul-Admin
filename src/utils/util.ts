/*
 * @Author: paul
 * @Date: 2022-11-14 22:33:46
 * @LastEditTime: 2022-11-20 21:55:50
 * @LastEditors: your name
 * @Description: 常用公共方法
 * @FilePath: \Paul-Admin\src\utils\util.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

// 打招呼
export function getSayHello() {
    let hours = new Date().getHours()
    switch (true) {
        case hours >= 6 && hours < 10:
            return `早上好 ⛅`;
        case hours >= 10 && hours < 14:
            return `中午好 🌞`;
        case hours >= 14 && hours < 18:
            return `下午好 🌞`;
        case hours >= 18 && hours < 24:
            return `晚上好 🌛`;
        default:
            return `凌晨好 🌛`
    }
}

/**
 * @description: 递归，过滤从后端拿到的菜单列表（需要剔除 isHide== true 的菜单）
 * @param {Array} menuList 后端传过来的菜单列表
 * @return Array
 */
export function getShowMenuList(menuList: Menu.menuOptions[]) {
    let newMenuList: Menu.menuOptions[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children))
        return !item.meta.isHide
    })
}