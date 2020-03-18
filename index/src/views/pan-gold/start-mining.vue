<template>
  <div class="page">
    <m-header title="抢购中" :canback="Boolean(1)"></m-header>
    <div class="body">
      <img class="img" src="../../assets/images/gzlz/mining.gif">
      <p class="tip">哈希碰撞挖矿中，请不要退出此页面</p>
      <!-- <div @click="goTo('BuyResule', 'success')">抢购成功跳转</div>
      <div @click="goTo('BuyResule', 'fail')">抢购失败跳转</div> -->
    </div>
  </div>
</template>
<script>
import {Index} from '@/server/server.js';

export default {
    data (){
        return {
            level:null,
            mineTime:null,
            mineInt:null
            
        }
    },
    mounted(){
        this.initData();
        this.mineTime = setTimeout(() => {
            this.mineInt = setInterval(() => {
              this.getoreResult(this.level);
            }, 1000);
        }, 180000);
        // this.mining(this.level);
    },
    methods: {
        initData(){
            this.level = this.$route.params.level;
        },
        goTo(routeName, params) {
          this.$router.push({ name: routeName ,query:{ type:params }});
        },
        // 抢矿请求 ！！！！弃用！！！！
        // mining(level){
        //     this.result = null;
        //     Index.mining({level}).then(res=>{
        //         if(res.code == 1){
        //             setTimeout(() => {
        //                 this.$router.push({name:'BuyResule',query:{ type:'success' }})
        //             }, 120000);
        //         }else {
        //           setTimeout(() => {
        //                 this.$router.push({name:'BuyResule',query:{ type:'fail' }})
        //             }, 120000);
        //         }
        //     })
        // },
        // 抢矿结果
        getoreResult(level){
            Index.getoreResult({level}).then(res=>{
                if(res.code == 1){
                    this.$router.push({name:'BuyResule',query:{ type:'success' }})
                }else if(res.code ==2){
                    this.$router.push({name:'BuyResule',query:{ type:'fail' }})
                }else {
                  return ;
                }
            })
        },
    },
    beforeRouteLeave (to, from, next) {
        clearInterval(this.mineInt);
        clearTimeout(this.mineTime);
        next();
      }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  .display-flex();
  padding-top: 215px;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  background: @bg-color;
  color: #fff;
  font-size: 25px;
  .img {
    width: 80%;

  }
  .tip {
    color: red;
    font-size: 32px;
    margin-top: 50px;
  }
}
</style>
