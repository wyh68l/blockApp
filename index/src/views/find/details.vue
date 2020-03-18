<template>
  <div class="page">
    <m-header :title="language.article_content" class="header" :canback="Boolean(true)">
      <button @click="cutView" class="cut" v-if="options.type === 'secretnews'">{{language.screen_capture}}</button>
    </m-header>

    <div class="content">
      <h3>{{contentList.circle_title || contentList.title}}</h3>
      <h4>
        <span v-if="contentList.username !== undefined">{{contentList.username}}</span>
        {{formatDate(contentList.createtime?contentList.createtime:contentList.addtime)}}
      </h4>
      <p v-html="content"></p>
    </div>

    <div :class="{'cutView':true,'toscale':cut}" v-show="isShow">
      <h3>{{contentList.title}}</h3>
      <h4>
        <span v-if="contentList.username !== undefined">{{contentList.username}}</span>
        {{formatDate(contentList.createtime?contentList.createtime:contentList.addtime)}}
      </h4>
      <p v-html="content"></p>
      <div class="advertise" v-if="options.type === 'secretnews'">
        <p>{{contentList.app_name}}</p>
        <img src="~assets/images/bjwz/sign.png" alt="" class="wechat">
      </div>
    </div>

<!--    <div class="advertise" v-if="options.type === 'secretnews'">-->
<!--      <p>{{contentList.app_name}}<span @click="goTo('Advertise')">查看二维码>></span></p>-->
<!--      <img src="~assets/images/bjwz/sign.png" alt="" class="wechat">-->
<!--    </div>-->
    <div class="comment">
      <ul>
        <li v-for="(item,index) in commentList" :key="index">
          <h3>{{item.username}}</h3>
          <p>{{item.comment}}</p>
          <span @click="goReply(release,item.id)" v-if="item.reply == null && release === 1">{{language.reply}}</span>
          <div class="return" v-if="item.reply !== null">
            <p>{{item.reply}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="sendComment">
      <h4>{{language.comment}}</h4>
      <textarea v-model="sendComment.content"></textarea>
      <button class="send" @click="circleComment">{{language.submit}}</button>
    </div>

    <Alert v-if="type === 'reduce'">
      <div slot="content" class="content">
        <img src="~assets/images/bjwz/tip2.png" alt="">
        <p>{{price}}</p>
      </div>
      <div slot="bottom" class="button">
        <button style="color: #3385FF;" @click="type = null">{{lang.common.determine}}</button>
      </div>
    </Alert>

    <Alert v-if="type === 'return'">
      <h3 slot="top" class="title">{{language.reply}}</h3>
      <textarea slot="input" class="input" :placeholder="language.enter_response" v-model="sendReply.content"></textarea>
      <div slot="bottom" class="button">
        <button @click="type = null">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="circleReply">{{lang.common.determine}}</button>
      </div>
    </Alert>
    <img class="myImg" v-show="myImg" :src="myImg" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:10;" alt="">
  </div>
</template>

<script>
    import Alert from "../../components/Alert";
    import {Trade, Owner,Base} from '@/server/server.js';
    import {Util,Load,HB} from '@/assets/commonjs/utils.js';
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                type: null,
                commentList: [],
                release: 0,
                content:'',
                isShow: false,
                cid: null,
                options:{},
                price:null,
                contentList:[],
                language:{},
                sendComment: {
                    cid: null,
                    content: null,
                    type:null
                },
                sendReply: {
                    id: null,
                    content: null
                },
                myImg:null,
                cut:false
            }
        },
        created() {
            this.language = this.lang.article;
            this.options = JSON.parse(this.$route.query.options);
            this.type = Number(this.$route.query.status);
            this.getData();
            this.getComment();
            this.reduce();
        },
        computed:{
            ...mapGetters(['api','lang'])
        },
        methods: {
            cutView(){
                let that = this;
                /**
                 * 页面生成图片
                 */
                setTimeout(() => { //设置样式要提前，与截屏同时会导致图片不完整。
                    this.cut = true;
                    this.isShow = true;
                }, 1000);
                setTimeout(() => {
                    Util.pageToImg(that,(base64)=>{
                        let formData = new FormData();
                        formData.append('image',base64);
                        // that.myImg = base64;
                        // return;
                        // base64上传
                        Base.upload(formData).then((res)=>{
                            if(res.code == 1){
                                // 下载图片
                                HB.baseDownload(that.api+res.data,(file)=>{
                                    // 保存到相册
                                    HB.saveToGallery(file,()=>{
                                        that.myImg = that.api+res.data;
                                        that.cut = false;
                                        that.isShow = false;
                                    })
                                })
                            }else {
                                mui.toast(res.msg);
                                return ;
                            }
                        })
                    },'.cutView')
                }, 2000);
            },
            goTo(routerName) {
                this.$router.push({name: routerName,query:{options:JSON.stringify(this.options)}});
            },
            goReply(status, id) {
                if (status === 1) {
                    this.type = 'return';
                    this.sendReply.id = id;
                } else if (status === 0) {
                    // mui.toast('不可回复评论');
                }
            },
            reduce() {
                if(this.type === 1){
                    this.type = null
                }else{
                    this.type = 'reduce'
                }
            },
            getComment() {
                Trade.getComment(this.options).then(res => {
                    if (res.code === 1) {
                        this.commentList = res.data.list;
                        this.release = res.data.release;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            getData() {
                Trade.getData(this.options).then(res => {
                    if (res.code === 1) {
                        this.contentList = res.data;
                        console.log(res.data);
                        this.content = this.contentList.circle_content?this.contentList.circle_content:this.contentList.content;
                        this.setContent(this.content);
                        this.price = this.contentList.explain;
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
            circleComment() {
                this.sendComment = Object.assign(this.sendComment,this.options);
                console.log(this.sendComment);
                Trade.circleComment(this.sendComment).then(res => {
                    if (res.code === 1) {
                        this.sendComment.content = '';
                        this.getComment(this.options);
                        mui.toast(res.msg);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            circleReply() {
                Trade.circleReply(this.sendReply).then(res => {
                    if (res.code === 1) {
                        mui.toast(res.msg);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        },
        components: {
            Alert
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";

  .page {
    overflow: auto;

    .header /deep/ header {
      position: fixed;

      .cut{
        color: #333333;
        height: 75px;
        line-height: 75px;
      }
    }
    .toscale{
      // .transform(scale(.5));
      height: auto;
      overflow: visible;
    }
    @keyframes myScale {
      0% {
        .transform(scale(1))
      }
      50% {
        .transform(scale(.5))
      }
      100% {
        .transform(scale(0))
      }
    }
    .myImg {
      animation-name: myScale;
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      border: 1px solid #ddd;
    }


    > .content,>.cutView{
      width: 690px;
      margin: 0 auto;
      height: auto;
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
        text-align: center;
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

    >.cutView{
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }

    .advertise {
      height: auto;
      background-color: #fff;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;

      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 160px;
        text-align: left;
      }
      .wechat{

      }
    }

    .comment {
      padding: 40px 78px;
      background-color: #fff;
      margin-top: 30px;

      ul {
        li {
          margin-bottom: 30px;

          h3 {
            font-size: 28px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 40px;
          }

          p {
            font-size: 30px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 48px;
            margin: 20px 0;
          }

          span {
            display: block;
            text-align: center;
            width: 84px;
            height: 36px;
            background: rgba(246, 246, 246, 1);
            border-radius: 18px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 36px;
          }

          textarea {
            height: 120px;
            background: rgba(248, 248, 248, 1);
            border-radius: 10px;
            padding: 20px;
            color: #333333;
            font-size: 32px;
            margin-top: 20px;
          }

          .return {
            padding-left: 40px;

            p {
              font-size: 28px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 48px;
              margin: 20px 0;
            }
          }
        }
      }
    }

    .sendComment {
      padding: 24px;
      background-color: #fff;

      h4 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(197, 197, 197, 1);
        line-height: 44px;
        margin-bottom: 30px;
      }

      textarea {
        height: 180px;
        background: rgba(248, 248, 248, 1);
        border-radius: 10px;
        padding: 20px;
        color: #333333;
        font-size: 32px;
      }

      .send {
        float: right;
        margin-top: 40px;
        width: 142px;
        height: 56px;
        background: rgba(51, 133, 255, 1);
        border-radius: 28px;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 56px;
      }
    }

    .alert {
      .input {
        height: 260px !important;
        padding-top: 20px;
      }
    }
  }

</style>
