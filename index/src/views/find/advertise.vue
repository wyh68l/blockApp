<template>
    <div class="page">
      <m-header :title="type ==='mine'?language.my_article:contentList.app_name" :canback="Boolean(true)" class="header"></m-header>

      <div class="wechat" v-if="type !== 'mine'">
        <img src="~assets/images/bjwz/sign.png" alt="">
        <p>{{language.scan}}</p>
      </div>
      <div class="content">
        <h3>{{contentList.circle_title}}</h3>
        <h4>
          <span v-if="contentList.username !== undefined">{{contentList.username}}</span>
          {{formatDate(contentList.createtime?contentList.createtime:contentList.addtime)}}
        </h4>
        <p v-html="content"></p>
      </div>
    </div>
</template>

<script>
    import {Trade, Owner} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {mapGetters} from 'vuex';
    export default {
        name: "advertise",
        data(){
            return {
                contentList:[],
                options:null,
                content:null,
                type:true,
                language:{},
            }
        },
        created() {
            this.language = this.lang.article;
            this.options = JSON.parse(this.$route.query.options);
            this.type = this.$route.query.type;
            this.getData();
        },
        computed:{
            ...mapGetters(['api','lang'])
        },
        methods:{
            getData() {
                Trade.getData(this.options).then(res => {
                    if (res.code === 1) {
                        this.contentList = res.data;
                        this.content = this.contentList.circle_content?this.contentList.circle_content:this.contentList.content;
                        this.setContent(this.content);
                        console.log(this.contentList);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            setContent(content){//处理图片
                let temp = content.split('src="');
                let tempStr = '';
                temp.forEach(item => {
                    if(item.indexOf('/uploads') !== -1){
                        item = 'src="' + this.api + item
                    }
                    tempStr+=item;
                })
                this.content = tempStr;
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  .page{
    overflow: auto;

    .header /deep/ header {
      position: fixed;
    }

    .wechat{
      margin: 80px auto;
      img{
        width: 240px;
        height: 240px;
        margin: 0 auto;
        margin-bottom: 30px;
      }
      p{
        text-align: center;
        font-size:30px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:42px;
      }
    }

     .content {
      width: 690px;
      margin: 0 auto;
      background-color: #fff;
      padding: 40px 40px;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.26);
      border-radius: 26px;
      margin-top: 40px;

      /deep/ img{
        max-width: 100%;
      }

      /deep/ p {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(119, 119, 119, 1);
        line-height: 38px;
      }

      h3 {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 42px;
      }

      h4 {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 34px;
        margin: 20px 0;
      }
      span{
        margin-right: 30px;
      }
    }
  }

</style>
