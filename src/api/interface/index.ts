/*
 * @Author: paul
 * @Date: 2022-11-11 21:38:19
 * @LastEditTime: 2023-03-17 22:26:23
 * @LastEditors: your name
 * @Description: api interface接口管理处
 * @FilePath: /Paul-Admin/src/api/interface/index.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

// import { Upload } from "@element-plus/icons-vue";
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

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

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 用户管理模块
export namespace User {
	export interface ReqUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		user: {
			detail: {
				age: number;
			};
		};
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
	export interface ResStatus {
		userLabel: string;
		userValue: number;
	}
	export interface ResGender {
		genderLabel: string;
		genderValue: number;
	}
	export interface ResDepartment {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
	export interface ResRole {
		id: string;
		name: string;
		children?: ResDepartment[];
	}
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
	export interface Container {
		file: UploadFile;
		hash: string;
		worker: any;
	}
	export interface FileChunk {
		file: Blob;
	}
	export interface specialRequest {
		url: string,
		method?: string,
		data: any,
		headers?: Record<string, string>
		onProgress?: any,
		requestList?: XMLHttpRequest[],
	}

	export interface verifyUpload {
		result: {
			shouldUpload: boolean,
			uploadedList: string[]
		}
	}

	export interface data {
		fileHash: string,
		index: number,
		hash: string,
		chunk: Blob,
		size: number,
		percentage: number,
	}
}

