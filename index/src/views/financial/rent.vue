<template>
  <div class="page">
    <m-header :title="language.lease" :canback="Boolean(true)" class="header"></m-header>

    <div class="coinSet">
      <h3>{{language.currency_choice}}</h3>
      <div class="addCoin" @click="isAddCoin = true">
        <span class="iconfont iconjiahao"></span>
        <span>{{language.New_lease_currency}}</span>
      </div>
      <ul>
        <li><p>{{language.select_currency}}</p></li>
        <li v-for="(item,index) in coinList.default" :key="index" v-if="item !== ''">
          <div class="item">
            <div>
              <img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}
<!--                            <img :src="img" alt="">{{item.toUpperCase()}}-->
            </div>
            <div>
              <span class="i">></span>
              <button @click="changeSum(changeType[item+'L'])">-</button>
              <input class="value" v-model="coin[item]" type="number" @blur="listenCoinChange">
              <!--            <span class="value">{{coin.btc}}</span>-->
              <button @click="changeSum(changeType[item+'A'])">+</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="box">
      <h3>{{language.basic}}</h3>
      <label>
        <span>{{language.lease_cycle}}：</span>
        <div class="input" @click="checkTip">
          <select name="" v-model="month">
            <option :value="item" v-for="(item,index) in monthList?monthList:[]" :key="index">
              {{item}}{{language.month}}
            </option>
          </select>
          <span class="iconfont jt iconxiala"></span>
        </div>
      </label>

      <!--      <label @click="showTime">-->
      <!--        <span>{{language.time}}：</span><input type="text" readonly v-model="timeSelect"-->
      <!--                                              :placeholder="language.please_date">-->
      <!--      </label>-->

      <label>
        <span>{{language.lessor}}：</span>
        <div class="input" @click="checkTip">
          <select name="" v-model="fromData2.tid">
            <option :value="item.id" v-for="(item,index) in getMatchList.list?getMatchList.list:[]" :key="index">
              {{item.name}}
            </option>
          </select>
          <span class="iconfont jt iconxiala"></span>
        </div>
      </label>
    </div>

    <div class="listInfo">
      <h3>{{language.lease}}</h3>
      <div class="topNav"><span>{{language.cycle}}</span><span>{{language.amount}}</span></div>
      <ul>
        <li v-for="(item,index) in getRepayment.list" :key="index"><span>{{item.explain}}：{{item.time}}</span><span>≈{{item.num}}</span>
        </li>
        <li v-if="getRepayment.list === undefined">{{lang?lang.common.no_more:''}}</li>
      </ul>
    </div>

    <div class="listInfo">
      <h3>{{language.contract}}</h3>
      <div class="topNav"><span>{{language.currency}}</span><span>{{language.quantity}}</span></div>
      <ul>
        <li v-for="(item,index) in coinList.default" :key="index">
          <span>{{item.toUpperCase()}}</span><span>{{coin[item]}}</span>
        </li>
<!--        <li><span>BTC</span><span>{{coin.btc}}</span></li>-->
      </ul>
    </div>

    <div class="deal">
      <div class="mui-input-row mui-checkbox mui-left">
        <input type="checkbox" class="treaty" v-model="type"/>
        <p>{{language.read}}<span @click="goTo('rentAgreement')">{{language.agreement}}</span></p>
      </div>
    </div>

    <div class="submit">
      <button @click="rent" :disabled="isClick">{{language.immediate_lease}}</button>
    </div>

    <Alert v-if="isShow">
      <div slot="content" class="content" v-if="isCheck">
        <img src="~assets/images/bjwz/tip2.png" alt="">
        <p>{{language.successfully}}</p>
      </div>
      <div slot="content" class="content" v-else>
        <img src="~assets/images/bjwz/tip.png" alt="">
        <p>{{language.tick}}</p>
      </div>
      <div slot="bottom" class="button">
        <button style="color: #3385FF;" @click="isShow = false">{{lang.common.determine}}</button>
      </div>
    </Alert>

    <Alert v-if="isPwd">
      <h3 slot="top" class="title">{{lang.common.pay_password}}</h3>
      <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="fromData2.paypwd"
             type="password">
      <div slot="bottom" class="button">
        <button @click="isPwd = false" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="doLease" :disabled="isClick">{{lang.common.determine}}</button>
      </div>
    </Alert>

    <AddCoinBar v-show="isAddCoin" @coinImgList="getCoinImgList">
      <div slot="top">
          <div class="top">{{language.leasing_currency}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in coinList.add?Object.keys(coinList.add):[]" :key="index">
              <span class="item-left"><img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}</span>
              <div class="mui-switch" :class="{'mui-active':coinList.add[item]}"  @click="addCoin(item)">
                <div class="mui-switch-handle"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="bottom">
        <div class="bottom">
          <span @click="confirmAdd">{{lang.common.determine}}</span>
        </div>
      </div>
    </AddCoinBar>
  </div>
