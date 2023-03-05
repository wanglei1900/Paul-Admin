<template>
<div class="tool-bar-ri">
    <div class="header-icon">
        <SearchMenu id="searchMenu" />
        <Message id="message" />
        <FullScreen id="fullScreen" />
    </div>
    <span class="username">Paul</span>
    <Avatar />
</div>
</template>

<script setup lang='ts'>
import SearchMenu from "./components/SearchMenu.vue";
import Message from "./components/Message.vue";
import FullScreen from "./components/FullScreen.vue";
import Avatar from "./components/Avatar.vue";

</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>