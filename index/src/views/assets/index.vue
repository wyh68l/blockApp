<template>
  <div class="page">
    <m-header title="总资产" :canback="Boolean(1)"></m-header>
    <div class="body">
      <div class="title">
        <div class="assets">
          <div class="assets_text">{{currentcys.jcbName}}</div>
          <div class="assets_num">{{+currentcys.jcbValue+ +currentcys.jcbValue_dj||'0.000'}}</div>
        </div>
        <div class="assets">
          <div class="assets_text">{{currentcys.itbName}}</div>
          <div class="assets_num">{{+currentcys.itbValue+ +currentcys.itbValue_dj||'0.000'}}</div>
        </div>
      </div>
      <ul class="type_wrap">
        <li class="type_list" @click="opt('TBE',data.credit1)">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
            我的总资产概况
          </span>
        </li>
        <li class="type_list" @click="opt('TRX',data.credit2)">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
            <span>可用{{currentcys.jcbName||'0.00'}}</span>
            <span>{{currentcys.jcbValue}}</span>
          </span>
        </li>
        <li class="type_list" @click="opt('ETH',data.credit3)">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
            <span>{{currentcys.jcbName_dj}}</span>
            <span>{{currentcys.jcbValue_dj}}</span>
          </span>
        </li>
        <li class="type_list" @click="opt('ACE',data.credit4)">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
            <span>可用{{currentcys.itbName}}</span>
            <span>{{currentcys.jcbValue_dj}}</span>
          </span>
        </li>
        <li class="type_list" @click="opt('BBT',data.credit5)">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
            <span> {{currentcys.jcbName_dj}}</span>
            <span>{{ currentcys.itbValue_dj}}</span>
          </span>
        </li>
      </ul>
      <ul class="type_wrap">
        <li class="type_list" @click="goDetail">
          <img src="../../assets/images/hbtz/licai.png" alt class="type_img" />
          <span class="type_name">
             账户明细 
            <i class="iconfont iconright icoright"></i>
          </span>
        </li>
      </ul>
    </div>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
import {Util,Load} from '@/assets/commonjs/utils.js';
import { Assets } from "@/server/server.js";
import {mapGetters} from 'vuex';
import {AssetsTxt} from '@/assets/commonjs/lan.js';

export default {
    data(){
        return{
            data:null,
            allTxt:null,
            currentcys : {
              itbName_dj : null,
              jcbName_dj : null,
              itbName : null,
              jcbName : null,
              itb_jg : null,
              itbValue : null,
              jcbValue : null,
              itbValue_dj : null,
              jcbValue_dj : null
            }
        }
    },
    mounted(){
        this.initData();
        // this.getCoin();
        this.getData();
        console.log(this.currentcys)
    },
    computed:{
        ...mapGetters(['uid'])
    },
    methods:{
        goDetail(){
          this.$router.push('/my/nav/bill')
        },
        getData(){
          Assets.getBalance().then(res=>{
            this.currentcys.itbName_dj = res.data.itb_dj_name;
            this.currentcys.jcbName_dj = res.data.jcb_dj_name;
            this.currentcys.itbName = res.data.itb_name;
            this.currentcys.jcbName = res.data.jcb_name;
            this.currentcys.itb_jg = res.data.itb_jg;
          })
          Assets.getValue().then(res=>{
            this.currentcys.itbValue = res.data.credit3;
            this.currentcys.jcbValue = res.data.credit1;
            this.currentcys.itbValue_dj = res.data.credit4;
            this.currentcys.jcbValue_dj = res.data.credit2;
          })
        },
        initData(){
          this.allTxt = Object.assign({},AssetsTxt)
        },
        goTo(type){
            switch(type){
                case 1:
                    this.$router.push({name:'Transfer'});
                    break;
                case 2:
                    this.$router.push({name:'Exchange'});
                    break;
            }
        },
        getCoin(){
          Assets.getCoin({uid:this.uid}).then(res=>{
            if(res.code ==1){
                this.data = res.data
            }else{
                mui.toast(res.msg);
            }
          })
        },
        opt(type,num){
          this.$router.push({name:'CoinDetail',params:{type,num}})
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
    padding: 34px;
    color: #fff;
    background:#EA4101;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .assets {
      text-align: center;
      flex: 1;
      .assets_text {
        font-size: 28px;
      }
      .assets_num {
        margin-top: 12px;
        font-size: 44px;
      }
    }
  }
  .type_wrap {
    &:last-child{
      margin-top: 60px;
    }
    padding: 30px;
    background: #fff;
    border-radius: 20px;
    margin: 30px 0;
    padding: 0 40px;
    .type_list {
      border-bottom: 1px solid #999;
      line-height: 40px;
      height: 80px;
      &:last-child{
        border-bottom: none
      }
      &:first-child{
        margin-top: -20px;
      }
      .display-flex();
      align-items: center;
      .type_img {
        width: 30px;
        margin-right: 40px;
      }
      .type_name {
          flex: 1;
          display: inline;
        .display-flex();
        justify-content: space-between;
      }
    }
  }
  .icoright{
    margin-right: 20px;
  }
}
</style>