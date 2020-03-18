<template>
    <div class="page">
        <m-header :title="setTitle(type)" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form class="base-form">
                <!-- <div class="form-item" v-if="false"    >
                    <label for="name">旧{{type=='login'?'登录密码':'交易密码'}}</label>
                    <input v-if="type=='login'" type="password" placeholder="8-12位（不能全是数字或字母）" v-model="formData.oldpassword" >
                    <input type="password" placeholder="请输入6位数字交易密码" v-model="formData.newpassword" maxlength="6">
                </div> -->
                <div class="form-item">
                    <label for="name">新{{type=='login'?'登录密码':'交易密码'}}</label>
                    <input v-if="type=='login'" type="password" placeholder="8-12位（不能全是数字或字母）" v-model="formData.newpassword" >
                    <input v-else type="password" placeholder="请输入6位数字交易密码" v-model="formData.newpassword" maxlength="6">
                </div>
                <div class="form-item">
                    <label for="name">确认{{type=='login'?'登录密码':'交易密码'}}</label>
                    <input v-if="type=='login'" type="password" placeholder="8-12位（不能全是数字或字母）" v-model="formData.password">
                    <input v-else type="password" placeholder="请输入6位数字交易密码" v-model="formData.password" maxlength="6">
                </div>
                <div class="form-item">
                    <label for="name">手机验证码</label>
                    <div class="item-flex code">
                        <input type="text" placeholder="请输入验证码" v-model="formData.captcha" oninput="if(value.length>4)value=value.slice(0,4)">
                        <button type="button" class="btn" :disabled="seconds>0" @click="getCode">{{seconds==0?"点击获取":"已发送("+seconds+"s)"}}</button>
                    </div>
                </div>
                <button type="button" class="btn-submit gradient-origin" @click="confirm">确定</button>
            </form>
            <m-load ref="load"></m-load>
        </section>
    </div>
</template>
<script>
import {Init,Base,Owner} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
    components:{
    },
    data () {
        return {
            seconds:0,
            type:null,
            formData:{
                mobile:null,
                newpassword:null,
                password:null,
                captcha:null
            }            
        }
    },
    mounted(){
        this.initData();
        console.log(this.uid)
        console.log(this.userInfo.mobile)
        console.log(this.userInfo)
    },
    computed:{
        ...mapGetters(['uid','userInfo'])
    },
    methods:{
        initData(){
            this.type = this.$route.query.type;
            this.formData.mobile = this.userInfo.mobile;
        },
        getCode(){
            this.seconds = 60;
            let get =  setInterval(()=>{
                this.$nextTick(()=>{
                    this.seconds = this.seconds-1;
                    if(this.seconds<=0){
                        clearInterval(get);
                    }
                });
            },1000)
// return ;
            // 发送验证码
            Base.sendCode({mobile:this.userInfo.mobile}).then((res)=>{
                mui.toast(res.msg);
            })            
        },
        // isMobile(mobile,callback){
        //     if(!mobile|| mobile.length<13){
        //         mui.toast('请添加区(地域)号，如：(86)中国');
        //         return false
        //     }else {
        //         callback();
        //     }
        // },
        confirm(){
            let _This = this;
            if(this.type == 'login'){
                let msg = Util.isValidate(this.formData);
                if(msg){
                    mui.toast(msg);
                    return ;
                }
                Load.loadStart(this);
                // console.log(this.formData);return ;
                Init.backpwd(this.formData).then(res=>{
                    if(res.code == 1){
                        setTimeout(() => {
                            Load.loadEnd(this);
                            mui.toast(res.msg);
                            this.clearLocal();
                            this.$router.replace({name:'Login'});
                        }, 1000);
                    }else {
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return;
                    }
                })
                if(this.formData.newpassword===this.formData.password){
                    const str = {
                        mobile:this.userInfo.mobile,
                        newpassword:this.formData.newpassword
                    }
                    Owner.changePwd(str).then(res=>{
                        console.log(res)
                    })
                }
            }else {
                let params = {
                    mobile:this.formData.mobile,
                    paypwd:this.formData.newpassword,
                    paypwd_b:this.formData.password,
                    id:this.uid,
                    captcha:this.formData.captcha,
                }
                let msg = Util.isValidate(params);
                if(msg){
                    mui.toast(msg);     
                    return ;
                }
                Load.loadStart(this);
                Init.backTrade(params).then(res=>{
                    if(res.code == 1){
                        mui.toast(res.msg);
                        setTimeout(() => {
                            Load.loadEnd(this);
                            this.$router.go(-1);
                        }, 1000);
                    }else {
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return;
                    }
                })
                
                if(this.formData.newpassword===this.formData.paypwd){
                    const str = {
                        mobile:this.userInfo.mobile,
                        paypwd:this.formData.paypwd
                    }
                    Owner.changePayPsw(str).then(res=>{
                        console.log(res)
                    })
                }
            }
        },
        setTitle(type){
            switch(type){
                case 'login':
                    return '修改登录密码';
                    break;
                case 'trade':
                    return '修改交易密码';
                    break;
            }
        },
        clearLocal(){
            localStorage.clear();
            this.$store.commit('saveUserInfo',null);
            this.$store.commit('saveUserID',null);
            sessionStorage.setItem('btmNav',1);
            Util.clearAllCookie();
        }
    }
}
</script>

<style scoped lang="less">
@import '~link-less';
.body {
    background-color: @base-white;

}
</style >



