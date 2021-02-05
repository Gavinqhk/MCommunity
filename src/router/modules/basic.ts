import { CustomRoute } from "@router/types";
const routes: Array<CustomRoute> = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      hidden: true,
      title: process.env.VUE_APP_APPNAME,
    },
  },
  {
    path: "/index",
    name: "index",
    component: (): any => import("@/modules/router.vue"),
    meta: {
      hidden: true,
      title: process.env.VUE_APP_APPNAME,
    },
  },
  {
    path: "/404",
    name: "404",
    component: (): any => import("@/modules/error-pages/404.vue"),
    meta: {
      hidden: true,
      title: "404",
      needToken: false,
    },
  },
  { path: "**", redirect: "/404", meta: { title: "404", needToken: false, hidden: true } },
];
export default routes;
