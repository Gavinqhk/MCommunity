//由于权限key需要一个唯一的key值，路由的名字也需要一个唯一的key值，后端在模块添加页没有增加一个字段，因此两个功能用了同一个key值
const map = {
  layout: "layout", //骨架
  home: "home", // 首页
  doctorManage: "doctorManage", // 医生管理
};
export default map;
