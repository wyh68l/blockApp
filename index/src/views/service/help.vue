<template>
  <div class="page">
    <m-header title="帮助中心" :canback="Boolean(1)"></m-header>
    <div class="body">
      <ul>
        <li class="list" v-for="item in list" :key="item.id" @click="goTo('QuestionList', item.id)">
          <span>{{item.name}}</span>
          <i class="iconfont iconright"></i>
        </li>
        <li class="list" @click="goTo('Problem')">
          <span>其他问题</span>
          <i class="iconfont iconright"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Help } from "@/server/server.js";
export default {
  data() {
    return {
      list: ""
    };
  },
  mounted() {
    this.getCategoryList({}, data => {
      this.list = data;
    });
  },
  methods: {
    getCategoryList(params, callback) {
      Help.getCategoryList(params).then(res => {
        if (res.code == 1) {
          callback(res.data);
        } else {
          mui.toast(res.msg);
        }
      });
    },
    goTo(routerName, id) {
      this.$router.push({ name: routerName, params:{ id:id}});
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @bg-color;
  font-size: 32px;
  .list {
    .display-flex();
    justify-content: space-between;
    padding: 30px;
    background: #252436;
    border-bottom: 1px solid #171a2d;
    color: @bg-color-white;
  }
}
</style>
