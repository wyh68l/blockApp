<template>
  <div class="page">
    <m-header :title="language.my_lease" :canback="Boolean(true)" class="header"></m-header>

    <div class="topNav">
      <span>{{language.Lease_order_status}}</span>
      <div class="check">
        <select name="" v-model="myRentListIndex">
          <option :value="Number(0)">{{language.all}}</option>
          <option :value="Number(1)">{{language.holding}}</option>
          <option :value="Number(2)">{{language.Application_interruption}}</option>
          <option :value="Number(3)">{{language.Application_buyout}}</option>
          <option :value="Number(4)">{{language.Completed}}</option>
          <option :value="Number(5)">{{language.Reject_interrupt}}</option>
          <option :value="Number(6)">{{language.Refuse_buy_out}}</option>
          <option :value="Number(7)">{{language.Interrupted}}</option>
        </select>
        <span class="iconfont jt iconxiala"></span>
      </div>
    </div>

    <div class="content">
      <ul class="active">
        <li v-for="(item,index) in myRentListAll[myRentListIndex]" :key="index">
          <div class="itemLeft">
            <h3>{{language.numbering}}：{{item.ordersn}}</h3>
            <p class="coin">
              <span class="left">{{language.currency}}: <br>{{language.quantity}}：</span>
              <span class="right">ETH/USDT/BTC/EOS/XKB/BCH/XRP/LTC/TRX/DASH/BSV<br>
              {{item.eth}}/{{item.usdt}}/{{item.btc}}/{{item.eos}}/{{item.xkb}}/{{item.bch}}/{{item.xrp}}/{{item.ltc}}/{{item.trx}}/{{item.dash}}/{{item.bsv}}
              </span>
            </p>
            <p>{{language.creation_time}}：{{item.createtime}}</p>
          </div>
          <div class="itemRight">
            <p class="active">{{item.status}}</p>
            <p class="active" v-if="item.reason" @click="alertReason(item.reason)">{{language.Reason_interruption}}</p>
            <button @click="goTo('RenInfo',item.id)">{{lang?lang.common.details:''}}</button>
          </div>
        </li>
        <li v-if="myRentListAll[myRentListIndex]?myRentListAll[myRentListIndex].length === 0 : true" style="justify-content: center;">
          <span>{{lang?lang.common.no_more:''}}</span>
        </li>
      </ul>
    </div>

    <Alert v-if="isShow">
      <div slot="content" class="content">
        <img src="~assets/images/bjwz/tip.png" alt="">
        <p>{{reason}}</p>
      </div>
      <div slot="bottom" class="button">
        <button style="color: #3385FF;" @click="isShow = false">{{lang.common.determine}}</button>
      </div>
    </Alert>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    import Alert from "@/components/Alert";
    import $ from 'jquery';

    export default {
        name: "index",
        data(){
            return {
                myRentListAll: [
                    // [
                    //     {
                    //         "id": 53,
                    //         "ordersn": "Lo20191125100105055626",
                    //         "btc": "0.00",
                    //         "eth": "1.00",
                    //         "usdt": "0.00",
                    //         "eos": "0.00",
                    //         "xkb": "0.00",
                    //         "bch": "0.00",
                    //         "xrp": "0.00",
                    //         "ltc": "0.00",
                    //         "trx": "0.00",
                    //         "dash": "0.00",
                    //         "bsv": "0.00",
                    //         'reason':'中断理由aaaa',
                    //         "createtime": "2019-11-25 10:01:05",
                    //         "status": "持有中"
                    //     },
                    // ]
                ],
                myRentListIndex:0,
                language:{},
                isShow:false,
                reason:''
            }
        },
        mixins: [languageMixin],
        components:{
            Alert
        },
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                console.log(this.myRentListAll);
                new Promise(resolve => {
                    this.getLeaseListAll(resolve);
                }).then(()=>{return new Promise(resolve => {this.getLeaseList1(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList2(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList3(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList4(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList5(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList6(resolve);})
                }).then(()=>{return new Promise(resolve => {this.getLeaseList7();})})
            })
        },
        computed:{
            changeList(){
                console.log(this.myRentListIndex);
            }
        },
        updated(){
            //this.changeList;
        },
        methods:{
            goTo(routerName,id) {
                this.$router.push({name:routerName,query:{id:id}});
            },
            alertReason(reason){
                this.isShow = true;
                this.reason = reason;
            },
            changeList1(){
                // let that = this;
                // $(function () {
                //     $('.topNav>ul>li').on('click',function (){
                //         $(this).addClass('active').siblings().removeClass('active');
                //         that.myRentListIndex = parseInt($(this).index());
                //     })
                // })
            },
            getLeaseListAll(resolve) {
                Trade.get_lease_list().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList1(resolve) {
                Trade.get_lease_list0().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList2(resolve) {
                Trade.get_lease_list1().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList3(resolve) {
                Trade.get_lease_list2().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList4(resolve) {
                Trade.get_lease_list3().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList5(resolve) {
                Trade.get_lease_list4().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList6(resolve) {
                Trade.get_lease_list5().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        resolve();
                        console.log(this.myRentListAll);
                    } else {
                        mui.toast(res.msg);
                        resolve();
                    }
                })
            },
            getLeaseList7() {
                Trade.get_lease_list6().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListAll.push(res.data);
                        console.log(this.myRentListAll);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .header{
    box-shadow:none!important;
  }
  .header /deep/ .header{
    box-shadow:none;
  }

  .page{
   overflow: auto;

    .topNav{
      width: 100%;
      background-color: #fff;
      color: white;
      height: 88px;
      display: flex;
      justify-content: left;

      ul{
        width: 150%;
        .display-flex;
        justify-content: left;

        li{
          flex: 1;
          font-size:28px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(20,33,51,1);
          text-align: center;
          margin: 0 15px;
          line-height: 88px;
          position: relative;
        }
        .active{
          color: #3385FF;
          &:after{
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: #3385FF;
          }
        }
      }

      >span{
        flex: 3;
        color: #333333;
        font-size: 30px;
        line-height: 88px;
        margin-left: 50px;
        text-align: center;
      }
      .check{
        flex: 5;
        height: 60px;
        margin-top: 15px;
        margin-left: 30px;
        border: 1px solid #999999;
        border-radius: 8px;
        margin-right: 50px;

        select{
          width: 85%;
          color: #333333;
          padding-left: 40px;
        }
        span{
          color: #333333;
          font-size: 30px;
          line-height: 60px;
        }
      }
    }

    .content{
      height: 85%;
      overflow: scroll;
      padding-top: 20px;

      ul{

        li{
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: left;
          padding:30px 45px;
          margin-bottom: 15px;

          .itemLeft{
            width: 83%;
            h3{
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(20,33,51,1);
              line-height:44px;
              margin-bottom: 15px;
            }
            p{
              height: 50px;
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(157,166,179,1);
              line-height:50px;

              .right{
                display: block;
                width: 74%;
                overflow-x: scroll;
                vertical-align: bottom;
              }
            }

            .coin{
              height: 14vw;
              display: flex;

              .left{
                  display: block;
              }
            }
          }

          .itemRight{
            position: relative;

            p{
              text-align: center;
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              line-height:44px;
              width:142px;
            }
            .active{
              color:rgba(51,133,255,1);
              margin-bottom: 20px;
            }
            .cancel{
              color: #999999;
            }
            button{
              position: absolute;
              width:142px;
              height:56px;
              background:rgba(51,133,255,1);
              border-radius:28px;
              font-size:26px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:56px;
              bottom: 0px;
            }
          }
        }
      }
      .active{
        display: block;
      }
    }

  }

</style>
