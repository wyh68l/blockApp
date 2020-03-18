<template>
  <div class="page">
    <m-header :title="language.my_machine" :canback="Boolean(true)"></m-header>
    <div class="myCar">
      <ul>
        <li v-show="typeId === 0">{{language.total_mine_num}}：<span>{{myCarInfo.price?myCarInfo.price:0}}XKB</span></li>
        <li v-show="typeId === 1">{{language.total_mine_num}}：<span>{{myCarInfo.price?myCarInfo.price:0}}USDT</span></li>
        <li>{{language.current}}：<span>{{myCarInfo.num?myCarInfo.num:0}}个</span></li>
        <li v-show="typeId === 0">{{language.total_income}}：<span>{{myCarInfo.total_revenue?myCarInfo.total_revenue:0}}XKB</span></li>
        <li v-show="typeId === 1">{{language.total_income}}：<span>{{myCarInfo.total_revenue?myCarInfo.total_revenue:0}}USDT</span></li>
      </ul>
    </div>
    <div class="content">
      <ul v-lazy-load="lazyLoad"
          :style="'height:'+(screenHeight-280)+'px;overflow:auto;'">
        <li v-for="(item,index) in myCarList?myCarList:[]" :key="index">
          <div class="title">
            <h3>{{language.numbering}}：{{item.ordersn}}
              <span v-if="item.order_status === 0">{{language.waiting_gain}}</span>
              <span v-if="item.order_status === 1">{{language.income}}</span>
              <span v-if="item.order_status === 2">{{language.income_completion}}</span>
            </h3>
          </div>
          <div class="content">
            <div class="itemLeft">
              <h3>{{item.machinename}} <span><button @click="goTo('MyRentCarInfo',{id:item.id,typeId:typeId})">{{lang.common.details}}</button></span></h3>
              <p>{{language.daily_income}}：<span>{{item.nissan}}%</span></p>
              <p v-show="typeId === 0">{{language.total_deposit}}：<span>{{item.price}}XKB</span></p>
              <p v-show="typeId === 1">{{language.total_deposit}}：<span>{{item.price}}USDT</span></p>
              <p>{{language.pay_date}}：<span>{{formatDate(item.createtime)}}</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {Util} from '@/assets/commonjs/utils.js';
    import {Index} from '@/server/server.js';
    import {mapGetters} from 'vuex';
    export default {
        name: "myRentCar",
        data() {
            return {
                myCarList:[],
                myCarInfo:[],
                page:1,
                noMore:false,
                language:{},
                type:'XKB',
                typeId:0
            };
        },
        created(){
            this.language = this.lang.machine;
            this.getMyCarList();
            this.getMyCarInfo();
            this.screenHeight = window.screen.availHeight;
        },
        computed: {
            ...mapGetters(['lang'])
        },
        methods:{
            goTo(routerName,options) {
                this.$router.push({name: routerName, query: {id:options.id,typeId: options.typeId}});
            },
            getMyCarList(){
                Index.getMyRentCarList({page: this.page}).then(res => {
                    console.log(res.data);
                    if(res.code === 1){
                        if(this.page >= res.totalpage){
                            this.noMore = true;
                        }
                        this.myCarList = this.myCarList.concat(res.data)
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            getMyCarInfo(){
                this.typeId = Number(this.$route.query.typeId);
                this.typeId === 0?this.type = 'XKB':this.type = 'USDT';
                Index.getMyRentCarInfo({type:this.type}).then(res => {
                    console.log(res.data);
                    if(res.code === 1){
                        this.myCarInfo = res.data
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    this.getMyCarList();
                }
            }
        }
    }
</script>

<style scoped lang="less">
.page{
  overflow: auto;

  .myCar{
    background-color: #fff;
    height: 384px;
    margin-bottom: 20px;
    padding: 42px 0;

    ul{
      background: url("~assets/images/bjwz/bg3.png") no-repeat;
      background-size: contain;
      width: 686px;
      height: 300px;
      margin: 0 auto;
      padding-top: 90px;

      li{
        width: 378px;
        float: right;
        color: #fff;
        margin-right: 20px;
        line-height:44px;
        span{
          float: right;
        }
      }
    }
  }

  >.content{
    width: 92%;
    margin: 0 auto;
    margin-top: 20px;


    ul{
      li{
        background-color: #fff;
        padding:30px 28px;
        margin-bottom: 20px;
        border-radius:16px;

        .title{
          height: 86px;
          border-bottom: 1px solid #f6f6f6;

          h3{
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(157,166,179,1);
            line-height:86px;

            span{
              float: right;
              font-size:28px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(51,133,255,1);
              line-height:86px;
            }
          }
        }

        .content{
          margin-top: 32px;

          .itemLeft{
            h3{
              font-size:32px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(51,133,255,1);
              margin-bottom: 50px;

              span{
                float: right;
                button{
                  width:142px;
                  height:56px;
                  background:rgba(51,133,255,1);
                  border-radius:28px;
                  font-size:26px;
                  font-family:PingFangSC-Regular,PingFang SC;
                  font-weight:400;
                  color:rgba(255,255,255,1);
                  line-height:56px;
                }
              }
            }
            p{
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:#020202;
              line-height:36px;
              margin-bottom: 30px;
              span{
                float: right;
                font-size:28px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(143,149,170,1);
                line-height:32px;
              }
            }
          }
        }
      }
    }
  }
}

</style>
