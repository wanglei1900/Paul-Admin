/*
 * @Author: paul
 * @Date: 2022-11-12 13:43:40
 * @LastEditTime: 2023-03-06 22:20:21
 * @LastEditors: your name
 ! @Description: 全局ts申明，因为TS直接引用第三方JS库的时候，虽然可以用，但是是没有类型检查，所以我们需要做一个声明文件，来声明这些第三方库的类型，这样在使用第三方库的时候，就有类型了
 * @FilePath: \Paul-Admin\src\typings\plugins.d.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

declare module "nprogress"
declare module "js-md5"
declare module "qs"