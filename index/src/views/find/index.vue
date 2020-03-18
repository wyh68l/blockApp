<template>
  <div class="page">
    <m-header :title="language.dynamic" class="header" :canback="Boolean(true)" @back="goBack" :setback="Boolean(true)">
      <div class="submit">
        <button @click="upload('MyCircle')">{{language.my_article}}></button>
      </div>
    </m-header>
    <div class="content">
      <div class="topNav">
        <ul ref="itemTitle">
          <li class="active" @click="changeType('coin')">{{language.currency}}</li>
          <li @click="changeType('secret')">{{language.secret}}</li>
          <li @click="changeType('message')">{{language.industry_information}}</li>
        </ul>
      </div>

      <div class="itemList" ref="itemList">
        <ul class="coin active">
          <li v-for="(item,index) in circleCoinList" :key="index">
            <div class="content" @click="goTo('Details',{cid:item.id,type:'circle'})">
              <h3><span>{{item.username}}</span><span class="time">{{formatDate(item.updatetime)}}</span></h3>
              <p>{{item.circle_title}}</p>
              <p>{{language.read}}：{{item.real_candy}}</p>
            </div>
            <div class="praise">
              <span @click="star('add',{cid:item.id,type:'circle'},index)">
                <img src="~assets/images/bjwz/icon-like.png" alt="">
                {{circleNum[index].commend_num}}
              </span>
              <span @click="star('reduce',{cid:item.id,type:'circle'},index)">
                <img src="~assets/images/bjwz/icon-like2.png" alt="">
               {{circleNum[index].stamp_num}}
              </span>
            </div>
          </li>
        </ul>

        <ul class="secret">
          <li v-for="(item,index) in circleSecretList" :key="index">
            <div @click="goTo('Details',{cid:item.id,type:'secretnews'})" >
              <h3><span class="time">{{formatDate(item.addtime)}}</span></h3>
              <p>{{item.title}}</p>
              <p>{{language.read}}：{{item.candy}}</p>
            </div>

            <div class="praise">
              <span @click="star('add',{cid:item.id,type:'secretnews'},index)">
                <img src="~assets/images/bjwz/icon-like.png" alt="">
                 {{secretNum[index].commend_num}}
              </span>
              <span @click="star('reduce',{cid:item.id,type:'secretnews'},index)">
                <img src="~assets/images/bjwz/icon-like2.png" alt="">
                {{secretNum[index].stamp_num}}
              </span>
            </div>
          </li>
        </ul>

        <ul class="message"  v-lazy-load="lazyLoad"
            :style="'height:'+(screenHeight-150)+'px;overflow:auto;'">
          <li v-for="(item,index) in circleMesgList" :key="index" @click="goTo('TradeInfo',{'title':item.title,'details':item.details})">
            {{item.title}}
            <span class="mui-icon mui-icon-arrowright"></span>
          </li>
        </ul>
      </div>

      <div class="submit">
        <button class="upload" @click="upload('Upload')" v-if="isShow">{{language.upload}}</button>
      </div>

    </div>

  </div>
</template>

