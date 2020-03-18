<template>
  <div class="page">
    <m-header title="用户授权协议" :canback="true"></m-header>
    <section class="body">
      <div class="content" v-html="content">
        
      </div>
    </section>
    <m-load ref="load"></m-load>
  </div>
</template>
<script>
import {Init} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters} from 'vuex';
export default {
    data () {
        return {
            content:'--'
        }
    },
    mounted(){
        this.initData();
        this.getAgree();
    },
    computed:{
      ...mapGetters(['api'])
    },
    methods:{
        initData(){
        },
        getAgree(){
          Init.getAgree().then(res => {
            if(res.code ==1){
                this.content = res.data;
            }else {
                mui.toast(res.msg);
                return;
            }
          })
        }
    }
}
</script>

<style scoped lang="less">
@import "~link-less";
.body {
  background-color: @base-white;
  padding: @padding-primary;
   /deep/.content p {
       color: #666;
        text-align: justify;
   }
}
</style >

