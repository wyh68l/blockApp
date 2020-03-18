<template>
  <div class="page">
    <m-header :title="language.upload_article" class="header" :canback="Boolean(true)"></m-header>
    <div class="content">
      <label>
        {{language.title}}：<input type="text" v-model="formData.circle_title">
      </label>
      <label>
        {{language.title_en}}：<input type="text" v-model="formData.circle_title_en">
      </label>
      <label>
        {{language.title_tw}}：<input type="text" v-model="formData.circle_title_tw">
      </label>
      <textarea :placeholder="language.enter_content" v-model="formData.circle_content"></textarea>
      <textarea :placeholder="language.enter_content_en" v-model="formData.circle_content_en"></textarea>
      <textarea :placeholder="language.enter_content_tw" v-model="formData.circle_content_tw"></textarea>
      <div>
        <span class="tip">{{language.read}}：<input type="number" v-model="formData.real_candy"></span>
      </div>
    </div>
    <div class="submit">
      <button class="upload" @click="upload">{{language.upload}}</button>
    </div>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {mapGetters} from 'vuex';
    export default {
        name: "upload",
        data() {
            return {
                formData:{
                    circle_title:null,
                    circle_content:null,
                    circle_title_en:null,
                    circle_content_en:null,
                    circle_title_tw:null,
                    circle_content_tw:null,
                    real_candy:null
                },
                language:{},
            }
        },
        computed:{
            ...mapGetters(['lang'])
        },
        created(){
            this.language = this.lang.article;
        },
        methods: {
            upload() {
                Trade.applyCircle(this.formData).then(res => {
                    let _This = this;
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        setTimeout(() => {
                            _This.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
  .page {
    overflow: auto;

    .header /deep/ header {
      position: fixed;
    }

    .content {
      width: 94%;
      margin: 0 auto;
      padding: 50px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;
      margin-top: 40px;

      label {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(2, 2, 2, 1);
        line-height: 42px;

        input {
          border: none;
          border-bottom: 1px solid #E4E4E4;
        }
      }

      textarea {
        width: 100%;
        height: 500px;
        background: rgba(248, 248, 248, 1);
        border-radius: 10px;
        padding: 20px;
        border: 2px solid rgba(227, 227, 227, 1);
        margin-bottom: 50px;
      }
    }

    .tip {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;

      input {
        width: 210px;
        height: 52px;
        border: none;
        background: rgba(248, 248, 248, 1);
        border-radius: 4px;
        text-align: center;
      }
    }

    .submit {
      text-align: center;
      margin-top: 80px;
      margin-bottom: 50px;

      button {
        width: 590px;
        height: 90px;
        border-radius: 16px;
        line-height: 90px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        background-color: #3385FF;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

</style>
