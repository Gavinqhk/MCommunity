import { CustomRoute } from "@router/types";
import authCodeMap from "@/dataBase/authCodeMap";
const routes: Array<CustomRoute> = [
  {
    path: "/",
    name: authCodeMap.layout,
    component: (): any => import("@/modules/index.vue"),
    redirect: "/home",
    meta: {
      title: "layout",
    },
    children: [
      {
        path: "/home",
        name: authCodeMap.home,
        component: (): any => import("@/modules/home/pages/index.vue"),
        meta: {
          hidden: true,
          title: process.env.appName,
        },
      },
    ],
  },
];
export default routes;
