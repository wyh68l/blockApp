<template>
  <div class="page">
    <m-header title="矿机租赁" :canback="Boolean(true)"></m-header>
    <div class="myCar">
      <h3>我的矿机>></h3>
    </div>

    <div class="topNav">
      <ul>
        <li class="active">矿机类型1</li>
        <li>矿机类型1</li>
        <li>矿机类型1</li>
        <li>矿机类型1</li>
      </ul>
    </div>

    <div class="content">
      <ul class="active">
        <li>
          <div class="icon">
            <img src="~assets/images/bjwz/bg1.png" alt="">
          </div>
          <div class="itemLeft">
            <h3>矿机A矿机A</h3>
            <p>XKB：100~490</p>
            <p>套餐周期：7天</p>
            <p>日收益：1.10%</p>
          </div>
          <div class="itemRight">
            <button>租赁</button>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="~assets/images/bjwz/bg1.png" alt="">
          </div>
          <div class="itemLeft">
            <h3>矿机A矿机A</h3>
            <p>XKB：100~490</p>
            <p>套餐周期：7天</p>
            <p>日收益：1.10%</p>
          </div>
          <div class="itemRight">
            <button>租赁</button>
          </div>
        </li>
        <li>
          <div class="icon">
            <img src="~assets/images/bjwz/bg1.png" alt="">
          </div>
          <div class="itemLeft">
            <h3>矿机A矿机A</h3>
            <p>XKB：100~490</p>
            <p>套餐周期：7天</p>
            <p>日收益：1.10%</p>
          </div>
          <div class="itemRight">
            <button>租赁</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
    import {Trade} from '@/server/server.js';
    import {Load, Util} from '@/assets/commonjs/utils.js';
    import {mapGetters} from 'vuex';
    import navItem from '@/components/order-nav-item.vue';

    export default {
        components: {
            navItem
        },
        data() {
            return {};
        },
        mounted() {

        },
        computed: {
            ...mapGetters(['language', 'screenH'])
        },
        methods:{
            goTo(routerName) {
                this.$router.push({name:routerName});
            }
        }
    };
</script>
<style lang="less" scoped>
  @import "~link-less";
  .page {
    overflow: auto;

    .myCar{
      background-color: #fff;
      height: 384px;
      margin-bottom: 20px;
      padding: 42px 0;

      h3{
        background: url("~assets/images/bjwz/bg1.png") no-repeat;
        background-size: contain;
        width: 686px;
        height: 300px;
        margin: 0 auto;
        font-size:34px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-top: 126px;
        padding-left: 388px;
      }
    }

    .topNav{
      height: 88px;
      background-color: #fff;
      color: white;
      border-bottom: 1px solid #f6f6f6;

      ul{
        .display-flex;
        justify-content: space-around;
        li{
          font-size:28px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(20,33,51,1);
          line-height:88px;
          text-align: center;
        }
        .active{
          color: #3385FF;
          &:after{
            content: '';
            display: block;
            height: 4px;
            background-color: #3385FF;
          }
        }
      }
    }

    .content{

      ul{
        display: none;

        li{
          height: 260px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          padding:0 45px;
          padding-top: 30px;
          margin-bottom: 15px;

          .icon{
            img{
              width: 200px;
              height: 200px;
              border-radius:16px;
            }
          }

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
              margin-bottom: 15px;
            }
          }

          .itemRight{
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
              margin-top: 120px;
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
