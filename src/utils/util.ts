/*
 * @Author: paul
 * @Date: 2022-11-14 22:33:46
 * @LastEditTime: 2022-11-14 22:45:09
 * @LastEditors: your name
 * @Description: 常用公共方法
 * @FilePath: \Paul-Admin\src\utils\util.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

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