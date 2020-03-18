<template>
  <div class="page">
    <m-header title="提取记录" :canback="Boolean(1)"></m-header>
    <div class="body" v-if="type=='credit3'">
      <ul class="nav">
        <li>用户</li>
        <li>{{type=='credit4'?'Doge':type=='credit3'?'收益出售':'区块Mine'}}</li>
        <li>提取时间</li>
      </ul>
      <ul :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li class="list" v-for="(item,index) in logData" :key="index">
          <span>{{item.username}}</span>
          <span>{{item.num}}</span>
          <span class="date">{{formatDate(item.createtime)}}</span>
        </li>
        <next ref="next" :nomore="noMore"></next>
      </ul>
    </div>
    <div class="body" v-else>
      <ul class="nav">
        <li>钱包地址</li>
        <li>数量</li>
        <li>状态</li>
        <li>提取时间</li>
      </ul>
      <ul :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
        <li class="list" v-for="(item,index) in logData" :key="index">
          <span>{{item.address}}</span>
          <span class="num">{{Number(item.number)}}</span>
          <span>{{item.state}}</span>
          <span class="date">{{formatDate(item.createtime)}}</span>
        </li>
        <next ref="next" :nomore="noMore"></next>
      </ul>
    </div>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
  data() {
    return {
      type:null,
      page:1,
      logData:[],
      noMore:false,
      screenHeight:null,

    };
  },
  mounted() {
    this.initData();
    if(this.type == 'credit3'){
      this.sellLog(this.page);
    }else {
      this.getapplyList(this.page)
    }
  },
  methods:{
    initData(){
      this.type = this.$route.query.type;
      this.screenHeight = window.screen.height || window.screen.availHeight;
    },
    sellLog(page){
      setTimeout(() => {
                Load.loadNext(this);
            }, 0);
      Owner.sellLog({page}).then(res=>{
        if(res.code == 1){
          this.logData = this.logData.concat(res.data||[]);
          this.maxPrice = res.max_price.max_price;
          if(!res.data||res.data.length<10)
          this.noMore = true;
        }
      })
    },
    lazyLoad(){
          this.page = this.page+1;
          if(!this.noMore)
          this.sellLog(this.page);
      },
    formatDate(date){
      return Util.formatDate(date);
    },
    getapplyList(){
        let params = {
            page:this.page,
            type:this.type
        };
        setTimeout(() => {
                Load.loadNext(this);
            }, 0);
        Owner.getapplyList(params).then(res=>{
            if(res.code == 1){
              this.logData = this.logData.concat(res.data||[]);
              if(!res.data||res.data.length<10)
              this.noMore = true;
            }
        })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @bg-color;
  padding: 30px;
  .nav {
    .display-flex();
    justify-content: space-between;
    color: @bg-color-white;
    font-size: 32px;
    li{
      flex:1 1 auto;
      text-align: center;
    }
  }
  .list {
    .display-flex();
    justify-content: space-between;
    margin-top: 28px;
    color: #fff;
    font-size: 28px;
    .date {
      font-size: 23px;
    }
    &>span.num{
      flex: 0 0 80px;
      text-align: center;
    }
    &>span:first-child{
      flex: 0 0 220px;
      word-break: break-all;
      text-align: center;
    }
    &>span:nth-child(3){
      flex: 0 0 100px;
      word-break: break-all;
      text-align: center;
    }
    &>span:last-child{
      flex: 0 0 220px;
      text-align: right;
    }
  }
}
</style>
