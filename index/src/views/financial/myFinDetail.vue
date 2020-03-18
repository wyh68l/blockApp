<template>
  <div class="page">
    <m-header title="理财包详情" :canback="true"></m-header>
    <section class="body">
        <div class="content">
            <img class="head" :src="detail && api+detail.image" alt="">
            <p>矿详情</p>
            <ul class="details" v-if="detail">
                <li class="item name">{{detail.machinename}}</li>
                <li class="item">价格：{{detail.price}}</li>
                <li class="item">日收益：{{detail.nissan}}</li>
                <li class="item">孵化周期：{{detail.life}}</li>
                <li class="item">到期时间：{{detail.expiretime}}</li>
                <li class="item">状态：<span :class="{'s-red':detail.order_status==0,'s-green':detail.order_status==1,'s-blue':detail.order_status==0,}">{{setStatus(detail.order_status)}}</span></li>
            </ul>
            <button class="btn gradient-origin" v-show="detail && detail.status=='normal'" @click="toRebate">退单</button>
        </div>
    </section>
    <pwd-alert ref="pwd" @pay="pay"></pwd-alert>
  </div>
</template>
<script>
import { Index,Financial } from "@/server/server.js";
import {Util} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
import pwdAlert from '@/components/pwd-alert.vue';

export default {
    components:{
        pwdAlert
    },
  data() {
    return {
      detail:null,
      id:null
    };
  },
  mounted() {
    this.initData();
    this.getMyFinDetail();
  },
  computed:{
      ...mapGetters(['api','screenH'])
  },
  methods: {
      initData(){
          this.id = this.$route.params.id;
          console.log(this.id)
      },
      getMyFinDetail(){
        Financial.getMyFinDetail({id:this.id}).then(res=>{
          if(res.code ==1){
            this.detail = res.data;
          }
        })
      },
      setStatus(status){
          switch(String(status)){
              case '0':
                  return '未开始收益';
              case '1':
                  return '收益中';
              case '2':
                  return '已完成';
          }
      },
      toRebate(){
          this.$refs['pwd'].open();
      },
      pay(pwd){
          this.rebate(pwd);
      },
      rebate(pwd){
          let _this = this;
          Financial.rebate({id:this.detail.id,pwd}).then(res=>{
              if(res.code ==1){
                  mui.alert(res.msg,()=>{
                      _this.getMyFinDetail();
                  })
              }else{
                  mui.toast(res.msg);
                  return;
              }
          })
      }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
    .content {
        padding: @padding-primary;
        text-align: center;
        .head {
            height: 356px;
        }
        .details {
            text-align: left;
            .item {
                height: 80px;
                line-height: 80px;
                border-bottom: 1px solid #eee;
            }
            .name {
                font-size: 32px;
                font-weight: 700;
            }
            .s-red{
                color: @base-red;
            }
            .s-green{
                color: @base-green;
            }
            .s-blue{
                color: @base-blue;
            }
        }
        .btn {
            width: 100%;
            margin-top: @margin-primary;
            font-size: 28px;
        }
    }
}
</style>