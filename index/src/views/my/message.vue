<template>
  <div class="page" v-if="success">
    <m-header :title="language.message" :canback="Boolean(true)" class="header" @back="goBack" :setback="Boolean(true)"></m-header>
    <div class="mesList">
      <ul>
        <li @click="goTo('OrderList')"><span>{{language.order_msg}}</span><i class="iconfont iconright"></i></li>
        <li @click="goTo('SystemList')"><span>{{language.system_msg}}</span><i class="iconfont iconright"></i></li>
        <li @click="goTo('OrderList','rent')"><span>{{language.lease_msg}}</span><i class="iconfont iconright"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
    import {Index,Init} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {languageMixin} from '@/assets/commonjs/mixin'
    import {mapGetters} from 'vuex'
    export default {
        name: "message",
        data() {
            return {
                noMore:false,
                success:false,
                formData: {
                    account: null
                },
                language:{},
                screenHeight:null
            };
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                this.language = this.lang.message;
                //console.log(JSON.stringify(this.lang));
                //this.success = true;
            })

            console.log('openid:' + this.$route.query.openid);
            if (this.$route.query.openid) {
                this.formData.account = this.$route.query.openid;
                this.login();
                Init.loginState().then(res => {})
            }else{
                mui.toast('您还没有登录哦');
                this.goBack();
                return;
            }
        },
        computed:{
            //...mapGetters(['lang'])
        },
        methods:{
            goBack() {
                //注销
                Init.quit().then(res => {
                    if (res.code == 1) {
                            try {
                                if (plus) {
                                    plus.webview.currentWebview().close();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                    } else {
                            try {
                                if (plus) {
                                    plus.webview.currentWebview().close();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                            return;
                    }
                })
            },
            login() {
                let params = this.formData;
                let msg = Util.isValidate(params);
                if (msg) {
                    mui.toast(msg);
                    return;
                }
                Init.login(params).then((res) => {
                    if (res.code == 1) {
                        localStorage.setItem('user_id', res.data.id);
                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                        this.$store.commit('saveUserInfo', res.data);
                        localStorage.setItem('cookie', res.data.token);

                        this.success = true;
                    } else {
                        setTimeout(() => {
                            this.goBack();
                            mui.toast(res.msg);
                            return;
                        }, 1000);
                    }
                })
            },
            goTo(routerName,type) {
                this.$router.push({name:routerName,query:{type}});
            }
        }
    }
</script>

<style scoped lang="less">
  .page{
    background-color: #fff;

    .mesList {
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 0;
          margin: 0 30px;
          border-bottom: 1px solid #f6f6f6;
        }
      }
    }
  }

</style>
