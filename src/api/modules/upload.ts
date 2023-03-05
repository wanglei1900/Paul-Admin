/*
 * @Author: paul
 * @Date: 2023-02-06 22:45:04
 * @LastEditTime: 2023-02-06 22:54:12
 * @LastEditors: your name
 * @Description: 文件上传管理
 * @FilePath: \Paul-Admin\src\api\modules\upload.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

import { Upload } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api/index";

// * 图片上传
export const uploadImg = (params: FormData) => {
    return http.post<Upload.ResFileUrl>(`${PORT1}/file/upload/img`, params)
}

// * 视频上传
export const uploadVideo = (params: FormData) => {
    return http.post<Upload.ResFileUrl>(`${PORT1}/file/upload/video`, params)
}