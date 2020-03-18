<template>
    <div class="page">
        <m-header :title="language=='zh-cn'? '孵化记录':allTxt&&allTxt['hatch']"  :canback="true"></m-header>
        <section class="body">
            <ul class="record-list" :style="'height:'+(screenH-80)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
                <li class="record-item" v-for="(item,index) in list" :key="index">
                    <nav class="item-title">
                        <span class="num">{{language=='zh-cn'?'数量':'quantity'}}：{{item.bprice}}</span>
                        <span class="status">{{language=='zh-cn'? '状态':allTxt&&allTxt['status']}}：<i :class="{'c-green':item.status ==4,'c-blue':item.status == 2,'c-red':item.status ==1}">{{setStatusText(item.status)}}</i> </span>
                    </nav>
                    <section class="item-content">
                        <p class="con-item">{{language=='zh-cn'? '日回报率':allTxt &&allTxt['dayRate']}}</p>
                        <p class="con-item rate">{{item.percent}}%</p>
                        <p class="con-item p-flex"><span class="way">{{language=='zh-cn'? '理财方式':allTxt &&allTxt['fManage']}}：T+1</span><span class="power">理财算力：{{item.suanli}}</span></p>
                        <p class="con-item  p-flex"><span class="days">{{language=='zh-cn'? '产品期限':allTxt &&allTxt['productTerm']}}：{{item.all_day}}天</span><span class="date">理财时间：{{formatDate(item.createtime)}}</span></p>
                    </section>
                    <footer class="item-btn">
                        <button class="btn btn-gradient-blue" @click="extract(item.id)">{{language=='zh-cn'? '立即提出':allTxt&&allTxt['putNow']}}</button>
                    </footer>
                </li>
                <next ref="next" :nomore="noMore"></next>
            </ul>
        </section>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {Owner} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {MyTxt,BaseTxt,IndexTxt} from '@/assets/commonjs/lan.js';
export default {
    name:'HatchRecord',
    data(){
        return {
            page:1,
            noMore:true,
            list:[],
            allTxt:null
        }
    },
    mounted () {
        this.initData();
        this.getInterestLog();
    },
    computed:{
        ...mapGetters(['uid','screenH','language'])
    },
    methods:{
        initData(){
            Load.loadNext(this);
            this.allTxt = Object.assign({},MyTxt,BaseTxt,IndexTxt);
        },
        /**
         * status 4 理财结束 1 冻结  2 理财中
         */
        getInterestLog(){
            Owner.getInterestLog({uid:this.uid,page:this.page}).then(res=>{
                if(res.code == 1){
                    this.list = res.data && this.list.concat(res.data)
                    if(res.data && res.data.length<10)
                    this.noMore = true;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        setStatusText(status){
            switch(status){
                case 1:
                    if(this.language =='zh-cn')
                        return '冻结中';
                    else
                        return 'Freezing';
                case 2:
                    if(this.language =='zh-cn')
                        return '孵化中';
                    else
                        return 'In incubation';
                case 4:
                    if(this.language =='zh-cn')
                        return '孵化完成';
                    else
                        return 'completed';
            }
        },
        extract(id){
            Owner.extract({uid:this.uid,id}).then(res=>{
                if(res.code == 1){
                    mui.alert(res.msg,()=>{
                        this.getInterestLog();
                    });
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        formatDate(str){
            return Util.formatDate(str)
        },
        lazyLoad(){
            this.page = this.page+1;
            if(!this.noMore)
                this.getInterestLog();
            }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        padding: @padding-primary;
        .record-list{
            .record-item{
                padding: @padding-primary;
                background-color: white;
                border-radius: 10px;
                .item-title{
                    .display-flex();
                    justify-content: space-between;
                    align-items: center;
                    .num {
                        font-size: 34px;
                        color: @base-blue;
                    }
                    .status {
                        font-size: 28px;
                        .c-green {
                            color: @base-green;
                        }
                        .c-red {
                            color: @base-red;
                        }
                    }
                }
                .item-content {
                    background-color: @base-blue;
                    margin: 20px 0;
                    padding: @padding-primary @padding-primary 24px;
                    border-radius: 10px;
                    .con-item{
                        text-align: center;
                        font-size: 24px;
                        margin: 8px 0 ;
                    }
                    .p-flex{
                        .display-flex();
                        justify-content: space-between;
                        align-items: center;
                    }
                    .rate {
                        font-size: 44px;
                        margin: 15px 0;
                    }
                }
                .item-btn {
                    text-align: center;
                    height: 88px;
                    .btn {
                        width: 96%;
                        height: 100%;
                        line-height: 2;
                        font-size: 32px;
                    }
                }
            }
        }
    }
</style>
