<template>
  <div class="page">
    <m-header title="问题列表" :canback="Boolean(1)"></m-header>
    <div class="body">
      <ul>
        <li
          class="list"
          v-for="item in list"
          :key="item.id"
          @click="goTo('QuestionDetails', item.id)"
        >
          <span>{{item.title}}</span>
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
      list: null
    };
  },
  mounted() {
    let id = this.$route.params.id;
    let category_id = id ? id : localStorage.getItem("category_id");
    localStorage.setItem("category_id", category_id);
    this.getAllList({ category_id }, data => {
      this.list = data;
    });
  },
  methods: {
    getAllList(params, callback) {
      Help.getAllList(params).then(res => {
        if (res.code == 1) {
          callback(res.data);
        } else {
          mui.toast(res.msg);
        }
      });
    },
    goTo(routerName, id ) {
        this.$router.push({name:routerName, params:{ id:id }})
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @base-white;
  font-size: 32px;
  .list {
    .display-flex();
    justify-content: space-between;
    padding: 30px;
    background: #252436;
    border-bottom: 1px solid #f5f5f5;
    color: @bg-color-white;
  }
}
</style>
