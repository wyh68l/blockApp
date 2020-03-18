<template>
  <div class="page">
    <m-header :title="setLanTxt(['首页',allTxt && allTxt['cft']])" :canback="Boolean(false)"></m-header>
    <div class="body" :style="'height:'+(screenH-100)+'px;overflow:auto;'" >
      <img class="banner" src="../../assets/images/gzlz/banner.png" alt>
      <ul class="user-info">
        <li class="info-item">会员姓名：<span class="user-name">{{this.userInfo.username||'请登录'}}</span></li>
        <li class="info-item">会员等级：<span class="user-level">{{this.userInfo.levelname||'请登录'}}</span></li>
      </ul>
      <ul class="my-coin">
        <li class="coin-item gradient-origin">
          <img class="coin-icon" src="../../assets/images/hbtz/licai-a.png" alt="">
          <div class="coin-info">
            <span class="coin-name">{{jcbName}}</span><br>{{jcbValue||'0.00000'}}
          </div>
        </li>
        <li class="coin-item gradient-origin">
          <img class="coin-icon" src="../../assets/images/hbtz/licai-a.png" alt="">
          <div class="coin-info">
            <span class="coin-name">{{itbName}}</span><br>{{itbValue||'0.00000'}}
          </div>
        </li>
      </ul>
      <div id="main" style="width: 90%;margin:auto;height:50%;"></div>
      <p class="coin-tip"><span>今日{{itbName}}币值</span><span class="num">{{itb_jg||'0'}}元</span></p>
    </div>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
import { Index,Owner,Assets,Init } from "@/server/server.js";
import {Load,Util} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
import {IndexTxt} from '@/assets/commonjs/lan.js';
const echarts = require("echarts");
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
      banner: [],
      noticeList: [
        {
          title: "暂无"
        },
      ],
      move: 0,
      moveTime: 3,
      interestList:[],
      page:1,
      noMore:false,
      allTxt:null,
      option:{},
      myChart: null,
      dates: [],
      allTxt:null,
      userInfo:{},
      itbName:null,
      jcbName:null,
      itb_jg:null,
      itbValue:null,
      jcbValue:null,
    };
  },
  mounted() {
    this.initData();
    this.getItb();
    this.initEchart();
    this.getData();
    // this.noticeMove();
    // this.getLunbo();
    // this.getNotice();
    // this.getInterestList();
  },
  computed:{
      ...mapGetters(['api','screenH','language'])
  },
  methods: {
    async getItb(){
      let [dataArr,xArr] = [[],[]];
      await Index.getItb({days:20}).then(res=>{
        if(res.code == 1){
          for(let item of res.data.reverse()){
            dataArr.push(item.price);
            xArr.push(new Date(item.createtime*1000).toLocaleDateString())
          }
          this.initEchart(dataArr,xArr)
        }
      })
    },
    initEchart(dataArr,xArr){
      this.option = {
        grid:{
          left:'10%',
          top:'4%',
          // bottom:'8%',
        },
        xAxis: {
            type: 'category',
            data:xArr,
            axisLine:{
              show:true
            }
        },
        yAxis: {
            type: 'value',
            axisLine:{
              show:true
            }
        },
        series: [{
            data: dataArr,
            type: 'line',
            smooth: false
        }]
    };
      this.myChart = echarts.init(document.getElementById("main"));
      this.myChart.setOption(this.option);
    },
      getData(){
        Init.getUser().then(res=>{
          this.userInfo = res.data[0]
        })
        Assets.getBalance().then(res=>{
          this.itbName = res.data.itb_name;
          this.jcbName = res.data.jcb_name;
          this.itb_jg = res.data.itb_jg;
        })
        Assets.getValue().then(res=>{
          this.itbValue = res.data.credit3;
          this.jcbValue = res.data.credit1;
        })
      },
      initData(){
        // Load.loadNext(this);
        this.allTxt = Object.assign({},IndexTxt)
      },
      setLanTxt(strArr){
          return Util.setLanTxt(strArr)
      },
    detail(id) {
        this.$router.push({name:'NoticeDetail',params:{id}})
    },
    toNotice(){
        this.$router.push({name:'Notice'})
    },
    purchase(id){
      this.$router.push({name:'Purchase',params:{id}})
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
    },
    getNotice(){
        Owner.getTitle().then(res=>{
            if(res.code ==1){
                this.noticeList = res.data;
            }
        })
    },
    // lazyLoad(){
    //     this.page = this.page+1;
    //     if(!this.noMore)
    //     this.getInterestList();
    // },
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  // padding: @margin-primary;
  position: relative;
  background-color: #f5f5f5;
  .swiper-wrap .title-img {
      height: 387px;
  }
  .banner {
    width: 100%;
    height: 300px;
  }
  .user-info {
    padding: 0 @padding-primary;
    .display-flex();
    justify-content: space-between;
    .info-item {
      >span {
        color: @base-origin;
      }
    }
  }
  .my-coin {
      .display-flex();
      justify-content: space-between;
      color: white;
      padding: 0 @padding-primary;
      margin: @margin-primary 0;
      .coin-item {
          font-size: 28px;
          height: 120px;
          flex:  0 0 48%;
          border-radius: 10px;
          padding:0 @padding-primary;
          .display-flex();
        //  .gradient-origin();
            align-items: center;
          .coin-icon {
              flex: 0 0 44px;
              height: 44px;
              margin-right: 16px;
          }
          .coin-name {
              font-size: 34px;
          }
      }
  }
  .coin-tip{
      .display-flex();
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      justify-content: space-between;
      background-color: rgba(234,65,1,0.2);
      height: 68px;
      align-items: center;
      padding: 0 @padding-primary;
      color: #333333;
      font-size: 28px;
      .num {
          color: @base-origin;
      }
  }
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