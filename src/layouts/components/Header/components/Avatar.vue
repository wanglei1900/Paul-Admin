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
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import { LOGIN_URL } from "@/config/config";
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
    .then(() => {
        router.replace(LOGIN_URL)
        globalStore.setToken("")
        ElMessage({
            type: 'success',
            message: '退出登录成功'
        })
    })
}

const infoRef = ref<null | DialogExpose>(null)
const passwordRef = ref<null | DialogExpose>(null)

interface DialogExpose {
    openDialog: () => void
}
const openDialog = (refName: string) => {
    if (refName === 'infoRef') return infoRef.value?.openDialog()
    passwordRef.value?.openDialog()
}

</script>

<style lang='scss' scoped>
@import "../index.scss"
</style>