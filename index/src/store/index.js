import Vue from 'vue';
import Vuex from 'vuex';
import storePlugin from '../assets/commonjs/storePlugin';
import {HB} from '../assets/commonjs/utils';
//注册Vuex插件
Vue.use(Vuex);

//设置全局变量
export default new Vuex.Store({
  state: {
    session: null,                               //从服务器端返回的登录信息
    userInfo: null,                              //登录用户信息
    navIndex: 1,   //底部导航栏的index
    API: process.env.API + process.env.PORT,     //总api 开发
    // API:process.env.API,     //总api  打包
    browserUrl: null,   //浏览器地址
    custom: null, //客服
    storeBg: null, //商城图片
    userID: null, //用户id
    isreal: null,  // 是否实名
    tempData: null, //临时数据
    cookie: null, //登录的cookie
    version: null, //版本号
    screenH: null,  //屏幕高度
    language: 'zh-cn',
    languageType: 'zh-cn',  //当前语言类型
    lang: null,//多语言数据
  },
  mutations: {
    //将session存储为全局变量
    saveSession(state, session) {
      state.session = session;
    },
    saveUserInfo(state, info) {
      state.userInfo = info;
    },
    saveNavInd(state, ind) {
      state.navIndex = ind;
    },
    saveBrowser(state, url) {
      state.browserUrl = url;
    },
    saveCustom(state, string) {
      state.custom = string;
    },
    saveStoreBg(state, url) {
      state.storeBg = url;
    },
    saveUserID(state, obj) {
      state.userID = obj;
    },
    saveTemp(state, obj) {
      state.tempData = obj;
    },
    saveVersion(state, str) {
      state.version = str;
    },
    saveLanguage(state, str) {
      state.languageType = str;
      localStorage.setItem('languageType', state.languageType);
    },
    saveLang(state, str) {
      state.lang = JSON.stringify(str);
      localStorage.setItem('lang', state.lang);
    }
  },
  getters: {
    getSession(state) {
      return state.session;
    },
    userInfo(state) {
      if (!state.userInfo) {
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return state.userInfo;
      } else {
        return state.userInfo;
      }
    },
    uid(state) {
      if (!state.userID) {
        state.userID = localStorage.getItem('user_id');
        return state.userID;
      } else {
        return state.userID;
      }
    },
    isreal(state) {
      if (!state.userInfo) {
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return state.userInfo.isreal;
      } else {
        return state.userInfo.isreal;
      }
    },
    api(state) {
      return state.API
    },
    temp(state) {
      if (!state.tempData) {
        state.tempData = JSON.parse(localStorage.getItem('temp'));
        return state.tempData;
      } else {
        return state.tempData;
      }
    },
    version(state) {
      if (!state.version) {
        state.version = localStorage.getItem('version');
        return state.version;
      } else
        return state.version
    },
    screenH(state) {
      if (!state.screenH) {
        state.screenH = window.screen.height || window.screen.availHeight || window.innerHeight;
        return state.screenH
      } else {
        return state.screenH
      }
    },
    languageType(state) {
      state.languageType = localStorage.getItem('languageType');
      return state.languageType
      //  if(!state.languageType){
      //     state.languageType = localStorage.getItem('languageType');
      //     return state.languageType
      // }else {
      //     return state.languageType
      // }
    },
    language(state) {
      // if(!state.languageType){
      //   state.languageType = localStorage.getItem('languageType');
      //   return state.languageType
      // }else {
      //   return state.languageType
      // }
    },
    lang() {
      if (localStorage.getItem('lang')) {
        return JSON.parse(localStorage.getItem('lang'));
      }
    }
  },
  // plugins:[storePlugin]
})
