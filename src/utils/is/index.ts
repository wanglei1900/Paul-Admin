/*
 * @Author: paul
 * @Date: 2022-11-13 11:59:16
 * @LastEditTime: 2022-11-13 13:59:03
 * @LastEditors: your name
 * @Description: 判断类型的工具库
 * @FilePath: \Paul-Admin\src\utils\is\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

const toString = Object.prototype.toString

/**
 * @description: 判断值是否为某个类型
 * @param {unknown} val 值
 * @param {string} type 类型
 * @return {boolean}
 */
export function is(val: unknown, type: string): boolean {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description: 判断是否为函数
 * @param {unknown} val 值
 * @return {*}
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function')
}




