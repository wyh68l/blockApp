<template>
  <div class="page">
    <m-header :title="setTitle(type)+'提取'" :canback="Boolean(1)">
      <i @click="extractRecord()">提取记录</i>
    </m-header>
    <div class="body">
      <form>
        <ul>
          <li class="list">
            <div class="title">{{setTitle(type)}}钱包地址</div>
            <input type="text" class="inp" v-model="formData.address" placeholder="请输入钱包地址">
          </li>
          <li class="list">
            <div class="title">数量</div>
            <input type="text" class="inp" v-model="formData.number" placeholder="请输入数量">
          </li>
          <li class="list poundage" v-if="rate">可提取数量：{{type=='credit2'?Number(rate['区块Mine'].credit2):Number(rate['Doge币'].credit4)}}</li>
          <li class="list poundage" v-if="rate">兑换比例：{{type=='credit2'?rate['区块Mine'].key+"/"+rate['区块Mine'].value:rate['Doge币'].key+"/"+rate['Doge币'].value}}</li>
        </ul>
        <div class="sub" @click="apply">申请提取</div>
      </form>
    </div>
  </div>
</template>
<script>
import {Owner} from '@/server/server.js';
import {Util} from '@/assets/commonjs/utils.js';

export default {
  data() {
    return {
      type:null,
      formData:{
          address:null,
          number:null,
          type:null,
      },
       rate:null

    };
  },
  mounted() {
      this.initData();
      this.getrate();
  },
  methods:{
    initData(){
      this.type = this.$route.query.type;
      this.formData.type = this.$route.query.type;
    },
    extractRecord(){
      this.$router.push({name:'ExtractRecord',query:{type:this.type}})
    },
    setTitle(type){
        switch(type){
            case 'credit2':
              return '区块Mine';
              break;
            case 'credit4':
              return 'DOGE';
              break;
        }
    },
    apply(){
      let msg = Util.isValidate(this.formData);
      // console.log(msg);return;
      if(msg){
        mui.toast(msg);
        return ;
      }
      Owner.apply(this.formData).then(res=>{
          if(res.code == 1){
            mui.toast(res.msg);
            this.formData = Object.assign({},this.formData,{
                address:null,
                number:null
            })
          }else{
            mui.toast(res.msg);
          }
      })
    },
    getrate(){
        Owner.getrate().then(res =>{
            if(res.code  == 1){
                this.rate = res.data;
            }else {

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
  padding: 0 30px 30px;
  color: #dbd9ec;
  font-size: 32px;
  .list {
    position: relative;
    margin-top: 29px;
    .inp {
      margin-top: 29px;
      margin-bottom: 0;
      height: auto;
      background: #44425a;
    }
  }
  .poundage {
    color: #8886a0;
    font-size: 28px;
  }
  .sub {
    margin-top: 130px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    color: @bg-color-white;
    background: linear-gradient(
      90deg,
      rgba(245, 190, 40, 1) 0%,
      rgba(255, 132, 42, 1) 100%
    );
    border-radius: 8px;
  }
}
</style>
