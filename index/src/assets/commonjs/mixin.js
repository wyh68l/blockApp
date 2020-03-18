/*
* mixins混入
* 通过vue的mixins混入属性，可以提取不同组件的中相同的功能，提高代码的复用性
*就像是额外创建组件一样，将重复的功能提取出来，再通过在不同的组件中引用
* 再在vue实例中引入mixins:[引入的功能名如：back]就可以实现功能的复用了
*
* 不管是data，methods，created，components等等都可以进行混入，
* 就像额外写一个新组件一样
* */
import {mapGetters} from 'vuex';
import {Init} from '@/server/server.js';

export const languageMixin = {
  data(){
    return {
      langType: 'zh-cn',
      lang: JSON.parse(localStorage.getItem('lang')),
    }
  },
  created(){
    //this.InitLanguage();
    this.loginState();//检测登录状态

    /*判断是否是ios设备，是的话，则不预留padding*/
    let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isIOS){
      document.body.style.paddingTop = '0';
    }
  },
  methods:{
    //解决多语言的异步问题
    InitLanguage(){
      return new Promise( resolve => {
        this.setLanguage(resolve);//设置语言类型
      }).then(()=>{
        return new Promise(resolve => {
          this.getLanguage(resolve);//获取语言数据
        })
      })
    },
    loginState(){
      Init.loginState().then(res => {})
      setInterval(()=>{
        Init.loginState().then(res => {})
      },60000)
    },
    getLanguage(resolve){
      if(this.lang === null || this.lang === undefined){
        Init.getLanguage().then(res => {
          if(res.code === 1){
            //将数据保存到vuex，再保存到本地localStorage
            this.$store.commit('saveLang', res.data);
            this.lang = JSON.parse(localStorage.getItem('lang'));
            resolve();
          }else{
            mui.toast(res.msg);
            resolve();
          }
        })
      }else{
        resolve();
      }
    },
    setLanguage(resolve){
      console.log(this.$route);
      if(this.$route.query.language){
        this.langType = this.$route.query.language;
        console.log(this.langType);
        console.log(this.languageType);
        if(this.langType !== this.languageType){
          Init.setLanguage({type:this.langType}).then(res=>{
            if(res.code == 1){
              this.$store.commit('saveLanguage', this.langType);
              localStorage.removeItem('lang');
              this.lang = null;
              this.getLanguage(resolve);
              //mui.alert(res.msg);
              //resolve();
            }else{
              resolve();
              //mui.toast(res.msg);
              return ;
            }
          })
        }else{
          resolve();
        }
      }else{
        console.log(this.langType);
        this.$store.commit('saveLanguage', this.langType);
        resolve();
        //mui.toast('语言获取失败');
      }
    },
  },
  computed:{
    ...mapGetters(['languageType'])
  }
}

export const changeCoinType = {
  data() {
    return {
      changeCoinIndex:1
    }
  },
  created(){
    this.initCoin();
  },
  methods: {
    //初始化币种
    initCoin(){
      let getIndex = localStorage.getItem('changeCoinIndex');
      if(getIndex){
        this.changeCoinIndex = Number(getIndex);
      }else{
        this.changeCoinIndex = 1;
        localStorage.setItem('changeCoinIndex',this.changeCoinIndex);
      }
    },
    /*切换usdt和xkb*/
    changeCoinType(){
      let getIndex = localStorage.getItem('changeCoinIndex');
      if(getIndex){
        getIndex = Number(getIndex) === 1?0:1;
        this.changeCoinIndex = getIndex;
        localStorage.setItem('changeCoinIndex',getIndex);
      }else{
        this.changeCoinIndex = 0;
        localStorage.setItem('changeCoinIndex',this.changeCoinIndex);
      }
      //console.log(getIndex);
    },
  }
}
