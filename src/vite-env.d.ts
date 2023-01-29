/// <reference types="vite/client" />

// typescrite 智能提示读取import.meta.env里的变量
interface ImportMetaEnv {
  readonly VITE_PORT: string
  readonly VITE_API_URL: string
  readonly VITE_OPEN: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 解决.ts文件是识别不了.vue文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
