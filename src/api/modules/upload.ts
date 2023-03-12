/*
 * @Author: paul
 * @Date: 2023-02-06 22:45:04
 * @LastEditTime: 2023-03-12 23:22:45
 * @LastEditors: your name
 * @Description: 文件上传管理
 * @FilePath: /Paul-Admin/src/api/modules/upload.ts
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

// * 大文件上传的单独的request
function request({ url, method = 'post', data, headers = {}, onProgress = (e) => e, requestList }) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest()
		// 一个无符号长整型（unsigned long）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。
		// xhr.timeout = 100000
		xhr.upload.onprogress = onProgress
		xhr.open(method, url)
		Object.keys(headers).forEach((key) =>
			xhr.setRequestHeader(key, headers[key])
		)
		xhr.ontimeout = (e) => {
			console.log('请求超时')
		}
		xhr.send(data)
		// XMLHttpRequest请求成功完成时触发；
		xhr.onload = (e) => {
			// 将请求成功的 xhr 从列表中删除
			if (requestList) {
				const xhrIndex = requestList.findIndex((item) => item === xhr)
				requestList.splice(xhrIndex, 1)
			}
			resolve({
				data: e.target.response,
			})
		}
		// 当请求结束时触发, 无论请求成功(load)还是失败(abort 或 error)。也可以使用 onloadend 属性。
		xhr.onloadend = (e) => e
		// 暴露当前 xhr 给外部
		requestList?.push(xhr)
	})
}
