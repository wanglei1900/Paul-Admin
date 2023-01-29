<template>
    <div class="layout-search-dialog">
        <i @click="handleOpen" class="iconfont icon-sousuo"></i>
        <el-dialog v-model="isShowSearch" @click="closeSearch" :show-close="false" width="300px" destroy-on-close
            fullscreen>
            <el-autocomplete v-model="searchMenu" ref="menuInputRef" :fetch-suggestions="searchMenuList"
                placeholder="菜单搜索 ：支持菜单名称、路径" @select="handleSelect" @click.stop>
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
                <template #default="{ item }">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-autocomplete>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from "vue-router";
import { AuthStore } from "@/store/modules/auth";

const router = useRouter()
const authStore = AuthStore()
// 取得打平的菜单数组并且过滤掉不显示的
const menuList = computed(() => authStore.flatMenuListGet.filter(item => !item.meta.isHide))

// 以下两个方法参照el+的官网例子
const searchMenuList = (queryString: string, cb: Function) => {
    const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value
    cb(results)
}
// 筛选菜单(菜单名称、路径),indexOf('')返回0
const filterNodeMethod = (queryString: string) => {
    return (restaurant: Menu.MenuOptions) => {
        return (
            restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
            restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        )
    }
}

// 打开搜索窗
const isShowSearch = ref(false)
const searchMenu = ref("")
const menuInputRef = ref()
const handleOpen = () => {
    isShowSearch.value = true
    searchMenu.value = ""
    setTimeout(() => {
        menuInputRef.value.focus()
    });
}
// 关闭搜索窗
const closeSearch = () => {
    isShowSearch.value = false
}

// 点击调整对应的目录
const handleSelect = (menuItem: any) => {
    if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, '_blank')
    router.push(menuItem.path)
    closeSearch()
}

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>