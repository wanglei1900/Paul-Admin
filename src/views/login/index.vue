<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-logo flex-center">
                <img src="logo-icon" alt="">
                <h2 class="logo-text">Paul-Admin</h2>
            </div>
            <LoginFrom />
        </div>
    </div>
</template>

<script setup lang='ts' name="login">
import LoginFrom from './components/LoginForm.vue'
</script>

<style lang='scss' scoped>
@import "./index.scss"
</style>