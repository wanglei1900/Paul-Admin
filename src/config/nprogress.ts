/*
 * @Author: paul
 * @Date: 2022-11-12 13:40:15
 * @LastEditTime: 2022-11-12 14:00:04
 * @LastEditors: your name
 * @Description: loadingθΏεΊ¦ζ‘
 * @FilePath: \Paul-Admin\src\config\nprogress.ts
 * ππππππππππππππππππππππππππππ
 */

import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({
    easing: "ease", // ε¨η»ζΉεΌ
    speed: 500, // ιε’θΏεΊ¦ζ‘ηιεΊ¦
    showSpinner: true, // ζ―ε¦ζΎη€Ίε θ½½ico
    trickleSpeed: 200, // θͺε¨ιε’ι΄ι
    minimum: 0.3 // εε§εζΆηζε°ηΎεζ―
})
export default NProgress

