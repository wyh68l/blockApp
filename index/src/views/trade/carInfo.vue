<template>
    <div class="page">
      <m-header :title="language.machine_details" :canback="Boolean(true)" class="header"></m-header>

      <div class="content">
        <div><img class="bgc" :src="api+rentCarDetail.image" alt=""></div>

        <div class="Info">
          <h3>{{rentCarDetail.name}}</h3>
          <p v-html="rentCarDetail.content"></p>

          <div class="income">
            <h4>{{language.daily_income}}</h4>
            <p><span v-for="(item,index) in rentCarDetail.list" :key="index">
              {{item.nissan}}%
              <span v-if="length > 1 && length !== index+1">~</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="submit">
        <button class="buy" @click="goTo('CarRentInfo',rentCarDetail.id)">{{language.immediate_lease}}</button>
      </div>
    </div>
</template>

<script>
    import {Index} from '@/server/server.js';
    import {mapGetters} from 'vuex';
    export default {
        name: "carInfo",
        data() {
            return {
                rentCarDetail:[],
                id:null,
                length:0,
                language:{},
                typeId:0
            }
        },
        computed: {
            ...mapGetters(['api','lang'])
        },
        created(){
            this.language = this.lang.machine;
            this.typeId = this.$route.query.typeId;
            this.getRentCar();
        },
        methods: {
            goTo(routerName,id) {
                this.$router.push({name:routerName,query:{id:id,typeId:this.typeId}});
            },
            getRentCar(){
                this.id = this.$route.query.id;
                Index.getRentCarInfo({id:this.id}).then(res => {
                    console.log(res.data);
                    if(res.code === 1){
                        this.rentCarDetail = res.data;
                        this.length = this.rentCarDetail.list.length;
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
        },
    }
</script>

<style scoped lang="less">
  .page{
    overflow: auto;
    padding-bottom: 50px;

    .header /deep/ header {
      position: fixed;
    }

    .content{
      background-color: #fff;
      padding-bottom: 68px;
      padding-top: 42px;

      >div{
        text-align: center;
        .bgc{
          width: 686px;
          height: 300px;
          border-radius:12px;
          margin: 0 auto;
        }
      }

      .Info{
        margin: 0 auto;
        margin-top: 40px;
        text-align: center;
        width: 592px;

          h3{
            font-size:34px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:48px;
            margin-bottom: 30px;
          }
        /deep/ p{
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(143,149,170,1);
          line-height:42px;
          text-align: left;
        }
        .income{
          width: 404px;
          height: 132px;
          background: url("~assets/images/bjwz/bg2.png") no-repeat;
          background-size: contain;
          margin: 0 auto;
          margin-top: 82px;
          padding-left: 120px;
          padding-top: 20px;

          h4{
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:44px;
          }
          p{
            font-size:26px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:60px;
            text-align: center;
          }
        }
      }
    }

    .submit{
      margin: 0 auto;
      margin-top: 80px;
      button{
        width: 590px;
        height: 90px;
        border-radius: 16px;
        line-height: 90px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        background-color: #3385FF;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

</style>
