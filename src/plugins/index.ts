import service from "@/service/index";
import Vue from "vue";
import svgInstall from "@/icons";
import ElementUI from "element-ui";
export default (): void => {
  Vue.prototype.$service = service;
  svgInstall();
  Vue.use(ElementUI);
};
