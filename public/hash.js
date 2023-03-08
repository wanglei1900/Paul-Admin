/**
 * @Author: paul
 * @Date: 2023-03-06 22:30:25
 * @LastEditTime: 2023-03-08 17:23:00
 * @LastEditors: your name
 * @Description: web-worker 线程页面
 * @FilePath: \Paul-Admin\public\hash.js
 * @🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

/**
 * 在 worker 中也是不允许访问 dom 的；
 * 但它提供了importScripts函数用于导入外部脚本，通过它导入spark-md5；
 * Worker中没有window，Worker中self指向顶层对象。
 */
self.importScripts('./spark-md5.min.js')

/**
 * 正因为每个文件的md5是一样的，那么，我们在做文件上传的时候，
 * 就只要在前端先获取要上传的文件md5值，
 * 并把文件md5传到服务器进行校验，对比之前文件的md5，如果存在相同的md5，
 * 我们只要把文件的名字传到服务器关联之前的文件即可，并不需要再次去上传相同的文件。
 * @Author   Author
 * @DateTime 2021-12-31T15:23:48+0800
 * @param    {[type]}                 e [description]
 * @return   {[type]}                   [description]
 */
self.onmessage = e => {
	const { fileChunkList } = e.data
	console.log('fileChunkList',fileChunkList);
	// 创建ArrayBuffer对象
	const spark = new self.SparkMD5.ArrayBuffer()
	// 定义百分比
	let percentage = 0
	let count = 0
	// 递归直到百分比为100 结束
	const loadNext = index => {
		// 创建FileReader，准备读取文件
		const reader = new FileReader()
		// fileChunkList的数组里的碎片fileChunk 的数据结构  { file: Blob }
		console.log(fileChunkList[index].file);
		// FileReader.readAsArrayBuffer()	开始读取指定的 Blob中的内容，一旦完成，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象。
		// 将fileChunkList的数组 依次转化为ArrayBuffer
		reader.readAsArrayBuffer(fileChunkList[index].file)
		// FileReader.onload	处理load事件。该事件在读取操作完成时触发。
		reader.onload = e => {
			// console.log('e',e);
			// console.log('e.target',e.target);		// FileReader
			// console.log('e.target.result',e.target.result);	// ArrayBuffer
			count++
			// spark.append，将ArrayBuffer对象转换成哈希值
			spark.append(e.target.result)
			// 当循环次数等于 切片数组的长度时，代表转换完成
			if (count === fileChunkList.length) {
				// 向主线程发送一条小心，告知百分比100%，并且返回哈希值
				self.postMessage({
					percentage: 100,
					// 最终文件哈希值
					hash: spark.end()
				})
				// 关闭该worker线程
				self.close()
			} else {
				// 当循环次数等于 切片数组的长度时，未转换完成
				// 计算百分比
				percentage += 100 / fileChunkList.length
				self.postMessage({
					percentage
				})
				loadNext(count)
			}
		}
	}
	loadNext(count)
}

/**
 * 思考：
 * 1、有人建议：大文件计算太慢，WebAssembly技术来计算md5可以加快50%的速度
 */

/**
 * 【笔记】
 * SparkMD5是MD5算法的一个快速md5实现。这个脚本基于JKM md5库，是目前最快的算法。这最适合在浏览器上使用，因为nodejs版本可能会更快。
 */