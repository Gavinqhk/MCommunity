import { CustomRoute } from "@router/types";
import authCodeMap from "@/dataBase/authCodeMap";
const routes: Array<CustomRoute> = [
  {
    path: "/",
    name: "index",
    component: (): any => import("@/modules/router.vue"),
    redirect: "/home",
    meta: {
      hidden: true,
      title: process.env.VUE_APP_APPNAME,
    },
    children: [
      {
        path: "/home",
        name: authCodeMap.home,
        component: (): any => import("@/modules/home/pages/index.vue"),
        meta: {
          hidden: true,
          title: process.env.VUE_APP_APPNAME,
        },
      },
    ],
  },
];
export default routes;
