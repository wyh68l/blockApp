<template>
    <div class="page">
        <m-header :title="type== 'ali'?'绑定支付宝':'绑定微信'" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form class="base-form" v-if="type=='ali'">
                <div class="form-item">
                    <label for="name">支付宝昵称</label>
                    <input type="text" placeholder="请输入昵称" v-model="aliForm.alipayname">
                </div>
                <div class="form-item">
                    <label for="name">支付宝账户</label>
                    <input type="text" placeholder="请输入支付宝账户" v-model="aliForm.alipayact" >
                </div>
                <div class="form-item mar">
                    <label class="mar" for="name">上传收款二维码</label>
                    <div class="upload">
                        <img class="img" :src="aliForm.alipay_url?api+aliForm.alipay_url:upladSrc" alt="">
                        <input  class="file" type="file" @change="change($event)">
                    </div>
                </div>
                <div class="form-item">
                    <label for="name">手机验证码</label>
                    <div class="item-flex code">
                        <input type="text" placeholder="请输入验证码" v-model="aliForm.captcha" maxlength="4">
                        <button type="button" class="btn" :disabled="seconds>0" @click="getCode">{{seconds==0?"点击获取":"已发送("+seconds+"s)"}}</button>
                    </div>
                </div>
                <button type="button" class="btn-submit gradient-origin" @click="bindAli">绑定</button>
            </form >
            <form class="base-form" v-else>
                <div class="form-item">
                    <label for="name">微信昵称</label>
                    <input type="text" placeholder="请输入昵称" v-model="wechatForm.wechaname">
                </div>
                <div class="form-item">
                    <label for="name">微信账户</label>
                    <input type="text" placeholder="请输入微信账户" v-model="wechatForm.wechatact" >
                </div>
                <div class="form-item mar">
                    <label class="mar" for="name">上传收款二维码</label>
                    <div class="upload">
                        <img class="img" :src="wechatForm.wechat_url?api+wechatForm.wechat_url:upladSrc" alt="">
                        <input class="file" type="file" @change="change($event)">
                    </div>
                </div>
                <div class="form-item">
                    <label for="name">手机验证码</label>
                    <div class="item-flex code">
                        <input type="text" placeholder="请输入验证码" v-model="wechatForm.captcha" maxlength="4">
                        <button type="button" class="btn" :disabled="seconds>0" @click="getCode">{{seconds==0?"点击获取":"已发送("+seconds+"s)"}}</button>
                    </div>
                </div>
                <button type="button" class="btn-submit gradient-origin" @click="bindWechat">绑定</button>
            </form>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Owner,Base} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load,HB} from '@/assets/commonjs/utils.js';
export default {
    name:"PayInfo",
    data(){
        return {
            title:'绑定支付宝',
            seconds:0,
            upladSrc:require('@/assets/images/gzlz/upload.png'),
            type:null,
            aliForm:{
                id:null,
                alipayname:null,
                alipayact:null,
                alipay_url:null,
                mobile:null,
                captcha:null
            },
            wechatForm:{
                id:null,
                wechaname:null,
                wechatact:null,
                wechat_url:null,
                captcha:null,
                mobile:null,
            },
        }
    },
    mounted(){
        this.initData();
console.log(this.temp)
// console.log(this.aliForm)
    },
    computed:{
        ...mapGetters(['uid','userInfo','temp','api'])
    },
    methods:{
        initData(){
            let _this = this;
            this.type = this.$route.params.type;    
                this.aliForm.alipayname = this.temp.alipayname;
                this.aliForm.alipayact= this.temp.alipayact;
                this.aliForm.alipay_url= this.temp.alipay_url;
                this.aliForm.mobile= this.userInfo.mobile;
                this.aliForm.id = this.uid;

                this.wechatForm.wechaname= this.temp.wechatname;
                this.wechatForm.wechatact= this.temp.wechatact;
                this.wechatForm.wechat_url= this.temp.wechat_url;
                this.wechatForm.mobile= this.userInfo.mobile;
                this.wechatForm.id = this.uid;
        },
        getCode(){
            this.seconds = 60;
            let get =  setInterval(()=>{
                this.$nextTick(()=>{
                    this.seconds = this.seconds-1;
                    if(this.seconds<=0){
                        clearInterval(get);
                    }
                })
            },1000);
// return ;
            // 发送验证码
            Base.sendCode({mobile:this.userInfo.mobile}).then((res)=>{
                mui.toast(res.msg);
            })
        },
        bindAli(){
// console.log(this.aliForm);
// return ;
            // if(!this.isValidate(this.aliForm)){
            //   mui.toast('请正确填写信息！');
            //   return ;
            // }
            let msg = Util.isValidate(this.aliForm);
                if(msg){
                    mui.toast(msg);
                    return ;
                }
            Load.loadStart(this);
            Owner.bindAli(this.aliForm).then(res=>{
                if(res.code == 1){
                    setTimeout(() => {
                        mui.toast(res.msg);
                        Load.loadEnd(this);
                        this.$router.go(-1);
                    }, 1000);
                }else {
                    mui.toast(res.msg);
                    Load.loadEnd(this);
                    return ;
                }
            })
        },
        bindWechat(){
// console.log(this.wechatForm);
// return ;

            // if(!this.isValidate(this.wechatForm)){
            //   mui.toast('请正确填写信息！');
            //   return ;
            // }
            let msg = Util.isValidate(this.wechatForm);
                if(msg){
                    mui.toast(msg);
                    return ;
                }
            Load.loadStart(this);
            Owner.bindwechat(this.wechatForm).then(res=>{
                if(res.code == 1){
                    setTimeout(() => {
                        mui.toast(res.msg);
                        Load.loadEnd(this);
                        this.$router.go(-1);
                    }, 1000);
                }else {
                    mui.toast(res.msg);
                    Load.loadEnd(this);
                    return ;
                }
            })

        },
        change(event){
            let _This = this;
            let formData = new FormData();
            Load.loadStart(_This);
            Util.uploadImgLimit(event.target.files[0],url=>{
                formData.append('image',url);
                Base.upload(formData).then((res)=>{
                Load.loadEnd(_This);
                    if(res.code == 1){
                        if(_This.type == 'ali'){
                            this.aliForm.alipay_url = res.data;
                        }else {
                            this.wechatForm.wechat_url = res.data;
                        }
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
        },
        // hbuilder 拍照
        upload(){
            let _this = this;
            HB.picForGallery(_this,url=>{
                if(_this.type == 'ali'){
                    _this.aliForm.alipay_url = url;
                }else {
                    _this.wechatForm.wechat_url = url;
                }
            })
            return ;
            HB.HBCapture(_this,url=>{
                if(_this.type == 'ali'){
                    _this.aliForm.alipay_url = url;
                }else {
                    _this.wechatForm.wechat_url = url;
                }
            })
        },
        isValidate(obj){
          if(!Util.filterData(obj)){
              return false;
            }else{
              return true;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        // padding: @padding-primary;
        .form-item {
            .img {
                border: 1px solid #f3f3f3;
            }
            .upload {
                position: relative;
                .file {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                }
            }
            
        }
    }
</style>
