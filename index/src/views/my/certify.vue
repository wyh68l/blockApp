<template>
    <div class="page">
        <m-header :title="!isreal?'实名认证':'实名信息'" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form >
                <p class="item-title">基本信息</p>
                <ul class="post-list">
                    <li class="post-item">
                        <label class="form-label" for="">昵称</label>
                        <input class="form-input hasValue" type="text" :value="temp&&temp.username" readonly>
                    </li>
                    <li class="post-item">
                        <label class="form-label" for="">证件类型</label>
                        <input class="form-input hasValue" v-model="formData.credittype"  type="text" readonly>
                    </li>
                    <li class="post-item">
                        <label class="form-label" for="">证件号码</label>
                        <input class="form-input" type="text" v-model="formData.creditid"  placeholder="请输入证件号码" oninput="if(value>18)value=value.slice(0,18)" :readonly="Boolean(Number(isreal))">
                    </li>
                    <li class="post-item">
                        <label class="form-label" for="">真实姓名</label>
                        <input class="form-input" type="text" v-model="formData.realname"  placeholder="请输入真实姓名" :readonly="Boolean(Number(isreal))">
                    </li>
                </ul>
                <p class="item-title" v-show="!Number(isreal)">支付信息</p>
                <ul class="post-list" v-show="!Number(isreal)">
                    <li class="post-item">
                        <label class="form-label" for="">交易密码</label>
                        <input class="form-input" type="password" v-model="formData.paypwd" placeholder="请输入交易密码" oninput="if(value>6)value=value.slice(0,6)">
                    </li>
                </ul>
            </form>
            <p class="tip" >{{Number(isreal)?'该账户的实名信息':'一个账号只可以认证一次，请准确填写信息。'}}</p>
            <button class="btn-certify" v-show="!Number(isreal)" @click="real">认证</button>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Base,Init} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load,HB} from '@/assets/commonjs/utils.js';
export default {
    components:{
    },
    data () {
        return {
            cityPicker : new mui.PopPicker({layer: 2}),
            bankPicker : new mui.PopPicker(),
            formData:{
                id:null,
                credittype:'身份证',
                creditid:null,
                alipayact:null,
                wechatact:null,
                realname:null,
                bankact:null,
                bankphone:null,
                account:null,
                bank:null,
                bankname:null,
                paypwd:null,
                alipay_url:null,
                wechat_url:null,
            },
            defaultSrc:require('../../assets/images/bg_upload.png'),
            bankList:[],
            isreal:0
        }
    },
    created(){
        let _This = this;
        this.initData();
        this.getCity((res)=>{
            _This.cityPicker.setData(res.data);
        })
        this.getBank((res)=>{
            _This.setBanks(res.data,(banks)=>{
                console.log(res.data)
                console.log(banks)
                _This.bankPicker.setData(banks);
            })
        });
    },
    mounted(){
        this.initData();
        // const str = JSON.parse(localStorage.getItem('temp'));
        console.log(this.temp)
    },
    computed:{
        ...mapGetters(['temp','uid','api'])
    },
    methods:{
        initData(){
            this.formData.id = this.uid;
            this.isreal = this.$route.query.type;
            if(Number(this.isreal)){
                this.formData = this.setCertify();
            }
            if(this.temp){
                this.formData.alipayact = this.temp.alipayact;
                this.formData.alipay_url = this.temp.alipay_url;
                this.formData.wechatact = this.temp.wechatact;
                this.formData.wechat_url = this.temp.wechat_url;
            }
        },
        setCertify(){
            return Object.assign({},this.temp,{credittype:'身份证',paypwd:''});
        },
        getCity(callback){
            Base.getCity().then((res)=>{
                callback(res)
            })
        },
        getBank(callback){
            Base.getBank().then((res)=>{
                callback(res)
            })
        },
        choiceCity(){
            let _This = this;
            this.cityPicker.show(function(items) {
                _This.formData.account = items[0].text+" "+items[1];
                // console.log(_This.formData.account)
            });
        },
        choiceBank(){
            let _This = this;
            this.bankPicker.show(function(items) {
                _This.formData.bank = items[0].text;
            });
        },
        setBanks(banks,callback){
            for(let item of banks){
                this.bankList.push({value:item.bankId,text:item.bankName})
            }
            callback(this.bankList)
        },
        real(params){
            const {creditid,realname,paypwd} = this.formData
            const str = {creditid,realname,paypwd};
            console.log(str)
            Init.toReal(str).then((res)=>{
                if(res.code == 1){
                    localStorage.removeItem('temp');
                    this.$store.commit('saveUserInfo',null);
                    mui.toast(res.msg);
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 500);
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        upload(event,type){
            
            let _This = this;
            let formData = new FormData();
            Load.loadStart(_This);
            Util.uploadImgLimit(event.target.files[0],url=>{
                formData.append('image',url);
                Base.upload(formData).then((res)=>{
                Load.loadEnd(_This);
                    if(res.code == 1){
                        if(type =='pay1'){
                            this.formData.alipay_url = res.data;
                        }else {
                            this.formData.wechat_url = res.data;
                        }
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
        },
        // 上传请求
        getUrl(params,callback){
            Init.upload(params).then((res)=>{
                if(res.code == 1){
                    callback(res)
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
            // Init.upload(params.then(res=>{
            //     console.log(res)
            // }))
        }
    }
}
</script>

<style scoped lang="less">
// @import '~link-less';
@import '~link-less';
.body {
    background-color: transparent;
    .item-title {
        padding: 20px @padding-primary;
        color: #666;
    }
    .tip {
        text-align: center;
        font-size: 24px;
        margin: @margin-primary 0;
        color: #666;
    }
    .btn-certify {
        .btm-btn-primary();
        margin-bottom: 50px;
    }
    .post-list {
        .post-item {
            background-color: white;
            font-size: 28px;
            height: 112px;
            line-height: 112px;
            padding: @margin-primary;
            border-bottom: 1px solid #f3f3f3;
            .display-flex();
            align-items: center;
            .form-label {
                flex: 0 0 180px;
            }
            .form-input {
                border: none;
                padding: 0;
                margin: 0;
            }
            .hasValue {
                color: @base-origin;
            }
        }
        .post-item-img {
            height: 224px;
            position: relative;
            line-height: normal;
            .img {
                height: 90%;
            }
            .file {
                position: absolute;
                height: 70%;
                left: 210px;
                top: 30px;
                opacity: 0;
            }
        }
        // .post-item:first-child {
        //     border-bottom: none;
        // }
        .sms-code {
            color: @btn-primary-color;
            padding: 12px 30px;
            border: 2px solid @btn-primary-color;
            border-radius: 30px;
        }
        .un-click {
            background-color: #eee;
            color: #999;
            border: none;
        }
    }
}
</style >

