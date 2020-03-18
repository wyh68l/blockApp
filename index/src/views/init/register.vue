<template>
  <div class="page">
    <m-header title="注册" :canback="true"></m-header>
    <section class="body">
      <form class="base-form">
        <div class="form-item">
          <label for="name">昵称</label>
          <input type="text" placeholder="请输入昵称" v-model="formData.username">
        </div>
        <div class="form-item">
          <label for="name">手机号</label>
          <input type="number" placeholder="请输入手机号" v-model="formData.mobile"  oninput="if(value.length>11)value=value.slice(0,11)">
          <!-- <span class="error" v-show="!rule.isMobile.validate"><i class="iconfont iconerror1">{{rule.isMobile.msg}}</i></span> -->
        </div>
        <div class="form-item">
          <label for="name">登录密码</label>
          <input type="password" placeholder="8-12位（不能全是数字或字母）" @blur="IsIntegerAndEnglishCharacter($event)" v-model="formData.password">
          <span class="error" v-show="!rule.isPwd.validate"><i class="iconfont iconerror1">{{rule.isPwd.msg}}</i></span>
        </div>

        <div class="form-item">
          <label for="name">确认密码</label>
          <input type="password" placeholder="8-12位（不能全是数字或字母）" @blur="confirmL($event)">
          <span class="error" v-show="!rule.conFirmL.validate"><i class="iconfont iconerror1">{{rule.conFirmL.msg}}</i></span>
        </div>
        <div class="form-item">
          <label for="name">支付密码</label>
          <input type="password" placeholder="请输入6位数字支付密码" v-model="formData.paypwd" maxlength="6">
        </div>
        <div class="form-item">
          <label for="name">确认密码</label>
          <input type="password" placeholder="请输入6位数字交易密码" maxlength="6" @blur="confirmP($event)">
          <span class="error" v-show="!rule.conFirmP.validate"><i class="iconfont iconerror1">{{rule.conFirmP.msg}}</i></span>
        </div>
        <!-- <div class="form-item">
          <label for="name">推荐人</label>
          <input type="text" v-model="formData.tjjr" placeholder="请输入推荐人编号">
        </div> -->
        <div class="form-item">
          <label for="name">验证码</label>
          <div class="item-flex code">
            <input type="text" placeholder="请输入验证码" v-model="formData.captcha" maxlength="4">
            <button type="button" class="btn" :disabled="seconds>0" @click="sendCode()">{{seconds==0?"发送验证码":"已发送("+seconds+"s)"}}</button>
          </div>
        </div>
        <!-- <div class="form-item">
            <input type="checkbox" class="checkbox" v-model="isAgree">
            <span class="agree" @click="$router.push({name:'Agreement'})">《用户授权协议》</span>
        </div> -->
        <button type="button" :class="{'btn-submit':true,' btn-blue':isAgree,'btn-undo':!isAgree}" @click="register()">立即注册</button>
      </form>
    </section>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Init,Base} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
export default {
    components:{
    },
    data () {
        return {
            seconds:0,
            formData:{
                username:null,
                mobile:null,
                password: null,
                paypwd: null,
                // tjjr: null,
                captcha:null,
            },
            rule:{
              // isMobile:{
              //   validate:true,
              //   msg:'请输入正确的手机号'
              // },
              isPwd:{
                validate:true,
                msg:'密码应为8-12位字母+数字'
              },
              conFirmL:{
                validate:true,
                msg:'两次输入密码不一致！'
              },
              conFirmP:{
                validate:true,
                msg:'两次输入密码不一致！'
              },
            },
            isAgree:false
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
      ...mapGetters(['api'])
    },
    methods:{
        initData(){
          if(this.$route.query.id)
            this.formData.tjjr = this.$route.query.id;
            // this.formData.
        },
        sendCode(){
            // if(!this.formData.mobile){
            //     mui.toast('请输入正确的手机号！');
            //     return ;
            // }
            this.seconds = 60;
            let get =  setInterval(()=>{
                this.$nextTick(()=>{
                    this.seconds = this.seconds-1;
                    if(this.seconds<=0){
                        clearInterval(get);
                    }
                })
            },1000)
            // 发送验证码
            Base.sendCode({mobile:this.formData.mobile}).then((res)=>{
                mui.toast(res.msg);
            })
        },
        register(){
          // console.log(this.isAgree);return;
          if(this.isAgree)return;
            // console.log(this.formData);return;
            let msg = Util.isValidate(this.formData,this.rule);
            // console.log(msg);return;
            if(msg){
              mui.toast(msg);
              return ;
            }
            Load.loadStart(this);
            Init.register(this.formData).then((res)=>{
                if(res.code == 1){
                    mui.toast(res.msg);
                    setTimeout(() => {
                        Load.loadEnd(this);
                        this.$router.replace({name:'Login'});
                    }, 1000);
                }else {
                    setTimeout(() => {
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return ;
                    }, 1000);
                }
            })
            // Init.test();
        },
        confirmL(event){
          if(event.target.value !=this.formData.password){
            this.rule.conFirmL.validate = false;
          }else {
            this.rule.conFirmL.validate = true;
          }
        },
        confirmP(event){
          if(event.target.value !=this.formData.paypwd){
            this.rule.conFirmP.validate = false;
          }else {
            this.rule.conFirmP.validate = true;
          }
        },
        IsMobilePhoneNumber(event) {
          var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
          if (event.target.value.match(regex)) {
            this.rule.isMobile.validate = true;
          } else {
            this.rule.isMobile.validate = false;            
          }
        },
        IsIntegerAndEnglishCharacter(input) {
          var regex = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
          if (event.target.value.match(regex)) {
            this.rule.isPwd.validate = true;
          } else {
            this.rule.isPwd.validate = false;
          }
        },
    }
}
</script>

<style scoped lang="less">
@import "~link-less";
.body {
  background-color: @base-white;
  .tj-form {
    .btn-white {
      background-color: whitesmoke;
      color: #333;
      font-size: 40px;
      letter-spacing: 5px;
      font-family: fantasy; //monospace fantasy
    }
  }
  .error {
    position: absolute;
    color: red;
    font-size: 24px;
    bottom: 0;
    left: 0;
  }
  .btn-undo {
    color: white;
    background-color: #ddd;
  }
}
</style >

