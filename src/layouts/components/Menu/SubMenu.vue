<template>
    <template v-for="subItem in menuList" :key="subItem.path">
        <el-sub-menu v-if="subItem.children && subItem.children.length" :index="subItem.path">
            <template #title>
                <el-icon>
                    <component :is="subItem.meta.icon"></component>
                </el-icon>
                <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menuList="subItem.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="subItem.path" @click="clickMenu(subItem)">
            <el-icon>
                <component :is="subItem.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ subItem.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

defineProps<{ menuList: Menu.MenuOptions[] }>()

const router = useRouter()

const clickMenu = (subItem: Menu.MenuOptions) => {
    if (subItem.meta.isLink) window.open(subItem.meta.isLink, "_blank")
    router.push(subItem.path)
}

</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
