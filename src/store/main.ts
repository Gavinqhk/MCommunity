import { setSession, getSession } from "@utils/localStorageUtil";
import { ls_userInfo } from "@dataBase/localstorageKey";
const userInfo = getSession(ls_userInfo);
const main = {
  state: {
    userInfo: userInfo ? userInfo : {},
  },
  mutations: {
    setUserInfo(state: any, userInfo: any) {
      setSession(ls_userInfo, userInfo);
      state.userInfo = userInfo;
    },
  },
};