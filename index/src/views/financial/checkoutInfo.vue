<template>
  <div class="page">
    <m-header :title="language.Details" :canback="Boolean(true)" class="header" ></m-header>

    <div class="box">
      <ul>
        <li>{{language.Lessee}}：</li>
        <li>{{language.Leased_currency}}:</li>
        <li>{{language.each_period}}：</li>
        <li>{{language.Repayment_currency}}：</li>
      </ul>
      <ul>
        <li>{{trusteeshipInfo.nickname}}</li>
        <li v-if="trusteeshipInfo.btype === 'USDT'">
          {{fromData.coinName?(fromData.coinName).toUpperCase():''}}:{{trusteeshipInfo.xkb}}
          <span class="more" @click="isMore = true">{{language.View_more}}</span>
        </li>
        <li v-if="trusteeshipInfo.btype === 'XKB'">
          {{fromData.coinName?(fromData.coinName).toUpperCase():''}}:{{trusteeshipInfo.btc}}
          <span class="more" @click="isMore = true">{{language.View_more}}</span>
        </li>
        <li>{{trusteeshipInfo.renum}}</li>
        <li>{{trusteeshipInfo.btype}}</li>
      </ul>
    </div>

    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.Leased_currency}}</li>
          <li>{{language.Repayment_period}}</li>
          <li>{{language.Trusteeship_time}}</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in trusteeshipList" :key="index">
            <ul>
              <li>{{fromData.coinName?(fromData.coinName).toUpperCase():''}}</li>
              <li>{{item.periods}}</li>
              <li>{{formatDate(item.repaytime)}}</li>
            </ul>
          </li>
          <li v-if="trusteeshipList.length === 0" class="nomore">
            {{lang?lang.common.no_more:''}}
          </li>
        </ul>
      </div>
    </div>

    <AddCoinBar v-show="isMore" @coinImgList="getCoinImgList">
      <div slot="top">
        <div class="top">{{language.follows}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in trusteeshipInfo.b_arr?Object.keys(trusteeshipInfo.b_arr):[]" :key="index">
              <span class="item-left"><img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}</span>
              <div class="number">{{trusteeshipInfo.b_arr[item]}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="bottom">
        <div class="bottom">
          <span @click="isMore = false">{{lang?lang.common.determine:''}}</span>
        </div>
      </div>
    </AddCoinBar>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    import AddCoinBar from "./addCoinBar";
    export default {
        name: "checkoutInfo",
        data() {
            return {
                trusteeshipList:[],
                trusteeshipInfo:{},
                temp:{},
                language:{},
                fromData:{},
                coinImgList:[],
                isMore:false
            }
        },
        mixins: [languageMixin],
        components:{
            AddCoinBar
        },
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.fromData = this.$route.query;
                console.log(this.fromData);
                this.get_trusteeship_list();
            })
        },
        methods: {
            get_trusteeship_list() {
                Trade.get_retuan_log(this.fromData).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.trusteeshipList = res.data.list;
                        this.trusteeshipInfo = res.data.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getCoinImgList(data){
                this.coinImgList = data;
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .page{

    .box{
      width: 94%;
      margin: 0 auto;
      margin-top: 30px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 6px 0px rgba(0,0,0,0.26);
      border-radius:13px;
      display: flex;
      justify-content: left;

      ul{
        padding: 30px;
        li{
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(142,149,172,1);
          margin-bottom: 20px;
        }

        &:last-of-type{
          li{
            color: #333333;

            .more{
              font-size:25px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(52,134,255,1);
              margin-left: 30px;
            }
          }
        }
      }
    }

    .rank {
      width: 94%;
      margin: 0 auto;
      margin-top: 30px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 12px 0px rgba(0,0,0,0.26);
      border-top-left-radius: 26px;
      border-top-right-radius: 26px;

      .topNav{
        height: 88px;
        background:linear-gradient(130deg,rgba(52,136,255,1) 0%,rgba(51,133,255,1) 100%);
        border-top-left-radius: 26px;
        border-top-right-radius: 26px;
        color: white;

        ul{
          .display-flex;
          justify-content: space-between;
          li{
            flex: 1;
            font-size:30px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:88px;
            text-align: center;
          }
        }
      }

      .content{
        >ul{
          max-height: 1000px;
          overflow: scroll;

          .nomore{
            text-align: center;
            padding: 80px;
            color: #666666;
            font-size: 30px;
          }

          .item{
            border-bottom: 2px solid #F4F4F4;
            ul{
              .display-flex;
              justify-content: space-between;
              align-items: center;

              li{
                flex: 1;
                text-align: center;
                font-size:28px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                padding: 30px 0;
              }
            }
          }
        }
      }

      .rent{
        width:590px;
        height:90px;
        margin-left: 50px;
        background:rgba(51,133,255,1);
        border-radius:16px;
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:90px;
        margin-top: 100px;
        margin-bottom: 70px;
      }
    }
  }

</style>
