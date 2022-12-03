<template>
    <div class="layout-search-dialog">
        <i @click="handleOpen" class="iconfont icon-sousuo"></i>
        <el-dialog 
            v-model="isShowSearch" 
            @click="closeSearch" 
            :show-close="false"
            width="300px" 
            destroy-on-close 
            fullscreen   
        >
            <el-autocomplete
                v-model="searchMenu"
                ref="menuInputRef"
                :fetch-suggestions="searchMenuList"
                placeholder="菜单搜索 ：支持菜单名称、路径"
                @select="handleSelect"
            >
                <template #prefix>
					<el-icon><Search /></el-icon>
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
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { getFlatArr } from "@/utils/util";
import { AuthStore } from "@/store/modules/auth";

const router = useRouter()
const authStore = AuthStore()
const menuList = computed(()=> getFlatArr(authStore.authMenuList))

const searchMenuList = (queryString: string, cb: Function) => {
  const results = queryString ? menuList.value.filter(createFilter(queryString)) : menuList.value
  cb(results)
}

// 筛选菜单(菜单名称、路径),indexOf('')返回0
const createFilter = (queryString: string) => {
  return (restaurant: Menu.menuOptions) => {
    return (
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
    )
  }
}

// 打开搜索菜单
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

const closeSearch = ()=>{
    isShowSearch.value = false
}

// 点击调整对应的目录
const handleSelect = (menuItem :any)=>{
    if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, '_blank')
    else router.push(menuItem.path)
    closeSearch()
}

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>