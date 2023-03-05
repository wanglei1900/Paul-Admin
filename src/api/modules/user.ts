/*
 * @Author: paul
 * @Date: 2023-02-03 22:52:37
 * @LastEditTime: 2023-02-03 23:30:59
 * @LastEditors: your name
 * @Description: 用户管理模块
 * @FilePath: \Paul-Admin\src\api\modules\user.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { User } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

// * 获取用户部门列表
export const getUserDepartment = () => {
    return http.get<User.ResDepartment>(`${PORT1}/user/department`)
}
