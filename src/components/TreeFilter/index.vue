<template>
	<div class="card filter">
		<h4 class="title sle" v-if="title">{{ title }}</h4>
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
			<!-- 
default-expand-all								是否默认展开所有节点	boolean	—	false
:node-key="id"									每个树节点用来作为唯一标识的属性，整棵树应该是唯一的	string
:data="multiple ? treeData : treeAllData"		展示数据	array
:show-checkbox="multiple"						节点是否可被选择	boolean	—	false
:check-strictly="false"							在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false	boolean	—	false
:current-node-key="!multiple ? selected : ''"	当前选中的节点	string / number
:highlight-current="!multiple"					是否高亮当前选中节点，默认值是 false。	boolean	—	false
:expand-on-click-node="true"					是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。	boolean	—	true
:check-on-click-node="multiple"					是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。	boolean	—	false
:props="defaultProps"							默认值
:filter-node-method="filterNode"				对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏	Function(value, data, node)
:default-checked-keys="multiple ? selected : []"	默认勾选的节点的 key 的数组	array
@node-click="handleNodeClick"					当节点被点击的时候触发	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
@check="handleCheckChange"						点击节点复选框之后触发	共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
			 -->
			<el-tree
				ref="treeRef"
				default-expand-all
				:node-key="id"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="false"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="true"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
				<template #default="scope">
					<span class="el-tree-node__label">
						<slot :row="scope">
							{{ scope.node.label }}
						</slot>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="TreeFilter">
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // treeFilter 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label",
	multiple: false
});

const defaultProps = {
	children: "children",
	label: props.label
};

const filterText = ref<string>("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);
// 选中的值
const selected = ref();

onBeforeMount(async () => {
	// 重新接收一下默认值
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
	else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";

	// 有数据就直接赋值，没有数据就执行请求函数
	if (props.data?.length) {
		treeData.value = props.data;
		treeAllData.value = props.data;
		return;
	}
	const { data } = await props.requestApi!();
	treeData.value = data;
	treeAllData.value = [{ id: "", [props.label]: "全部" }, ...data];
});

// 官网方法，开启搜索过滤节点
watch(filterText, val => {
	treeRef.value!.filter(val);
});

// 过滤,解决过滤节点不显示下级问题
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	let parentNode = node.parent,
		labels = [node.label],
		level = 1;
	// 循环出根节点下的所有子节点，并将label归入数组
	while (level < node.level) {
		labels = [...labels, parentNode.label];
		parentNode = parentNode.parent;
		level++;
	}
	return labels.some(label => label.indexOf(value) !== -1);
};

interface FilterEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

// 单选事件
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emit("change", data[props.id]);
};

// 多选框点击时间
const handleCheckChange = () => {
	emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
