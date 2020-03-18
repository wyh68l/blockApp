<template>
  <div class="page">
    <m-header title="矿机充值" :canback="Boolean(1)"></m-header>
    <div class="body">
      <ul>
        <li class="list">
          <div class="name">剩余矿机</div>
          <div class="content">{{data?parseInt(data.sykj):'-'}}</div>
        </li>
        <li class="list">
          <div class="name">汇款方式</div>
          <div class="content" @click="choicePay">{{payType}} <i :class="{'down iconfont iconright':true,'icondown':false,'iconup':false}"></i></div>
          <!-- <div class="content">
              <input class="mui-radio" type="radio" value="微信" v-model="payType">微信
              <input class="mui-radio" type="radio" value="支付宝" v-model="payType">支付宝
          </div> -->

        </li>
        <li class="list">
          <div class="name">选择币种</div>
          <div class="content">{{data?data.xzbz:'-'}}</div>
        </li>
        <li class="list-last">
          <div class="code">
            <span class="name">收款二维码</span>
            <div class="content">
              <img class="code-img" :src="payCode?payCode:(data?api+data.wx_qrcode:'')">
            </div>
          </div>
          <div class="code remittance">
            <span class="name inp-name">汇款数量</span>
            <div class="content">
              <input class="inp" type="number" v-model="formData.hkmoney" placeholder="请输入汇款数量">
            </div>
          </div>
          <div class="code remittance">
            <span class="name inp-name">到账矿机</span>
            <div class="content">
              <input class="inp" type="number" v-model="hkmoney" readonly placeholder="到账矿机">
            </div>
          </div>
          <div class="code remittance">
            <span class="name inp-name">上传凭证</span>
            <div class="content">
              <span class="upload">请上传凭证</span>
              <div class="select">
                <!-- <div class="select-btn">上传</div> -->
                <input class="file" type="file" @change="change($event)">
                <img class="img" :src="formData.hkimg?formData.hkimg:upladSrc" alt="">
              </div>
            </div>
          </div>
          <div class="code remarks">
            <div class="name">备注码</div>
            <div class="content remarksCode">{{data?data.bzcode:''}}</div>
          </div>
        </li>
      </ul>
      <div class="sub" @click="recharge">提交</div>
      <m-load ref="load"></m-load>

    </div>
  </div>
</template>
<script>
import {Owner,Base} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
  data(){
    return {
      payPicker:new mui.PopPicker(),
      upladSrc:require('@/assets/images/gzlz/upload.png'),
      data:null,
      payList:[
        {
          value: '1',
          text: '微信'
        },
        {
          value: '2',
          text: '支付宝'
        },
      ],
      formData:{
        hkmoney:null,
        id:null,
        hkimg:null,
        paytype:1
      },
      payType:'微信',
      payCode:null,
      isDown:true,
      rate:null,
      hkmoney:null
    }
  },
  mounted(){
    this.initData();
    this.getInfo(this.uid);
    this.getKjfee();
  },
  watch:{
    'formData.hkmoney'(value){
        this.hkmoney = Math.floor(value-value*this.rate/100);
    }
  },
  computed:{
    ...mapGetters(['api','uid'])
  },
  methods:{
    initData(){
      this.payPicker.setData(this.payList)
      this.formData.id = this.uid;
    },
    choicePay(){
      let _This = this;
      this.isDown = false;
      this.payPicker.show(function(items) {
// console.log(items)
          _This.payType = items[0].text;
          _This.formData.paytype = items[0].value;
          if(items[0].value == 1){
            _This.payCode = _This.api+_This.data.wx_qrcode;
          }else {
            _This.payCode = _This.api+_This.data.zfb_qrcode;
          }
      });
    },
    // 充值信息
    getInfo(id){
      Owner.getRechargeInfo({id}).then(res=>{
          if(res.code == 1){
              this.data = res.data.data;
              console.log(this.data);
          }else {
              mui.toast(res.msg);
              return ;
          }
      })
    },
    // 充值
    recharge(){
// console.log(this.formData);
// return ;
        let msg = Util.isValidate(this.formData);
        if(msg){
            mui.toast(msg);
            return ;
        }
        Owner.recharge(this.formData).then(res=>{
            if(res.code == 1){
                mui.toast(res.msg);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
            }else {
                mui.toast(res.msg);
                return ;
            }
        })
    },
    // 上传
    change(event){
        // Util.uploadByUrl(event.target.files[0]).then(res=>{
        //   this.formData.hkimg = this.api+res;
        //   console.log()
        // })
        let _This = this;
        let formData = new FormData();
            Load.loadStart(_This);            
            // this.formData.image = event.target.files[0];
            Util.uploadImgLimit(event.target.files[0],url=>{
                formData.append('image',url);
                Base.upload(formData).then((res)=>{
                    Load.loadEnd(_This);
                    if(res.code == 1){
                      this.formData.hkimg = this.api+res.data;
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
    },
    getKjfee(){
      Owner.getKjfee().then(res=>{
          if(res.code == 1){
              this.rate = res.data.data[0].value;
          }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.page {
  .body {
    background: @bg-color;
    color: @bg-color-white;
    padding: @padding-primary;
    .list {
      .display-flex();
      padding: 20px 30px;
      // border-top: 1px solid @bg-color-white;
      .name {
        flex: 2;
      }
      .content {
        flex: 4;
        .down {
          margin-left: @margin-primary;
        }
      }
    }
    .list-last {
      padding: 20px 30px;
      // border-top: 1px solid @bg-color-white;
      .code {
        width: 100%;
        .display-flex();
        .name {
          flex: 2;
        }
        .inp-name {
          .display-flex();
          align-items: center;
        }
        .content {
          flex: 4;
          .code-img {
            width: 80%;
          }
          .upload {
            width: 50%;
          }
          .select {
            // width: 50%;
            position: relative;
            // display: inline-block;
            .select-btn {
              padding: 10px;
              text-align: center;
              border: 1px solid #fff;
              border-radius: 8px;
            }
            .file {
              width: 80%;
              height: calc(100%-10PX);
              position: absolute;
              top: 20px;
              opacity: 0;
            }
          }
        }
        // .upload {

        // }
      }
      .remittance {
        margin-top: 12px;
        padding-bottom: 15px;
        .inp {
          width: 90%;
          height: auto;
          margin-bottom: 0;
          padding: 5px 10px;
          background: #44425a;
        }
        .img {
          margin-top: 20px;
          width: 80%;
        }
      }
      .remarks {
        margin-top: 15px;
        .remarksCode {
          color: red;
        }
      }
    }
    .sub {
      margin: 50px 30px 0;
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
}
</style>