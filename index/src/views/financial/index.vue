<template>
  <div class="page">
    <m-header :title="language.lease" :canback="Boolean(true)" class="header" @back="goBack"
              :setback="Boolean(true)">
        <span class="change" @click="changeCoinType">
      {{changeCoin[changeCoinIndex]}}
      <img src="~assets/images/bjwz/change.png" alt="">
      </span>
    </m-header>
    <div class="top_bar">
      <h3>{{language.historical}}≈<span>{{listProfit.pool}}</span></h3>
      <div class="btn">
        <button @click="goTo('MyRent')">{{language.my_lease}}</button>
        <button @click="goTo('Collocation_2')">{{language.rent}}</button>
      </div>
    </div>

    <div class="introduction">
      <textarea v-html="Introduce" readonly></textarea>
    </div>
    <div class="img">
      <h3>{{language.revenue}}</h3>
    </div>
    <!--    <div class="rank" :style="'height:'+(screenH-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">-->
    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.name}}</li>
          <li>{{language.total}}</li>
          <li>{{language.income}}</li>
          <li>{{language.cycle}}</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in listProfit.list" :key="index">
            <ul>
              <li>{{item.username}}</li>
              <li>{{item.profit}}</li>
              <li>{{item.profit_bi}}%</li>
              <li>{{item.month}}{{language.month}}</li>
            </ul>
          </li>
          <li v-if="listProfit.list && listProfit.list.length === 0" class="nomore">
            <span>{{lang?lang.common.no_more:''}}</span>
          </li>
        </ul>
        <button class="rent" @click="goTo('Rent')">{{language.immediate_lease}}</button>
      </div>
    </div>
  </div>
