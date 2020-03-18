<template>
  <div class="page">
    <m-header title="公告信息" :canback="Boolean(1)"></m-header>
    <section class="body">
      <ul class="list">
        <li class="item" v-for="item of noticeList" :key="item.id" @click="goto(item.id)">{{item.title}}</li>
      </ul>
    </section>
  </div>
</template>
<script>
import { Owner } from "@/server/server.js";
export default {
  data() {
    return {
      noticeList: [],
      type:'mh'
    };
  },
  mounted() {
      this.initData();
      let noticeParams = {
          type: this.type,
          page: 1
      }
      this.getNotice(noticeParams)
  },
  methods: {
    initData(){
      this.type = this.$route.query.type;
    },
    //公告
    getNotice(params) {
      Owner.getTitle().then(res=>{
            if(res.code == 1){
                this.noticeList = res.data;
            }else {
              mui.toast(res.msg);
            }
        })
    },
    goto(id) {
        this.$router.push({name:'NoticeDetail',params:{id:id}})
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @base-white;
  padding: @padding-primary;
  // background-color: white;
  height: 100%;
  .list {
    .item {
      padding: 16px 0;
      border-bottom: 1px solid rgba(211,211,211,.5);
      color:#666;
    }
  }
}
</style>
