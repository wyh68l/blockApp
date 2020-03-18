<template>
  <div class="page">
    <m-header title="申诉" :canback="Boolean(1)"></m-header>
    <div class="body">
      <form>
        <ul>
          <li class="list">
            <input class="inp" type="text" placeholder="订单编号" v-model="formData.ordersn" readonly>
          </li>
          <li class="list">
            <div class="title">ID/手机号</div>
            <input class="inp" type="text" placeholder="ID/手机号" :value="userInfo?userInfo.mobile:'-'" readonly>
          </li>
          <!-- <li class="list">
            <div class="title">金额</div>
            <input class="inp" type="text" placeholder="金额">
          </li> -->
          <li class="list">
            <div class="title">申诉理由</div>
            <textarea class="area" placeholder="申诉理由" v-model="formData.des"></textarea>
          </li>
          <li class="list upload-pictures">
            <div class="title">上传图片</div>
            <div class="img-wrap">
              <img class="img" :src="upladSrc" alt>
            </div>
            <input class="file" type="file" @change="change($event)">
          </li>
        </ul>
      </form>
      <div class="sub" @click="setAppeal">确认提交</div>
    </div>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Owner,Base} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            formData:{
              ordersn:null,
              des:null,
              image:null,
              type:null,
            },
            upladSrc:require('@/assets/images/gzlz/upload.png'),
        }
    },
    mounted(){
      this.initData();
    },
    computed:{
        ...mapGetters(['temp','api','userInfo'])
    },
    methods:{
      initData(){
          this.formData.ordersn = this.temp.ordersn;
          this.formData.type = this.$route.query.type;
          this.$store.commit('saveTemp',null);
      },
      change(event){
          // let _This = this;
          // this.formData.image = event.target.files[0];
          // Util.uploadImg(this,event.target.files[0],res=>{
          //     this.upladSrc = res;
          // })
        //  Util.uploadByUrl(event.target.files[0]).then(url=>{
        //       _This.formData.image = url;
        //       this.upladSrc = this.api+url;
        //   })
          let _This = this;
          let formData = new FormData();
          Load.loadStart(_This);            
          // this.formData.image = event.target.files[0];
          Util.uploadImgLimit(event.target.files[0],url=>{
              formData.append('image',url);
              Base.upload(formData).then((res)=>{
                  Load.loadEnd(_This);
                  if(res.code == 1){
                      this.upladSrc = this.api+res.data;
                      this.formData.image = res.data;
                  }else {
                      mui.toast(res.msg);
                      return ;
                  }
              })
          })
      },
      setAppeal(){
        let formData = new FormData();
        formData.append('ordersn',this.formData.ordersn);
        formData.append('des',this.formData.des);
        formData.append('image',this.formData.image);
        formData.append('type',this.formData.type);
// console.log(this.formData);
// return ;
        Load.loadStart(this);
        Owner.setAppeal(formData).then(res=>{
            if(res.code == 1){
                setTimeout(() => {
                    Load.loadEnd(this);
                    mui.toast(res.msg);
                    this.$router.go(-2);
                }, 1000);
            }else {
                mui.toast(res.msg);
                Load.loadEnd(this);
                return ;
            }
        })
      }
    }
}
</script>
<style lang="less" scoped>
@import "~link-less";
.page {
  background-color: @bg-color;
  color: @bg-color-white;
  .body {
    padding: 40px 30px;
    input[type="text"] {
      margin-bottom: 0;
    }
    .list {
      padding-bottom: 30px;
    }
    .upload-pictures {
      position: relative;
    }

    .inp {
      height: auto;
      background: rgba(68, 66, 90, 1);
      border-radius: 8px;
    }
    .title {
      padding-bottom: 20px;
      color: #dbd9ec;
    }
    .area {
      height: 200px;
      padding: 30px;
      border: 1px solid rgba(68, 66, 90, 1);
    }
    .file {
      width: 100%;
      height: 200px;
      opacity: 0;
    }
    .img-wrap {
      width: 100%;
      height: 200px;
      position: absolute;
      // background: #ccc;
      border-radius: 8px;
      .img {
        // width: 100%;
        height: 100%;
      }
    }
    .sub {
      margin-top: 40px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: rgba(68, 66, 90, 1);
      border-radius: 8px;
    }
  }
}
</style>
