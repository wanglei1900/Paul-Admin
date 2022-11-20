<template>
    <el-icon class="collapse-icon" @click="collapse">
        <component :is="themeConfig.isCollapse ? 'Expand' : 'Fold' "></component>
    </el-icon>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { GlobalStore } from "@/store";

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)

const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse })
}

</script>

<style lang='scss' scoped>
@import "../index.scss";
</style>