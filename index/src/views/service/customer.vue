<template>
  <div class="page">
    <m-header title="客服中心" :canback="Boolean(1)"></m-header>
    <div class="body">
      <!-- <img class="img" src="../../../../assets/images/gzlz/kefudianhua.png" alt> -->
      <!-- <div class="telephone">请拨打客服电话 020-95652222</div> -->
      <div class="tip">{{center.data}}</div>
    </div>
  </div>
</template>
<script>
import { Help } from '@/server/server.js'
export default {
  data () {
    return {
      center: ''
    }
  },
  mounted () {
    Help.getCenter().then( res => {
      if(res) {
        this.center = res
      }
    } )
  }
};
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
  background: @bg-color;
  text-align: center;
  .img {
    margin-top: 107px;
    width: 19.8%;
  }
  .telephone {
    color: #000;
    margin-top: 64px;
    font-size: 28px;
    color: #fff;
  }
  .tip {
    margin-top: 64px;
    color: white;
    font-size: 28px;

  }
}
</style>
