/*
 * @Author: paul
 * @Date: 2022-11-12 13:40:15
 * @LastEditTime: 2022-11-12 14:00:04
 * @LastEditors: your name
 * @Description: loading进度条
 * @FilePath: \Paul-Admin\src\config\nprogress.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
export default NProgress

