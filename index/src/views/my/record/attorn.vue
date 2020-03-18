<template>
    <div class="page">
        <m-header title="转让记录" :canback="Boolean(1)"></m-header>
        <section class="body">
            <nav-item :navlist="navlist" @change="navChange"></nav-item>
            <!-- <ul class="list">
                <l-card @event="event" :data="listData"> </l-card>
            </ul> -->
            <ul :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
                <div :class="{'record':true}" v-for="(item,index) in listData" :key="index">
                    <ul class="data" >
                        <li>编号：{{item.ordersn}}</li>
                        <li class="name">{{item.levelname}}</li>
                        <li>订单时间：{{formatDate(item.success_time)}}</li>
                        <li>预约/即抢采矿机：{{parseInt(item.money)}}/{{parseInt(item.money2)}}</li>
                        <li>智能合约收益：{{item.days}}天/{{parseInt(item.per)}}%</li>
                        <li>可挖Mine：{{parseInt(item.credit2)}}枚</li>
                        <li>可挖DOGE：收益{{parseInt(item.credit4_per)}}%</li>
                        <li v-if="item.total_money">价格：{{item.total_money}}</li>
                        <li v-if="mavIndex !=3" >状态：<i :class="{'state':true,'green':true}">{{setSellStatus(item.status4)}}</i></li>
                        <li v-else >状态：<i :class="{'state':true,'green':true}">申诉中</i></li>
                        <!-- <li v-show="nobg">取消理由：124646464</li> -->
                    </ul>
                    <div class="btn-groug">
                        <button  class="btn btn-detail btn-origin" v-for="(item1,index) in btnlist" :key="index" @click.stop="onEvent(item,item1.type)">{{item1.name}}</button>
                        <!-- <button class="btn btn-detail btn-blue">预约</button> -->
                    </div>
                </div>
                <next ref="next" :nomore="noMore"></next>
            </ul>
        </section>
        <!-- <m-Footer></m-Footer> -->
    </div>
</template>
<script>
import lCard from '@/components/l-card.vue';
import navItem from '@/components/order-nav-item.vue';
import {Owner} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
export default {
    name:'mine',
    components:{
        lCard,navItem
    },
    data(){
        return {
            navlist:[
                {
                    id:0,
                    name:'待转让'
                },
                {
                    id:1,
                    name:'转让中'
                },
                {
                    id:2,
                    name:'已完成'
                },
                {
                    id:3,
                    name:'取消/申诉'
                },
            ],
            btnlist:[
                {
                    name:'详情',
                    type:'detail'
                }
            ],
            listData:[],
            page:1,
            noMore:false,
            mavIndex:0,
            detailType:0
            
        }
    },
    mounted(){
        this.initData();
        this.sellStatus(this.page);
    },
    methods:{
        initData(){
            this.$store.commit('saveTemp',null);
            this.screenHeight = window.screen.height || window.screen.availHeight;
        },
        // 带转让
        sellStatus(page){
            setTimeout(() => {
                Load.loadNext(this);
            }, 0);
            Owner.sellStatus({page}).then(res=>{
                if(res.code == 1){
                    this.listData = this.listData.concat(res.data||[]);
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                    // console.log(this.listData)
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        // 转让中
        sellStatus2(page){
            setTimeout(() => {
                Load.loadNext(this);
            }, 0);
            Owner.sellStatus2({page}).then(res=>{
                if(res.code == 1){
                    this.listData = this.listData.concat(res.data||[]);
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                    // console.log(this.listData)
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        // 已完成
        sellStatus4(page){
            setTimeout(() => {
                Load.loadNext(this);
            }, 0);
            Owner.sellStatus4({page}).then(res=>{
                if(res.code == 1){
                    this.listData = this.listData.concat(res.data||[]);
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                    // console.log(this.listData)
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        // 申诉列表
        sellAppeal(page){
            setTimeout(() => {
                Load.loadNext(this);
            }, 0);
            Owner.sellAppeal({page}).then(res=>{
                if(res.code == 1){
                    this.listData = this.listData.concat(res.data||[]);
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                    // console.log(this.listData)
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        navChange(index){
            [this.page,this.listData,this.noMore] = [1,[],false];
            switch(index){
                case 0:
                    this.mavIndex = 0;
                    this.detailType = 0;

                    this.sellStatus(this.page);
                    break;
                case 1:
                    this.mavIndex = 1;
                    this.detailType = 1;

                    this.sellStatus2(this.page);
                    break;
                case 2:
                    this.mavIndex = 2;
                    this.detailType = 2;

                    this.sellStatus4(this.page);
                    break;
                case 3:
                    this.mavIndex = 3;
                    this.detailType = 3;
                    this.sellAppeal(this.page);
                    break;
            }
        },
        onEvent(item,type){
            switch(type){
                case 'detail':
                    this.$router.push({name:'Detail',query:{type:'sell',detailType:this.detailType}});
                    localStorage.setItem('temp',JSON.stringify(item));
                    break;
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
        // setAppealStatus(status){
        //     switch(status){
        //         case 0 :
        //             return '待付款';
        //         case 1 :
        //             return '待转让';
        //         case 2 :
        //             return '待付款';
        //         case 3 :
        //             return '待确认';
        //         case 4 :
        //             return '已完成';
        //     }
        // },
        lazyLoad(){
            this.page = this.page+1;
            if(!this.noMore)
            switch(this.mavIndex){
                case 0:
                    this.sellStatus(this.page);
                    break;
                case 1:
                    this.sellStatus2(this.page);
                    break;
                case 2:
                    this.sellStatus4(this.page);
                    break;
                case 3:
                    this.sellAppeal(this.page);
                    break;
            }
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
        padding: @padding-primary;
        background-color: @bg-color;

        .record {
            // padding: @padding-primary;
            margin: @margin-primary 0;
            background-color: @bg-card-color;
            color: white;
            .display-flex();
            border-radius: 8px;
            .data {
                padding: 20px @padding-primary;
                flex: 1;
                font-size: 24px;
                .name {
                    color: @primary-color;
                    font-size: 32px;
                    margin: 12px 0;
                }
                >li {
                    margin: 2px 0;
                }
            }
            .btn-groug {
                text-align: right;
                padding:@margin-primary;
                width: 200px;
                height: 100%;
            }
            .state-red {
                color: red;
            }
            .state-green {
                color: green;
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
        .no-bg {
            background-color: transparent;
        }
        .list {
            // margin: @margin-primary 0;
            border-radius: 8px;
        } 
    }
</style>
