<template>
    <div class="page">
        <m-header title="银行卡信息" :canback="true"></m-header>
        <section class="body">
            <ul class="card-info">
                <li class="info-item">
                    <span class="bank-name">{{bankInfo.ubank?bankInfo.ubank:'-'}}</span>
                    <span>{{bankInfo.ubankact?bankInfo.ubankact:'-'}}</span>
                </li>
                <li class="info-item">
                    <span class="name">{{bankInfo.ubankname?bankInfo.ubankname:'-'}}</span>
                </li>
                <li class="info-item">
                    <span class="name">{{bankInfo.ubankuname?bankInfo.ubankuname:'-'}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {Owner,Init} from '@/server/server.js';
import navItem from '@/components/order-nav-item.vue';
import {Util,Load} from '@/assets/commonjs/utils.js';

export default {
    
    name:'Buy',
    data(){
        return {
            detail:null,
            bankInfo:{
                ubank:null,
                ubankact:null,
                ubankname:null,
                ubankuname:null
            }
        }
    },
    mounted () {
        this.initData();
    },
    computed:{
        ...mapGetters(['uid','userInfo','temp'])
    },
    methods:{
        initData(){
            this.detail = this.temp;
            this.bankInfo = Object.assign({},this.bankInfo,{
                ubank:this.detail.ubank,
                ubankact:this.detail.ubankact,
                ubankname:this.detail.ubankname,
                ubankuname:this.detail.ubankuname
            })
        },
        
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        padding: @padding-primary;
        .card-info {
            border-radius: 10px;
            background-color: #0053B3;
            color: white;
            padding: @padding-primary;
            .info-item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                .bank-name {
                    font-size: 34px;
                }
                .name {
                    font-size: 28px;
                }
            }
        }
    }

</style>
