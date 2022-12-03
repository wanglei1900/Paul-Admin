/*
 * @Author: paul
 * @Date: 2022-11-14 22:33:46
 * @LastEditTime: 2022-11-27 12:48:35
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

/**
 * @description: 扁平化数组对象（只要用来处理路由菜单）
 * @param {Array} menuList 所有菜单列表
 * @return Array
 */
export function getFlatArr(menuList: Menu.menuOptions[]) {
    return menuList.reduce((prev: Menu.menuOptions[], current: Menu.menuOptions) => {
        let flatArr = [...prev, current]
        if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
        return flatArr
    }, [])
}

/**
 * @description: 使用递归，过滤需要缓存的路由
 * @param {Menu} menuList
 * @return {*}
 */
export function getKeepAliveRouterName(menuList: Menu.menuOptions[]) {
    let keepAliveArr: string[] = []
    menuList.forEach(item => {
        item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name)
        item.children?.length && getKeepAliveRouterName(item.children)
    });
    return keepAliveArr
}

/**
 * @description: 使用递归，过滤出当前路径匹配的面包屑地址
 * @param {string} path 当前访问地址
 * @param {Menu} menuList 所有菜单列表
 * @return array
 */
export function getCurrentBreadcrumb(path: string, menuList: Menu.menuOptions[]) {
    let tempPath: Menu.menuOptions[] = []
    try {
        const getNodePath = (node: Menu.menuOptions) => {
            tempPath.push(node)
            if (node.path === path) throw new Error("Find It!");
            if (node.children?.length) node.children.forEach(item => getNodePath(item))
            tempPath.pop()
        }
        menuList.forEach(item => getNodePath(item))
    } catch (error) {
        return tempPath
    }
}

/**
 * @description: 双重递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Menu} menuList 所有菜单列表
 * @return array
 */
export function getAllBreadcrumbList(menuList: Menu.menuOptions[]) {
    let handleBreadcrumbList: { [key: string]: any } = {}
    const loop = (menuItem: Menu.menuOptions) => {
        if (menuItem.children?.length) menuItem.children.forEach(item => loop(item))
        else handleBreadcrumbList[menuItem.path] = getCurrentBreadcrumb(menuItem.path, menuList)
    }
    menuList.forEach(item => loop(item))
    return handleBreadcrumbList
}