import { CustomRoute } from "@router/types";
import authCodeMap from "@/dataBase/authCodeMap";
const routes: Array<CustomRoute> = [
  {
    path: "/baseData",
    name: "baseData",
    component: (): any => import("@/modules/router.vue"),
    meta: {
      hidden: true,
      title: process.env.VUE_APP_APPNAME,
    },
    children: [
      {
        path: "/doctorManage",
        name: authCodeMap.home,
        component: (): any => import("@/modules/baseData/pages/doctorManage/index.vue"),
        meta: {
          hidden: true,
          title: process.env.VUE_APP_APPNAME,
        },
      },
      {
        path: "/userManage",
        name: authCodeMap.home,
        component: (): any => import("@/modules/baseData/pages/userManage/index.vue"),
        meta: {
          hidden: true,
          title: process.env.VUE_APP_APPNAME,
        },
      },
      {
        path: "/organizationManage",
        name: authCodeMap.home,
        component: (): any => import("@/modules/baseData/pages/organizationManage/index.vue"),
        meta: {
          hidden: true,
          title: process.env.VUE_APP_APPNAME,
        },
      },
    ],
  },
];
export default routes;
