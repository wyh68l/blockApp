<template>
    <div class="page">
        <m-header title="绑定手机号" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form class="base-form">
                <div class="form-item">
                    <label for="name">手机号码</label>
                    <input  type="number" placeholder="请输入绑定的手机号码" v-model="formData.mobile" >
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
import {Owner} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
    components:{
    },
    data () {
        return {
            seconds:0,
            formData:{
                mobile:null,
                captcha:null
            }            
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapGetters(['uid','userInfo'])
    },
    methods:{
        initData(){
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
            Owner.changeMobile(this.formData).then(res=>{
                if(res.code ==1){
                    mui.toast(res.msg);
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
                }else {
                    mui.toast(res.msg);
                }
            })
        },
    }
}
</script>

<style scoped lang="less">
@import '~link-less';
.body {
    background-color: @base-white;

}
</style >



