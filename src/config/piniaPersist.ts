/*
 * @Author: paul
 * @Date: 2022-11-11 22:20:55
 * @LastEditTime: 2022-11-17 22:04:04
 * @LastEditors: your name
 ! @Description: pinia使用插件持久化
 * @FilePath: \Paul-Admin\src\config\piniaPersist.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description: pinia持久化参数配置
 * @param {string} key 存储到持久化的name
 * @param {Array} paths 需要持久化的state name
 * @return persist
 */

const piniaPersistConfig = (key: string, paths?: string[]) => {
    const persist: PersistedStateOptions = {
        key,
        storage: window.localStorage,
        // storage:window.sessionStorage,
        paths
    }
    return persist
}

export default piniaPersistConfig