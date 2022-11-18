/*
 * @Author: paul
 * @Date: 2022-11-13 21:32:14
 * @LastEditTime: 2022-11-13 21:39:06
 * @LastEditors: your name
 * @Description: 环境文件
 * @FilePath: \Paul-Admin\src\utils\getEnv.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function isDevFn(mode: string): boolean {
    return mode === "development"
}

export function isProdFn(mode: string): boolean {
    return mode === "production"
}


// * 读取所有环境变量配置文件 process.env
export function wrapperEnv(envConf: Recordable):ViteEnv {
    const ret: any = {}

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, "\n");
        realName = realName === "true" ? true : realName === "false" ? false : realName;

        if (envName === "VITE_PORT") {
            realName = Number(realName);
        }
        if (envName === "VITE_PROXY") {
            try {
                realName = JSON.parse(realName);
            } catch (error) { }
        }
        ret[envName] = realName;
        process.env[envName] = realName;
    }
    return ret;
}