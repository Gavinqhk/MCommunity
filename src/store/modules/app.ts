import { CustomRoute } from "@router/types";
import { setSession, getSession } from "@utils/localStorageUtil";
import { ls_sideMenus } from "@/dataBase/localStorageKeys";
const sideMenus = getSession(ls_sideMenus);
const app = {
  // namespaced: true,
  state: { sideMenus: sideMenus || [] },
  mutations: {
    setSideMenus(state: any, sideMenus: Array<CustomRoute>) {
      setSession(ls_sideMenus, sideMenus);
      state.sideMenus = sideMenus;
    },
  },
};
export default app;
