<template>
	<div class="card content-box">
		<el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
			:limit="1" :on-change="handleFileChange" :auto-upload="false">
			<template #trigger>
				<el-button type="primary">选择文件</el-button>
			</template>
			<el-button :disabled="uploadDisabled" class="ml-3" type="success" @click="handlerUpload">上传</el-button>
			<el-button class="ml-3" type="success" @click="handlePause">暂停</el-button>
			<el-button class="ml-3" type="success" @click="handleResume">恢复</el-button>
			<el-button class="ml-3" type="success" @click="resetData">重置</el-button>
			<template #tip>
				<br /><br />
				<span>计算文件hash进度： {{ hashPercentage }}%</span>
				<br /><br />
				<span>上传进度：{{ fakeUploadPercentage }}%</span>
				<div class="el-upload__tip text-red">限制一个文件, 新文件将会覆盖原文件</div>
			</template>
		</el-upload>
	</div>
</template>

<script setup lang="ts" name="menu222">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { Upload } from "@/api/interface";
import { UploadStatusEnum } from "@/enums/uploadEnum";
import { SIZE } from "@/config/config";
import { bigUploadRequest } from "@/api/modules/upload";

const upload = ref<UploadInstance>()
// 当前的请求xhr组成的数组
const requestListArr = ref<XMLHttpRequest[]>([])
// 组装的filechunk分段文件
let data = reactive<Upload.data[]>([])
const status = ref<string>(UploadStatusEnum.wait)
// 生成文件hash的进度
const hashPercentage = ref(0)
// 显示在页面上的文件上传进度
const fakeUploadPercentage = ref(0)
// 定义上传文件的容器
const container = reactive<Upload.Container>({
	file: {
		name: '',
		percentage: undefined,
		status: UploadStatusEnum.ready,
		size: 0,
		url: undefined,
		raw: undefined,
		uid: 0
	},
	hash: '',
	worker: null,
})


// 计算：文件上传的进度
const uploadPercentage = computed({
	get() {
		if (!container.file || !data.length) return 0
		const loaded = data.map(item => item.size * item.percentage).reduce((acc, cur) => acc + cur)
		return parseInt((loaded / container.file.size!).toFixed(2))
	},
	set(value) {
		return value
	}
})
// 计算：上传按钮是否可以点击
const uploadDisabled = computed(() => {
	const disabledStatus: string[] = [UploadStatusEnum.pause, UploadStatusEnum.uploading]
	return (!container.file || disabledStatus.includes(status.value))
})

// watch uploadPercentage，得到fakeUploadPercentage
// 至于为什么要这么做，看【恢复上传】的注释
watch(uploadPercentage, (newValue) => {
	if (newValue > fakeUploadPercentage.value) {
		fakeUploadPercentage.value = newValue
	}
})


// 选择了文件
const handleFileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
	resetData()
	if (!uploadFile) return
	container.file = uploadFile
}

// 上传
const handlerUpload = async () => {
	if (!container.file.raw) return
	// 点了上传按钮，状态改为上传中...
	status.value = UploadStatusEnum.uploading
	// 文件分片
	const fileChunkList = createFileChunk(container.file.raw)
	console.log('文件分了多少片：', fileChunkList.length)

	// 通过webworker计算出，文件hash
	container.hash = await calculateHash(fileChunkList)
	console.log('文件hash是：', container.hash)

	// uploadedList已上传的切片的切片文件名称
	const { shouldUpload, uploadedList } = await verifyUpload(
		container.file.name,
		container.hash
	)

	// 组装的filechunk数据先置空
	data = []

	// 服务器已经有完整文件了
	if (!shouldUpload) {
		fakeUploadPercentage.value = 100
		status.value = UploadStatusEnum.wait
		await nextTick()
		return ElMessage.success('秒传：上传成功')
	}

	data = fileChunkList.map(({ file }, index) => ({
		fileHash: container.hash,
		index,
		hash: `${container.hash}-${index}`,
		chunk: file,
		size: file.size,
		// 如果已上传切片数组uploadedList中包含这个切片，则证明这个切片之前已经上传成功了，进度设为100。
		percentage: uploadedList.includes(index.toString()) ? 100 : 0,
	}))

	uploadChunks(uploadedList)
}

// 暂停
const handlePause = () => {
	status.value = UploadStatusEnum.pause
	requestListArr.value.forEach((xhr) => xhr?.abort())
	requestListArr.value = []
	if (container.worker) {
		container.worker.onmessage = null
	}
}

// 重置
const resetData = () => {
	hashPercentage.value = 0
	uploadPercentage.value = 0
	fakeUploadPercentage.value = 0
	requestListArr.value.forEach(xhr => xhr?.abort())
	requestListArr.value = []
	if (container.worker) {
		container.worker.onmessage = null
	}
}

