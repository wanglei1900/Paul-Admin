/*
 * @Author: paul
 * @Date: 2022-12-07 22:30:11
 * @LastEditTime: 2022-12-07 23:02:52
 * @LastEditors: your name
 ! @Description: v-longpress
 * @FilePath: \Paul-Admin\src\directives\modules\longpress.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import type { Directive, DirectiveBinding } from "vue";

const directive: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        console.log(el);
        console.log(binding);

        let pressTimer: any = null
        // 创建倒计时，两秒后执行函数
        const start = (e: any) => {
            console.log(e);
            if (e.button) {
                if (e.type === "click" && e.button !== 0) return
            }
            if (pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler(e)
                }, 1000);
            }
        }

        // 取消计时器
        const cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer)
                pressTimer = null
            }
        }
        // 允许函数
        const handler = (e: MouseEvent | TouchEvent) => {
            binding.value(e)
        }

        // 添加事件监听器
        el.addEventListener("mousedown", start)
        el.addEventListener("touchstart", start)
        // 取消倒计时
        el.addEventListener("click", cancel)
        el.addEventListener("mouseout", cancel)
        el.addEventListener("touchcancel", cancel)
        el.addEventListener("touchend", cancel)
    }
}

export default directive