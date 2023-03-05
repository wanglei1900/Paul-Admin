<template>
  <div class="card content-box">
    <el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :limit="1" :on-change="handleUpload" :on-exceed="handleExceed" :auto-upload="false">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="handlerUpload">上传</el-button>
      <el-button class="ml-3" type="success" @click="handlerUpload">暂停</el-button>
      <template #tip>
        <div class="el-upload__tip text-red">限制一个文件, 新文件将会覆盖原文件</div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts" name="menu222">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { container } from "./interface";
import { UploadStatusEnum } from "@/enums/uploadEnum";

const upload = ref<UploadInstance>()

// 当前的请求xhr组成的数组
const requestListArr = ref([])
// 组装的filechunk分段文件
const data = ref([])
const status = ref<string>(UploadStatusEnum.wait)
// 生成文件hash的进度
const hashPercentage = ref(0)

// 切片大小（200kb）
const SIZE = 200 * 1024

const container = reactive<container>({
  file: {
    name: '',
    percentage: undefined,
    status: UploadStatusEnum.ready,
    size: undefined,
    url: undefined,
    raw: undefined,
    uid: 0
  },
  hash: '',
  worker: null,
})



const handleUpload: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  console.log('uploadFile', uploadFile);
  console.log('uploadFile.raw', uploadFile.raw);
  console.log('uploadFile.raw 原型', Object.prototype.toString);

  // resetData()
  if (!uploadFile) return
  container.file = uploadFile
}


const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handlerUpload = () => {
  if (!container.file.raw) return
  // 点了上传按钮，状态改为上传中...
  status.value = UploadStatusEnum.uploading
  // 文件分片
  const fileChunkList = createFileChunk(container.file.raw)
  console.log('文件分了多少片：', fileChunkList.length)

  // 文件hash
  // container.hash = await calculateHash(fileChunkList)
  console.log('文件hash是：', container.hash)

  // upload.value!.submit()
}
// 生成文件切片
/**
 * @description: 
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
  return fileChunkList
}

/**
 * 根据文件内容生成hash，而不是根据文件名称生成hash
 * 考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，
 * 导致页面假死状态，所以我们使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互
 * @Author   Author
 * @DateTime 2021-12-31T14:19:59+0800
 * @param    {[type]}                 fileChunkList [description]
 * @return   {[type]}                               [description]
 */
const calculateHash = (fileChunkList) => {
  return new Promise((resolve) => {
    container.worker = new Worker('/hash.js')
    container.worker.postMessage({ fileChunkList })
    container.worker.onmessage = (e) => {
      const { percentage, hash } = e.data
      hashPercentage.value = percentage.toFixed(2)
      if (hash) {
        resolve(hash)
      }
    }
  })
}

</script>
