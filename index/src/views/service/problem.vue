<template>
  <div class="page">
    <m-header title="提交问题" :canback="Boolean(1)"></m-header>
    <div class="body">
      <form>
        <ul>
          <li class="list">
            <div class="title">联系信息*</div>
            <input type="number" class="inp" placeholder="请填写您注册时的手机号"  v-model="formData.connect">
          </li>
          <li class="list">
            <div class="title">问题*</div>
            <input type="text" class="inp" placeholder="简单扼要描述本次遇到的问题" v-model="formData.question" maxlength="25">
          </li>
          <li class="list">
            <div class="title">上传截图</div>
            <img class="img" :src="defaultSrc" alt>
            <input type="file" class="file inp" @change="change($event)">
          </li>
        </ul>
      </form>
      <div class="sub" @click="feedback">提交</div>
      <m-load ref="load"></m-load>
    </div>
  </div>
</template>
<script>
import {Util,Load} from '@/assets/commonjs/utils.js';
import {Help,Base} from '@/server/server.js';
import {mapGetters} from 'vuex';
export default {
    name:'addProblem',
    data(){
      return {
        defaultSrc:require('@/assets/images/gzlz/upload.png'),
        isUploadImg:false,
        formData:{
          connect:null,
          question:null,
          img:null,
          uid:1
        }
      }
    },
    mounted(){
      let obj = {
        a:'adbc',
        b:null,
        c:'aaaa'
      }
      console.log(Util.filterData(obj))
    },
    computed:{
      ...mapGetters(['api'])
    },
    methods:{
      change(event){
        // Util.uploadByUrl(event.target.files[0]).then((url)=>{
        //   [this.isUploadImg,this.defaultSrc,this.formData.img] = [true,this.api+(url.trim()),this.api+(url.trim())]
        // });
        let _This = this;
        let formData = new FormData();
            Load.loadStart(_This);            
            // this.formData.image = event.target.files[0];
            Util.uploadImgLimit(event.target.files[0],url=>{
                formData.append('image',url);
                Base.upload(formData).then((res)=>{
                    Load.loadEnd(_This);
                    if(res.code == 1){
                      [this.isUploadImg,this.defaultSrc,this.formData.img] = [true,this.api+res.data,res.data]
                    }else {
                        mui.toast(res.msg);
                        return ;
                    }
                })
            })
      },
      addFeedback(params,callback){
        Help.addFeedback(params).then((res)=>{
          if(res.code == 1){
           callback(res)
          }else {
            mui.toast(res.msg);
            return ;
          }
        })
      },
      feedback(){
        this.addFeedback(this.formData,(res)=>{
            mui.toast(res.msg);
            setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        })
      }
    }
};
</script>
<style lang="less" scoped>
@import "~link-less";

.body {
  padding: 0 30px;
  background: @bg-color;
  color: #dbd9ec;
  font-size: 32px;
  .list {
    position: relative;
    margin-top: 49px;
    .inp {
      margin-top: 29px;
      margin-bottom: 0;
      height: auto;
      background: #44425a;
    }
    .img {
      width: 37%;
      height: 174px;
      margin-top: 29px;
    }
    .file {
      position: absolute;
      left: 0;
      width: 37%;
      height: 174px;
      opacity: 0;
    }
  }
  .sub {
    margin-top: 166px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(245, 190, 40, 1) 0%,
      rgba(255, 132, 42, 1) 100%
    );
    border-radius: 8px;
  }
}
</style>
