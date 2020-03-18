<template>
    <div class="page">
        <m-header :title="setTitle()" :canback="true">
            <span @click="appeal(orderDetail&&orderDetail.tradesn)">申诉</span>
        </m-header>
        <section class="body">
            <form class="base-form">
                <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'创建人':allTxt &&allTxt['founder']}}</label>
                    <input class="inp" type="text" :value="orderDetail &&orderDetail.uuname" readonly>
                </div>
                <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'数量':allTxt &&allTxt['number']}}</label>
                    <input class="inp" type="text" :value="orderDetail && parseInt(orderDetail.amount2)" readonly>
                </div>
                <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'单价':allTxt &&allTxt['uprice']}}</label>
                    <input class="inp" type="text" :value="orderDetail &&orderDetail.uprice" readonly>
                </div>
                <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'总金额':allTxt &&allTxt['totalAmount']}}</label>
                    <input class="inp" type="text" :value="orderDetail && orderDetail.totalprice" readonly>
                </div>
                <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'时间':allTxt &&allTxt['time']}}</label>
                    <input class="inp" type="text" :value="orderDetail &&formatDate(orderDetail.createtime)" readonly>
                </div>
                <!-- <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'手机号码':allTxt &&allTxt['mobile']}}</label>
                    <input class="inp" type="text" :value="orderDetail &&orderDetail.uuname" readonly>
                </div> -->
                <div v-if="type || (orderDetail&&orderDetail.state>1)">
                    <div class="form-item no-flex">
                        <p class="item-title">{{language == 'zh-cn'?'支付方式':allTxt &&allTxt['payWay']}}</p>
                        <div class="flex-item">
                            <img v-if="orderDetail && orderDetail.type==2&&orderDetail.isowner==1" class="qrcode" :src="orderDetail && orderDetail.ualipay_url?api+'/'+orderDetail.ualipay_url:defaultSrc" @click="seeQRcode(orderDetail.ualipay_url)">
                            <img v-if="orderDetail && orderDetail.type==2&&orderDetail.isowner==1" class="qrcode" :src="orderDetail && orderDetail.uwechat_url?api+'/'+orderDetail.uwechat_url:defaultSrc" @click="seeQRcode(orderDetail.uwechat_url)">
                            <!-- <img v-if="orderDetail && orderDetail.type==1 &&orderDetail.isowner==1" class="qrcode" :src="orderDetail && orderDetail.uwechat_url?api+'/'+orderDetail.uwechat_url:defaultSrc" @click="seeQRcode('wechat')"> -->
                            <img v-if="orderDetail && orderDetail.type==2&&orderDetail.isowner==0" class="qrcode" :src="orderDetail && orderDetail.ualipay_url?api+'/'+orderDetail.ualipay_url:defaultSrc" @click="seeQRcode(orderDetail.ualipay_url)">
                            <img v-if="orderDetail && orderDetail.type==2&&orderDetail.isowner==0" class="qrcode" :src="orderDetail && orderDetail.uwechat_url?api+'/'+orderDetail.uwechat_url:defaultSrc" @click="seeQRcode(orderDetail.uwechat_url)">


                            <img v-if="orderDetail && orderDetail.type==1 &&orderDetail.isowner==1" class="qrcode" :src="orderDetail && orderDetail.ualipay_url?api+'/'+orderDetail.ualipay_url:defaultSrc" @click="seeQRcode(orderDetail.ualipay_url)">
                            <img v-if="orderDetail && orderDetail.type==1 &&orderDetail.isowner==1" class="qrcode" :src="orderDetail && orderDetail.uwechat_url?api+'/'+orderDetail.uwechat_url:defaultSrc" @click="seeQRcode(orderDetail.uwechat_url)">
                            <img v-if="orderDetail && orderDetail.type==1&&orderDetail.isowner==0" class="qrcode" :src="orderDetail && orderDetail.balipay_url?api+'/'+orderDetail.balipay_url:defaultSrc" @click="seeQRcode(orderDetail.balipay_url)">
                            <img v-if="orderDetail && orderDetail.type==1&&orderDetail.isowner==0" class="qrcode" :src="orderDetail && orderDetail.bwechat_url?api+'/'+orderDetail.bwechat_url:defaultSrc" @click="seeQRcode(orderDetail.bwechat_url)">
                            <div class="card" @click="cardDetail"><i class="iconfont iconcard1 card-item"></i><br><span>银行卡</span></div>
                        </div>
                    </div> 
                    <div class="form-item no-flex">
                        <p class="item-title">{{language == 'zh-cn'?'打款凭证':allTxt &&allTxt['proofPayment']}}</p>
                        <div class="upload">
                            <!-- <input type="file" class="file"> -->
                            <img v-if="orderDetail &&orderDetail.state==2" class="voucher" :src="paySubmit.payproof?api+paySubmit.payproof:defaultSrc" alt="" @click="upload">
                            <img v-if="orderDetail &&orderDetail.state>2" class="voucher" :src="orderDetail &&orderDetail.payproof?api+orderDetail.payproof:defaultSrc">
                        </div>
                    </div> 
                    <div class="form-item">
                    <label class="label">{{language == 'zh-cn'?'打款方式':allTxt &&allTxt['payWay']}}</label>
                    <input class="inp" type="text" :value="payWayTxt()" readonly>
                </div>
                    <!--   isowner:0,type:2 别人的买单  isowner:1 type：1 我的买单 -->
                    <!-- <button type="button" class="btn btn-gradient-blue" @click="toPay" v-if="orderDetail &&orderDetail.state==2 && orderDetail.isowner==0 ">{{language == 'zh-cn'?'确定付款':allTxt &&allTxt['confirmPayment']}}</button> -->
                    <button type="button" class="btn gradient-origin" @click="toPay" v-if="orderDetail &&orderDetail.state==2 && ((orderDetail.isowner==0 && orderDetail.type==2 )||(orderDetail.isowner==1 && orderDetail.type==1))">{{language == 'zh-cn'?'确定付款':allTxt &&allTxt['confirmPayment']}}</button>
                    <!--  type:2,isowner:1 我的买单   type：1，suoshu：0 -->
                    <button type="button" class="btn gradient-origin" @click="toConfirm" v-if="orderDetail &&orderDetail.state==3 && ((orderDetail.isowner==1&&orderDetail.type ==2)||(orderDetail.isowner==0&&orderDetail.type ==1))">{{language == 'zh-cn'?'确定订单':allTxt &&allTxt['confirmOrder']}}</button>
                </div>
                <button v-if="type" type="button" class="btn gradient-origin btn-order" @click="book">{{language == 'zh-cn'?'立即下单':allTxt &&allTxt['orderNew']}} </button>
            </form>
        </section>
        <div class="imgLayer" v-show="imgShowFlag" @click="hideImg">
            <img class="img" :src="curQRcode" alt="">
        </div>
        <m-load ref="load"></m-load>
        <pwd-alert ref="pwd" @pay="pay"></pwd-alert>
        <large-alert ref="upload" @confirm="getUpload"></large-alert>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
