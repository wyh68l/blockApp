<template>
    <div class="page" >
        <m-header title="详情" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="order-info" v-show="temp">
                <li>编号：{{temp.ordersn}}</li>
                <li class="name">{{temp.levelname}}</li>
                <li>
                    <!-- <span>价值：100-300</span> -->
                    <span v-show="type == 'sell' && detailType !=3">卖家状态：<i :class="{'green':true}">{{setSellStatus(temp.status4)}}</i></span>
                    <span v-show="type == 'sell'&& detailType ==3 ">卖家状态：<i :class="{'green':temp.status !=99,'red':temp.status ==99}">{{temp.status==99?'已失效':'申诉中'}}</i></span>
                    <span v-show="type == 'buy'&& detailType !=2">买家状态：<i :class="{'green':true}">{{setStatus(temp.status)}}</i></span>
                    <span v-show="type == 'buy'&& detailType ==2">买家状态：<i :class="{'green':temp.status4 !=99,'red':temp.status4 ==99}">{{temp.status==99?'已失效':'申诉中'}}</i></span>
                </li>
                <li>创建时间：{{formatDate(temp.success_time)}}</li>
                <li>预约/即抢采矿机：{{parseInt(temp.money)}}/{{parseInt(temp.money2)}}</li>
                <li>智能合约收益：{{temp.days}}天/{{parseInt(temp.per)}}%</li>
                <li>可挖Mine：{{parseInt(temp.credit2)}}枚</li>
                <li>可挖DOGE：收益{{parseInt(temp.credit4_per)}}%</li>
                <li v-if="type=='buy'" v-show="temp.pcp">价格：{{temp.pcp}}</li>
                <li v-else v-show="temp.total_money">价格：{{temp.total_money}}</li>

            </ul>
            <nav class="nav-title" v-show="(type=='sell')">| 买家信息</nav>
            <ul class="base-info" v-show="(type=='sell')">
                <li class="item">
                    <span>买家名称：{{saleInfo?saleInfo.buy_username2:'-'}}</span>
                </li>
                <li class="item">
                    <span>电话号码：{{saleInfo?saleInfo.buy_mobile2:'-'}}</span>
                </li>
            </ul>

            <nav class="nav-title" v-show="(type=='buy'&&detailType == 0)">| 卖家信息</nav>
            <ul class="base-info" v-show="(type=='buy'&&detailType == 0)">
                <li class="item">
                    <span>卖家名称：{{saleInfo?saleInfo.realname:'-'}}</span>
                    <span>卖家状态：<i :class="{'green':true}">{{setStatus(temp.status)}}</i></span>
                </li>
                <li class="item">卖家手机号：{{saleInfo?saleInfo.mobile:'-'}}</li>
                <li class="item">
                    <span>卖家微信号：{{saleInfo?saleInfo.wechatact:'-'}}</span>
                    <!-- <span @click.stop="showCode('wechat')">微信支付二维码</span> -->
                </li>
                <li class="item ">
                    <span>卖家支付宝号：{{saleInfo?saleInfo.alipayact:'-'}}</span>
                    <!-- <span @click.stop="showCode('ali')">支付宝二维码</span> -->
                </li>
                <li class="item item-mar">银行名称：{{saleInfo?saleInfo.bank:'-'}}</li>
                <li class="item">开户行：{{saleInfo?saleInfo.bankname:'-'}}</li>
                <li class="item">银行卡姓名：{{saleInfo?saleInfo.bankuname:'-'}}</li>
                <li class="item">银行卡卡号：{{saleInfo?saleInfo.bankact:'-'}}</li>    
                <li class="item item-mar">
                    <div v-if="saleInfo&&saleInfo.alipay_url">
                        <p>支付宝支付二维码</p>
                        <img class="pay-code" :src="saleInfo&&saleInfo.alipay_url?api+saleInfo.alipay_url:upladSrc2" alt="" @click.stop="showPayImg(saleInfo.alipay_url)">
                    </div>
                    <div v-if="saleInfo&&saleInfo.wechat_url">
                        <p>微信支付二维码</p>
                        <img class="pay-code" :src="saleInfo&&saleInfo.wechat_url?api+saleInfo.wechat_url:upladSrc2" alt="" @click.stop="showPayImg(saleInfo.wechat_url)">
                    </div>
                </li>       
            </ul>
            <!-- <nav class="nav-title" v-show="(type=='buy' &&detailType != 1)">| 上传支付凭证</nav> -->
            <nav class="nav-title" v-show="(type=='buy' &&detailType != 1)||(type=='sell' && detailType >= 1)">| 上传支付凭证</nav>
            <ul class="certify-info" v-show="(type=='buy' &&detailType != 1)||(type=='sell' && detailType >= 1)">
                <!-- <img v-if="temp && temp.status == 1||(type=='sell' && detailType == 1&& temp.status == 3)" class="img" :src="temp&&temp.images!=''?(api+'/'+temp.images):upladSrc" alt="">
                <img v-else-if="temp && temp.status !=3" class="img" :src="temp&&temp.images!=''?(api+'/'+temp.images):upladSrc" alt=""> -->
                <img v-if="temp && type=='buy' " class="img" :src="temp&&temp.images&&temp.images!=''?(api+'/'+temp.images):upladSrc" alt="" @click.stop="codeFlag = true">
                <img v-else-if="temp && type=='sell'" class="img" :src="temp&&temp.images2&&temp.images2!=''?(api+'/'+temp.images2):upladSrc" alt="" @click.stop="codeFlag = true">
                <!-- <img v-else-if="temp && type=='sell'&&temp.status4 >=3" class="img" :src="temp&&temp.images2!=''?(api+'/'+temp.images2):upladSrc" alt=""> -->
                <input class="file" type="file" @change.stop="change($event)" :disabled="(type=='buy' &&detailType != 0)||(temp.status==1)||type =='sell'" :style="(type=='buy' &&detailType != 0)||(temp.status==1)||(temp.status4 >=3&& type =='sell')?'height:0':''">
                <div class="btn-group" v-show="(type=='buy' && detailType == 0 && temp.status==0)||(type=='sell' && detailType == 1)||(type=='buy'&& temp.status == 1)||(type == 'sell'&& temp.status4 == 2)">
                    <button v-show="(type=='buy' && detailType == 0 && temp.status==0)||(type=='sell' && detailType == 1)" class="btn btn-blue" @click.stop="confirm">确认</button>
                    <button v-show="(type=='buy'&& temp.status == 1)||(type == 'sell'&& (temp.status4 == 2||temp.status4 == 3))" class="btn btn-red" @click.stop="appeal">申诉</button>
                </div>
            </ul>
        </section>
        <m-pwd ref="pwd" @pay="pay"></m-pwd>
        <div class="layer" v-show="codeFlag" @click="hideCode">
            <div class="code">
                <!-- <img  class="code-img" :src="upladSrc" alt=""> -->
            <!-- <img  class="code-img" :src="temp.images?api+'/'+temp.images:temp.images2?api+'/'+temp.images2:''" alt=""> -->
                <img v-if="type=='buy' " class="code-img" :src="saleInfo && saleInfo.images?api+'/'+saleInfo.images:''" alt="">
                <img v-else class="code-img" :src="saleInfo && saleInfo.images2?api+'/'+saleInfo.images2:''" alt="">
            </div>
        </div>
        <div class="layer" v-show="payCodeFlag" @click="hidePayCode">
            <div class="code">
                <img  class="code-img1" :src="api+payCodeImg" alt="">
            </div>
        </div>
        <m-load ref="load"></m-load>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {Owner,Base} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import mPwd from '@/components/pwd-alert.vue';

