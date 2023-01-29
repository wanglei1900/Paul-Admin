/*
 * @Author: paul
 * @Date: 2022-11-13 14:22:01
 * @LastEditTime: 2023-01-26 21:25:29
 * @LastEditors: your name
 * @Description: 登录api管理页面
 * @FilePath: \Paul-Admin\src\api\modules\login.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import http from "@/api";

/**
 * @name 登录模块
 */

// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`${PORT1}/login`, params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
	return http.post<Login.ResLogin>(`${PORT1}/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(`${PORT1}/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(`${PORT1}/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
}

// * 获取按钮权限
export const getAuthButtonListApi = () => {
	return http.get<Login.ResAuthButtons>(`${PORT1}/auth/buttons`, {}, { headers: { noloading: true } })
}

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	return http.get<Menu.MenuOptions[]>(`${PORT1}/menu/list`, {}, { heading: { noloading: true } })
}

// * 用户退出登录
export const logoutApi = () => {
	return http.post(`${PORT1}/logout`);
};