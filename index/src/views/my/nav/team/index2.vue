<template>
    <div class="page">
        <m-header :title="language=='zh-cn'? '我的团队':'My Team'" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list">
                <router-link class="item" :to="{name:'TeamList',query:{type:item.type}}" v-for="(item,index) in listArr" :key="index">
                    <span>{{language=='zh-cn'? item.name:item.enName}}</span>
                   <i class="iconfont iconright"></i>
                </router-link>
            </ul>
        </section>
    </div>
</template>
<script>
import {MyTxt,BaseTxt} from '@/assets/commonjs/lan.js';
import {mapGetters} from 'vuex';
export default {
    name:"PayInfo",
    data(){
        return {
            listArr:[
                {
                    name:'我的直推',
                    enName:'My direct push',
                    type:'zt'
                },
                {
                    name:'我的间推',
                    enName:'My Interpolation',
                    type:'jt'
                },
            ],
            allTxt:null
        }
    },
    mounted(){
        this.initData();
    },
    computed:{
        ...mapGetters(['language'])
    },
    methods:{
        initData(){
            this.allTxt = Object.assign({},MyTxt,BaseTxt);
        }
    }

}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        padding: @padding-primary;
        color: #666;
        .list {
            .item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                padding: @padding-primary 0;
                // border-bottom: 1px solid #ddd;
            }
        }
    }
</style>