/**
 * 【恢复上传】
 * 上传进度是实时根据所有的上传切片的进度汇总来的
 * 只有某个切片完整/全部上传到了服务端，才算这个切片上传完成了
 * 如果，一些切片如果只上传了一部分，就被暂停了，那么恢复上传时，这一些切片是需要重新上传的
 * 这样就会导致恢复上传时，上传进度倒退的问题（因为上传进度是计算属性，是实时计算切片，汇总而来的）
 */
const handleResume = async () => {
	status.value = UploadStatusEnum.uploading
	const { uploadedList } = await verifyUpload(
		container.file.name,
		container.hash
	)
	uploadChunks(uploadedList)
}

/**
 * @description: 生成文件切片
 * @param {*} file 上传的文件
 * @param {*} size  文件大小
 * @return {*}
 */
const createFileChunk = (file: UploadRawFile, size = SIZE) => {
	const fileChunkList = []
	let cur = 0
	while (cur < file.size) {
		fileChunkList.push({
			file: file.slice(cur, cur + size),
		})
		cur += size
	}
	console.log('fileChunkList', fileChunkList);
	return fileChunkList
}

/**
 * @description: 根据文件内容生成hash，而不是根据文件名称生成hash。
 * @description: 考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，
 * @description: 导致页面假死状态，所以我们使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互
 * @param {*} fileChunkList 切片数组
 * @return {*}
 */
const calculateHash = (fileChunkList: Upload.FileChunk[]) => {
	return new Promise<string>((resolve) => {
		// 开启worker
		container.worker = new Worker('/hash.js')
		// 向worker线程传入参数（注意传入的是对象，使用了解构写法）
		container.worker.postMessage({ fileChunkList })
		// 接受来自worker线程的 加工后的回复
		container.worker.onmessage = (e: any) => {
			// console.log('calculateHash_Worker接收的参数', e);
			const { percentage, hash } = e.data
			hashPercentage.value = percentage.toFixed(2)
			// 若得到哈希值，则resolve返回
			if (hash) {
				resolve(hash)
			}
		}
	})
}

// https://blog.51cto.com/u_15091669/2608437  xhr对象POST请求、xhr兼容性、timeout、progress
/**
 * @description: 上传切片进度的回调函数,用闭包保存每个chunk的进度数据
 * @param {*} index 切片的索引
 * @param {*} item 每个切片
 * @return {*}
 */
const createProgressHandler = (index: number, item: Upload.data) => {
	return (e: ProgressEvent) => {
		if (e.lengthComputable) {
			item.percentage = parseInt(String((e.loaded / e.total) * 100))
		}
	}
}

/**
 * @description: 验证该文件是否需要上次，文件通过hash生成唯一，改名后也是不需要再上传的，也就相当于妙传
 * @param {*} filename 文件名
 * @param {*} fileHash 文件哈希值
 * @return {*}
 */
const verifyUpload = async (filename: string, fileHash: string) => {
	const { result } = await bigUploadRequest({
		url: 'http://localhost:9999/verify',
		method: 'post',
		headers: { 'content-type': 'application/json' },
		data: JSON.stringify({
			filename,
			fileHash,
		}),
	})

	return result
}

/**
 * @description: 上传切片，同时过滤已上传的切片
 * @param {*} uploadedList 已经上传了的切片，这次不用上传了
 * @return {*}
 */
const uploadChunks = async (uploadedList: string[] = []) => {
	const requestList = data.filter(({ hash }) => !uploadedList.includes(hash))
		.map(({ chunk, hash, index }) => {
			const formData = new FormData()
			// 切片文件
			formData.append('chunk', chunk)
			// 切片文件hash
			formData.append('hash', hash)
			// 大文件的文件名
			formData.append('filename', container.file.name)
			// 大文件hash
			formData.append('fileHash', container.hash)
			return { formData, index }
		})
		.map(async ({ formData, index }) =>
			bigUploadRequest({
				url: 'http://localhost:9999',
				data: formData,
				onProgress: createProgressHandler(index, data[index]),
				requestList: requestListArr.value,
			})
		)

	// 并发切片
	await Promise.all(requestList)

	// 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
	// 切片并发上传完以后，发个请求告诉后端：合并切片
	if (uploadedList.length + requestList.length === data.length) {
		mergeRequest()
	}
}

// 发请求通知服务器，合并切片
const mergeRequest = async () => {
	await bigUploadRequest({
		url: 'http://localhost:9999/merge',
		headers: {
			'content-type': 'application/json',
		},
		data: JSON.stringify({
			size: SIZE,
			fileHash: container.hash,
			filename: container.file.name,
		}),
	})
	fakeUploadPercentage.value = 100
	ElMessage.success('上传成功')
	status.value = UploadStatusEnum.wait
}

</script>
