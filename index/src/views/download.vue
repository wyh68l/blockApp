<template>
  <div class="content">    
    <m-header title="下载 App" :canback="Boolean(1)"></m-header>
    <template v-show='isShow'>
      <div class="logo_content">
        <img class="icon" :src="icon" :alt="app_name" v-show='icon'>
        <p class="app_name" v-text="app_name"></p>
        <p class="app_version">版本号：{{app_version}}</p>
      </div>
      <div class="download">
        <a :href="app_package" download>
          <div class="android">安卓下载</div>
          <p class="size">大小：{{package_size}}</p>
        </a>
      </div>
      <div class="qrcode" v-show='app_ios_qrcode'>
        <div class="title">iOS 下载</div>
        <img :src="qrCodeSrc" alt="">
        <p>扫描二维码下载</p>
      </div>
    </template>
  </div>
</template>
<script>
  import {Base} from '@/server/server.js'
  import {mapGetters} from 'vuex'
  
  export default {
    name: "conputer",
    data() {
      return {
        isShow: false,
        app_name: 'app_name',
        icon: '',
        app_version: '1.0.0',
        app_package: 'app_package',
        package_size: '0M',
        app_ios_qrcode: ''
      };
    },
    mounted() {
      this._init();
    },
    computed: {
      qrCodeSrc() {
        return this.api + this.app_ios_qrcode
      },
      ...mapGetters(['api'])
    },
    methods: {
      _init() {
        Base.getDownload().then(res => {
          this.isShow = true
          if (res.code == 1) {
            this.app_name = res.data.app_name
            this.icon = this.api + res.data.icon
            this.app_version = res.data.app_version
            this.app_package = this.api + res.data.app_package
            this.package_size = res.data.package_size
            this.app_ios_qrcode = res.data.app_ios_qrcode
          } else {
            mui.toast(res.msg)
          }
        }).catch(err => {
          mui.toast('网络错误')
        })
      }
    }
  };
</script>

<style scoped lang="less">
  @import '~link-less';
  .content {
    width: 100%;
    height: 100%;
    text-align: center;
    overflow-y: auto;
    background: #fff;
  }
  img, a {
    display: block;
  }
  .logo_content {
    width: 50%;
    padding-top: 60px;
    margin: 0 auto 60px;
    .icon {
      width: 80%;
      margin: 0 auto;
    }
    .app_name {
      font-size: 40px;
      margin: 20px 0 10px;
    }
    .app_version {
      font-size: 18px;
    }
  }
  .download {
    a {
      width: 452px;
      height: 100px;
      background: #78bc43;
      border-radius: 16px;
      margin: 0 auto;
      color: #fff;
      font-size: 32px;
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;;
    }
    .android {
      flex: 1.5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .size {
      flex: 1;
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .qrcode {
    width: 95%;
    margin: 0 auto;
    // border-top: 1px solid #ddd;
    .title {
      border-left: 6px solid #89b843;
      font-size: 26px;
      line-height: 1.5;
      text-align: left;
      text-indent: 15px;
      margin-top: 20px;;
      color: #fff;
    }
    p {
      line-height: 1.5;
      color: #fff;
      font-size: 24px;
    }
    img {
      display: block;
      margin: 20px auto 10px;
      max-width: 50%;;
    }
  }
</style >