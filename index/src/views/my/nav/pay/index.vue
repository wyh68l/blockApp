<template>
    <div class="page">
        <m-header title="支付信息" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="card-list">
                <li class="item" @click="bind('ali')">
                    <p class="content"><span>支付宝</span> <span>{{payData&&payData.alipayact?'已绑定':'去绑定'}} <i class="iconfont iconright"></i></span></p>
                </li>
                <li class="item" @click="bind('wechat')">
                    <p class="content"><span>微信</span> <span>{{payData&&payData.wechatact?'已绑定':'去绑定'}}  <i class="iconfont iconright"></i></span></p>
                </li>
                <li class="item bank-item" v-if="payData &&payData.bank">
                    <p>
                        <span class="bank-name">{{payData.bank}}</span><br>
                        <span class="branck">{{payData.bankname}}</span>
                    </p>
                    <p class="num">**** **** ****{{payData.bankact.substr(-4,4)}}</p>
                </li>
                <li class="item" @click="addCard" >
                    <p class="add"><i class="iconfont iconadd"></i>绑定银行卡</p>
                </li>
                <!-- <li class="item" @click="addCard" v-show="payData && !payData.bank">
                    <p class="add"><i class="iconfont iconadd"></i>添加银行卡</p>
                </li> -->
            </ul>
        </section>
    </div>
</template>
<script>
import {Owner} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {TradeTxt,BaseTxt} from '@/assets/commonjs/lan.js';
export default {
    name:"PayInfo",
    data(){
        return {
            payData:null
        }
    },
    mounted(){
        this.initData();
        this.getPayInfo(this.uid);
    },
    computed:{
        ...mapGetters(['uid'])
    },
    methods:{
        initData(){
            this.$store.commit('saveTemp',null);
        },
        addCard(){
            this.$router.push({name:'AddCard'})
        },
        bind(type){
            this.$router.push({name:'Bind',params:{type}})
        },
        getPayInfo(id){
            Owner.getPayInfo({id}).then(res=>{
                if(res.code == 1){
                    this.payData = res.data[0];
                    localStorage.setItem('temp',JSON.stringify(this.payData));
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        padding: @padding-primary;
        .card-list {
            .item {
                height: 150px;
                line-height: 150px;
                padding: 0 42px;
                background-color: #2b6ec2;
                margin: 30px 0;
                font-size: 32px;
                border-radius: 10px;
                .content {
                    .display-flex();
                    width: 100%;
                    justify-content: space-between;
                }
                &:first-child {
                    background-color: #4ac1f4;
                }
                &:last-child {
                    background-color: @easy-black;
                }
                &:nth-child(2){
                    background-color: #4eba4c;
                }
                .add {
                    text-align: center;
                    font-size: 32px;
                }
            }
            .bank-item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                line-height: normal;
                .branck {
                    font-size: 24px;
                    color:#DDDDDD;
                }
                
            }
        }
    }
</style>
