/*
 * @Author: paul
 * @Date: 2023-01-24 23:42:33
 * @LastEditTime: 2023-01-25 17:26:08
 * @LastEditors: your name
 * @Description: 全屏请求loading
 * @FilePath: \Paul-Admin\src\config\serviceLoading.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { ElLoading } from "element-plus";

/* 全局请求 loading(服务方式调用) */
let loadingInstance: ReturnType<typeof ElLoading.service>;

/**
 * @description: 开启loading
 */
const startLoading = () => {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)"
    })
}

/**
 * @description: 结束loading
 */
const endLoading = () => {
    if (loadingInstance) loadingInstance.close()
}

/**
 * @description: 显示全屏加载
 * @description: showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
 */
let needLoadingRequestCount = 0
export const showFullScreenLoading = () => {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

/**
 * @description: 隐藏全局加载
 */
export const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount ===0) {
        endLoading()
    }
}


