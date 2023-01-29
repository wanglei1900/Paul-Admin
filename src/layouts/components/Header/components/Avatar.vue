<template>
    <el-dropdown trigger="click">
        <div class="avatar">
            <img src="@/assets/images/avatar.gif" alt="avatar">
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :icon="User" @click="openDialog('infoRef')">个人信息</el-dropdown-item>
                <el-dropdown-item :icon="Edit" @click="openDialog('passwordRef')">修改密码</el-dropdown-item>
                <el-dropdown-item divided :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <!-- InfoDialog弹窗 -->
    <InfoDialog ref="infoRef" />
    <PasswordDialog ref="passwordRef" />
</template>

<script setup lang='ts'>
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import { LOGIN_URL } from "@/config/config";
import { logoutApi } from "@/api/modules/login";
import { User, Edit, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const router = useRouter()
const globalStore = GlobalStore()

const logout = () => {
    ElMessageBox.confirm('您是否确认退出登录', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type:'warning'
    })
    .then(async () => {
        // 1.调用退出登录接口
        await logoutApi()
        // 2.清除token
        globalStore.setToken("")
        // 3.重定向到登录页
        router.replace(LOGIN_URL)
        ElMessage.success("退出登录成功!")
    })
}

interface DialogExpose {
    openDialog: () => void
}

const infoRef = ref<null | DialogExpose>(null)
const passwordRef = ref<null | DialogExpose>(null)

const openDialog = (refName: string) => {
    if (refName === 'infoRef') return infoRef.value?.openDialog()
    passwordRef.value?.openDialog()
}

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>