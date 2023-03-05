/*
 * @Author: paul
 * @Date: 2023-03-04 15:18:40
 * @LastEditTime: 2023-03-05 23:00:23
 * @LastEditors: your name
 * @Description: 上传相关ts类型申明
 * @FilePath: \Paul-Admin\src\views\menu\menu2\menu22\menu222\interface.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */
import type { UploadFile,UploadInstance, UploadProps, UploadRawFile } from 'element-plus'



export interface container {
    file: UploadFile;
    hash: string;
    worker: any;

}