<template>
  <div class="page">
    <m-header :title="setTitle(type)" :canback="Boolean(1)">
      <i @click="goTo('TurnOut',type)">{{type=='credit1'?'转出':'出售'}}</i>
      <!-- <i @click="goTo('TurnOut',type)">{{type=='credit1'?'转出':''}}</i> -->
    </m-header>
    <div class="body">
      <div class="content">
        <!-- <div v-if="type== 'credit1'" class="mining-machine">当前</div>
        <div v-else class="mining-machine"> -->
        <div  class="mining-machine" >当前</div>
        <div  class="num">{{data?data.money:'0'}}</div>
        <!-- <div v-if="type== 'credit1'" class="num">{{data?data.money:'0'}}</div> -->
        <div v-if="type== 'credit1'" class="recharge" @click="goTo('Recharge',type)">充值</div>

        <div v-if="type== 'credit3'" class="mining-machine">
          <div class="profit">
            <div>
              <div>推荐收益</div>
              <div class="num">{{data?data.tjsy:'0.00'}}</div>
            </div>
            <div>
              <div>团队收益</div>
              <div class="num">{{data?data.tdsj:'0.00'}}</div>
            </div>
          </div>
        </div>

      </div>
      <ul v-if="data&&data.data&&data.data.length>0">
        <li class="list" v-for="(item,index) in data.data" :key="index">
          <div class="mine-grab">
            <span>{{item.remark}}</span>
            <span :class="{'list-num1':Number(item.num)<0, 'list-num2':Number(item.num)>0 }">{{item.num}}</span>
          </div>
          <div>{{item.time}}</div>
        </li>
      </ul>
      <p v-else class="no-msg">没有更多了呢~</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Owner } from "@/server/server.js";
export default {
  data() {
    return {
      type: null,
      data: null
    };
  },
  mounted() {
    this.initData();
    this.getCoin(this.type);
  },
  computed: {
    ...mapGetters(["uid"])
  },
  methods: {
    initData() {
      this.type = this.$route.query.type;
    },
    goTo(route, type) {
      this.$router.push({ name: route, query: { type } });
    },
    setTitle(type) {
      switch (type) {
        case "credit3":
          return "推广收益";
          break;
        case "credit1":
          return "矿机";
          break;
      }
    },
    getCoin(type) {
      let params = {
        id: this.uid,
        type
      };
      Owner.getCoin(params).then(res => {
        // if (res.code == 1) {
          this.data = res.data;
          // mui.toast(res.msg);
        // } else {
        //   mui.toast(res.msg);
        //   return;
        // }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.page {
  background: @bg-color;

  .body {
    margin-top: 10px;
    padding: 0 30px 30px;
    color: @bg-color-white;
    .content {
      //   height: 270px;
      .display-flex();
      flex-direction: column;
      justify-content: center;
      padding: 35px;
      background: #252436;
      border-radius: 8px;
      text-align: center;
      .mining-machine {
        font-size: 28px;
        // padding-bottom: 50px;
        .num {
          color: @primary-color;
          font-size: 28px;
        }
      }
      .profit {
        .display-flex();
        justify-content: space-between;
      }
      .num {
        margin-top: 15px;
        color: rgba(245, 190, 40, 1);
        font-size: 45px;
      }
      .recharge {
        width: 50%;
        height: 70px;
        margin: auto;
        margin-top: 57px;
        line-height: 70px;
        background: linear-gradient(
          -90deg,
          rgba(255, 132, 42, 1) 0%,
          rgba(245, 190, 40, 1) 100%
        );
        border-radius: 8px;
        text-align: center;
      }
    }
    .list {
      margin-top: 20px;
      padding: 20px 30px;
      background: #252436;
      border-radius: 8px;
      .mine-grab {
        .display-flex();
        justify-content: space-between;
        padding-bottom: 8px;
        .list-num1 {
          font-size: 32px;
          color: red;
        }
        .list-num2 {
          font-size: 32px;
          color: green;
        }
      }
    }
  }
}
</style>
