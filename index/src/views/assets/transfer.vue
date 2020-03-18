<template>
  <div class="page">
    <m-header title="转账" :canback="true"></m-header>
    <section class="body">
        <ul class="type-list">
            <li class="item">
                <span>TBE: <i>{{coinData&& coinData.credit1}}</i></span>
                <span>ACE: <i>{{coinData&& coinData.credit4}}</i></span>
            </li>
            <li class="item">
                <span>TRX: <i>{{coinData&& coinData.credit2}}</i></span>
                <span>游戏币: <i>{{coinData&& coinData.credit6||'0.00'}}</i></span>
            </li>
            <li class="item">
                <span>ETH: <i>{{coinData&& coinData.credit3}}</i></span>
                <span>BBT: <i>{{coinData&& coinData.credit5}}</i></span>
            </li>
        </ul>
        <form class="base-form">
            <div class="form-item" @click="selectCoin(1)">
                <label class="label">转换资产</label>
                <input type="text" class="inp inp-bg" v-model="submitData.from" readonly>
            </div>
            <div class="form-item" @click="selectCoin(2)" >
                <label class="label">转换到</label>
                <input type="text" class="inp inp-bg" v-model="submitData.to" readonly>
            </div>
            <div class="form-item">
                <label class="label">转换额度</label>
                <input type="text" class="inp" placeholder="转换额度" v-model="submitData.total">
                <!-- <span class="error" v-show="rules.total.msg">{{rules.total.msg}}</span> -->

            </div>
                <button type="button" class="btn btn-gradient-blue btn-submit" @click="exchange">转换</button>
        </form>
        <div class="exchange-log">
            <p class="exchange-title"><span>转换记录</span></p>
            <ul class="e-log">
                <li class="log-item" v-for="(item,index) in logList" :key="index">
                    <p class="date">时间：{{formatDate(item.createtime)}}</p>
                    <p class="content">说明：{{item.remark}}</p>
                </li>
            </ul>
        </div>
        <p class="load-more"><i @click="loadMore">点击查看更多</i></p>
    </section>
  </div>
</template>
<script>
import { Assets } from "@/server/server.js";
import {mapGetters} from 'vuex';
import {Load,Util} from '@/assets/commonjs/utils.js';

export default {
    data(){
        return {
            beforePicker : new mui.PopPicker(),
            afterPicker:new mui.PopPicker(),
            coinData:null,
            logList:[],
            coinTypeList:[],
            submitData:{
                uid:null,
                from:null,
                to:null,
                total:null
            },
            fromText:null,
            toText:null,
            page:1,
            noMore:false,

        }
    },
    mounted(){
        this.initData();
        this.getCoin();
        this.getCoinType();
        this.getExchangeLog();
    },
    computed:{
        ...mapGetters(['uid'])
    },
    methods:{
        initData(){
            this.submitData.uid = this.uid;
        },
        getCoin(){
          Assets.getCoin({uid:this.uid}).then(res=>{
            if(res.code ==1){
                this.coinData = res.data
            }else{
                mui.toast(res.msg);
            }
          })
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
            switch(type){
                case 1:
                   this.beforePicker.show(function(items) {
                        _this.submitData.from = items[0].text;
                        _this.fromText = items[0].text;
                    });      
                    break;
                case 2:
                   this.afterPicker.show(function(items) {
                        _this.submitData.to = items[0].text;
                        _this.toText = items[0].text;
                    });     
                    break;
            }
        },
        exchange(){
            Assets.exchange(this.submitData).then(res=>{
                if(res.code == 1){
                    mui.toast(res.msg);
                    this.getExchangeLog();
                    this.submitData = Object.assign({},this.submitData,{from:null,to:null,total:null});
                    this.logList = [];
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        getExchangeLog(){
            Assets.getExchangeLog({uid:this.uid,page:this.page}).then(res=>{
                if(res.code == 1){
                    this.logList = this.logList.concat(res.data);
                    if(res.data && res.data.length<10)
                    this.noMore = true;
                }else{
                    mui.toast(res.msg)
                }
            })
        },
        formatDate(str){
            return Util.formatDate(str)
        },
        loadMore(){
            if(this.noMore)
                mui.toast('没有更多了呢')
            else{
                this.page = this.page+1;
                this.getExchangeLog();
            }

        },
        lazyLoad(){
            this.page = this.page+1;
            if(!this.noMore)
            this.getExchangeLog();
        },
    }
}
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
    // padding: @margin-primary 0;
    background-color: #f5f5f5;
    .type-list {
        padding: 12px 30px ;
        background-color: @base-blue;
        color: white;
        .item {
            .display-flex();
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
        }
    }
    .base-form {
        font-size: 28px;
        padding: @padding-primary;
        margin: 0 ;
        background-color: #fff;
        .label {
            color: black;
            margin-left: 30px;
        }
        .form-item {
            box-shadow: none;
            &:last-of-type {
                margin-bottom: 80px;
            }
            .inp-bg {
                background-color: #eee;
            }
        }
    }
    .exchange-log {
        padding: 0 @padding-primary @padding-primary;
        margin-top: 20px;
        background-color: #fff;
        p {color: #333;}
        .exchange-title {
            border-bottom: 1px solid #f5f5f5;
            height: 100px;
            line-height: 100px;
            font-size: 34px;
            font-weight: 700;
        }
        .e-log {
            .log-item {
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
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