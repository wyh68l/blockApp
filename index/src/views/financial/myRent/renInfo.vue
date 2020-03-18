<template>
  <div class="page">
    <m-header :title="language.details" :canback="Boolean(true)" class="header">
    </m-header>
    <div class="listInfo">
      <ul>
        <li>{{language.numbering}}:<span>{{myRentListInfoDetail.ordersn}}</span></li>
        <li>{{language.lessor}}:<span>{{myRentListInfoDetail.nickname}}</span></li>
        <li>{{language.handling_fee}}:<span>{{myRentListInfoDetail.fee}}</span></li>
        <li>{{language.amount}}:<span>{{myRentListInfoDetail.all_amount}}</span></li>
        <li>{{language.cycle}}:<span>{{myRentListInfoDetail.month}}{{language.month}}</span></li>
      </ul>
    </div>

    <div class="record">
      <h2>{{language.repayment_record}}</h2>
      <ul>
        <li v-for="(item,index) in myRentListInfoRepay" :key="index">
          <div>
            <h3>{{item.periods}}{{language.period}}<span>{{item.xkb}}</span></h3>
            <p>{{item.repayday}}</p>
          </div>
          <button class="active" @click="breakTo({rid:item.id,type:'repay'})" v-if="item.status === 0">{{language.should}}</button>
          <button v-if="item.status === 1">{{language.overdue}}</button>
          <button v-if="item.status === 2" disabled="disabled">{{language.already_repaid}}</button>
        </li>
        <li v-if="myRentListInfoRepay.length === 0" class="nomore">
          <span>{{lang.common?lang.common.no_more:''}}</span>
        </li>
      </ul>
    </div>

    <div class="submit" v-if="myRentListInfoDetail.show_status">
      <button class="buy" @click="buy">{{language.buyout}}</button>
      <button class="break" @click="breakTo({type:'break'})">{{language.interrupt}}</button>
    </div>

    <Alert v-if="type === 'break'">
      <h3 slot="top" class="title">{{lang.common?lang.common.pay_password:''}}</h3>
      <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="paypwd" type="password">
      <div slot="bottom" class="button">
        <button @click="cancel" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="payTo()" :disabled="isClick">{{lang.common.determine}}</button>
      </div>
    </Alert>

    <Alert v-if="type === 'buy'">
      <h3 slot="top" class="title">{{language.buyout}}</h3>
      <div slot="list" class="list">
        <ul>
          <li>{{language.remaining}}：<span>{{payBreak.periodsnum}}</span></li>
          <li>{{language.should}}：<span>{{Number(payBreak.amount).toFixed(4)}}</span></li>
<!--          <li>XKB：BTC =1:1</li>-->
        </ul>
      </div>
      <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="paypwd" type="password">
      <div slot="bottom" class="button">
        <button @click="cancel" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="Buyout" :disabled="isClick">{{lang.common.determine}}</button>
      </div>
    </Alert>

  </div>
</template>

<script>
    import Alert from "../../../components/Alert";
    import {Trade} from '@/server/server.js';
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "renInfo",
        data() {
            return {
                type: null,
                isClick:false,
                myRentListInfoDetail: {},
                myRentListInfoRepay: [],
                id: null,//租凭id
                rid: null,//还款id
                payType: null,
                paypwd: null,
                payBreak:{},
                language:{},
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.id = this.$route.query.id;
                this.getLeaseDetail();
                this.getBuyout();
            })
        },
        methods: {
            breakTo(options) {
                this.type = 'break'
                if (options.type === 'repay') {
                    this.payType = 'repay';
                    this.rid = options.rid;
                } else if (options.type === 'break') {
                    this.payType = 'break';
                }
            },
            cancel() {
                this.type = null;
                this.paypwd = null;
            },
            buy() {
                this.type = 'buy'
            },
            payTo() {
                if (this.payType === 'repay') {
                    this.leaseRepay();//还款
                } else if (this.payType === 'break') {
                    this.payinfo();//中断
                }
            },
            Buyout() {//买断
                Trade.Buyout({oid: this.id, paypwd: this.paypwd,type:1}).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        this.isClick = true;
                        setTimeout(() => {
                            this.paypwd = null;
                            this.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getBuyout() {//买断弹窗详情
                Trade.getBuyout({oid: this.id}).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.payBreak = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            payinfo() {
                console.log(this.id);
                Trade.Buyout({oid: this.id, paypwd: this.paypwd,type:0}).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        this.isClick = true;
                        setTimeout(() => {
                            this.paypwd = null;
                            this.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            leaseRepay() {
                Trade.leaseRepay({rid: this.rid, paypwd: this.paypwd}).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        this.isClick = true;
                        setTimeout(() => {
                            this.paypwd = null;
                            this.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getLeaseDetail() {
                Trade.getLeaseDetail({id: this.id}).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.myRentListInfoDetail = res.data.detail;
                        this.myRentListInfoRepay = res.data.repay;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
        },
        components: {
            Alert
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";

  .page {
    overflow: auto;
    padding-bottom: 50px;

    .header {
      img {
        margin-top: 20px;
      }
    }

    .header /deep/ header {
      position: fixed;
    }

    .listInfo {
      width: 690px;
      height: 380px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.11);
      border-radius: 26px;
      margin: 0 auto;
      margin-top: 40px;
      padding-top: 56px;

      ul {
        padding: 20px 90px;

        li {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 48px;

          span {
            float: right;
          }
        }
      }

    }

    .record {
      width: 690px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;
      margin: 0 auto;
      margin-top: 42px;

      h2 {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(2, 2, 2, 1);
        line-height: 42px;
        text-align: center;
        margin-top: 30px;
        padding-bottom: 20px;
      }

      ul {
        width: 90%;
        max-height: 500px;
        overflow: scroll;
        margin: 0 auto;

        .nomore{
          justify-content: center;
          color: #666666;
          font-size: 28px;
        }

        li {
          border-bottom: 1px solid #EFEFEF;
          display: flex;
          justify-content: space-between;
          padding: 40px 0;
          align-items: center;

          > div {

            h3 {
              font-size: 32px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 44px;

              span {
                font-size: 30px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 133, 255, 1);
                line-height: 42px;
                margin-left: 30px;
              }
            }

            p {
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(143, 149, 170, 1);
              line-height: 34px;
              margin-top: 12px;
            }
          }

          button {
            width: 142px;
            height: 56px;
            border-radius: 28px;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 56px;
            margin-top: 30px;
            color: #666666;
          }

          .active {
            background: rgba(51, 133, 255, 1);
            color: rgba(255, 255, 255, 1);
          }

          .finish {
            background: #fff;
            color: #999999;
          }
        }
      }
    }

    .submit {
      margin: 0 auto;
      margin-top: 80px;

      button {
        width: 280px;
        height: 80px;
        border-radius: 16px;
        line-height: 80px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      .buy {
        background-color: #3385FF;
      }

      .break {
        background: linear-gradient(133deg, rgba(205, 214, 231, 1) 0%, rgba(223, 226, 231, 1) 100%);
      }

    }
  }
</style>
