<template>
    <div class="page">
        <m-header title="预约记录" :canback="Boolean(1)"></m-header>
        <section class="body" :style="'height:'+(screenHeight-100)+'px;overflow:auto;'" v-lazy-load="lazyLoad">
            <s-card v-if="listData" :btntxt="Boolean(1)" :data="listData"></s-card>    
            <next ref="next" :nomore="noMore"></next>
        </section>
        <!-- <m-Footer></m-Footer> -->
    </div>
</template>
<script>
import sCard from '@/components/s-card.vue';
import {Owner} from '@/server/server.js';
import {Load} from '@/assets/commonjs/utils.js';
export default {
    name:'bestpeak',
    components:{
        sCard
    },
    data(){
        return {
            listData:[],
            screenHeight:null,
            page:1,
            noMore:false,
        }
    },
    mounted(){
        this.initData();
        this.getBooklist(this.page);
    },
    methods:{
        initData(){
            this.screenHeight = window.screen.height || window.screen.availHeight;
        },
        getBooklist(page){
            setTimeout(() => {
                Load.loadNext(this);
            }, 0);
            Owner.getBooklist({page}).then(res=>{
                if(res.code ==1){
                    // this.listData = res.data;
                    this.listData = this.listData.concat(res.data||[]);
                    console.log(this.listData )
                    if(!res.data||res.data.length<10)
                    this.noMore = true;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        lazyLoad(){
            console.log(111111)
            this.page = this.page+1;
            if(!this.noMore)
            this.getBooklist(this.page);
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        padding: @padding-primary;
        background-color: @bg-color;

    }
</style>
