<template>
    <div class="page">
        <m-header title="申诉" :canback="true"></m-header>
        <section class="body">
            <textarea class="area" name="" id="" cols="30" rows="5" v-model="formData.contents" placeholder="请输入申诉内容"></textarea>
            <div class="upload-box">
                <img class="img" :src="defaultSrc" alt="">
                <input class="file" type="file" @change="upload($event)">
            </div>
            <button class="btn-confirm" @click="toAppeal">提交</button>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {Trade,Init,Base} from '@/server/server.js';
export default {
    name:'Appeal',
    data(){
        return {
            defaultSrc:require('@/assets/images/upload.png'),
            formData:{
                tradesn:null,
                contents:null,
                uid:null,
                images:null
            }
        }
    },
    created(){
        this.initData();
    },
    computed:{
        ...mapGetters(['uid','api'])
    },
    methods:{
        initData(){
            this.formData.uid = this.uid;
            this.formData.tradesn = this.$route.params.tradesn;
        },
        // 申诉
        toAppeal(){
            let _This = this;
            // let params = {
            //     uid:this.uid,
            //     tradesn:_This.formData.tradesn,
            //     contents:''
            // }
// console.log(this.formData);return ;
            _This.appeal(_This.formData);
            
        },
        appeal(params){
            Trade.appeal(params).then((res)=>{
                if(res.code == 1){
                   mui.toast(res.msg);
                   setTimeout(() => {
                       this.$router.go(-1);
                   }, 1000);
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        upload(event){
            let _This = this;
            let formData = new FormData();
            Load.loadStart(_This);            
            Util.uploadImgLimit(event.target.files[0],url=>{
                formData.append('image',url);
                Base.upload(formData).then((res)=>{
                    Load.loadEnd(_This);
                    if(res.code == 1){
                        this.formData.images = res.data;
                        this.defaultSrc = this.api+res.data;
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
        },
        // 上传请求
        getUrl(params,callback){
            Init.upload(params).then((res)=>{
                if(res.code == 1){
                    callback(res)
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
        background-color: #f5f5f5;
        .area {
            margin:@margin-primary;
            width: 90%;
            border: 1px solid #ddd;
            text-indent: 12px;
            font-size: 28px;
            border-radius: 10px;
        }
        .btn-confirm {
            .btm-btn-primary();
        }
        .upload-box {
            margin: 0 @margin-primary @margin-primary;
        }
        .img {
            height: 248px;
        }
        .file {
            position: absolute;
            height: 248px;
            left: @margin-primary;
            opacity: 0;

        }
    }
</style>