import {Owner,Init,Trade} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import pwdAlert from '@/components/pwd-alert.vue';
import largeAlert from '@/components/large-alert.vue';
import {TradeTxt} from '@/assets/commonjs/lan.js';

export default {
    name:'OrderDetail',
    components:{
        pwdAlert,largeAlert
    },
    data(){
        return {
            formData:{
                user:'11111'
            },
            defaultSrc:require('@/assets/images/upload.png'),
            imgShowFlag:false,
            curQRcode:null,
            upladSrc:null,
            orderId:null,
            orderDetail:null,
            type:null,
            allTxt:null,
            paySubmit:{
                orderid:null,
                pwd:null,
                payproof:null,
                paytype:null,
            },
            

        }
    },
    mounted () {
        this.initData();
        this.getDetail();
    },
    computed:{
        ...mapGetters(['uid','userInfo','api','language'])
    },
    methods:{
        ...mapMutations(['saveTemp']),
        initData(){
            this.allTxt = Object.assign({},TradeTxt);
            this.orderId = this.$route.params.id;
            if(this.$route.query.type)
            this.type = this.$route.query.type;
        },
        formatDate(str){
            return Util.formatDate(str);
        },
        setLanTxt(strArr){
            Util.setLanTxt(strArr)
        },
        toConfirm(){
            this.$refs['pwd'].open();
        },
        appeal(tradesn){
            this.$router.push({name:'Appeal',params:{tradesn}})
        },
        /**
         * 支付方式
         */
        payWayTxt(){
            let value = Number(this.orderDetail.paytype) || this.paySubmit.paytype;
            switch(value){
                case 1:
                    return this.language =='zh-cn'?'支付宝':'AliPay';
                case 2:
                    return this.language =='zh-cn'?'微信':'WechatPay';
                case 3:
                    return this.language =='zh-cn'?'银行卡转账':'Bank';
                default:
                    return '-';
            }
        },
        /**
         * 查看支付码
         */
        seeQRcode(src){
            this.imgShowFlag = true;
            this.curQRcode = src?src:this.defaultSrc;
        },
        hideImg(){
            this.imgShowFlag = false;
        },
        /**
         * 银行卡信息
         */
        cardDetail(){
            this.saveTemp(this.orderDetail);
            localStorage.setItem('temp',JSON.stringify(this.orderDetail));
            this.$router.push({name:'Card'});
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
                        this.upladSrc = this.api+res.data;
                        this.formData.image = res.data;
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
        },
        /**
         * 订单详情
         */
        getDetail(){
            Trade.getDetail({orderid:this.orderId}).then(res=>{
                if(res.code ==1){
                    this.orderDetail = res.data;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        /**
         * 支付密码
         */
        pay(pwd){
            Load.loadStart(this);
            if(this.orderDetail.state == 1){  //下单
                let submitData = {
                    orderid:this.orderId,
                    totalprice2:this.orderDetail.uprice*this.orderDetail.amount2,
                    pwd:pwd,
                    sum:this.orderDetail.amount2
                };
                if(this.type =='sale'){
                    Trade.buy(submitData).then(res=>{
                        if(res.code ==1){
                            Load.loadEnd(this);
                            mui.alert(res.msg,()=>{
                                // this.$router.push({name:'Sale'})
                                this.$router.go(-1);
                            })
                        }else{
                            Load.loadEnd(this);
                            mui.toast(res.msg)
                        }
                    });
                }else{
                    Trade.sale(submitData).then(res=>{
                        if(res.code ==1){
                            Load.loadEnd(this);
                            mui.alert(res.msg,()=>{
                                // this.$router.push({name:'Buy'})
                                this.$router.go(-1);
                            })
                        }else{
                            Load.loadEnd(this);
                            mui.toast(res.msg)
                        }
                    });
                }

            }else if(this.orderDetail.state == 2){   //订单付款
                this.paySubmit = Object.assign({},this.paySubmit,{orderid:this.orderDetail.id,pwd})
                Trade.pay(this.paySubmit).then(res=>{
                    if(res.code ==1){
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    }else{
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return;
                    }
                })
            }else if(this.orderDetail.state == 3){ //确定订单
                // console.log(this.orderDetail.id,pwd);return;
                Trade.saleConfirm({orderid:this.orderDetail.id,pwd}).then(res=>{
                    if(res.code == 1){
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500);
                    }else{
                            Load.loadEnd(this);
                        mui.toast(res.msg);
                        return ;
                    }
                })
            }
        },
        /**
         * 去支付，调用密码框
         */
        toPay(){
            this.$refs['pwd'].open();
        },
        /**
         * 上传支付凭证
         */
        upload(){
            this.$refs['upload'].open()
        },
        // 获取支付凭证
        getUpload(valueObj){
            this.paySubmit = Object.assign({},this.paySubmit,{
                payproof:valueObj.payproof,
                paytype:valueObj.paytype
            })
        },
        book(){
            this.$refs['pwd'].open();
        },
        setTitle(){
            if(this.type){
                switch(this.type){
                    case 'buy':
                        if(this.language =='zh-cn'){
                            return '买单详情';
                        }else{
                            return 'Details of the purchase order';
                        }
                    case 'sale':
                        if(this.language =='zh-cn'){
                            return '卖单详情';
                        }else{
                            return 'Sales order details';
                        }
                }
            }else{
                if(this.orderDetail &&this.orderDetail.isowner ==0){
                    switch(this.orderDetail.type){
                        case 1:
                            if(this.language =='zh-cn'){
                                return '卖单详情';
                            }else{
                                return 'Sales order details';
                            }
                        case 2:
                            if(this.language =='zh-cn'){
                                return '买单详情';
                            }else{
                                return 'Details of the purchase order';
                            }
                    }
                }else {
                    switch(this.orderDetail && this.orderDetail.type){
                        case 1:
                            if(this.language =='zh-cn'){
                                return '买单详情';
                            }else{
                                return 'Details of the purchase order';
                            }
                        case 2:
                            if(this.language =='zh-cn'){
                                return '卖单详情';
                            }else{
                                return 'Sales order details';
                            }
                    }

                }
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.saveTemp(null);
            localStorage.removeItem('temp');
        })
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        .base-form {
            background-color: white;
            margin: 0 ;
            padding: 0 @padding-primary 100px;
            position: relative;
            .form-item {
                .qrcode,.card {
                    width: 30%;
                    text-align: center;
                    color: @base-blue;
                    .card-item {
                        font-size: 44PX;
                    }
                }
            }
            .flex-item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
            }
            .no-flex {
                display: block;
                .item-title {
                    color: black;
                    font-size: 32px;
                    padding: 20px 0;
                }
                .upload {
                    position: relative;
                    .file {
                        height: 100%;
                        top: 0;
                        left: 0;
                        width: 70%;
                    }
                    .voucher {
                        height: 264px;
                    }
                }
            }
            .btn {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 88px;
                line-height: 88px;
                width: 100%;
                border-radius: 0;

            }
            .btn-order {
                width: 90%;
                border-radius: 10px;
                margin-left: 5%;
            }
        }
    }
    .imgLayer {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(1,1,1,.1);
        width: 100%;
        height: 100%;
        z-index: 9;
        .img{
            width: 100%;
            position: absolute;
            top: 50%;
            .transform(translateY(-50%));
            left: 0;
        }
    }
</style>
