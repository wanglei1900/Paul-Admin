/*
 * @Author: paul
 * @Date: 2022-11-12 13:37:00
 * @LastEditTime: 2022-11-26 13:45:31
 * @LastEditors: your name
 * @Description: ่ทฏ็ฑๅจ
 * @FilePath: \Paul-Admin\src\routers\index.ts
 * ๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐๐
 */

import { createRouter, createWebHashHistory } from "vue-router"
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { staticRouter } from "@/routers/modules/staticRouter";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { LOGIN_URL } from "@/config/config";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import NProgress from "@/config/nprogress";
import { ElNotification } from "element-plus";

const axiosCanceler = new AxiosCanceler()

/**
 * @description ๅจๆ่ทฏ็ฑๅๆฐ้็ฝฎ็ฎไป
 * @param path ==> ่ๅ่ทฏๅพ
 * @param name ==> ่ๅๅซๅ
 * @param redirect ==> ้ๅฎๅๅฐๅ
 * @param component ==> ่งๅพๆไปถ่ทฏๅพ
 * @param meta ==> ่ๅไฟกๆฏ
 * @param meta.icon ==> ่ๅๅพๆ 
 * @param meta.title ==> ่ๅๆ ้ข
 * @param meta.isLink ==> ๆฏๅฆๅค้พ
 * @param meta.isHide ==> ๆฏๅฆ้่
 * @param meta.isFull ==> ๆฏๅฆๅจๅฑ(็คบไพ๏ผๆฐๆฎๅคงๅฑ้กต้ข)
 * @param meta.isAffix ==> ๆฏๅฆๅบๅฎๅจ tabs nav
 * @param meta.isKeepAlive ==> ๆฏๅฆ็ผๅญ
 * */

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @description: ่ทฏ็ฑๆฆๆช  beforeEach
 */
router.beforeEach(async (to, from, next) => {
    // 1.NProgress ๅผๅง
    NProgress.start()

    // 2.่ทฏ็ฑ่ทณ่ฝฌไนๅ๏ผๆธ้คๆๆ็่ฏทๆฑ
    axiosCanceler.removeAllPending()

    // 3.ๅคๆญๆฏ่ฎฟ้ฎ็ปๅฝ้กต๏ผ็ดๆฅๆนๅ
    if (to.path === LOGIN_URL) return next()

    // 4.ๅคๆญๆฏๅฆๆtoken๏ผๆฒกๆ้ๅฎๅๅฐ็ปๅฝ้กต้ข
    const globalStore = GlobalStore()
    if (!globalStore.token) return next({ path: LOGIN_URL, replace: true })

    // todo5.ๅฆๆๆฒกๆ่ๅๅ่กจ๏ผๅฐฑ้ๆฐ่ฏทๆฑ่ๅๅ่กจๅนถๆทปๅ ๅจๆ่ทฏ็ฑ
    const authStore = AuthStore()
    if (!authStore.authMenuListGet.length) {
        await initDynamicRouter()
        return next({ ...to, replace: true })
    }
    // 6.ๆพ่ก้กต้ข
    next()
})

/**
 * @description: ่ทฏ็ฑ่ทณ่ฝฌ็ปๆ  afterEach
 */
router.afterEach(() => {
    NProgress.done()
})

/**
 * @description: ่ทฏ็ฑ่ทณ่ฝฌ้่ฏฏ
 */
router.onError(error => {
    NProgress.done();
    ElNotification({
        title: "่ทฏ็ฑ้่ฏฏ",
        message: error.message
    })
})


export default router

