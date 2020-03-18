<template>
  <div class="page">
    <m-header title="账户明细" :canback="true"></m-header>
    <section class="body">
        <nav-item :navlist="navlist" @change="navChange" :start='coinType'></nav-item>
        <div class="exchange-log">
            <p class="exchange-title">
                <span class="type" @click="selectCoin">{{coinTxt}}</span>
            </p>
            <ul class="e-log" v-if="logList && logList.length>0">
                <li class="log-item" v-for="(item,index) in logList" :key="index">
                    <p class="item-p date">
                        <span>{{setCoinTxt(coinType)}}</span> 
                        <!-- <span>{{language =='zh-cn'? '时间':'Time'}}：{{item.createtime}}</span> -->
                        <span>{{item.num}}</span>
                    </p>
                    <p class="content">{{language=='zh-cn'? '说明':'Description'}}：{{item.remark}}</p>
                    <span>{{language =='zh-cn'? '时间':'Time'}}：{{formatDate(item.createtime)}}</span>
                </li>
            </ul>
                <next ref="next" :nomore="noMore"></next>
        </div>
        <!-- <p class="load-more"><i @click="loadMore">点击查看更多</i></p> -->
    </section>
  </div>
</template>
<script>
import { Assets } from "@/server/server.js";
import {mapGetters} from 'vuex';
import {Load,Util} from '@/assets/commonjs/utils.js';
import navItem from '@/components/order-nav-item.vue';
import {MyTxt} from '@/assets/commonjs/lan.js';

export default {
    components:{
        navItem
    },
    data(){
        return {
            coinPicker : new mui.PopPicker(),
            logList:[],
            coinTypeList:[],
            coinType:'1',
            typeId:'1',
            coinTxt:'可售剿巢币',
            navlist:[
                {
                    id:'1',
                    name:'剿巢币'
                },
                // {
                //     id:'2',
                //     name:'冻结剿巢币'
                // },
                {
                    id:'3',
                    name:'i淘币'
                },
                // {
                //     id:'4',
                //     name:'冻结i淘币'
                // },
            ],
            page:1,
            noMore:true
        }
    },
    mounted(){
        this.initData();
        this.getBillRecord();
    },
    computed:{
        ...mapGetters(['uid','language'])
    },
    methods:{
        initData(){
            Load.loadNext(this);
            this.coinPicker.setData([{value:1,text:'可售剿巢币'},{value:2,text:'冻结剿巢币'}])
        },
        formatDate(str){
            return Util.formatDate(str)
        },
        navChange(id){
            this.coinType = id;
            this.typeId = id;
            this.logList = [];
            switch(id){
                case '1':
                    this.coinPicker.setData([{value:1,text:'可售剿巢币'},{value:2,text:'冻结剿巢币'}]);
                    this.coinTxt = '可售剿巢币';
                    break;
                case '3':
                    this.coinPicker.setData([{value:3,text:'可售i淘币'},{value:4,text:'冻结i淘币'}])
                    this.coinTxt = '可售i淘币';
                    break;
            }
            this.getBillRecord();
        },
        setCoinTxt(type){
            switch(type){
                case '1':
                    return '剿巢币';
                case '2':
                    return '冻结剿巢币';
                case '3':
                    return 'i淘币';
                case '4':
                    return '冻结i淘币';
            }
        },
        getCoinType(){
            Assets.getCoinType().then(res=>{
                if(res.code == 1){
                    for(let key in res.data){
                        this.coinTypeList.push({value:key,text:res.data[key]})
                    }
                    this.beforePicker.setData(this.coinTypeList);
                    this.afterPicker.setData(this.coinTypeList);
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        selectCoin(type){
            let _this = this;
            this.coinPicker.show(function(items) {
                _this.logList = [];
                _this.coinTxt = items[0].text;
                _this.typeId = items[0].value;
                _this.getBillRecord()
            });      
        },
        getBillRecord(){
            Assets.getBillRecord({type:this.typeId,page:this.page}).then(res=>{
                if(res.code == 1){
                    this.logList = res.data && this.logList.concat(res.data);
                    if(res.data && res.data.length>=10)
                    this.noMore = false;
                }else{
                    console.log(res)
                }
            })
            
            // this.logList = arr ;
        },
        formatDate(str){
            return Util.formatDate(str)
        },
        loadMore(){
            if(!this.noMore){
                this.page = this.page+1;
                this.getBillRecord();
            }

        },
    }
}
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
    // padding: @margin-primary 0;
    background-color: #f5f5f5;
    .exchange-log {
        padding: @padding-primary @padding-primary;
        // margin-top: 20px;
        // background-color: #fff;
        p {color: #333;}
        .exchange-title {
            border-bottom: 1px solid #f5f5f5;
            height: 100px;
            line-height: 100px;
            font-size: 28px;
            .display-flex();
            align-items: center;
            position: relative;
            &::after{
                position: absolute;
                content: '';
                border-width: 16px;
                border-style: solid;
                border-color: transparent;
                border-top-color: #ddd;
                right: 30px;
                transform: translateY(-50%);
                top: 60%;
            }
            .text {
                width: 150px;
            }
            .type {
                width: 200px;
                flex: 1;
                border: 1px solid #ddd;
                height: 80%;
                line-height: 3;
                border-radius: 10px;
                padding: 0 @padding-primary;
            }
        }
        .e-log {
            // margin: 10px 30px;
            background-color: #fff;
            border-radius: 20px;
            padding: 20px;
            .log-item {
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
                &:last-child{
                border-bottom: none;
                // background-color: #fff;
                }
                .item-p {
                    .display-flex();
                    justify-content: space-between;
                }
                .date,.content {
                    font-size: 28px;
                    margin: 10px 0;
                }
            }
        }
    }
    .load-more {
        color: @base-blue;
        text-align: center;
        font-size: 28px;
        margin: @margin-primary 0;
    }
}
</style>