export default {
    name:'detail',
    components:{
        mPwd
    },
    data(){
        return {
            upladSrc:require('@/assets/images/gzlz/upload.png'),
            upladSrc2:require('@/assets/images/gzlz/upload.png'),
            qrcode:null,
            saleInfo:null,
            formData:{
                ordersn:null,
                password:null,
                image:null
            },
            type:null,
            detailType:0,
            codeFlag:false,
            payCodeFlag:false,
            payCodeImg:null
        }
    },
    mounted(){
        this.initData();
        // console.log(this.type,this.detailType);
        this.buyer(this.temp.ordersn);
    },
    computed:{
        ...mapGetters(['temp','userInfo','uid','api'])
    },
    methods:{
        initData(){
            // console.log(this.temp)
            this.formData.ordersn = this.temp.ordersn;
            this.type = this.$route.query.type;
            this.detailType = this.$route.query.detailType;
        },
        appeal(){
            this.$router.push({name:"Appeal",query:{type:this.type}})
        },
        buyer(ordersn){
            Owner.buyer({ordersn}).then(res=>{
                if(res.code == 1){
                    this.saleInfo = res.data;
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        setStatus(status){
            switch(status){
                case 0 :
                    return '待付款';
                case 1 :
                    return '待确认';
                case 2 :
                    return '收益中';
                case 3 :
                    return '已完成';
                case 3 :
                    return '已完成';
            }
        },
        setSellStatus(status){
            switch(status){
                // case 0 :
                //     return '待付款';
                case 1 :
                    return '待转让';
                case 2 :
                    return '待付款';
                case 3 :
                    return '待确认';
                case 4 :
                    return '已完成';
            }
        },
        setLevel(level){
            switch(level){
                case 1 :
                    return '普通';
                case 2 :
                    return '勇者';
                case 3 :
                    return '卓越';
                case 4 :
                    return '稀有';
            }
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
            // Util.uploadByUrl(event.target.files[0]).then(url=>{
            //     _This.formData.img = url;
                
            // })
        },
        confirm(){
            this.$refs['pwd'].open();
        },
        pay(pwd){
            let params = {};
            let formData = new FormData();
            if(this.type =='buy'){
                params = Object.assign({},this.formData,{password:pwd});
                formData.append('status','1');
                formData.append('ordersn',this.formData.ordersn);
                formData.append('password',pwd);
                formData.append('image',this.formData.image);
            }else {
                formData.append('status','7');
                formData.append('ordersn',this.formData.ordersn);
                formData.append('password',pwd);
            }

// console.log(formData);
// return ;
            if(this.type == 'buy'){
                let msg = Util.isValidate(params);
                if(msg){
                    mui.toast(msg);
                    return ;
                }
            }
            Owner.minePay(formData).then(res=>{
                if(res.code == 1){
                    setTimeout(() => {
                        mui.toast(res.msg);
                        this.$router.go(-1);
                    }, 1000);
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        showCode(type){
            if(type=='ali'){
                this.qrcode = this.saleInfo.alipay_url;
            }else {
                this.qrcode = this.saleInfo.wechat_url;
            }
            this.codeFlag = true;
        },
        hideCode(){
            this.codeFlag = false;
            this.qrcode = null;
        },
        hidePayCode(){
            this.payCodeFlag = false;
            this.payCodeImg = null
        },
        showPayImg(url){
            this.payCodeFlag = true;
            this.payCodeImg = url;
        },
        formatTime(time){
            return Util.formatTime(time).substr(0,5)
        },
        formatDate(time){
            return Util.formatDate(time)
        },
    }
    
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @bg-color;
        color: white;
        padding: 0 @padding-primary;
        .order-info {
            padding: @padding-primary;
            border-bottom: 1px solid @easy-black;
            >li {
                .display-flex();
                justify-content: space-between;
                margin: 2px 0; 
                
            }
            .name {
                color: @primary-color;
                font-size: 32px;
                margin: 12px 0;
            }
        }
        .nav-title {
            color: @primary-color;
            font-size: 28px;
            margin: @margin-primary;
            
        }
        // 卖家信息
        .base-info {
            padding: 0 @padding-primary @padding-primary @padding-primary;
            border-bottom: 1px solid @easy-black;
            .item {
                .display-flex();
                justify-content: space-between;
                .pay-code {
                    width: 90%;
                }
                p {
                    width: 90%;
                }
            }
            .item-mar {
                margin-top: @margin-primary;
            }
        }
        .certify-info {
            padding: 0 @padding-primary @padding-primary @padding-primary;
            border-bottom: 1px solid @easy-black;
            position: relative;
            .img {
                width: 352px;
                height: 210px;
                margin-top: 20px;
            }
            .file {
                position: absolute;
                width: 352px;
                height: 210px;
                left: @margin-primary;
                top: 0;
                opacity: 0;
            }
            .btn-group {
                margin-top: @margin-primary;
                .btn:first-child {
                    margin-right: @margin-primary;
                }
            }
        }
        .red {
                color: red;
            }
        .blue {
            color: blue;
        }
        .green {
            color: #1BB900;
        }
    }

    .green {
            color: #1BB900;
        }
    .code {
        z-index: 1;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        .code-img {
            width:100%;
        }
        .code-img1 {
            position: absolute;
            width: 100%;
            top: 50%;
            .transform(translate(0,-50%));
        }
    }
    .layer {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color:rgba(0, 0, 0,0.3);
        .display-flex();
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
</style>

