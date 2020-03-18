<template>
  <div class="page">
    <m-header title="公告详情" :canback="Boolean(1)"></m-header>
    <section class="body">
      <div v-for="item of list" :key="item.id">
        <div class="wrap">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.createtime}}</div>
        </div>
        <div class="new-con" v-html="item.contents"></div>
      </div>
    </section>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
export default {
  data() {
    return {
      id:null,
      list: []
    };
  },
  mounted() {
    this.initData();
    let id = this.id;
    this.getNoticeDetail(id);
  },
  methods: {
    initData(){
      this.id = this.$route.params.id;
    },
    getNoticeDetail(id) {
      Owner.getNoticeDetail({id}).then(res => {
        if (res.code == 1) {
          this.list = res.data;
        } else {
          mui.toast(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  height: 100%;
  background:@bg-color;
  .wrap {
    margin: 30px 30px 0;
    color: white;
    .title{
      font-size: 39px;
      text-align: center;
    }
    .date {
      color: #999;
    }
  }
  .new-con {
    margin: 10px 30px ;
    font-size: 28px;
    color: white;
  }
}
</style>
