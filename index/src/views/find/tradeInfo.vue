<template>
  <div class="page">
    <m-header :title="language.Consultation_details" :canback="Boolean(true)" class="header"></m-header>
    <div class="Info">
      <h3>{{circleInfo.title}}</h3>
      <p v-html="circleInfo.details"></p>
    </div>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'

    export default {
        name: "tradeInfo",
        data() {
            return {
                language: {},
                circleInfo:{}
            }
        },
        mixins: [languageMixin],
        created() {
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.article;
                this.getInformation();
            })
        },
        methods:{
            getInformation() {
                //console.log(JSON.parse(this.$route.query.options));
                this.circleInfo = JSON.parse(this.$route.query.options);
            },
        },
    }
</script>

<style scoped lang="less">
  .page {
    overflow: auto;
    @import "~link-less";
    background-color: #fff;

    .header /deep/ .header {
      position: fixed;
    }

    .Info{
      width: 100%;
      padding: 40px;
      text-align: center;

      h3{
        font-size:32px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#333333;
        margin-bottom: 25px;
      }

      p /deep/ p{
        text-align: left;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#666666;
      }
    }
  }
</style>
