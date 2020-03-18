<template>
  <div class="page">
    <m-header title="我的理财包" :canback="Boolean(true)"></m-header>
    <div class="body" :style="'height:'+(screenH-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
     <ul class="list">
       <li class="item" v-for="(item,index) in listData" :key="index">
         <div class="content">
          <img class="head" :src="api+item.image" alt="">
          <div class="text" >
            <p class="name">{{item.machinename}}</p>
            <p>孵化周期：{{item.life}}天</p>
            <p>日收益：{{item.nissan}}%</p>
          </div>
         </div>
         <button class="btn gradient-origin" @click="detail(item.id)">详情</button>
       </li>
        <next ref="next" :nomore="noMore"></next>
     </ul>
    </div>
  </div>
</template>
<script>
import { Index,Owner,Financial } from "@/server/server.js";
import {Load,Util} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      listData:[],
      page:1,
      noMore:false
    };
  },
  mounted() {
    this.initData();
    this.getMyFin();
    // console.log(Financial.getList)
  },
  computed:{
      ...mapGetters(['api','screenH'])
  },
  methods: {
      initData(){
        Load.loadNext(this);
      },
      getMyFin(){
        Financial.getMyFin({page:1}).then(res=>{
          if(res.code ==1){
            this.listData = res.data&& this.listData.concat(res.data);
            if(res.data && res.data.length<10)
            this.noMore = true;
          }
        })
      },
      setLanTxt(strArr){
          return Util.setLanTxt(strArr)
      },
      detail(id) {
          this.$router.push({name:'MyFinDetail',params:{id}})
      },
      lazyLoad(){
          this.page = this.page+1;
          if(!this.noMore)
          this.getMyFin();
      },
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  .list{
    .item {
        background-color: white;
      .display-flex();
      justify-content: space-between;
      padding: @padding-primary;
      margin-bottom: 20px;
      align-items: center;
      .content {
          .display-flex();
          .head {
              width: 144px;
              height: 144px;
              margin-right: 16px;
          }
          .text{
            .display-flex();
              flex-direction: column;
              justify-content: space-between;
              p {
                  color: black;
              }
                .name {
                    font-size: 34px;
                    color: @base-origin;
                    font-weight: 700;
                }
          }
      }
    }
  }
}
</style>