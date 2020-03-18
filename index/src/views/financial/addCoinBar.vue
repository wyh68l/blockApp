<template>
  <div class="addCoinBar">
    <div class="bar">
      <slot name="top"></slot>

      <slot name="list">
      </slot>

      <slot name="bottom">
      </slot>
    </div>
  </div>
</template>

<script>
    import {Trade} from "@/server/server.js";
    export default {
        name: "addCoinBar",
        data() {
            return {
                addCoinList: [],
                coinImgList: {
                    'btc': require('../../assets/images/bjwz/BTC.png'),
                    'eth': require('../../assets/images/bjwz/ETH.png'),
                    "usdt": require('../../assets/images/bjwz/USDT.png'),
                    "eos": require('../../assets/images/bjwz/EOS.png'),
                    "xkb": require('../../assets/images/bjwz/XKB.png'),
                    "bch": require('../../assets/images/bjwz/BCH.png'),
                    "xrp": require('../../assets/images/bjwz/XRP.png'),
                    "ltc": require('../../assets/images/bjwz/LTC.png'),
                    "trx": require('../../assets/images/bjwz/TRX.png'),
                    "dash": require('../../assets/images/bjwz/DASH.png'),
                    "bsv": require('../../assets/images/bjwz/BSV.png')
                },
            }
        },
        props: {
            coinList: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        created() {
            this.$emit('coinImgList',this.coinImgList);
        },
        methods: {

        }
    }

</script>

<style scoped lang="less">
  .addCoinBar {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    overflow: scroll;

    .bar {
      width: 80%;
      margin: 0 auto;
      margin-top: 15%;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;

      .top {
        height: 106px;
        line-height: 106px;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(15, 24, 38, 1);
        border-bottom: 1px solid #f6f6f6;
        padding-left: 40px;
      }

      .list {
        margin-bottom: 60px;

        ul {
          li {
            padding: 0 40px;
            height: 96px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f6f6f6;

            .item-left {
              display: block;
              height: 96px;
              font-size: 26px;
              line-height: 96px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(15, 24, 38, 1);

              img {
                width: 45px;
                height: 45px;
                transform: translate(0, 10px);
                margin-right: 10px;
              }
            }

            .number{
              line-height: 96px;
            }

            .mui-switch {
              margin-top: 20px;
            }

            .mui-switch.mui-active {
              border-color: #3385FF;
              background-color: #3385FF;
            }
          }
        }
      }

      .bottom {
        color: #3385FF;
        height: 96px;
        line-height: 96px;
        text-align: center;
        border-top: 1px solid #f6f6f6;
      }
      .tip{
        font-size:23px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#666666;
        line-height:22px;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }

</style>
