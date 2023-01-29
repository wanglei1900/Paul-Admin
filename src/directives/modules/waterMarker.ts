/*
 * @Author: paul
 * @Date: 2022-12-06 23:24:45
 * @LastEditTime: 2022-12-06 23:38:27
 * @LastEditors: your name
 ! @Description: v-waterMarker 的自定义指令,g给整个页面添加背景水印
 * @FilePath: \Paul-Admin\src\directives\modules\waterMarker.ts
 * 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
 */

/* 
   1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
   2、将其设置为背景图片，从而实现页面或组件水印效果
 
 使用：设置水印文案，颜色，字体大小即可
 <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

import type { Directive, DirectiveBinding } from "vue";

const waterMarker = {
	mounted(el: DirectiveBinding, binding: DirectiveBinding) {
		addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
	}
};

const addWaterMarker: Directive = (str: string, parentNode: any, font: any, textColor: string) => {
	// 水印文字，父元素，字体，文字颜色
	let can: HTMLCanvasElement = document.createElement("canvas");
	parentNode.appendChild(can);
	can.width = 205;
	can.height = 140;
	can.style.display = "none";
	let cans = can.getContext("2d") as CanvasRenderingContext2D;
	cans.rotate((-20 * Math.PI) / 180);
	cans.font = font || "16px Microsoft JhengHei";
	cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
	cans.textAlign = "left";
	cans.textBaseline = "Middle" as CanvasTextBaseline;
	cans.fillText(str, can.width / 10, can.height / 2);
	parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
};


export default waterMarker

