<template>
    <div class="page">
      <m-header :title="language.check" :canback="Boolean(true)" class="header"></m-header>
      <div class="sign">
        <img src="~assets/images/bjwz/sign.png" alt="">
        <p>{{day.explain}}</p>
        <button v-if="isCheck" @click="goSign">{{language.check}}</button>
        <button v-else style="background-color: #999999">{{language.already}}</button>
      </div>

      <div class="tip">
        <p>{{candyContent.tips}}</p>
      </div>
    </div>
</template>

<script>
    import {Index,Trade} from '@/server/server.js';
    import {mapGetters} from 'vuex'
    export default {
        name: "sign",
        data() {
            return {
                isCheck:false,
                rentCarDetail:[],
                candyContent:{},
                language:{

                },
                day:0
            }
        },
        created(){
            this.language = this.lang.check;
            this.getRentCar();
            this.getCandyInfo();
            this.getSignday();
        },
        computed:{
            ...mapGetters(['lang'])
        },
        methods:{
            getRentCar(){
                Index.getIsSign().then(res => {
                    if(res.code === 1){
                        this.isCheck = true;
                    }else{
                        this.isCheck = false;
                    }
                })
            },
            getSignday(){
                Trade.getSignday().then(res => {
                    if(res.code === 1){
                        this.day = res.data;
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            goSign(){
                Index.goSign().then(res => {
                    if(res.code === 1){
                        mui.toast(res.msg)
                        this.isCheck = false;
                        this.getSignday();
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            getCandyInfo(){
                    Index.getCandyText().then(res => {
                        if(res.code === 1){
                            console.log(res.data);
                            this.candyContent = res.data;
                        }else{
                            mui.toast(res.msg);
                        }
                    })
            },
        }
    }
</script>

<style scoped lang="less">
  .page{
    background-color: #fff;

    .sign{
      margin: 80px auto;
      text-align: center;

      img{
        width: 240px;
        height: 240px;
        margin: 0 auto;
        margin-bottom: 30px;
      }
      p{
        text-align: center;
        font-size:30px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#333333;
        line-height:42px;
      }
      button{
        width:590px;
        height:90px;
        background:rgba(51,133,255,1);
        border-radius:16px;
        margin: 0 auto;
        font-size:32px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:90px;
        text-align: center;
        margin-top: 80px;
      }
    }

    .tip{
      padding: 0 50px;
      h4,p{
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
      }
    }
  }

</style>
