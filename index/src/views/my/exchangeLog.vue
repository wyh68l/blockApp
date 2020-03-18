<template>
  <div class="page">
    <m-header title="兑换记录" :canback="true"></m-header>
    <section class="body">
        <div class="exchange-log">
            <ul class="e-log" v-if="logList && logList.length>0">
                <li class="log-item" v-for="(item,index) in logList" :key="index">
                    <p class="item-p date">
                        <span>兑换币种：{{setCoinTxt(item.type)}}</span> 
                        <span>数量：{{item.num}}</span>
                    </p>
                    <span>{{language =='zh-cn'? '时间':'Time'}}：{{new Date(item.createtime*1000).toLocaleString().replace(/\//g,'-') }}</span>
                </li>
            </ul>
                <next ref="next" :nomore="noMore"></next>
        </div>
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
            coinPicker : new mui.PopPicker(),
            logList:[],
            coinTypeList:[],
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
        },
        setCoinTxt(type){
            switch(type){
                case 'credit1':
                    return '剿巢币';
                case 'credit2':
                    return '冻结剿巢币';
                case 'credit3':
                    return 'i淘币';
                case 'credit4':
                    return '冻结i淘币';
            }
        },
        getBillRecord(){
            Assets.getDhLog({page:this.page}).then(res=>{
                if(res.code == 1){
                    this.logList = res.data && this.logList.concat(res.data);
                    if(res.data && res.data.length>=10)
                    this.noMore = false;
                }else{
                }
            })
        },
        loadMore(){
            if(!this.noMore){
                this.page = this.page+1;
                this.getDhLog();
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