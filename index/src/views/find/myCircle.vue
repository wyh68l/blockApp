<template>
  <div class="page">
    <m-header :title="language.my_article" :canback="Boolean(true)" class="header"></m-header>

    <div class="content">
      <ul class="active">
        <li v-for="(item,index) in mycircleLog" :key="index">
          <div class="itemLeft">
            <h3>{{item.circle_title}}</h3>
            <p>{{language.candy_num}}：{{item.real_candy}}</p>
            <p>{{language.application_time}}：{{formatDate(item.createtime)}}</p>
          </div>
          <div class="itemRight">
            <p class="active" v-if="item.status === 0">{{language.under_review}}</p>
            <p class="active" v-if="item.status === 1">{{language.published}}</p>
            <p class="active" v-if="item.status === 2">{{language.fail}}</p>
            <button @click="goTo('Advertise',{cid:item.id,type:'circle'},'mine')">{{lang.common.details}}</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {Trade} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {mapGetters} from 'vuex';
    export default {
        name: "myCircle",
        data(){
            return {
                mycircleLog:[],
                language:{},
            }
        },
        created(){
            this.language = this.lang.article;
            this.getMycircleLog();
        },
        computed:{
            ...mapGetters(['lang'])
        },
        methods:{
            goTo(routerName,options,type) {
                this.$router.push({name: routerName,query:{options:JSON.stringify(options),type:type}});
            },
            getMycircleLog() {
                Trade.getMycircleLog().then(res => {
                    if (res.code === 1) {
                        console.log(res);
                        this.mycircleLog = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
        }
    }
</script>

<style scoped lang="less">
  @import "~link-less";
  .header{
    box-shadow:none!important;
  }
  .header /deep/ .header{
    box-shadow:none;
  }

  .page{
    overflow: auto;

    .content{

      ul{
        display: none;

        li{
          height: 230px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          padding:0 45px;
          padding-top: 30px;
          margin-bottom: 15px;

          .itemLeft{
            h3{
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(20,33,51,1);
              line-height:44px;
              margin-bottom: 15px;
            }
            p{
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(157,166,179,1);
              line-height:36px;
              margin-bottom: 10px;
            }
          }

          .itemRight{
            p{
              text-align: center;
              font-size:32px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              line-height:44px;
            }
            .active{
              color:rgba(51,133,255,1);
            }
            .cancel{
              color: #999999;
            }
            button{
              width:142px;
              height:56px;
              background:rgba(51,133,255,1);
              border-radius:28px;
              font-size:26px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:56px;
              margin-top: 50px;
            }
          }
        }
      }
      .active{
        display: block;
      }
    }

  }

</style>
