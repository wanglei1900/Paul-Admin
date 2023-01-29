/*
 * @Author: paul
 * @Date: 2022-11-11 21:38:19
 * @LastEditTime: 2023-01-26 16:31:44
 * @LastEditors: your name
 * @Description: api interface接口管理处
 * @FilePath: \Paul-Admin\src\api\interface\index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

// *登录模块
export namespace Login {
    export interface ReqLoginForm {
        username: string
        password: string
    }
    export interface ResLogin {
        access_token: string
    }
    export interface ResAuthButtons {
		[key: string]: string[];
    }
}

// *请求响应参数（不包含data）
export interface Result {
    code: string
    msg: string
}

// *请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
    data: T;
}
