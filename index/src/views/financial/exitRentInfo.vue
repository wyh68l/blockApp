<template>
  <div class="page">
    <m-header :title="language.rent_refund" :canback="Boolean(true)" class="header"></m-header>
    <div class="topNav">
      <ul>
       <li v-for="(item,index) in topnav"
           :key="index" :class="{'active':item.index}"
           @click="changeActive(index)"
       >{{item.type}}</li>
      </ul>
    </div>
    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.currency}}</li>
          <li>{{language.quantity}}</li>
          <li>{{language.status}}</li>
          <li>{{lang.article.application_time}}</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in getOutList" :key="index">
            <ul>
              <li>{{item.bname}}</li>
              <li>{{item.num}}</li>
              <li>{{item.status}}</li>
              <li>{{item.createtime}}</li>
            </ul>
          </li>
          <li v-if="getOutList.length === 0" class="nomore">
            {{lang?lang.common.no_more:''}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "exitRentInfo",
        data(){
            return {
                language:{},
                topnav:[
                    // '全部':1,
                    // '审核中':0,
                    // '已退回':0,
                    // '已拒绝':0
                    {
                        type:null,
                        index:1
                    },
                    {
                        type:null,
                        index:0
                    },
                    {
                        type:null,
                        index:0
                    },
                    {
                        type:null,
                        index:0
                    },
                ],
                getOutList:[]
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.initNav();
                this.get_out_list();
            })
        },
        methods:{
            initNav(){
                this.topnav[0].type = this.language.all;
                this.topnav[1].type = this.lang.article.under_review;
                this.topnav[2].type = this.language.been_returned;
                this.topnav[3].type = this.language.Rejected;
            },
            changeActive(index){
                this.topnav.forEach(item=>{item.index = 0;})
                this.topnav[index].index = 1;
                //console.log(index);
                switch (index) {
                    case 0:this.get_out_list();
                        break;
                    case 1:this.get_out_list0();
                        break;
                    case 2:this.get_out_list1();
                        break;
                    case 3:this.get_out_list2();
                        break;
                }
            },
            get_out_list() {
                Trade.get_out_list().then(res => {
                    if (res.code === 1) {
                        this.getOutList = res.data;
                        console.log(res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            get_out_list0() {
                Trade.get_out_list0().then(res => {
                    if (res.code === 1) {
                        this.getOutList = res.data;
                        console.log(res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            get_out_list1() {
                Trade.get_out_list1().then(res => {
                    if (res.code === 1) {
                        this.getOutList = res.data;
                        console.log(res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            get_out_list2() {
                Trade.get_out_list2().then(res => {
                    if (res.code === 1) {
                        this.getOutList = res.data;
                        console.log(res.data);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";

  .header {
    box-shadow: none !important;
  }

  .header /deep/ .header {
    box-shadow: none;
  }

  .page {
    overflow: auto;

    > .topNav {
      padding-right: 80px;
      height: 88px;
      background-color: #fff;
      color: white;

      ul {
        .display-flex;
        justify-content: space-around;

        li {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(20, 33, 51, 1);
          line-height: 88px;
          text-align: center;
        }

        .active {
          color: #3385FF;

          &:after {
            content: '';
            display: block;
            height: 4px;
            background-color: #3385FF;
          }
        }
      }
    }

    .rank {
      width: 94%;
      margin: 0 auto;
      margin-top: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-top-left-radius: 26px;
      border-top-right-radius: 26px;

      .topNav {
        height: 88px;
        background: linear-gradient(130deg, rgba(52, 136, 255, 1) 0%, rgba(51, 133, 255, 1) 100%);
        border-top-left-radius: 26px;
        border-top-right-radius: 26px;
        color: white;

        ul {
          .display-flex;
          justify-content: space-between;

          li {
            flex: 1;
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 88px;
            text-align: center;

            &:last-of-type {
              flex: 2;
            }
          }
        }
      }

      .content {
        > ul {
          max-height: 1000px;
          overflow: scroll;

          .nomore {
            text-align: center;
            padding: 80px;
            color: #666666;
            font-size: 30px;
          }

          .item {
            border-bottom: 2px solid #F4F4F4;

            ul {
              .display-flex;
              justify-content: space-between;
              align-items: center;

              li {
                flex: 1;
                text-align: center;
                font-size: 28px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                padding: 30px 0;
              }

              .more {
                flex: 2;

                span {
                  width: 35px;
                  border: 1px solid rgba(52, 134, 255, 1);
                  font-size: 30px;
                  padding: 10px 15px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(52, 134, 255, 1);
                  border-radius: 8px;
                }
              }
            }
          }
        }
      }

      .rent {
        width: 590px;
        height: 90px;
        margin-left: 50px;
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
  }

</style>
