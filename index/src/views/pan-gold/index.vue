<template>
  <div class="page">
    <m-header title="理财" :canback="Boolean(false)"></m-header>
    <div class="body">
      <div class="notice" @click="notice()">
        <img src="../../assets/images/hbtz/sy_icon_gonggao.png" alt class="notice-img" />
        <!-- <span>公告</span> -->
        <ul
          class="notice-list"
          :style="'-webkit-transform:translateY('+move+');transition:all '+moveTime+'s;'"
        >
          <li class="notice-item" v-for="(item,index) in noticeList" :key="index">{{item.title}}</li>
        </ul>
        <img src="../../assets/images/hbtz/gongao_more.png" alt class="notice-img2" />
      </div>
      <swiper :options="swiperOption" class="swiper-wrap" ref="mySwiper" v-if="banner.length!=0">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img :src="item.src" class="title-img" />
        </swiper-slide>
        <!-- 常见的小圆点 -->
        <div
          class="swiper-pagination"
          v-for="(item,index) in banner"
          :key="index"
          slot="pagination"
        ></div>
      </swiper>
      <ul class="list_wrap">
        <li class="list">
          <div>
            <img src="../../assets/images/hbtz/Shape.png" alt class="list_img" />
            <span style="font-size:17px">TBE理财计划</span>
          </div>
          <ul class="term">
            <li class="term_list">
              <div class="term_num">0.07%</div>
              <div class="term_text">预期年回报率</div>
            </li>
            <li class="term_list">
              <div class="term_num">30天</div>
              <div class="term_text">产品期限</div>
            </li>
          </ul>
          <div class="list_bot">
            <span>10.00 TBE 起购 | 低风险</span>
            <span class="buy">立即抢购</span>
          </div>
        </li>
      </ul>
    </div>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
import {Index} from "../../server/server.js"
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css"); //引入swiper.css
export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false
        },
        // 分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      },
      banner: [
        {
          src: require("../../assets/images/hbtz/bg_2.png")
        },
        {
          src: require("../../assets/images/hbtz/bg_2.png")
        }
      ],
      noticeList: [
        {
          title: "qqqqqqqq"
        },
        {
          title: "wwwwww"
        },
        {
          title: "eeeee"
        }
      ],
      move: 0,
      moveTime: 3
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    // this.noticeMove();
    this.getNotice();
  },
  methods: {
    notice() {
      this.$router.push({ name: "Notice" });
    },
    //公告
    getNotice() {
      Index.getTitle({ type: "mh", page: 1}).then(res => {
        if (res.code == 1) {
          this.noticeList = res.data
        } else {
          mui.toast(res.msg);
        }
      });
    },
    noticeMove() {
      let [i, _This] = [1, this];
      setInterval(() => {
        (() => {
          if (i < _This.noticeList.length) {
            _This.moveTime = 3;
            _This.move = "-" + 33.6 * i + "px";
            i++;
          } else {
            i = 1;
            _This.moveTime = 0;
            _This.move = 0;
          }
        })();
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  // padding: @margin-primary;
  background-color: #f5f5f5;
  .notice {
    position: relative;
    display: flex;
    // align-items: center;
    height: 68px;
    padding: 0 25px;
    box-sizing: border-box;
    line-height: 68px;
    color: @btn-primary-color;
    font-size: 32px;
    background: rgba(7, 152, 232, 0.1);
    padding-left: @padding-primary;
    overflow: hidden;
    .notice-img {
      margin-top: 18px;

      width: 30px;
      height: 32px;
    }
    .notice-list {
      // margin-top: 68px;
      // position: absolute;
      flex: 1;
      margin-left: 10px;
      background: transparent;
      // left: 120px;
      // top: 0;
    }
    .notice-item {
      color: #9795d0;
      background: transparent;
      font-size: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .notice-img2 {
      margin-top: 30px;
      width: 35px;
      height: 8px;
    }
  }
  .title-img {
    width: 100%;
  }
  .list_wrap {
    padding: 30px;
    .list {
      margin-top: 20px;
      padding: 30px;
      background: #fff;
      border-radius: 10px;
      &:first-child {
        margin-top: 0;
      }
      .list_img {
        width: 27px;
        height: 32px;
      }
      .term {
        margin-top: 20px;
        .display-flex();
        justify-content: space-between;
        .term_list {
          flex: 1;
          text-align: center;
        }
        .term_num {
          color: #0891fe;
          font-size: 48px;
        }
        .term_text {
          color: #999;
          font-size: 24px;
        }
      }
      .list_bot {
        margin-top: 20px;
        .display-flex();
        justify-content: space-between;
        align-items: center;
        .buy {
          padding: 12px 61px;
          background: rgba(8, 145, 254, 1);
          border-radius: 10px;
          color: #fff;
        }
      }
    }
  }
}
</style>