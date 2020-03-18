<template>
  <div class="page">
    <m-header :title="setTitle(type)" :canback="Boolean(1)">
      <i v-if="type !='credit5'" @click="goTo('Extract')">提取</i>
    </m-header>
    <div class="body">
      <div class="content">
        <div class="num" v-if="type=='credit2'">{{data?data.config.credit2_from:'0'}}={{data?data.config.credit2_to:'0'}} {{type=="credit4"?"USD":"SGD"}}</div>
        <div class="num" v-else-if="type=='credit4'">{{data?data.config.credit4_from:'0'}}={{data?data.config.credit4_to:'0'}} {{type=="credit4"?"USD":"SGD"}}</div>
        <div class="num" v-else>
          <p>累计收益</p>
          <p class="total">{{data?data.config.credit5:'0'}}</p>
        </div>
      </div>
      <ul v-if="data && data.data && data.data.length>0">
        <li class="list" v-for="(item,index) in data.data" :key="index">
          <ul>
            <li class="identifier">
              <span>编号：{{item.orecode}}</span>
              <span v-if="Number(item.money)>0" class="list-num">+{{item.money}}</span>
              <span v-else class="list-num red">+{{item.money}}</span>
            </li>
            <li>
              矿等级：
              <span class="grade">{{item.levelname}}</span>
            </li>
            <li>
              矿值：
              <span>{{item.level}}</span>
            </li>
            <li>
              智能合约：
              <span>{{item.days}}天{{parseInt(item.per)}}%</span>
            </li>
            <li>{{item.time}}</li>
          </ul>
        </li>
      </ul>
      <p v-else class="no-msg">没有更多了呢~</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {Owner} from '@/server/server.js';
export default {
  data() {
      return {
          type:null,
          data:null
      };
  },
  mounted() {
      this.initData();
      this.getCoinOrder(this.type);
  },
  computed:{
      ...mapGetters(['uid'])
  },
  methods: {
      initData(){
          this.type = this.$route.query.type;
      },
      setTitle(type){
          switch(type){
              case 'credit1':
                  return '矿机';
                  break;
              case 'credit2':
                  return '区块Mine';
                  break;
              case 'credit3':
                  return '推广收益';
                  break;
              case 'credit4':
                  return 'DOGE';
                  break;
              case 'credit5':
                  return '我的收益';
                  break;
          }
      },
      goTo(route) {
          this.$router.push({ name: route,query:{type:this.type} });
      },
      getCoinOrder(type){
          let params = {
              id:this.uid,
              type
          }
          Owner.getCoinOrder(params).then(res=>{
              // if(res.code == 1){
                  this.data = res.data;
                  // mui.toast(res.msg);
              // }else {
              //     mui.toast(res.msg);
              //     return ;
              // }
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
  color: @bg-color-white;
  .content {
    height: 220px;
    padding-top: 60px;
    background: #252436;
    border-radius: 8px;
    .num {
      text-align: center;
      color: @primary-color;
      font-size: 40px;
      .total{
        color: @primary-color;
        font-size: 32px;
      }
    }
  }
  .list {
    margin-top: 20px;
    // height: 220px;
    padding: 22px;
    background: #252436;
    border-radius: 8px;
    font-size: 25px;
    .identifier {
      .display-flex();
      justify-content: space-between;
      .list-num {
        font-size: 35px;
        color: green;
      }
      .red {
        color: red;
      }
    }
    .grade {
      color: rgba(245, 190, 40, 1);
    }
  }
}
</style>
