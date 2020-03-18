<template>
  <div class="page">
    <m-header title="理财详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div >
        <div class="wrap">
          <ul class="wrap-box">
            <li>{{userInfo.mobile}}</li>
            <li>
              <div>租用理财宝名称</div>
              <div>{{list.name}}</div>
            </li>
            <li>
              <div>孵化周期</div>
              <div>{{list.life}}</div>
            </li>
            <li>
              <div>投入数量</div>
              <div class="num"> <input type="number" v-model="num"> 美金</div>
            </li>
            <li>
              <div>日收益</div>
              <div>{{list.list.day_1}}</div>
            </li>
          </ul>
        </div>

        <div class="wrap">
          <ul class="wrap-box-bottom">
            <li>
              <div class="title-left">支付方式</div>
            </li>
            <li>
              <div class="space">
                <div class="picture"  @click="changePic1(pic1)">
                  <i class="iconfont iconxuanzhong" v-show="pic1"></i>
                </div>
                <div class="mon">可用剿巢币</div>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="wrap">
          <ul class="wrap-box-bottom xieyi" >
            <li>
              <div class="space">
                <div class="picture " @click="changePic2(pic2)" >
                  <i class="iconfont iconxuanzhong" v-show="pic2" ></i>
                </div>
                <div class="margin-left"> 同意 <p class="wrap-blue">《xxxx协议》</p></div>
              </div>
            </li>
          </ul>
        </div>

         <button class="btn gradient-origin btn-cs" @click="handleBuy">立即购买</button>
         <div class="bot" v-show="this.bot">{{botcontent}}</div>
      </div>
        <pwd-alert ref="pwd" @pay="pay"></pwd-alert>
    </section>
  </div>
</template>
<script>
import { Owner,Financial } from "@/server/server.js";
import pwdAlert from '@/components/pwd-alert.vue';
import {mapGetters} from 'vuex'
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
  components:{
    pwdAlert
  },  
  data() {
    return {
      bot:false,
      botcontent:'',
      id:null,
      pic1:true,
      pic2:false,
      list: {
        name:'',
        life:'',
        num:0,
        list:{
          day_1:0,
          price_1:123456
        }
      },
      pwd:null,
      num:1
    };
  },
  mounted() {
    this.initData();
    let id = this.id;
    this.getDetail();
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  methods: {
    initData(){
      this.id = this.$route.params.id;
    },
    getNoticeDetail(id) {
      Owner.getNoticeDetail({id}).then(res => {
        if (res.code == 1) {
          this.list = res.data;
        } else {
          mui.toast(res.msg);
        }
      });
    },
    getDetail(){
      const id = this.id;
      Financial.getDetail({id}).then(res => {
        this.list = res.data;
      })
    },
    changePic1(pic){
      this.pic1 = !this.pic1;
    },
    changePic2(pic){
      this.pic2 = !this.pic2;
    },
    handleBuy(){
      if(this.pic1&&this.pic2&&this.num>0){
        this.$refs['pwd'].open();
      }
      return;
    },
    pay(pwd){
      const price = this.list.list.price_1;
      const str = {
        id:this.id,
        pwd,
        price:this.num
      }
      this.bot=true;
      Financial.handleTrade(str).then(res => {
        if(res.code==1){
          this.botcontent=res.msg;
          setTimeout(()=>{
            this.$router.push('/Financial')
          },1000)
        }else{
          this.botcontent=res.msg;
        }
        setTimeout(()=>{
          this.bot=false;
        },1000)
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  height: 100%;
  background:rgba(244,244,244,1);
  .wrap {
    margin: 30px 30px 0;
    color: #666;
    .title{
      font-size: 39px;
      text-align: center;
    }
    .date {
      color: #999;
    }
  }
  /deep/.new-con p{
    margin: 10px 30px ;
    font-size: 28px;
    color: #666;
  }
  .wrap-box{
    background-color: @base-white;
    border-radius:8px;
    margin: 0 20px;
    >li{
      height: 84px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 30px;
      border-bottom:1px solid rgba(221,221,221,1);
      &:last-child{
        border-bottom: none;
      }
      .num{
        margin-top: 30px;
        input{
          width: 120px;
          height: 40px;
          margin-right: 20px;
          padding: 5px;
        }
      }
    }
  }
  .wrap-box-bottom{
    background-color: @base-white;
    border-radius:8px;
    margin: 0 20px;
    >li{
      margin: 0 30px;
      border-bottom:1px solid rgba(221,221,221,1);
      &:last-child{
        border-bottom: none;
      }
      .title-left{
        height:118px;
        font-size:32px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:118px;
        margin-left: 20px;
      }
      .space{
        display: flex;
        height: 120px;
        align-items: center;
        .mon{
          margin-left: 30px;
        }
        .picture{
          box-sizing: border-box;
          border: 1px solid rgba(201,201,201,1);
          border-radius: 50%;
          width: 43px;
          height: 43px;
          >i{
            color: rgb(173, 187, 252);
            font-size: 44px;
            align-items: center;
            border: none;
            margin-left: -2px;
          }
        }
      }
    }
  }
  .xieyi{
    background:rgba(244,244,244,1);
    .wrap-blue{
      height:40px;
      font-size:28px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(16,142,233,1);
      line-height:40px;
      display: inline;
    }
    .margin-left{
      margin-left: 12px;
    }
  }
  .btn-cs{
    width:650px;
    height:88px;
    border-radius:8px;
    margin: 0 50px;
  }
  .bot{
    text-align: center;
    margin: 20px auto;
    background-color: #999;
    color: #fff;
    border-radius: 20px;
    padding: 5px;
    width: 240px;
  }
}
</style>
