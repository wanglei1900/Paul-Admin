<template>
	<div class="card content-box">
		<span class="text"> 引导页 🍓🍇🍈🍉</span>
		<el-alert
			title="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js."
			type="warning"
			:closable="false"
		/>
		<div id="Paul"><el-button type="primary" @click.prevent.stop="guide">打开引导页 🤹‍♂️</el-button></div>
	</div>
</template>

<script setup lang="ts" name="guide">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

const guide = () => {
	const driver: Driver = new Driver({
		allowClose: false,
		doneBtnText: "结束",
		closeBtnText: "关闭",
		nextBtnText: "下一步",
		prevBtnText: "上一步"
	});
	driver.defineSteps(steps);
	driver.start();
};

const steps = [
	{
		element: "#collapseIcon",
		popover: {
			title: "折叠图标",
			description: "折叠或展开侧边栏",
			position: "right"
		}
	},
	{
		element: "#menusScrollbar",
		popover: {
			title: "菜单栏",
			description: "侧边菜单栏",
			position: "right"
		}
	},
	{
		element: "#breadcrumb",
		popover: {
			title: "面包屑",
			description: "展示当前页面所处层级",
			position: "right"
		}
	},
	{
		element: "#searchMenu",
		popover: {
			title: "菜单搜索",
			description: "快速导航至指定菜单目录",
			position: "left"
		}
	},
	{
		element: "#message",
		popover: {
			title: "消息提醒",
			description: "接受一系列消息提醒",
			position: "left"
		}
	},
	{
		element: "#fullScreen",
		popover: {
			title: "全屏",
			description: "点击进入全屏或退出全屏",
			position: "left"
		}
	},
	{
		element: "#avatar",
		popover: {
			title: "头像",
			description: "个人设置",
			position: "left"
		}
	},
	{
		element: "#moreButtons",
		popover: {
			title: "更多按钮",
			description: "页面操作及tab标签管理",
			position: "left"
		}
	},
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
