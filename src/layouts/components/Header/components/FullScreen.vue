<template>
    <div class="fullscreen">
        <i class="iconfont" :class="isFullscreen ? 'icon-suoxiao' : 'icon-fangda'" @click="toggle"></i>
    </div>
</template>

<script setup lang='ts'>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

</script>

<style lang='scss' scoped>
</style>