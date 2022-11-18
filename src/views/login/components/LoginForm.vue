<template>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名：admin">
                <template #prefix>
                    <el-icon><Avatar /></el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password>
                <template #prefix>
                    <el-icon><Lock /></el-icon>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
    <div class="loginBtn">
        <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">重置</el-button>
        <el-button :icon="UserFilled" round size="large" type="primary" @click="login(loginFormRef)" :loading="loading">登录</el-button>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import { Login } from "@/api/interface"
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { ElNotification } from "element-plus";
import { getSayHello } from "@/utils/util";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { FormInstance } from 'element-plus'
import md5 from "js-md5";

const router = useRouter()
const globalStore = GlobalStore()

// 定义表单类型
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<Login.ReqLoginForm>({ username: '', password: '', })
const loginRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loading = ref(false)

const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        try {
            // 1.点击请求登录接口,保存token
            const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) })
            globalStore.setToken(data.access_token)
            console.log('请求了登录接口', data);

            // 2.添加动态路由

            // 3. 清除上个账户的tab信息

            // 4.跳转到首页
            router.push(HOME_URL)
            ElNotification({
                title: getSayHello(),
                message: '欢迎登录 Paul-Admin',
                type: 'success',
                duration: 3000
            })

        } finally {
            loading.value = false
        }
    })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(() => {
    document.onkeydown = (e: any) => {
        e = window.event || e
        if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
            if (loading.value) return
            login(loginFormRef.value)
        }
    }
})
</script>

<style lang='scss' scoped>
@import "../index.scss";
</style>