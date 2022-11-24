<template>
    <template v-for="subItem in menuList">
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
            <!-- <template #title> -->
                <el-icon>
                    <component :is="subItem.meta.icon"></component>
                </el-icon>
                <span>{{ subItem.meta.title }}</span>
            <!-- </template> -->
        </el-menu-item>
    </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

defineProps<{ menuList: Menu.menuOptions[] }>()

const router = useRouter()

const clickMenu = (subItem: Menu.menuOptions) => {
    if (subItem.meta.isLink) window.open(subItem.meta.isLink, "_blank")
    router.push(subItem.path)
}

</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
