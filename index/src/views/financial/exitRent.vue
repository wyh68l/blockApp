<template>
  <div class="page">
    <m-header :title="language.Application" :canback="Boolean(true)" class="header">
      <span class="choose" @click="goTo('ExitRentInfo')">{{language.rent_refund}}</span>
    </m-header>

    <div class="top-nav">
      <div @click="isExitCoin = true"><h3>{{language.Returnable_currency}}</h3></div>
      <div @click="isColdCoin = true"><h3>{{language.currencies}}</h3></div>
    </div>

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
              <!--                            <img src="../../assets/images/bjwz/BSV.png" alt="">{{item.toUpperCase()}}-->
            </div>
            <div>
              <span class="i">></span>
              <button @click="changeSum(changeType[item+'L'])">-</button>
              <input class="value" v-model="coin[item]" type="number">
              <!--            <span class="value">{{coin.btc}}</span>-->
              <button @click="changeSum(changeType[item+'A'])">+</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <button class="rent" @click="isPwd = true">{{language.Submission}}</button>

    <AddCoinBar @coinImgList="getCoinImgList" v-show="isAddCoin">
      <div slot="top">
        <div class="top">{{language.leasing_currency}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in coinList.add?Object.keys(coinList.add):[]" :key="index">
              <span class="item-left"><img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}</span>
              <div class="mui-switch" :class="{'mui-active':coinList.add[item]}" @click="addCoin(item)">
                <div class="mui-switch-handle" ></div>
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
    <AddCoinBar v-show="isExitCoin">
      <div slot="top">
        <div class="top">{{language.returnable_currencies}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in canoutList.can?Object.keys(canoutList.can):[]" :key="index">
              <span class="item-left"><img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}</span>
              <div class="number">{{canoutList.can[item]}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="bottom">
        <div class="bottom">
          <span @click="isExitCoin = false">{{lang.common.determine}}</span>
        </div>
      </div>
    </AddCoinBar>
    <AddCoinBar v-show="isColdCoin">
      <div slot="top">
        <div class="top">{{language.frozen_currencies}}</div>
      </div>
      <div slot="list">
        <div class="list">
          <ul>
            <li v-for="(item,index) in canoutList.cant?Object.keys(canoutList.cant):[]" :key="index">
              <span class="item-left"><img :src="coinImgList[item]" alt="">{{item.toUpperCase()}}</span>
              <div class="number">{{canoutList.cant[item]}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="bottom">
        <div class="bottom">
          <span @click="isColdCoin = false">{{lang.common.determine}}</span>
        </div>
      </div>
    </AddCoinBar>
    <Alert v-show="isPwd">
      <h3 slot="top" class="title">{{lang.common.pay_password}}</h3>
      <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="coin.paypwd" type="password">
      <div slot="bottom" class="button">
        <button @click="cancel" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="exitRent" :disabled="isClick">{{lang.common.determine}}</button>
      </div>
    </Alert>
  </div>
</template>

<script>
    import {languageMixin} from '@/assets/commonjs/mixin'
    import {Trade} from "@/server/server.js";
    import AddCoinBar from "./addCoinBar";
    import Alert from "../../components/Alert";
    export default {
        name: "exitRent",
        data(){
            return {
                language:{},
                isAddCoin:false,
                isExitCoin:false,
                isColdCoin:false,
                isPwd:false,
                isClick:false,
                coinList: {
                    "default": [
                        "btc",
                        "eth"
                    ],
                    "add":{}
                },
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
                    paypwd:null
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
                canoutList:{}
            }
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.getCanoutList();
            })
        },
        components:{
            AddCoinBar,
            Alert
        },
        methods: {
            goTo(routerName, type) {
                this.$router.push({name: routerName, query: {type}});
            },
            getCoinImgList(data){
                this.coinImgList = data;
            },
            exitRent(){
                console.log(this.coin);
                Trade.do_out(this.coin).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        setTimeout(() => {
                            this.coin.paypwd = null;
                            this.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            cancel() {
                this.isPwd = false;
                this.coin.paypwd = null;
            },
            addCoin(item) {
                if (Number(this.coinList.add[item]) === 0) {
                    this.coinList.add[item] = 1;
                } else if (Number(this.coinList.add[item]) === 1) {
                    this.coinList.add[item] = 0;
                }
                console.log(item);
            },
            confirmAdd() {
                Object.keys(this.coinList.add).forEach(item => {
                    if (Number(this.coinList.add[item]) === 1) {
                        if(this.coinList.default.indexOf(item) === -1){
                            this.coinList.default.push(item);
                            this.coin[item] = 0;
                        }
                    }
                    if (Number(this.coinList.add[item]) === 0) {
                        if(this.coinList.default.indexOf(item) !== -1){
                            this.coinList.default.splice(this.coinList.default.indexOf(item),1);
                            this.coin[item] = 0;
                        }
                    }
                })
                this.isAddCoin = false;
                console.log(this.coinList.default);
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
            },
            getCanoutList() {
                let temp = {};
                Trade.getCanoutList().then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.canoutList = res.data;
                        this.coinList['add'] = this.canoutList['canout'];
                        this.coinList['add'].forEach(item=>{
                            temp[item] = 0;
                        })
                        this.coinList['add'] = temp;
                        //console.log(this.coinList['add']);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
  .page {
    overflow: auto;

    .header /deep/ .header {
      position: fixed;
    }

    .header {
      .choose {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 133, 255, 1);
        line-height: 20px;
      }
    }

    .top-nav{
      width: 92%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      div{
        width: 47%;
        height: 150px;
        background: url("../../assets/images/bjwz/chongzhi_img.png") no-repeat;
        background-size: cover;
        border-radius: 8px;

        &:last-of-type{
          background: url("../../assets/images/bjwz/tixian_img.png") no-repeat;
          background-size: cover;
        }

        h3{
          font-size:32px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:170px;
          margin-left: 45px;
        }
      }
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

    .rent {
      width: 590px;
      height: 90px;
      margin: 0 auto;
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

</style>