<script>
    import {Trade, Owner,Init} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    //import {mapGetters} from 'vuex'
    import {languageMixin} from '@/assets/commonjs/mixin'
    import $ from 'jquery'

    export default {
        name: "index",
        data() {
            return {
                circleCoinList: [],
                circleSecretList:[],
                circleMesgList:[],
                options:null,
                allow:false,
                isShow:true,
                success:false,
                isLogin:false,
                page:1,
                noMore:false,
                secretNum:[],
                screenHeight:0,
                circleNum:[],
                language:{},
                formData: {
                    account: null,
                },
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.article;
                this.getCircleall();
                this.getsecretnews();
                this.getInformation();
                this.screenHeight = window.screen.availHeight;
            })
        },
        computed:{
            //...mapGetters(['lang'])
        },
        methods: {
            //判断是否有登录
            checkLogin(resolve){
                console.log('openid:' + this.$route.query.openid);
                if (this.$route.query.openid) {
                    this.formData.account = this.$route.query.openid;
                    this.login(resolve);
                    Init.loginState().then(res => {})
                }else{
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
                            return;
                    }
                })
            },
            login(resolve) {
                let params = this.formData;
                // console.log(params);
                // return ;
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
                            // this.goBack();
                            mui.toast(res.msg);
                            resolve();
                            return;
                        }, 1000);
                    }
                })
            },
            goTo(routerName, options) {
                //每进一个页面，都要先判断是否是登录状态
                //this.$router.push({name:routerName,query:{options:JSON.stringify(options)}});
                new Promise(resolve => {
                    this.checkLogin(resolve);
                }).then(()=>{
                    //登录开关
                    if(this.isLogin){
                        //正常流程
                        if(routerName === 'TradeInfo'){
                            this.$router.push({name:routerName,query:{options:JSON.stringify(options)}});
                        }else{
                            this.options = options;
                            new Promise(resolve => {
                                this.checkPay(resolve);
                            }).then(res =>{
                                if(this.allow){
                                    this.$router.push({name:routerName,query:{options:JSON.stringify(options),status:res}});
                                }
                            })
                        }
                    }
                })
            },
            upload(routerName){
                //this.$router.push({name:routerName});
                new Promise(resolve => {
                    this.checkLogin(resolve);
                }).then(()=>{
                    if(this.isLogin){
                        this.$router.push({name:routerName});
                    }
                });
            },
            checkPay(resolve) {
                Trade.checkPay(this.options).then(res => {
                    if (res.code === 1) {
                        this.allow = true;
                        resolve(1);
                    } else {
                        if(this.options.type === 'secretnews'){
                            this.paySecretCandy(resolve);
                        }else{
                            this.payCandy(resolve);
                        }
                    }
                })
            },
            payCandy(resolve) {
                Trade.payCandy({cid:this.options.cid}).then(res => {
                    if (res.code === 1) {
                        this.allow = true;
                        resolve(0);
                    } else {
                        mui.toast(res.msg);
                       this.allow = false;
                       resolve();
                    }
                })
            },
            paySecretCandy(resolve) {
                Trade.paySecretCandy({sid:this.options.cid}).then(res => {
                    if (res.code === 1) {
                        this.allow = true;
                        resolve(0);
                    } else {
                        mui.toast(res.msg);
                        this.allow = false;
                        resolve();
                    }
                })
            },
            getCircleall() {
                Trade.getCircleall().then(res => {
                    if (res.code === 1) {
                        this.circleCoinList = res.data;
                        console.log(res.data);
                        this.circleCoinList.forEach((item) =>{
                            let {commend_num,stamp_num} = item;
                            this.circleNum.push({commend_num,stamp_num})
                        })
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getsecretnews() {
                Trade.getsecretnews().then(res => {
                    if (res.code === 1) {
                        this.circleSecretList = res.data;
                        console.log(res.data);
                        this.circleSecretList.forEach((item) =>{
                            let {commend_num,stamp_num} = item;
                            this.secretNum.push({commend_num,stamp_num})
                        })
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getInformation() {
                Trade.getInformation({pageNum:this.page}).then(res => {
                    if (res.code === 1) {
                        if(this.page >= res.data.total){
                            this.noMore = true;
                        }
                        this.circleMesgList = this.circleMesgList.concat(res.data.rows);
                        console.log(res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    this.getInformation();
                }
            },
            star(type,options,index) {
                if (type === 'add') {
                    Trade.commend(options).then(res => {
                        if (res.code === 1) {
                            if(options.type === 'circle'){
                                this.circleNum[index].commend_num++;
                            }else{
                                this.secretNum[index].commend_num++;
                            }
                            mui.toast(res.msg);
                        } else {
                            mui.toast(res.msg);
                        }
                    })
                }else if(type === 'reduce'){
                    Trade.stamp(options).then(res => {
                        if (res.code === 1) {
                            if(options.type === 'circle'){
                                this.circleNum[index].stamp_num++;
                            }else{
                                this.secretNum[index].stamp_num++;
                            }
                            mui.toast(res.msg);
                        } else {
                            mui.toast(res.msg);
                        }
                    })
                }
            },
            changeType(type){
                if(type === 'coin'){
                    this.isShow = true;
                    $(this.$refs.itemTitle.children[0]).addClass('active').siblings().removeClass('active');
                    $(this.$refs.itemList.children[0]).addClass('active').siblings().removeClass('active');
                }else if(type === 'secret'){
                    this.isShow = false;
                    $(this.$refs.itemTitle.children[1]).addClass('active').siblings().removeClass('active');
                    $(this.$refs.itemList.children[1]).addClass('active').siblings().removeClass('active');
                }else if(type === 'message'){
                    this.isShow = false;
                    $(this.$refs.itemTitle.children[2]).addClass('active').siblings().removeClass('active');
                    $(this.$refs.itemList.children[2]).addClass('active').siblings().removeClass('active');
                }
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";

  .page {
    overflow: auto;

    .header {
      box-shadow: none !important;
    }

    .header /deep/ .header {
      box-shadow: none;
      position: fixed;

      .right{
        padding-right: 0;
      }

      .submit {
        text-align: center;
        height: 70px;
        button {
          width: 190px;
          line-height: 70px;
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }
      }
    }

    .content {
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

      .itemList {
        ul {
          margin-top: 30px;
          display: none;

          li {
            width: 686px;
            background-color: #fff;
            margin: 0 auto;
            padding: 30px 50px;
            box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.07);
            border-radius: 18px;
            margin-bottom: 20px;

            h3 {
              font-size: 32px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(0, 0, 0, 1);
              line-height: 44px;
              margin-bottom: 30px;

              span{
                margin-right: 50px;
              }

              .time {
                font-size: 26px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 36px;
              }
            }

            p {
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
              line-height: 42px;
            }

            .praise {
              margin-top: 30px;
              text-align: right;

              span {
                font-size: 28px;
                font-family: Helvetica;
                color: rgba(0, 0, 0, 1);
                line-height: 34px;

                img {
                  width: 40px;
                  height: 40px;
                  margin: 0 15px;
                }
              }
            }
          }
        }

        .message {

            li{
              width: 100%;
              box-shadow: none;
              border-bottom: 1px solid #f6f6f6;
              margin-bottom: 0;
              border-radius: 0;

              .mui-icon{
                float: right;
              }
            }
        }

        .active {
          display: block;
        }
      }

      .submit {
        text-align: center;
        margin-top: 80px;
        margin-bottom: 50px;

        button {
          width: 590px;
          height: 90px;
          border-radius: 16px;
          line-height: 90px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          background-color: #3385FF;
          color: rgba(255, 255, 255, 1);
        }
      }

    }

    .footer /deep/ {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }

</style>
`
