<template>
    <footer class="index_footer">
      <nav>
        <a @click="goTo(1)" :class="{'nav-bg':navInd == 1}"><i class="iconfont iconshangcheng"></i><span>动态</span></a>
        <a @click="goTo(2)" :class="{'nav-bg':navInd == 2}"><i class="iconfont iconshouye1"></i><span>首页</span></a>
        <a @click="goTo(3)" :class="{'nav-bg':navInd == 3}"><i class="iconfont iconlicai"></i><span>融资租凭</span></a>
        <a @click="goTo(4)" :class="{'nav-bg':navInd == 4}"><i class="iconfont iconjiaoyi"></i><span>交易</span></a>
        <a @click="goTo(5)" :class="{'nav-bg':navInd == 5}"><i class="iconfont iconwd"></i><span>我的</span></a>
        <!-- <a v-for='(item, i) in btnList' :key='i' @click="goTo(i+1)" :class="{'nav-bg':navInd == i + 1}">
          <img :src="navInd == i + 1 ? item.activeImg : item.passiveImg" alt="">
          <span>{{language == 'zh-cn'? item.txt:item.enTxt}}</span>
        </a> -->
      </nav>
    </footer>
</template>

<script>
import {mapGetters} from 'vuex';
export default{
  data(){
    return {
      navInd:1,
      btnList:[
        {
          txt: '动态',
          enTxt: 'Find',
          passiveImg: require('../assets/images/hbtz/licai.png'),
          activeImg: require('../assets/images/hbtz/licai-a.png')
        },
        {
          txt: '首页',
          enTxt: 'Assets',
          passiveImg: require('../assets/images/hbtz/zichan.png'),
          activeImg: require('../assets/images/hbtz/zichan-a.png')
        },
        {
          txt: '融资租凭',
          enTxt: 'Transaction',
          passiveImg: require('../assets/images/hbtz/jiaoyi.png'),
          activeImg: require('../assets/images/hbtz/jiaoyi-a.png')
        },
        {
          txt: '交易',
          enTxt: 'DAPP',
          passiveImg: require('../assets/images/hbtz/dapp.png'),
          activeImg: require('../assets/images/hbtz/dapp-a.png')
        },
        {
          txt: '我的',
          enTxt: 'My',
          passiveImg: require('../assets/images/hbtz/my.png'),
          activeImg: require('../assets/images/hbtz/my-a.png')
        },
      ]
    }
  },
  mounted(){
    this.activeNav();
  },
  computed:{
    ...mapGetters(['language'])
  },
  methods:{
    goTo(index){
      this.navInd = index;
      switch(index){
        case 1:
          sessionStorage.setItem('btmNav',1);
          this.$router.push({name:'Find'});
          break;
        case 2:
          sessionStorage.setItem('btmNav',2);
          this.$router.push({name:'Index'});
          // this.$router.push({name:'Assets'});
          break;
        case 3:
          sessionStorage.setItem('btmNav',3);
          this.$router.push({name:'Financial'});
          break;
        case 4:
          sessionStorage.setItem('btmNav',4);
          // this.$router.push({name:'Service'});
          this.$router.push({name:'Trade'});
          break;
        case 5:
          sessionStorage.setItem('btmNav',5);
          this.$router.push({name:'My'});
          break;
      }
    },
    activeNav(){
      if(sessionStorage.getItem('btmNav')){
          let index = sessionStorage.getItem('btmNav');
          this.navInd = index;
        }
    }
  }
}

</script>
<style scoped lang="less">
@import '~link-less';
  nav {
    // position: fixed;
    box-sizing: border-box;
    // left: 0;
    // bottom: 0;
    width: 100%;
    // height: 100px;
    height: 50PX;
    background-color: #fff;
    display: -webkit-flex;
    justify-content: space-between;
    a {
      flex: 1;
      display: -webkit-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12PX;
      color: #999999;
      img {
        width: 22PX;
      }
      i {
        font-size: 20PX;
      }
    }
    .nav-bg {
      color: @base-origin;
    }
  }

</style>
