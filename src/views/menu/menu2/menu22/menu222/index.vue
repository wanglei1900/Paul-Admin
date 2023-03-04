<template>
  <div class="card content-box">
    <el-upload ref="upload" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :limit="1" :on-change="handleUpload" :on-exceed="handleExceed" :auto-upload="false">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">上传</el-button>
      <el-button class="ml-3" type="success" @click="submitUpload">暂停</el-button>
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

const upload = ref<UploadInstance>()

const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading',
}





// 当前的请求xhr组成的数组
const requestListArr = ref([])
// 组装的filechunk分段文件
const data = ref([])
const status = ref(Status.wait)
// 生成文件hash的进度
const hashPercentage = ref(0)

const container = reactive<container>({
  file: {
    name: '',
    percentage: undefined,
    status: 'ready',
    size: undefined,
    url: undefined,
    raw: undefined,
    uid: 0
  },
  hash: '',
  worker: null,
})



const handleUpload: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
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

const submitUpload = () => {
  upload.value!.submit()
}
</script>
