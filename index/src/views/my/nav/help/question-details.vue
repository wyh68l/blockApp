<template>
  <div class="page">
    <m-header title="问题详情" :canback="Boolean(1)"></m-header>
    <div class="body">
      <div class="title">{{ details ? details.title : ''}}</div>
      <div class="detail" v-html="details ? details.contents : ''"></div>
    </div>
  </div>
</template>
<script>
import { Help } from "@/server/server.js";
export default {
  data() {
    return {
      details: null
    };
  },
  mounted() {
    let questionId = this.$route.params.id;
    let id = questionId ? questionId : localStorage.getItem("questionId")
    localStorage.setItem("questionId", id)
    this.getDetail({ id }, data => {
      this.details = data.data;
      
    });
  },
  methods: {
    getDetail(params, callback) {
      Help.getDetail(params).then(res => {
        if (res.code == 1) {
          callback(res.data);
        } else {
          mui.toast(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '~link-less';
.page {
    background: @bg-color;
    // color: @bg-color-white;
    .body {
        padding: 30px;
        word-wrap: break-word;
        background-color: white;
    }
}
</style>
