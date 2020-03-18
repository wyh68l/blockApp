<template>
    <div class="page">
        <m-header title="问题反馈" :canback="Boolean(1)"></m-header>
        <section class="body">
            <textarea class="textarea" v-model="content" maxlength="240" placeholder="请输入不少于10个字的描述"></textarea>
            <p class="num">0/240</p>
            <p class="tip">可以输入的字符包含：<br>
                中文、英文、数字、符号（...,!?@）
            </p>
            <button class="btn btn-gradient-blue">提交反馈</button>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Init} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters}  from 'vuex';
export default {
    name:'set',
    data(){
        return {
            content:null
        }
    },
    // mounted(){
    //     setTimeout(() => {
    //         Load.loadStart(this);
    //     }, 500);
    // },
    computed:{
        ...mapGetters(['userInfo'])
    },
    methods:{
    }
    
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: #f5f5f5;
        color: #333;
        font-size: 0;
        line-height: normal;
        .textarea {
            background-color: @base-white;
            height: 120PX;
            text-indent: 16px;
            font-size: 28px;
            padding: 20px;

        }
        .num {
            text-align: right;
            color: #999;
            background-color: white;
            padding: 24px;
        }
        .tip {
            color: #999;
            padding: @padding-primary;
        }
        .btn {
            width: 90%;
            height: 88px;
            line-height: 88px;
            margin-left: 5%;
        }
    }
</style>

