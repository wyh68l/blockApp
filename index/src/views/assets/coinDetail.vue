<template>
  <div class="page">
    <m-header :title="type" :canback="true"></m-header>
    <section class="body">
        <div class="title">
            <div class="assets">
            <div class="assets_text">数量</div>
            <div class="assets_num">{{num}}</div>
            </div>
        </div>
        <footer class="f-btns">
          <button class="btn btn-recharge">充值</button>
          <button class="btn btn-withdraw">提现</button>
        </footer>
    </section>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
import { Assets } from "@/server/server.js";
import {mapGetters} from 'vuex';

export default {
    data(){
        return{
            data:null,
            type:null,
            num:null
        }
    },
    mounted(){
        this.initData();
        // this.getCoin();
        
    },
    computed:{
        ...mapGetters(['uid'])
    },
    methods:{
        initData(){
            this.type = this.$route.params.type;
            this.num = this.$route.params.num;
        },
        getCoin(){
          Assets.getCoin({uid:this.uid}).then(res=>{
            if(res.code ==1){
                this.data = res.data
            }else{
                mui.toast(res.msg);
            }
          })
        }
    }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  //   padding: @margin-primary;
  background-color: #f5f5f5;
  .title {
    padding: 60px;
    color: #fff;
    background: url("../../assets/images/hbtz/path.png");
    background-size: 100% 100%;
    .assets {
      text-align: center;
      .assets_text {
        font-size: 28px;
      }
      .assets_num {
        margin-top: 12px;
        font-size: 44px;
      }
    }
  }
  .f-btns {
      .display-flex();
      justify-content: space-between;
      margin-top: @margin-primary;
      .btn {
          background-color: @base-blue;
          width: 100%;
          flex: 1;
          margin: 0 20px;
          height: 88px;
      }
      .btn-recharge {
      }

  }
}
</style>