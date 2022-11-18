
<template>
    <el-container class="layout-vertical">
        <el-aside>
            <div class="menu" style="width:210px">
                <div class="logo flex-center">
                    <img src="@/assets/images/logo.svg" alt="logo">
                    <span>Paul Admin</span>
                </div>
            </div>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <div>22</div>
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang='ts' name="layout">
import { ref, reactive } from 'vue';
import Main from "@/layouts/components/Main/index.vue";
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>