/**
 * @Author: paul
 * @Date: 2023-03-06 22:30:25
 * @LastEditTime: 2023-03-06 23:39:33
 * @LastEditors: your name
 * @Description: 
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
	console.log('Worker接收的参数',e);
	const { fileChunkList } = e.data
	const spark = new self.SparkMD5.ArrayBuffer()
	let percentage = 0
	let count = 0
	const loadNext = index => {
		const reader = new FileReader()
		reader.readAsArrayBuffer(fileChunkList[index].file)
		reader.onload = e => {
			count++
			spark.append(e.target.result)
			if (count === fileChunkList.length) {
				self.postMessage({
					percentage: 100,
					hash: spark.end()
				})
				self.close()
			} else {
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