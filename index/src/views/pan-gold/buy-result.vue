<template>
  <div class="page">
    <m-header title="抢购结果" :canback="Boolean(1)" :setback="true" @back="back"></m-header>
    <div class="body">
      <img class="img" :src="type=='success'?successSrc:failSrc">
      <!-- 恭喜你，抢购成功！  -->
      <!-- <div v-if=" type=='success' " class="tips">您抢购的意向已记录，5分钟后会出结果，请留意</div> -->
      <div v-if=" type=='success' " class="tips">挖矿成功</div>
      <div v-else>很遗憾，抢购失败~</div>
      <div v-if=" type=='success' "  class="pay-btn" @click="goTo('Mine')">查看记录</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: null,
      successSrc:require('../../assets/images/gzlz/qianggouchenggong.png'),
      failSrc:require('../../assets/images/gzlz/qianggoushibai.png')
    };
  },
  mounted() {
    // this.type = this.$route.params.type == "success" ? true : false;
    this.initData();
  },
  methods: {
    initData(){
      this.type = this.$route.query.type;
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
    back(){
      this.$router.go(-2);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  .display-flex();
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: @bg-color;
  color: #fff;
  font-size: 25px;
  .img {
    width: 50%;
    border-radius: 50%;
  }
  .tips {
    margin-top: 40px;
    font-size: 30px;
  }
  .pay-btn {
    margin-top: 60px;
    width: 50%;
    padding: 20px;
    text-align: center;
    color: @bg-color-white;
    font-size: 32px;
    background: linear-gradient(
      90deg,
      rgba(245, 190, 40, 1) 0%,
      rgba(255, 132, 42, 1) 100%
    );
    border-radius: 8px;
  }
}
</style>
