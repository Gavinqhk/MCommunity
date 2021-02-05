import { CustomRoute } from "@router/types";
import authCodeMap from "@/dataBase/authCodeMap";
const routes: Array<CustomRoute> = [
  {
    path: "/doctorManage",
    name: authCodeMap.doctorManage,
    component: (): any => import("@/modules/baseData/doctorManage/pages/index.vue"),
    meta: {
      hidden: true,
      title: process.env.appName,
    },
  },
];
export default routes;
