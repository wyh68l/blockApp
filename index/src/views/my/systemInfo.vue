<template>
    <div class="page">
      <m-header :title="language.withdraw" :canback="Boolean(true)" class="header"></m-header>

      <div class="content" v-for="(item,index) in systemInfo?systemInfo:[]" :key="index">
        <h3>{{item.title}}</h3>
        <div v-html="item.contents" class="msg"></div>
        <p>{{formatDate(item.createtime)}}</p>
      </div>
    </div>
</template>

<script>
    import {Index} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "systemInfo",
        data() {
            return {
                systemInfo:[],
                language:{},
                id:null
            };
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.message;
                this.getSystemInfo();
            })
        },
        methods:{
            getSystemInfo(){
                this.id = this.$route.query.id;
                Index.getDetailsSystem({id:this.id}).then(res => {
                    console.log(res);
                    if(res.code === 1){
                        this.systemInfo = res.data
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  .page{
    >.content{
      width: 690px;
      margin: 0 auto;
      background-color: #fff;
      padding: 40px 40px;
      box-shadow:0px 4px 12px 0px rgba(0,0,0,0.26);
      border-radius:26px;
      margin-top: 40px;

      p{
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(119,119,119,1);
        line-height:38px;
      }
      h3{
        font-size:30px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:42px;
      }
      h4{
        font-size:24px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:34px;
        margin: 20px 0;
      }
      .msg{
        /deep/ p{
          color: #333333;
        }
      }
    }
  }


</style>
