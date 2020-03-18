<template>
    <div class="page">
        <m-header :title="language =='zh-cn'? '帮助中心':allTxt && allTxt['help']" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list">
                <li class="item" v-for="(item,index) in navList" :key="index" @click="typeList(item.id)">
                    <span>{{item.name}}</span>
                    <i class="iconfont iconright"></i>
                </li>
            </ul>
            <footer class="f-btns">
                <button class="btn btn-gradient-blue" @click="goTo('question')">{{language =='zh-cn'? '问题反馈':allTxt && allTxt['feedback']}}</button>
                <button class="btn btn-gradient-blue" @click="goTo('kefu')">{{language == 'zh-cn'? '联系客服':allTxt && allTxt['contact']}}</button>
            </footer>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Help} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters}  from 'vuex';
import {MyTxt,HelpTxt} from '@/assets/commonjs/lan.js';

export default {
    name:'set',
    data(){
        return {
            navList:null,
            allTxt:null
        }
    },
    mounted(){
        this.initData();
        this.getCategoryList();
    },
    computed:{
        ...mapGetters(['userInfo'])
    },
    methods:{
        initData(){
            this.allTxt = Object.assign({},MyTxt,HelpTxt)
        },
        getCategoryList(){
            Help.getCategoryList({page:this.page}).then(res=>{
                if(res.code == 1){
                    this.navList = res.data;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        goTo(type){
            switch(type){
                case 'question':
                    this.$router.push({name:'Question'});
                    break;
                case 'kefu':
                    this.$router.push({name:'Customer'});
                    break;
            }
        },
        typeList(id){
            this.$router.push({name:'QuestionList',params:{id}})
        }
    }
    
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        color: #333;
        .list {
            margin: @margin-primary;
            .item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                padding: @padding-primary 0;
                // border-bottom: 1px solid #ddd;
            }
        }
        .f-btns {
            text-align: center;
            .btn {
                height: 88px;
                width: 40%;
                margin: 0 15px;
            }
        }
    }
</style>

