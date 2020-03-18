<template>
    <div class="page">
      <m-header :title="language.message" :canback="Boolean(true)" class="header"></m-header>
      <div class="mesList">
        <ul v-lazy-load="lazyLoad"
            :style="'height:'+(screenHeight)+'px;overflow:auto;'">
          <li @click="goTo('SystemInfo',item.id)" v-for="(item,index) in systemTitle" :key="index">
            <span>{{item.title}}</span><i class="iconfont iconright"></i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import {Index,Init} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "sysytemList",
        data() {
            return {
                systemTitle:[],
                page:1,
                language:{},
                screenHeight:null
            };
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.message;
                this.getSystemTitle();
                this.screenHeight = window.screen.availHeight;
            })
        },
        methods:{
            goTo(routerName,id) {
                this.$router.push({name:routerName,query:{id}});
            },
            getSystemTitle(){
                Index.gettitleSystem({page: this.page}).then(res => {
                    if(res.code === 1){
                        console.log(res);
                        if(this.page >= res.totalpage){
                            this.noMore = true;
                        }
                        this.systemTitle = this.systemTitle.concat(res.data);
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    this.getSystemTitle();
                }
            }
        }
    }
</script>

<style scoped lang="less">
  .page{
    background-color: #fff;

    .mesList {
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 0;
          margin: 0 30px;
          border-bottom: 1px solid #f6f6f6;
        }
      }
    }
  }

</style>
