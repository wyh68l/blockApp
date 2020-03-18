<template>
  <div class="page">
    <m-header :title="language.machine_rental" :canback="Boolean(true)" class="header" @back="goBack"
              :setback="Boolean(true)">
      <span class="change" @click="changeCoinType">
      {{changeCoin[changeCoinIndex]}}
      <img src="~assets/images/bjwz/change.png" alt="">
      </span>
    </m-header>

    <div class="myCar" @click="goTo('MyRentCar',{typeId:changeCoinIndex})">
      <h3>{{language.my_machine}}>></h3>
    </div>

    <div class="topNav">
      <ul>
        <li v-for="(item,index) in carTitle?carTitle:[]" :key="index" @click="getCarList(categoryid[categoryIndex = index])">
          {{item.name}}
        </li>
      </ul>
    </div>

    <div class="content">
      <ul class="active" v-lazy-load="lazyLoad"
          :style="'height:'+(screenHeight-300)+'px;overflow:auto;'">
        <li v-for="(item,index) in carList?carList:[]" :key="index">
          <div class="icon">
            <img :src="api+item.image" alt="">
          </div>
          <div class="itemLeft">
            <h3>{{item.name}}</h3>
            <p v-show="changeCoinIndex === 0">XKB：{{item.price}}~{{item.max_price}}</p>
            <p v-show="changeCoinIndex === 1">USDT：{{item.usdt_price}}~{{item.usdt_max_price}}</p>
            <p>{{language.cycle}}：<span v-for="(item2,index2) in item.list" :key="index2">
              {{item2.life}}
              <span v-if="item.list.length > 1 && item.list.length !== index2+1">/</span>
              </span>
            </p>
            <p v-show="changeCoinIndex === 0">{{language.daily_income}}：<span v-for="(item3,index3) in item.list" :key="index3">
              {{item3.nissan}}%
              <span v-if="item.list.length > 1 && item.list.length !== index3+1">~</span>
              </span>
            </p>
            <p v-show="changeCoinIndex === 1">{{language.daily_income}}：<span v-for="(item3,index3) in item.list" :key="index3">
              {{item3.usdt_nissan}}%
              <span v-if="item.list.length > 1 && item.list.length !== index3+1">~</span>
              </span>
            </p>
          </div>
          <div class="itemRight">
            <button @click="goTo('CarInfo',{id:item.id,typeId:changeCoinIndex})">{{language.lease}}</button>
          </div>
        </li>
        <p v-if="carList.length === 0" class="noMore">{{lang?lang.common.no_more:''}}</p>
      </ul>
    </div>

  </div>
</template>
<script>
    import {Index, Init} from '@/server/server.js';
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {languageMixin,changeCoinType} from '@/assets/commonjs/mixin'
    import {mapGetters} from 'vuex';
    import navItem from '@/components/order-nav-item.vue';

    export default {
        components: {
            navItem
        },
        data() {
            return {
                carList: [],
                carTitle: [],
                page: 1,
                success: false,
                categoryIndex:0,
                changeCoin:[],
                categoryid: [],
                noMore: false,
                isLogin: false,
                formData: {
                    account: null,
                },
                language: {},
            };
        },
        mixins: [languageMixin,changeCoinType],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.machine;
                this.changeCoin[0] = 'USDT'+this.language.valuation;
                this.changeCoin[1] = 'XKB'+this.language.valuation;
                this.getCarCategory();
            })
            this.screenHeight = window.screen.availHeight;
        },
        computed: {
            ...mapGetters(['screenH', 'api'])
        },
        methods: {
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
                            return;
                    }
                })
            },
            login(resolve) {
                let params = this.formData;
                let msg = Util.isValidate(params);
                if (msg) {
                    mui.toast(msg);
                    return;
                }

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
                            resolve();
                            mui.toast(res.msg);
                            return;
                        }, 1000);
                    }
                })
            },
            //判断是否有登录
            checkLogin(resolve) {
                console.log('openid:' + this.$route.query.openid);
                if (this.$route.query.openid) {
                    this.formData.account = this.$route.query.openid;
                    this.login(resolve);
                    Init.loginState().then(res => {})
                } else {
                    mui.toast('您还没有登录哦');
                    //this.goBack();
                }
            },
            goTo(routerName, options) {
                //每进一个页面，都要先判断是否是登录状态
                //this.$router.push({name: routerName, query: {id:options.id,typeId: options.typeId}});
                new Promise(resolve => {
                    this.checkLogin(resolve);
                }).then(() => {
                    //登录开关
                    if (this.isLogin) {
                        //正常流程
                        this.$router.push({name: routerName, query: {id:options.id,typeId: options.typeId}});
                    }
                })
            },
            getCarCategory() {
                Index.getMine().then(res => {
                    console.log(res.data);
                    if (res.code === 1) {
                        this.carTitle = res.data;
                        this.carTitle.forEach(item => {
                            this.categoryid.push(item.id)
                        })
                        this.getCarList();
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getCarList(categoryid = this.categoryid[this.categoryIndex]) {
                Index.getRentCarList({categoryid: categoryid, page: this.page}).then(res => {
                    console.log(res);
                    if (res.code === 1) {
                        if (this.page >= res.totalpage) {
                            this.noMore = true;
                        }
                        this.carList = res.data
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    this.getCarList();
                }
            }
        }
    };
</script>
<style lang="less" scoped>
  @import "~link-less";

  .page {
    overflow: auto;

    .header /deep/ header {
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

    .myCar {
      background-color: #fff;
      height: 384px;
      margin-bottom: 20px;
      padding: 42px 0;

      h3 {
        background: url("~assets/images/bjwz/bg1.png") no-repeat;
        background-size: contain;
        width: 686px;
        height: 300px;
        margin: 0 auto;
        font-size: 34px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        padding-top: 126px;
        padding-left: 388px;
      }
    }

    .topNav {
      height: 88px;
      background-color: #fff;
      color: white;
      border-bottom: 1px solid #f6f6f6;

      ul {
        .display-flex;
        justify-content: space-around;

        li {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(20, 33, 51, 1);
          line-height: 88px;
          text-align: center;
        }

        .active {
          color: #3385FF;

          &:after {
            content: '';
            display: block;
            height: 4px;
            background-color: #3385FF;
          }
        }
      }
    }

    .content {
      .noMore {
        text-align: center;
        color: #333333;
        margin-top: 50px;
      }

      ul {
        display: none;

        li {
          height: 260px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          padding: 0 45px;
          padding-top: 30px;
          margin-bottom: 15px;

          .icon {
            img {
              width: 200px;
              height: 200px;
              border-radius: 16px;
            }
          }

          .itemLeft {
            width: 330px;
            padding-left: 20px;
            h3 {
              font-size: 30px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(20, 33, 51, 1);
              line-height: 44px;
              margin-bottom: 15px;
            }

            p {
              font-size: 20px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(157, 166, 179, 1);
              line-height: 36px;
              margin-bottom: 15px;
            }
          }

          .itemRight {
            button {
              width: 142px;
              height: 56px;
              background: rgba(51, 133, 255, 1);
              border-radius: 28px;
              font-size: 26px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 56px;
              margin-top: 120px;
            }
          }
        }
      }

      .active {
        display: block;
      }
    }
  }

</style>

