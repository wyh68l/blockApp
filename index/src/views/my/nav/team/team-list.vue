<template>
    <div class="page">
        <m-header :title="type=='zt'?language=='zh-cn'? '我的直推':'My direct push':language=='zh-cn'? '我的间推':'My Interpolation'" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list" v-if="list">
               <li class="item" v-for="(item,index) in list[type]" :key="index">
                   <p>
                       <span>{{item.username}}</span>
                       <span>{{item.mobile}}</span>
                   </p>
                   <!-- <p>2019-03-06 16：45</p> -->
                   </li>
                   <li v-if="type=='zt'&& list[type].length==0" style="text-align:center;margin-top:20px;">{{language=='zh-cn'? '暂无数据':'No data available for the time being'}}</li>
                   <li v-if="type=='jt'&& list[type].length==0" style="text-align:center;margin-top:20px;">{{language=='zh-cn'? '暂无数据':'No data available for the time being'}}</li>
            </ul>
        </section>
    </div>
</template>
<script>
import {Owner} from '@/server/server.js';
import {mapGetters} from 'vuex';
export default {
    name:"PayInfo",
    data(){
        return {
            type:null,
            list:null,
        }
    },
    mounted(){
        this.initData();
        this.getTeam(this.uid);
    },
    computed:{
        ...mapGetters(['uid','language'])
    },
    methods:{
        initData(){
            this.type = this.$route.query.type;
        },
        getTeam(uid){
            Owner.getTeam({uid}).then(res=>{
                if(res.code == 1){
                    this.list = res.data;
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
        color: #666;
        .list {
            .item {
                .display-flex();
                flex-direction: column;
                padding: @padding-primary 0 ;
                border-bottom: 1px solid #ddd;
                >p {
                    color: #666;
                    &:first-child{
                        .display-flex();
                        justify-content: space-between;
                    }
                    &:last-child {
                        text-align: right;
                        margin-top: 12px;
                    }
                }
            }
        }
    }
</style>
