<template>
    <div class="page">
        <m-header :title="language=='zh-cn'? '我的卖单':allTxt&&allTxt['mySale']" :canback="true"></m-header>
        <section class="body">
            <nav-item :navlist="language=='zh-cn'?navlist:enNavlist" @change="navChange"></nav-item>
            <ul class="list" :style="'height:'+(screenH-130)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
                <li class="item" @click="detail(item.id,item.state)" v-for="(item,index) in orderList" :key="index">
                    <img class="item-icon" src="../../../assets/images/touxiang.png" alt="">
                    <ul class="item-content">
                        <li class="con-item ">
                            <span class="user">{{item.uuname}}</span>
                            <span class="date">{{item.createtime}}</span>
                        </li>
                        <li class="con-item ">
                            <span class="num">{{language=='zh-cn'?'数量':'quantity'}}  {{parseInt(item.amount2)}}</span>
                            <span class="price">{{language=='zh-cn'? '单价':allTxt &&allTxt['uprice']}} ￥{{item.uprice||'0.00'}}</span>
                        </li>
                        <li class="con-item ">
                            <span class="pay-way">{{language=='zh-cn'?'支付宝  微信  银行卡':allTxt && allTxt['allPay']}}</span>
                            <span :class="{'status':true,'s-red':item.state==1,'s-green':item.state==4,'s-blue':item.state == 3}">{{stateText(item.state)}}</span>
                        </li>
                    </ul>
                </li>
                <next ref="next" :nomore="noMore"></next>
            </ul>
            <footer class="f-btns">
                <button class="btn gradient-origin" @click="addOrder">{{language=='zh-cn'?'创建卖单':allTxt&&allTxt['creteSale']}}</button>
            </footer>
        </section>
    </div>
</template>
<script>
import {BaseTxt,TradeTxt,MyTxt} from '@/assets/commonjs/lan.js';
import {mapGetters} from 'vuex';
import {Owner,Init,Trade} from '@/server/server.js';
import navItem from '@/components/order-nav-item.vue';
import {Util,Load} from '@/assets/commonjs/utils.js';

export default {
    components:{
        navItem
    },
    name:'Sell',
    data(){
        return {
            navlist:[
                {
                    id:'0',
                    name:'全部'
                },
                {
                    id:'2',
                    name:'待付款'
                },
                {
                    id:'3',
                    name:'待确定'
                },
                {
                    id:'4',
                    name:'已完成'
                },
            ],
            enNavlist:[
                {
                    id:'0',
                    name:'All'
                },
                {
                    id:'2',
                    name:'Obligation'
                },
                {
                    id:'3',
                    name:'Unsealed'
                },
                {
                    id:'4',
                    name:'Completed'
                },
            ],
            noMore:true,
            page:1,
            state:0,
            orderList:[],
            allTxt:null
        }
    },
    mounted () {
        this.initData();
        this.getOrder();
    },
    computed:{
        ...mapGetters(['uid','userInfo','screenH','language'])
    },
    // watch:{
    //     state()
    // },
    methods:{
        initData(){
            Load.loadNext(this);
            this.allTxt = Object.assign({},TradeTxt,BaseTxt,MyTxt)
        },
        navChange(id){
            this.state = id;
            this.orderList = [];
            this.getOrder();
        },
        detail(id,state){
            this.$router.push({name:'OrderDetail',params:{id,state}})
        },
        addOrder(){
            this.$router.push({name:'AddOrder',params:{type:'sale'}})
        },
        //0全部  1待交易、2待付款、3待确认、4已完成、10申诉中  12订单失效
        getOrder(){
            let state = this.state==0?'':this.state;
            Trade.getOrder({page:this.page,type:2,state,devide:1}).then(res=>{
                if(res.code == 1){
                    this.orderList = res.data.length>0 && this.orderList.concat(res.data);
                    if(res.data.length<10)
                    this.noMore = true;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        lazyLoad(){
            this.page = this.page+1;
            if(!this.noMore)
            this.getOrder();
        },
        stateText(state){
            switch(state){
                case 1:
                    return '待交易';
                case 2:
                    return '待付款';
                case 3:
                    return '待确认';
                case 4:
                    return '已完成';
                case 10:
                    return '申诉中';
                case 12:
                    return '订单失效';
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
            margin-bottom: 88px;
        .list {
            padding: @padding-primary;
            .item {
                background-color: @base-white;
                padding: 24px @padding-primary;
                .display-flex();
                align-items: center;
                .item-icon {
                    width: 100px;
                    height: 100px;
                    flex: 0 0 100px;
                    margin-right: 10px;
                }
                .item-content {
                    flex: 1 1 auto;
                    font-size: 28px;
                    border-radius: 10px;
                    .con-item {
                        .display-flex();
                        justify-content: space-between;
                        align-items: center;
                        .user,.date {
                            font-size: 24px;
                            color: #999;
                        }
                        .pay-way,.status {
                            color: @base-blue;
                            font-size: 24px;
                        }
                        .s-green{
                            color: @base-green;
                        }
                    }
                }
            }
        }
        .f-btns {
            position: fixed;
            bottom: 0;
            left: 0;
            height: 88px;
            width: 100%;
            .btn {
                width: 100%;
                height: 100%;
                font-size: 32px;
            }
        }
    }
</style>
