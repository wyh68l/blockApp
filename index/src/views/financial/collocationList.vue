<template>
  <div class="page">
    <m-header :title="language.hosting_list" :canback="Boolean(true)" class="header">
    </m-header>

    <div class="rank">
      <div class="topNav">
        <ul>
          <li>{{language.currency}}</li>
          <li>{{language.hosts}}</li>
          <li>{{lang?lang.common.time:''}}</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in trusteeshipList" :key="index">
            <ul>
              <li>{{(item.type).toUpperCase()}}</li>
              <li>{{item.num}}</li>
              <li>{{formatDate(item.createtime)}}</li>
            </ul>
          </li>
          <li v-if="trusteeshipList.length === 0" class="nomore">
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
                trusteeshipList:[],
                language:{},
                type:null
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.type = this.$route.query.type;
                this.get_trusteeship_list();
            })
        },
        methods: {
            get_trusteeship_list() {
                console.log(this.type);
                Trade.get_trusteeship_list({type:this.type}).then(res => {
                    if (res.code === 1) {
                        console.log(res.data);
                        this.trusteeshipList = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
            goTo(routerName) {
                this.$router.push({name: routerName});
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
