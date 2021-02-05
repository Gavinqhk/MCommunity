import { CustomRoute } from "@router/types";
import authCodeMap from "@/dataBase/authCodeMap";
const routes: Array<CustomRoute> = [
  {
    path: "/orgnizationManage",
    name: authCodeMap.home,
    component: (): any => import("@/modules/home/pages/index.vue"),
    meta: {
      hidden: true,
      title: process.env.appName,
    },
  },
];
export default routes;
