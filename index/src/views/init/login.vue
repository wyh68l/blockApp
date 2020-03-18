<template>
    <div class="page">
        <m-header title="登录"></m-header>
        <section class="body">
            <div class="img-box">
                <img class="logo" src="../../assets/images/gzxz/logo.png" alt="">
            </div>
             <form class="base-form">
                <div class="form-item">
                    <label for="name">手机号</label>
                    <input type="text" placeholder="请输入登录账号" v-model="formData.account"  oninput="if(value.length>11)value=value.slice(0,11)">
                </div>
                <div class="form-item">
                    <label for="name">密码</label>
                    <input type="password" placeholder="请输入密码" v-model="formData.password">
                </div>
                <div class="form-item">
                    <label for="name">图形码</label>
                    <div class="item-flex code">
                        <input type="text" placeholder="请输入图中的验证码" v-model="formData.captcha" maxlength="4">
                        <img class="btn img-code" :src="api+'/api/Captcha/get?identifier='+randomCode" alt="" @click="getRandom()">
                    </div>
                </div>
                <button type="button" class="btn-submit" @click="login">登录</button>
            </form>
            <p class="other"><a @click="register">立即注册</a> <a @click="backPwd">找回密码</a></p>
            <button type="button" class="btn-submit btn-download" @click="goToDownload">下载 App</button>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Init,Base} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            formData:{
                account:'ef55e44b-8729-4695-b74d-0cb3a1e5f885',
                password:null,
                identifier:null,
                captcha:null,
            },
            barcode:null,
            scan:null,
            randomCode:null,
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
             mui.init({
                swipeBack:true //启用右滑关闭功能
            });
            if(!localStorage.getItem('language')){
                localStorage.setItem('language','zh-cn');
            }
            this.getRandom();
        },
        backPwd(){
            this.$router.push({name:'BackPwd'});
        },
        register(){
            this.$router.push({name:'Register'});
        },
        login(){
            let params = this.formData;
// console.log(params);
// return ;
            let msg = Util.isValidate(params);
            if(msg){
              mui.toast(msg);
              return ;
            }
            Load.loadStart(this);
            Init.login(params).then((res)=>{
                console.log(res);
                if(res.code == 1){
                    console.log(res.data);
                    localStorage.setItem('user_id',res.data.id);
                    localStorage.setItem('userInfo',JSON.stringify(res.data));
                    this.$store.commit('saveUserInfo',res.data);
                     localStorage.setItem('cookie',res.data.token);
                    setTimeout(() => {
                        //Load.loadEnd(this);
                        mui.toast(res.msg);
                        this.$router.replace({name:'Index'})
                    }, 1000);
                }else {
                    setTimeout(() => {
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return ;
                    }, 1000);
                }
            })
        },
        toScan(){
            return;
            let _This = this;
            if(!this.barcode){
                this.barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
                    top:'100px',
                    left:'0px',
                    width: '100%',
                    height: '500px',
                    position: 'static'
                });
                this.barcode.onmarked = _This.onmarked;
                plus.webview.currentWebview().append(this.barcode);
            }
            this.barcode.start();
            this.scan = new plus.barcode.Barcode('bcid');
            this.scan.onmarked = this.onmarked();
            this.scan.start();
        },
        onmarked(type, result) {
            var text = '未知: ';
            switch(type){
                case plus.barcode.QR:
                text = 'QR: ';
                break;
                case plus.barcode.EAN13:
                text = 'EAN13: ';
                break;
                case plus.barcode.EAN8:
                text = 'EAN8: ';
                break;
            }
            if(result){
                // alert( text+result );
                this.barcode.close();
                try{
                    if(plus){
                        mui.confirm('确定跳转',actions=>{
                            if(actions.index == 0)
                            plus.runtime.openURL(result);

                        })
                    }
                }catch(e){
                    mui.confirm('确定跳转',actions=>{
                        if(actions.index == 1)
                        plus.runtime.openURL(result);
                    })
                }
            }
        },
        getRandom(){
            let random1 = parseInt(Math.random(0,1)*100000000);
            let random2 = parseInt(Math.random(0,1)*100000000);
            let str = 'abcdd';
            // return  random1+'abcdd'+random2;
            this.randomCode = random1+'abcdd'+random2+'-'+new Date().getTime();
            this.formData.identifier = this.randomCode;
        },
        goToDownload() {
          this.$router.push({name:'Download'})
        }
    },
}
</script>

<style scoped lang="less">
@import '~link-less';
.body {
    background-color: @base-white;
    .base-form {
        margin: 68px 68px @margin-primary;
        .form-item {
            label {
                flex:0 0 60PX;
            }
            &:last-of-type {
                margin-bottom: @margin-primary  ;
            }
        }
    }
    .img-box {
        .display-flex();
        justify-content: center;
        align-items: center;
        height: 400px;
        .logo {
            margin:60px 0;
            height: 220px;
        }
    }

    .other {
        .display-flex();
        justify-content: space-between;
        // text-align: right;
        margin: 0 @margin-primary  @margin-primary ;
        color: #666666;
        font-size: 24px;
        a {
            padding: 10px 20px;
            &:first-child {
                color: @base-origin;
            }
        }
    }
    .btn-submit {
        background-color: @base-origin;
    }
    .btn-download {
      display: block;
      width: 92%;
      height: 44PX;
      background: #78bc43;
      margin: 0 auto 4vw;
    }
}
</style >

