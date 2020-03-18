<template>
  <div class="page">
    <m-header :title="language.Contract_record" :canback="Boolean(true)" class="header" ></m-header>

    <div class="search">
      <label for="">
        <input type="text" v-model="fromData.keyword" :placeholder="language.nicknames">
        <button @click="get_hetong">{{language.search}}</button>
      </label>
    </div>
    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.Lessee}}</li>
          <li>{{language.Leased_currency}}</li>
          <li>{{language.Contract_number}}</li>
          <li>{{language.operating}}</li>
<!--          <li>{{language.Repayment_time}}</li>-->
        </ul>
      </div>
      <div class="content">
        <ul :style="'height:'+(screenHeight-250)+'px;overflow:auto;'" >
          <li class="item" v-for="(item,index) in getReturnList?getReturnList:[]" :key="index">
            <ul>
              <li>{{item.nickname}}</li>
              <li>{{item.lease_b}}</li>
              <li class="number">{{item.ordersn}}</li>
              <li class="more" @click="goTo('CheckoutInfo',{oid:item.id,coinName:fromData.coinName})"><span>{{language.Detailed}}</span></li>
            </ul>
          </li>
          <li v-if="getReturnList.length === 0" class="nomore">
            {{lang?lang.common.no_more:''}}
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "collocationList",
        data() {
            return {
                getReturnList:[
                    // {
                    //     "id": 28,
                    //     "ordersn": "Lo20191122160330222202",
                    //     "nickname": "-",
                    //     "lease_b": "btc/usdt"
                    // },
                    // {
                    //     "id": 29,
                    //     "ordersn": "Lo20191122163023422554",
                    //     "nickname": "-",
                    //     "lease_b": "btc/eos"
                    // },
                    // {
                    //     "id": 30,
                    //     "ordersn": "Lo20191122163834024450",
                    //     "nickname": "-",
                    //     "lease_b": "btc"
                    // },
                ],
                searchList:[],
                language:{},
                noMore:false,
                searchNoMore:false,
                screenHeight:null,
                tempList:[],
                type:'default',
                fromData: {
                    keyword:'',
                    coinName:''
                },
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.screenHeight = window.screen.availHeight;
                this.initDefault();
            })
        },
        methods: {
            initDefault(){
                // this.type = 'default';
                // console.log(this.fromData);
                // this.fromData.page = 1;
                // this.getReturnList = [];
                console.log(this.$route.query.type);
                switch (Number(this.$route.query.type)) {
                    case 1:this.fromData.coinName = 'btc';
                        break;
                    case 2:this.fromData.coinName = 'eth';
                        break;
                    case 3:this.fromData.coinName = 'usdt';
                        break;
                    case 4:this.fromData.coinName = 'eos';
                        break;
                    case 5:this.fromData.coinName = 'xkb';
                        break;
                    case 6:this.fromData.coinName = 'bch';
                        break;
                    case 7:this.fromData.coinName = 'xrp';
                        break;
                    case 8:this.fromData.coinName = 'ltc';
                        break;
                    case 9:this.fromData.coinName = 'trx';
                        break;
                    case 10:this.fromData.coinName = 'dash';
                        break;
                    case 11:this.fromData.coinName = 'bsv';
                        break;
                }
                this.get_hetong();
            },
            goTo(routerName,options) {
                this.$router.push({name:routerName,query:{oid:options.oid,coinName:options.coinName}});
            },
            get_hetong() {
                console.log(this.fromData);
                Trade.get_hetong(this.fromData).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.getReturnList = res.data;
                        // this.tempList = this.getReturnList;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            initSearch(){
                this.type = 'search';
                console.log(this.fromDataSearch);
                // this.fromDataSearch.page = 1;
                // this.searchList = [];
                // this.search();
            },
            search() {
                Trade.get_retuan_log(this.fromData).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        if(this.fromDataSearch.page >= res.count){
                            this.searchNoMore = true;
                        }
                        this.searchList = this.searchList.concat(res.data.length !== 0?res.data.list:[]);
                        this.tempList = this.searchList;
                        console.log(this.tempList);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            lazyLoad(){
                if(this.type === 'default'){
                    this.fromData.page = this.fromData.page + 1;
                    if (!this.noMore) {
                        this.get_retuan_log();
                    }
                }else{
                    this.fromDataSearch.page = this.fromDataSearch.page + 1;
                    if (!this.searchNoMore) {
                        this.search();
                    }
                }
            },
            formatDate(time){
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .page{
    .header{
      box-shadow:none!important;
    }
    .header /deep/ .header{
      box-shadow:none;
    }

    .search{
      width: 100%;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px 30px;
      padding-bottom: 10px;
      margin-bottom: 20px;

      label{
        input{
          width: 83%;
          float: left;
          vertical-align: bottom;
          border-radius: 0;
          height: 70px;
          line-height: 70px;
          border: none;
          background-color: #f7f7f7;
        }
        button{
          border-radius: 0;
          float: left;
          vertical-align: bottom;
          height: 70px;
          line-height: 70px;
          text-align: center;
          color: #3486FF;
          width: 17%;
          font-size: 35px;
          outline: none;
        }
      }
    }

    .rank {
      width: 94%;
      margin: 0 auto;
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
            font-size:25px;
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

                p{
                  color: #333333;
                }

              }
              .number{

                overflow: scroll;
              }
              .more{

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
  }

</style>
