<template>
  <div class="page">
    <m-header :title="language.hosting" :canback="Boolean(true)" class="header">
    </m-header>

    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.currency}}</li>
          <li>{{language.Rented_out}}</li>
          <li>{{language.Not_rent_out}}</li>
          <li>{{language.Total}}</li>
          <li>{{language.operating}}</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in Object.keys(TbList)" :key="index">
            <ul>
              <li>{{item.toUpperCase()}}</li>
              <li>{{TbList[item].ed}}</li>
              <li>{{TbList[item].can}}</li>
              <li>{{TbList[item].all}}</li>
              <li class="more"><span @click="goTo('CollocationList',TbList[item].btype)">{{language.Trusteeship}}</span>
                <span @click="goTo('Checkout',TbList[item].btype)">{{language.Contract}}</span></li>
            </ul>
          </li>
          <li v-if="TbList.length === 0" class="nomore">
            {{lang?lang.common.no_more:''}}
          </li>
        </ul>
      </div>
    </div>

    <div class="bottomBtn">
      <div @click="goTo('CollocationInfo')">{{language.rent}}</div>
      <div @click="goTo('ExitRent')">{{language.want_rent_out}}</div>
    </div>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "collocation_2",
        data() {
            return {
                TbList:{
                    // "btc": {
                    //     "all": "22.00",//总计
                    //     "can": "0.00",//未租出
                    //     "ed": 22,//已租出
                    //     "btype": 1//币种类型编号
                    // },
                    // "eth": {
                    //     "all": "100.00",//总计
                    //     "can": "26.00",//未租出
                    //     "ed": 74,//已租出
                    //     "btype": 2//币种类型编号
                    // }
                },
                language:{},
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.getTbList();
            })
        },
        methods: {
            getTbList() {
                Trade.getTbList().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.TbList = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
            goTo(routerName,type) {
                this.$router.push({name: routerName,query:{type}});
            }
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .page{

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

            &:last-of-type{
              flex: 2;
            }
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

              .more{
                flex: 2;
                span{
                  width:35px;
                  border:1px solid rgba(52,134,255,1);
                  font-size:30px;
                  padding: 10px 15px;
                  font-family:PingFangSC-Regular,PingFang SC;
                  font-weight:400;
                  color:rgba(52,134,255,1);
                  border-radius: 8px;
                }
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

    .bottomBtn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 96px;
      display: flex;
      justify-content: space-between;

      div{
        flex: 1;
        height: 96px;
        line-height: 96px;

        &:first-of-type{
          background-color: #3486FF;
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          text-align: center;
        }
        &:last-of-type{
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(52,134,255,1);
          background-color: #EAF3FF;
          text-align: center;
        }
      }
    }
  }

</style>
