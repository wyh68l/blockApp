<template>
    <div class="page">
      <m-header :title="language.agreement" :canback="Boolean(true)" class="header"></m-header>
      <div class="content">
        <textarea v-html="LeaseTreaty" readonly></textarea>
      </div>
    </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "rentAgreement",
        data() {
            return {
                LeaseTreaty:'',
                language:{},
            }
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.lease;
                this.getLeaseTreaty();
            })
        },
        methods: {
            getLeaseTreaty() {
                Trade.getLeaseTreaty().then(res => {
                    if (res.code === 1) {
                      //console.log(res.data);
                      this.LeaseTreaty = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
.page{
  .content{
    width: 690px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.26);
    border-radius:26px;
    margin-top: 40px;
    textarea{
      min-height: 800px;
      overflow: scroll;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
  }
}

</style>