</template>

<script>
    import Alert from "../../components/Alert";
    import {Trade} from "@/server/server.js";
    import array from 'lodash/array'
    import AddCoinBar from "./addCoinBar";
    import {mapGetters} from 'vuex';
    //import Lang from 'lodash/lang'
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "rent",
        data() {
            return {
                addCoinList: [],
                type: false,
                isCheck: false,
                isShow: false,
                isPwd: false,
                timeSelect: null,
                timestamp: null,
                isClick: false,
                isAddCoin:false,
                sum: 0,
                language: {},
                coinList: {},
                coinImgList: {},
                coin: {
                    btc: 0,
                    eth: 0,
                    usdt: 0,
                    eos: 0,
                    xkb: 0,
                    bch: 0,
                    xrp: 0,
                    ltc: 0,
                    trx: 0,
                    dash: 0,
                    bsv: 0,
                    month:null
                },
                month: null,
                timer1: null,
                timer2: null,
                fromData: {
                    month: null,
                    // time: null
                },
                monthList:[],
                fromData2: {
                    month: null,
                    // time: null,
                    xkb: null,
                    tid: null,
                    paypwd: null
                },
                changeType: {
                    btcL: 'btcLow', btcA: 'btcAdd',
                    ethL: 'ethLow', ethA: 'ethAdd',
                    usdtL: 'usdtLow', usdtA: 'usdtAdd',
                    eosL: 'eosLow', eosA: 'eosAdd',
                    xkbL: 'xkbLow', xkbA: 'xkbAdd',
                    bchL: 'bchLow', bchA: 'bchAdd',
                    xrpL: 'xrpLow', xrpA: 'xrpAdd',
                    ltcL: 'ltcLow', ltcA: 'ltcAdd',
                    trxL: 'trxLow', trxA: 'trxAdd',
                    dashL: 'dashLow', dashA: 'dashAdd',
                    bsvL: 'bsvLow', bsvA: 'bsvAdd',
                },
                getMatchList: {},
                getRepayment: {}
            }
        },
        mixins: [languageMixin],
        beforeRouteLeave(to, from, next) {
            console.log(to.name);
            if (to.name !== 'rentAgreement') {
                sessionStorage.removeItem('coin');
                sessionStorage.removeItem('fromData');
            }
            next();
        },
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.getBtypeList();
                this.get_config_cycle();
                let coinSession = JSON.parse(sessionStorage.getItem('coin'));
                let fromDataSession = JSON.parse(sessionStorage.getItem('fromData'));
                if (coinSession || fromDataSession) {
                    this.month  = Number(coinSession['month']);
                    this.coin = coinSession;
                    this.fromData = fromDataSession;
                    console.log(this.coin,'month');
                    // this.timestamp = JSON.parse(sessionStorage.getItem('fromData')).time;
                }
            })
        },
        updated() {
            this.RepaymentChange;
        },
        computed: {
            listenCoinChange() {//根据计算数量的变化，来判断是否要请求接口，达到节流的作用
                this.sum = 0;
                Object.values(this.coin).forEach(item => {
                    this.sum += Number(item);
                })
                if (this.sum !== 0 || this.month !== null) {
                    this.debounce(this.getMatching)();
                }
            },
            RepaymentChange() {
                Object.assign(this.fromData, this.coin);
                // this.fromData.time = this.timestamp ? this.timestamp : ((new Date()).valueOf()).toString().slice(0,10);
                // this.fromData.time = this.timestamp ? this.timestamp : null;
                //console.log(this.fromData);
                this.fromData.month = this.month ? this.month : 0;
                this.coin.month = this.month ? this.month : 0;
                //console.log(this.month+'sa'+this.sum);
                if (this.sum !== 0 && this.month !== null) {
                    this.debounce2(this.getRepaymentPeriod)();
                } else {
                    this.getRepayment = [];
                }
            }
        },
        methods: {
            goTo(routerName) {
                this.$router.push({name: routerName});
                sessionStorage.setItem('coin', JSON.stringify(this.coin));
                sessionStorage.setItem('fromData', JSON.stringify(this.fromData));
            },
            getCoinImgList(data){
                this.coinImgList = data;
            },
            addCoin(item) {
                if (Number(this.coinList.add[item]) === 0) {
                    this.coinList.add[item] = 1;
                } else if (Number(this.coinList.add[item]) === 1) {
                    this.coinList.add[item] = 0;
                }
                //console.log(item);
            },
            confirmAdd() {
                this.addCoinList = [];
                Object.keys(this.coinList.add).forEach(item => {
                    if (Number(this.coinList.add[item]) === 1) {
                        this.addCoinList.push(item);
                    }
                    if (Number(this.coinList.add[item]) === 0) {
                        this.coin[item] = 0;
                    }
                })
                let addCoinString = String(this.addCoinList);
                console.log(String(this.addCoinList));
                Trade.doAddtype({'btype_str':addCoinString}).then(res => {
                    if (res.code === 1) {
                        this.isAddCoin = false;
                        // mui.toast(res.msg);
                        this.getBtypeList();
                    }else{
                        this.isAddCoin = false;
                        mui.toast(res.msg);
                    }
                })
            },
            checkTip() {
                //console.log(this.sum);
                if (this.sum === 0) {
                    //console.log('saa'+this.sum);
                    this.debounce2(this.getRepaymentPeriod)();
                }
            },
            rent() {
                console.log(this.type);
                if (this.type) {
                    this.isPwd = true;
                } else {
                    // console.log(this.month+'..'+this.sum);
                    if (this.sum !== 0) {
                        this.isShow = true
                    } else {
                        this.debounce2(this.getRepaymentPeriod)();
                    }
                }
            },
            doLease() {
                Object.assign(this.fromData2, this.fromData);
                console.log(this.fromData2);
                Trade.doLease(this.fromData2).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        // this.isShow = true;
                        // this.isCheck = true;
                        this.isClick = true;
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            showTime() {
                let dtPicker = new mui.DtPicker;
                dtPicker.show((selectItems) => {
                    let date = selectItems.text;
                    this.timeSelect = date;
                    date = date.replace(/-/g, '/');
                    this.timestamp = (new Date(date).getTime()) / 1000;
                });
            },
            debounce(func, delay = 1000) {//设置函数防抖，减少请求接口的次数
                return () => {
                    //console.log(this.timer);
                    if (this.timer1) clearTimeout(this.timer1);
                    this.timer1 = setTimeout(() => {
                        if (typeof func === "function") {
                            //console.log(func);
                            func.apply(this)
                        }
                    }, delay)
                }
            },
            debounce2(func, delay = 1000) {//设置函数防抖，减少请求接口的次数
                return () => {
                    //console.log(this.timer2);
                    if (this.timer2) clearTimeout(this.timer2);
                    this.timer2 = setTimeout(() => {
                        if (typeof func === "function") {
                            //
                            func.apply(this)
                        }
                    }, delay)
                }
            },
            get_config_cycle() {//获取可租凭周期
                Trade.get_config_cycle().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.monthList = res.data;
                        if (this.monthList === undefined) {
                            this.month = null;
                        } else {
                            if (this.fromData.month === 0) {
                                this.month = this.monthList[0];
                            }
                        }
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getMatching() {//匹配周期人
                this.coin.month = this.month;
                console.log(this.coin);
                Trade.getMatching(this.coin).then(res => {
                    if (res.code === 1) {
                        this.getMatchList = res.data;
                        console.log(this.getMatchList);
                        if (this.getMatchList.list === undefined) {
                            this.fromData2.tid = null;
                        } else {
                            if (this.fromData2.tid === null && this.getMatchList.list[0]) {
                                this.fromData2.tid = this.getMatchList.list[0].id;
                            }
                        }
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getRepaymentPeriod() {
                console.log(this.fromData);
                Trade.getRepaymentPeriod(this.fromData).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.getRepayment = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getBtypeList() {
                Trade.getBtypeList().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.coinList = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            changeSum(type) {
                switch (type) {
                    case this.changeType.btcA:
                        this.coin.btc++;
                        break;
                    case this.changeType.btcL:
                        this.coin.btc === 0 ? 0 : this.coin.btc--;
                        break;
                    case this.changeType.ethA:
                        this.coin.eth++;
                        break;
                    case this.changeType.ethL:
                        this.coin.eth === 0 ? 0 : this.coin.eth--;
                        break;
                    case this.changeType.usdtA:
                        this.coin.usdt++;
                        break;
                    case this.changeType.usdtL:
                        this.coin.usdt === 0 ? 0 : this.coin.usdt--;
                        break;
                    case this.changeType.eosA:
                        this.coin.eos++;
                        break;
                    case this.changeType.eosL:
                        this.coin.eos === 0 ? 0 : this.coin.eos--;
                        break;
                    case this.changeType.xkbA:
                        this.coin.xkb++;
                        break;
                    case this.changeType.xkbL:
                        this.coin.xkb === 0 ? 0 : this.coin.xkb--;
                        break;
                    case this.changeType.bchA:
                        this.coin.bch++;
                        break;
                    case this.changeType.bchL:
                        this.coin.bch === 0 ? 0 : this.coin.bch--;
                        break;
                    case this.changeType.xrpA:
                        this.coin.xrp++;
                        break;
                    case this.changeType.xrpL:
                        this.coin.xrp === 0 ? 0 : this.coin.xrp--;
                        break;
                    case this.changeType.ltcA:
                        this.coin.ltc++;
                        break;
                    case this.changeType.ltcL:
                        this.coin.ltc === 0 ? 0 : this.coin.ltc--;
                        break;
                    case this.changeType.trxA:
                        this.coin.trx++;
                        break;
                    case this.changeType.trxL:
                        this.coin.trx === 0 ? 0 : this.coin.trx--;
                        break;
                    case this.changeType.dashA:
                        this.coin.dash++;
                        break;
                    case this.changeType.dashL:
                        this.coin.dash === 0 ? 0 : this.coin.dash--;
                        break;
                    case this.changeType.bsvA:
                        this.coin.bsv++;
                        break;
                    case this.changeType.bsvL:
                        this.coin.bsv === 0 ? 0 : this.coin.bsv--;
                        break;
                }
                this.listenCoinChange;
            }
        },
        components: {
            Alert,
            AddCoinBar,
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";

  .page {
    overflow: auto;

    .header /deep/ .header {
      position: fixed;
    }

    .coinSet {
      width: 690px;
      padding-bottom: 20px;
      margin: 0 auto;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;
      background-color: #fff;
      margin-top: 30px;

      h3 {
        margin-top: 38px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(2, 2, 2, 1);
        line-height: 44px;
        text-align: center;
      }

      .addCoin {
        transform: translate(-30px, -40px);
        text-align: right;

        span {
          color: #3385FF;
        }
      }

      ul {
        padding: 0 50px;

        li {
          margin-bottom: 36px;

          /*&:last-of-type {*/
          /*  .i {*/
          /*    margin-left: 8px;*/
          /*  }*/
          /*}*/

          p {
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(2, 2, 2, 1);
          }

          .item {
            color: rgba(2, 2, 2, 1);
            font-size: 32px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 28px;
            display: flex;
            justify-content: space-between;


            img {
              width: 40px;
              height: 40px;
              margin-right: 25px;
              transform: translate(0, 5px);
            }
          }

          button {
            color: #333333;
            width: 60px;
            font-size: 40px;
            border: 1px solid #888888;
            color: #888888;
          }

          .i {
            font-size: 50px;
            margin: 0 30px;
          }

          .value {
            width: 120px;
            padding: 0;
            text-align: center;
            height: 60px;
            margin: 0 25px;
          }
        }
      }
    }

    .box {
      width: 690px;
      height: 460px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.11);
      border-radius: 26px;
      margin: 0 auto;
      margin-top: 40px;
      padding-top: 36px;

      h3 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(2, 2, 2, 1);
        line-height: 44px;
        text-align: center;
        margin-bottom: 25px;
      }

      .input {
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, .2);
        border-radius: 8px;

        .jt {
          margin-right: 15px;
          color: #999999;
        }
      }

      label {
        display: flex;
        margin-bottom: 20px;
        padding: 0 45px;
        justify-content: space-between;

        input, select {
          width: 360px;
          height: 72px;
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          padding-left: 30px;
        }

        span {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(2, 2, 2, 1);
          line-height: 72px;
        }
      }
    }

    .listInfo {
      width: 690px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.11);
      border-radius: 26px;
      margin: 0 auto;
      margin-top: 40px;
      padding-top: 30px;

      h3 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(2, 2, 2, 1);
        line-height: 44px;
        text-align: center;
        margin-bottom: 30px;
      }

      .topNav {
        display: flex;
        justify-content: space-around;
        height: 64px;
        background: rgba(247, 247, 247, 1);
        border-radius: 6px;

        span {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 64px;
        }
      }

      ul {
        padding: 20px;
        max-height: 500px;
        overflow: scroll;

        li {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 48px;
          display: flex;
          justify-content: space-around;

          span {
            flex: 1;
            text-align: center;
          }
        }
      }
    }

    .deal {
      padding-left: 40px;
      margin-top: 50px;
      margin-bottom: 40px;

      input {
        width: 36px;
        height: 36px;
        background-color: #fff;
        border-radius: 50%;
        appearance: initial;
        float: left;
        margin-right: 15px;
      }

      p {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(147, 150, 157, 1);
        line-height: 36px;

        span {
          color: #3385FF;
        }
      }
    }

    .submit {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -4px 12px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      opacity: 0.9;
      text-align: center;

      button {
        width: 90%;
        height: 90px;
        margin: 56px auto;
        background: rgba(51, 133, 255, 1);
        border-radius: 16px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
      }
    }

    .mui-left {
      display: flex;
      align-items: center;
    }

    .mui-checkbox input {
      position: initial;
      background-color: initial;

      &:before {
        font-size: 5.5vw;
      }

    }

    .mui-input-row {
      overflow: initial;
    }
  }

</style>
