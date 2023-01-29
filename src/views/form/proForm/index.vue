<template>
	<div class="card content-box">
		<el-alert title="通过 component :is 组件属性 && v-bind 属性透传，可以将 template 中的 html 代码全部改变为 columns 配置项，具体配置请看代码。" type="warning" :closable="false" />
		<component :is="'el-form'" v-bind="options.form" ref="proFormRef" :model="formData" :rules="formRules">
			<!-- 动态表单 -->
			<el-row style="width:100%" :gutter="0">
				<template v-for="item in options.columns" :key="item.prop">
					<el-col :span="item.formItem.span">
						<component :is="'el-form-item'" v-bind="item.formItem">
							<component :is="`el-${item.attrs.typeName}`" v-bind="item.attrs" v-model="formData[item.formItem.prop]" />
						</component>
					</el-col>
				</template>
			</el-row>
			<!-- 提交按钮 -->
			<el-form-item>
				<el-button type="primary" @click="submitForm(proFormRef)">提交</el-button>
				<el-button @click="resetForm(proFormRef)">重置</el-button>
			</el-form-item>
		</component>
	</div>
</template>

<script setup lang="ts" name="proForm">
import type { FormInstance, FormRules } from "element-plus";
import { checkPhoneNumber } from "@/utils/eleValidate";
import { ElMessage } from "element-plus";

const proFormRef = ref<FormInstance>();

// 表单提交字段
const formData = reactive<Record<string, any>>({
	username: "",
	password: "",
	phone: "",
	email: "",
	email2: ""
})

// 表单的验证
const formRules = reactive<FormRules>({
	phone: [{ required: true, validator: checkPhoneNumber, trigger: "blur" }],
})
// 表单的配置项
const options = ref({
	// 表单整体配置项
	form: {
		labelPosition: "right",
		labelWidth: "80px",
		size: "default",
		labelSuffix: " :",
	},
	// 表单列配置项 (formItem 代表 item 配置项，attrs 代表 输入、选择框 配置项)
	columns: [
		{
			formItem: { label: "用户名", span: 24, prop: "username", labelWidth: "80px", required: false },
			attrs: { typeName: "input", placeholder: "请输入用户名", autofocus: true, clearable: true, disabled: false }
		},
		{
			formItem: { label: "密码", span: 12, prop: "password", class: "data" },
			attrs: { typeName: "input", placeholder: "请输入密码", type: "password", clearable: true, }
		},
		{
			formItem: { label: "手机号", span: 24, prop: "phone" },
			attrs: { typeName: "input", placeholder: "请输入邮箱", clearable: true }
		},
		{
			formItem: { label: "邮箱", span: 12, prop: "email" },
			attrs: { typeName: "input", placeholder: "请输入邮箱", clearable: true }
		},
		{
			formItem: { label: "邮箱", span: 12, prop: "email2" },
			attrs: { typeName: "input", placeholder: "请输入邮箱", clearable: true }
		}
	],

});
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			ElMessage.success("提交的数据为 : " + JSON.stringify(formData));
		} else {
			console.log("error submit!", fields);
		}
	});
};
// 充值表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