</template>
<script>
    import {Trade, Init} from "@/server/server.js";
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    import {mapGetters} from 'vuex';

    require("swiper/dist/css/swiper.css"); //引入swiper.css
    export default {
        data() {
            return {
                listProfit: {},
                Introduce: null,
                changeCoin:[],
                changeCoinIndex:1,
                formData: {
                    account: null,
                },
                language: {},
                isLogin: false
            };
        },
        mixins: [languageMixin],
        created() {
            //this.login();
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.changeCoin[0] = 'USDT'+this.lang.machine.valuation;
                this.changeCoin[1] = 'XKB'+this.lang.machine.valuation;
                new Promise(resolve => {
                    this.setCoinNameType(resolve);
                }).then(()=>{
                    this.getProfit();
                    this.getIntroduce();
                })
            })
        },
        computed: {
            ...mapGetters(['api', 'screenH'])
        },
        methods: {
            //判断是否有登录
            checkLogin(resolve) {
                console.log('openid:' + this.$route.query.openid);
                if (this.$route.query.openid) {
                    this.formData.account = this.$route.query.openid;
                    this.login(resolve);
                    Init.loginState().then(res => {})
                    // this.checkBind(resolve,{userid:this.formData.account});
                } else {
                    mui.toast('您还没有登录哦');
                    //this.goBack();
                }
            },
            goBack() {
                //注销
                Init.quit().then(res => {
                    if (res.code == 1) {
                            try {
                                if (plus) {
                                    plus.webview.currentWebview().close();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                    } else {
                            try {
                                if (plus) {
                                    plus.webview.currentWebview().close();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                            return
                    }
                })
            },
            login(resolve) {
                let params = this.formData;
                Init.login(params).then((res) => {
                    if (res.code == 1) {
                        localStorage.setItem('user_id', res.data.id);
                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                        this.$store.commit('saveUserInfo', res.data);
                        localStorage.setItem('cookie', res.data.token);
                        this.isLogin = true;//如果是登录状态，则将开关打开继续正常流程
                        resolve();

                    } else {
                        setTimeout(() => {
                            //this.goBack();
                            mui.toast(res.msg);
                            resolve();
                            return;
                        }, 1000);
                    }
                })
            },
            setCoinNameType(resolve){
                Trade.setCoinNameType({coinName_type:this.changeCoinIndex}).then(res=>{
                    if (res.code === 1) {
                        console.log(res.msg);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            changeCoinType(){
                this.changeCoinIndex = this.changeCoinIndex===1?0:1;
                // console.log(this.changeCoinIndex);
                new Promise(resolve => {
                    this.setCoinNameType(resolve);
                }).then(()=>{
                    // this.getCoinNameType();
                    this.getProfit();
                    this.getIntroduce();
                })
            },
            getCoinNameType(){
                Trade.getCoinNameType().then(res=>{
                    if (res.code === 1) {
                        console.log('get'+res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getProfit() {
                Trade.getProfit().then(res => {
                    if (res.code === 1) {
                        this.listProfit = res.data;
                        console.log(this.listProfit);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getIntroduce() {
                Trade.getIntroduce().then(res => {
                    if (res.code === 1) {
                        //console.log(res);
                        this.Introduce = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            checkBind(resolve,openid) {
                Trade.checkBind(openid).then(res => {
                    if (res.code === 1) {
                        //  console.log(res);
                        //  this.login(resolve);
                        //  Init.loginState().then(res => {})
                    } else {
                        resolve();
                        mui.toast(res.msg);
                    }
                })
            },
            goTo(routerName) {
                //this.$router.push({name: routerName});
                //每进一个页面，都要先判断是否是登录状态
                new Promise(resolve => {
                    this.checkLogin(resolve);
                }).then(() => {
                    //登录开关
                    if (this.isLogin) {
                        this.$router.push({name: routerName});
                    }
                })

            }
        }
    };
</script>

<style lang="less" scoped>
  @import "~link-less";

  .page {
    overflow: auto;
    padding-bottom: 100px;

    .header /deep/ .header {
      position: fixed;

      .change{
        font-size: 14px;
        color:rgba(51,133,255,1);

        img{
          vertical-align: center;
          transform: translate(0,8px);
        }
      }
    }

    .footer /deep/ {
      position: fixed;
      width: 100%;
      bottom: 0;
    }

    .top_bar {
      width: 94%;
      height: 275px;
      background: rgba(51, 133, 255, 1);
      box-shadow: 0px 0px 5px 0px rgba(91, 131, 255, 0.6);
      border-radius: 8px;
      margin: 0 auto;
      margin-top: 26px;
      margin-bottom: 46px;
      padding-bottom: 30px;

      h3 {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
        text-align: center;
        margin-top: 40px;
      }

      .btn {
        margin: 0 auto;
        width: 60%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        button {
          width: 180px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 1);
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 133, 255, 1);
          line-height: 60px;
        }
      }

    }

    .introduction {
      width: 94%;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;
      padding: 40px;

      textarea {
        min-height: 300px;
        max-height: 300px;
        overflow: scroll;
      }
    }

    .img {
      margin: 30px auto;

      h3 {
        width: 524px;
        height: 88px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 110px;
        text-align: center;
        background: url("~assets/images/bjwz/iconsy.png") no-repeat;
        background-size: contain;
      }
    }

    .nomore {
      text-align: center;
      padding-top: 50px;
      color: #666666;
      font-size: 28px;
    }

    .rank {
      width: 94%;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;

      .topNav {
        height: 88px;
        background: linear-gradient(130deg, rgba(52, 136, 255, 1) 0%, rgba(51, 133, 255, 1) 100%);
        border-top-left-radius: 26px;
        border-top-right-radius: 26px;
        color: white;

        ul {
          .display-flex;
          justify-content: space-between;

          li {
            flex: 1;
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 88px;
            text-align: center;
          }
        }
      }

      .content {
        ul {
          .item {
            border-bottom: 2px solid #F4F4F4;

            ul {
              max-height: 500px;
              overflow: scroll;
              .display-flex;
              justify-content: space-between;

              li {
                flex: 1;
                text-align: center;
                font-size: 28px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                padding: 30px 0;
              }
            }
          }
        }
      }

      .rent {
        width: 590px;
        height: 90px;
        margin-left: 50px;
        background: rgba(51, 133, 255, 1);
        border-radius: 16px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
        margin-top: 100px;
        margin-bottom: 70px;
      }
    }
  }


</style>
