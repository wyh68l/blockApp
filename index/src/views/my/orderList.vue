<template>
  <div class="page">
    <m-header :title="language.order_msg" :canback="Boolean(true)" class="header"></m-header>

    <div class="orderList">
      <ul v-lazy-load="lazyLoad"
          :style="'height:'+(screenHeight-50)+'px;overflow:auto;'">
        <li v-for="(item,index) in type === 'rent'?rentList:orderList" :key="index">
          <h3>{{formatDate(item.createtime)}}</h3>
          <p v-if="type === 'rent'">{{item.msg}}</p>
          <p v-else>{{item.remark}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {Util,Load} from '@/assets/commonjs/utils.js';
    import {Index} from '@/server/server.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "oderList",
        data() {
            return {
                orderList:[],
                rentList:[],
                page:1,
                noMore:false,
                language:{},
                type:null
            };
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.message;
                console.log(this.$route.query.type);
                this.type = this.$route.query.type;
                if(this.type){
                    this.getLeaseMsg();
                }else{
                    this.getCarList();
                }
                this.screenHeight = window.screen.availHeight;
            })
        },
        methods:{
            getCarList(){
                Index.getTitle({page: this.page}).then(res => {
                    if(res.code === 1){
                        if(this.page >= res.totalpage){
                            this.noMore = true;
                        }
                        this.orderList = this.orderList.concat(res.data);
                        console.log(res.data);
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            getLeaseMsg(){
                Index.getLeaseMsg({page: this.page}).then(res => {
                    if(res.code === 1){
                        if(this.page >= res.totalpage){
                            this.noMore = true;
                        }
                        this.rentList = this.rentList.concat(res.data);
                        console.log(res.data);
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time){
                return Util.formatDate(time)
            },
            lazyLoad() {
                this.page = this.page + 1;
                if (!this.noMore) {
                    this.getCarList();
                }
            }
        }
    }
</script>

<style scoped lang="less">
  .page{
    background-color: #fff;

    .orderList{
      ul{
        padding: 40px;
        li{
          margin-bottom: 50px;
          border-radius: 4px;
          h3{
            font-size:28px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(55,55,57,1);
            line-height:40px;
            margin-bottom: 24px;
          }
          p{
            font-size:32px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(67,67,67,1);
            background-color: #F9F9F9;
            line-height:44px;
            padding: 30px;
          }
        }
      }
    }
  }
</style>
