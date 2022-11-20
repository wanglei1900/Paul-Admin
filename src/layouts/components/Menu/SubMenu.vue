<template>
    {{ menuList }}
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';

defineProps<{menuList:Menu.menuOptions[]}>()

</script>
