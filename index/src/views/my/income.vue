<template>
    <div class="page" v-if="success">
      <div v-if="this.$route.query.type !== 'candy'">
        <m-header :title="language.revenue.revenue_center" :canback="Boolean(true)" class='header' @back="goBack" :setback="Boolean(true)">
          <img src="~assets/images/bjwz/mine.png" alt="" @click="goTo('Team',{openid:$route.query.openid})" style="width: 20px;height: 20px;margin-top: 10px;">
        </m-header>
        <div class="myCar">
          <h3>
            {{language.revenue.XKB_revenue_st}}<br>
            {{revenueSum}}
          </h3>
        </div>
        <div class="content">
          <ul v-lazy-load="lazyLoad"
              :style="'height:'+(screenHeight-300)+'px;overflow:auto;'">
            <li><span>BTC{{lang.lease.income}}</span><span>{{lang.common.source}}</span><span>{{lang.common.time}}</span></li>
            <li v-for="(item,index) in revenueCenterList" :key="index" v-if="revenueCenterList.length !== 0">
              <span>{{item.amount}}</span>
              <span>{{item.remark}}</span>
              <span>{{formatDate(item.createtime)}}</span>
            </li>
            <li v-if="revenueCenterList.length === 0" style="text-align: center;"><span>{{lang.common.no_more}}</span></li>
          </ul>
        </div>
      </div>

      <div v-else>
        <m-header :title="language.candy.candy" :canback="Boolean(true)" class="header"  @back="goBack" :setback="Boolean(true)">
          <span style="color: #333333;" @click="goTo('Team','candy')">{{language.candy.candy_gets}}</span>
        </m-header>
        <div class="myCar">
          <h3>
            {{language.candy.current}}<br>
            {{candySum}}
            <p @click="goTo('Sign')" class="sign">{{lang.check.check}}></p>
          </h3>
        </div>
        <div class="content">
          <ul  v-lazy-load="lazyLoad"
               :style="'height:'+(screenHeight-300)+'px;overflow:auto;'">
            <li><span>{{language.candy.quantity}}</span><span>{{lang.common.source}}</span><span>{{lang.common.time}}</span></li>
           <li v-for="(item,index) in candyCenterList" :key="index" v-if="candyCenterList.length !== 0">
             <span>{{item.num}}</span>
             <span>{{item.remark}}</span>
             <span>{{formatDate(item.createtime)}}</span>
           </li>
            <li v-if="candyCenterList.length === 0" style="text-align: center;"><span>{{lang.common.no_more}}</span></li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
    import {Index,Init} from '@/server/server.js';
    import {Util,Load} from "@/assets/commonjs/utils";
    import {mapGetters} from 'vuex';
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "income",
        data(){
            return {
                page:1,
                revenueCenterList:[],
                candyCenterList:[],
                candySum:0,
                revenueSum:0,
                noMore:false,
                success:false,
                formData: {
                    account: null,
                },
                language:{
                    revenue:null,
                    candy:null
                },
            }
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                let {revenue,candy} = this.lang;
                this.language = {revenue,candy};
            })

            console.log('openid:' + this.$route.query.openid);
            if (this.$route.query.openid) {
                this.formData.account = this.$route.query.openid;
                this.login();
                Init.loginState().then(res => {})
            }else{
                mui.toast('您还没有登录哦');
                this.goBack();
                return;
            }
        },
        computed: {
            //...mapGetters(['lang'])
        },
        methods:{
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
            login() {
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

                        this.getRevenueCenter();
                        this.getCandyCenter();
                        this.getRevenueCenterSum();
                        this.success = true;
                        this.screenHeight = window.screen.availHeight;
                    } else {
                        setTimeout(() => {
                            this.goBack();
                            mui.toast(res.msg);
                            return;
                        }, 1000);
                    }
                })
            },
            goTo(routerName,type) {
                this.$router.push({name:routerName,query:{type}});
            },
            getRevenueCenter(){
                if(this.$route.query.type !== 'candy'){
                    Index.getRevenueCenter({page:this.page}).then(res => {
                        if(res.code === 1){
                            if(this.page >= res.totalpage){
                                this.noMore = true;
                            }
                            console.log(res.data);
                            this.revenueCenterList = this.revenueCenterList.concat(res.data);
                        }else{
                            mui.toast(res.msg);
                        }
                    })
                }
            },
            getRevenueCenterSum(){
                Index.getRevenueCenterInfo().then(res => {
                    if(res.code === 1){
                        console.log(res.data);
                        this.revenueSum = res.data;
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            getCandyCenter(){
                if(this.$route.query.type === 'candy'){
                    Index.getCandyCenter({page:this.page}).then(res => {
                        if(res.code === 1){
                            if(this.page >= res.totalpage){
                                this.noMore = true;
                            }
                            console.log(res);
                            this.candyCenterList = this.candyCenterList.concat(res.data.log);
                            this.candySum = res.data.candy;
                        }else{
                            mui.toast(res.msg);
                        }
                    })
                }
            },
            formatDate(time){
                return Util.formatDate(time)
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    if(this.$route.query.type === 'candy'){
                        this.getCandyCenter();
                    }else{
                        this.getRevenueCenter();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
  .page{
    .myCar{
      background-color: #fff;
      height: 384px;
      margin-bottom: 20px;
      padding: 42px 0;

      h3{
        background: url("~assets/images/bjwz/bg1.png") no-repeat;
        background-size: contain;
        width: 686px;
        height: 300px;
        margin: 0 auto;
        font-size:34px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-top: 100px;
        padding-left: 388px;
        text-align: center;

        .sign{
          margin-top: 30px;
          font-size: 35px;
        }
      }
    }

    .content{
      padding: 30px;

      .noMore{
        text-align: center;
      }
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;

          &:first-of-type{
            height: 90px;
            border-radius:26px 26px 0px 0px;
            background:linear-gradient(130deg,rgba(52,136,255,1) 0%,rgba(51,133,255,1) 100%);
            span{
              color: #fff;
            }
          }

          span{
            flex: 1;
            text-align: center;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
  }

</style>
