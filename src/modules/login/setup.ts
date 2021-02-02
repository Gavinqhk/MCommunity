/**模块的初始化脚本
 * 为什么会存在这个脚本？
 * 因为我们可能需要在模块的代码运行之前做一些初始化的操作，比如注入该模块的service相关的方法，在vue的实例methods方法里能够这样访问this.$service.home[某个业务方法名];
 * 如果觉得这样的访问路径长，可以在模块通用mixins里添加一个方法getService，获取，参考home模块目录下的service/index.
 */
/**不利于tree shaking */
// import moduleService from "./service";
// import $service from "@/service";
// import $mixin from "./mixin/basic";
// $service[moduleService.name] = moduleService; //注入this.$service.login,是否要注入看自己需求 ，因为每个页面都要import setup，目前来看不注入也可以
// export const mixin = $mixin;
// export const service = $service;

/**有利于tree shaking */

import { login } from "./service";
import { loginUtil as $loginUtil } from "./utils";
// import $service from "@/service";
// $service[moduleService.name] = moduleService;//注入this.$service.login,是否要注入看自己需求 ，因为每个页面都要import setup，目前来看不注入也可以
export const service = {
  login,
};
export const loginUtil = $loginUtil;
