/*
 * @Author: paul
 * @Date: 2022-12-05 22:48:36
 * @LastEditTime: 2023-01-26 21:29:10
 * @LastEditors: your name
 ! @Description: v-copy 的自定义指令
 * @FilePath: \Paul-Admin\src\directives\modules\copy.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

interface ElType extends HTMLElement {
    copyData: string | number
    __handleClick__: any
}
const copy: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
        el.addEventListener('click', __handleClick__)
    },
    updated(el: ElType, binding: DirectiveBinding) {
        el.copyData = binding.value
    },
    beforeMount(el: ElType) {
        el.removeEventListener('click', el.__handleClick__)
    }

}

const __handleClick__ = function (this: any) {
    const input = document.createElement("input")
    input.value = this.copyData.toLocaleString()
    document.body.appendChild(input)
    input.select()  // 选中时执行input 的事件
    document.execCommand("copy")
    document.body.removeChild(input)
    ElMessage.success("复制成功")
}


export default copy