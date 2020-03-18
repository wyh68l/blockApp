<template>
  <div class="page">
    <m-header :title="language.hosting" :canback="Boolean(true)" class="header">
<!--      <img src="~assets/images/bjwz/nav_right.png" alt="" @click="goTo('CollocationList')">-->
      <span class="choose" @click="addDateBar = true">{{language.Selection_cycle}}</span>
    </m-header>

    <div class="box">
      <label class="mark">
        <span>{{language.currency}}：</span>

        <div class="input">
          <select v-model="formData.type">
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
            <option value="usdt">USDT</option>
            <option value="eos">EOS</option>
            <option value="xkb">XKB</option>
            <option value="bch">BCH</option>
            <option value="xrp">XRP</option>
            <option value="ltc">LTC</option>
            <option value="trx">TRX</option>
            <option value="dash">DASH</option>
            <option value="bsv">BSV</option>
          </select>
          <span class="iconfont jt iconxiala"></span>
        </div>

      </label>
      <label>
        <span>{{language.hosts}}：</span><input type="number" :placeholder="language.please_number" v-model="formData.num">
      </label>
    </div>
    <button @click="type = 'trusteeship'">{{language.submitted}}</button>

    <Alert v-show="type === 'trusteeship'">
      <h3 slot="top" class="title">{{lang.common.pay_password}}</h3>
      <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="formData.paypwd" type="password">
      <div slot="bottom" class="button">
        <button @click="cancel" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="upTrusteeship" :disabled="isClick">{{lang.common.determine}}</button>
      </div>
    </Alert>

    <AddCoinBar v-show="addDateBar">
      <div slot="top">
        <div class="top">{{language.Please_select}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in Object.keys(dateList)" :key="index">
              <span class="item-left">{{item}}{{language.month}}</span>
              <div class="mui-switch" :class="{'mui-active':dateList[item]}" @click="addDate(item)">
                <div class="mui-switch-handle" ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="bottom">
        <p class="tip">{{language.rental_currencies}}</p>
        <div class="bottom">
          <span @click="confirmAdd">{{lang.common.determine}}</span>
        </div>
      </div>
    </AddCoinBar>
  </div>
</template>

<script>
    import Alert from "../../components/Alert";
    import AddCoinBar from "./addCoinBar";
    import {Trade} from '@/server/server.js';
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "collocation",
        data(){
            return {
                paypwd:null,
                type: null,
                isClick:false,
                addDateBar:false,
                dateList: {},
                addDateList:[],
                formData:{
                    paypwd:null,
                    num:null,
                    type:'btc'
                },
                language:{},
            }
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.getCycle();
            })
        },
        methods:{
            goTo(routerName,type) {
                this.$router.push({name:routerName,query:{type}});
            },
            cancel() {
                this.type = null;
                this.paypwd = null;
            },
            upTrusteeship(){
                console.log(this.formData);
                Trade.upTrusteeship(this.formData).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        this.isClick = true;
                        setTimeout(() => {
                            this.paypwd = null;
                            this.$router.push({name:'Collocation_2'});
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getCycle() {
                Trade.getCycle().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.dateList = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            addDate(item) {
                if (Number(this.dateList[item]) === 0) {
                    this.dateList[item] = 1;
                } else if (Number(this.dateList[item]) === 1) {
                    this.dateList[item] = 0;
                }
                //console.log(item);
            },
            confirmAdd() {
                this.addDateList = [];
                Object.keys(this.dateList).forEach(item => {
                    if (Number(this.dateList[item]) === 1) {
                        this.addDateList.push(item);
                    }
                })
                let addCoinString = String(this.addDateList);
                console.log(String(this.addDateList));
                Trade.set_trusteeship_cycle({'cycle_str':addCoinString}).then(res => {
                    if (res.code === 1) {
                        this.addDateBar = false;
                        //mui.toast(res.msg);
                    }else{
                        this.addDateBar = false;
                        mui.toast(res.msg);
                    }
                })
            },
        },
        components:{
            Alert,
            AddCoinBar
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .page{
    .header{
      img{
        margin-top: 20px;
      }
      .choose{
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,133,255,1);
        line-height:20px;
      }
    }

    .box{
      width:690px;
      height:280px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 12px 0px rgba(0,0,0,0.11);
      border-radius:26px;
      margin: 0 auto;
      margin-top: 40px;
      padding-left: 60px;
      padding-right: 60px;
      padding-top: 56px;

      label{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        input,select{
          width:360px;
          height:72px;
          background:rgba(255,255,255,1);
          border-radius:8px;
          padding-left: 30px;
        }

        span{
          font-size:32px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(2,2,2,1);
          line-height:72px;
        }
      }

      .mark{
        select{
          width: 300px;
        }
      }

      .input{
        display: inline-block;
        border: 2px solid rgba(0,0,0,.2);
        border-radius: 8px;

        .jt{
          margin-right: 15px;
          color: #999999;
        }

      }
    }

    >button{
      margin: 0 auto;
      margin-top: 80px;
      width:590px;
      height:90px;
      background:rgba(51,133,255,1);
      border-radius:16px;
      line-height: 90px;
      font-size:32px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }

</style>
