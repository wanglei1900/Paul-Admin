import { App } from "vue";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import longpress from "./modules/longpress";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";


const directivesList: any = {
    // 自定义指令
    copy,
    waterMarker,
    draggable,
    debounce,
    throttle,
    longpress,
}

const directives = {
    install: function(app:App<Element>){
        Object.keys(directivesList).forEach(key => {
            // 注册所有自定义指令
            app.directive(key, directivesList[key])
        })
    }
}

export default directives