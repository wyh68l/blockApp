<template>
    <div class="page" v-if="success">
      <div v-if="this.$route.query.type === 'invite'">
        <m-header :title="lang.team.invitation" :canback="Boolean(1)" class="header"></m-header>
        <div class="content">
          <ul>
            <li><span>{{lang.team.mobile}}</span><span>{{lang.candy.reward_candy}}</span><span>{{lang.common.time}}</span></li>
            <li v-for="(item,index) in inviteList?inviteList:[]" :key="index">
              <span>{{item.mobile}}</span><span>{{item.tjgetcandy}}</span><span>{{item.createtime}}</span>
            </li>
            <li v-if="inviteList.length === 0" style="text-align: center;"><span>{{lang.common.no_more}}</span></li>
          </ul>
        </div>
      </div>

      <div v-else-if="this.$route.query.type === 'candy'">
        <m-header :title="lang.candy.candy_gets" :canback="Boolean(1)" class="header"></m-header>
        <div class="content">
<!--          <p>{{candyContent.text?candyContent.text:''}}</p>-->
          <textarea v-model="candyContent.text" style="height: 1000px" readonly></textarea>
        </div>
      </div>

      <div v-else>
        <m-header :title="lang.team.my_team" :canback="Boolean(1)" class="header" @back="goBack" :setback="Boolean(true)">
          <span @click="goTo('Invite')">{{lang.team.invite_friends}}</span>
        </m-header>
        <div class="content">
          <ul>
            <li><span>{{lang.team.name}}</span><span>{{lang.team.mobile}}</span></li>
            <li v-for="(item,index) in teamList" :key="index" v-if="teamList.length !== 0">
              <span>{{item.username}}</span><span>{{item.mobile}}</span>
            </li>
            <li v-if="teamList.length === 0" style="text-align: center;"><span>{{lang.common.no_more}}</span></li>
          </ul>
        </div>
      </div>

    </div>
</template>

<script>
    import {Index,Owner,Init} from '@/server/server.js';
    import {Util} from '@/assets/commonjs/utils.js';
    import {mapGetters} from 'vuex'
    import {languageMixin} from '@/assets/commonjs/mixin'
    export default {
        name: "index",
        data(){
            return {
                candyContent:{},
                inviteList:[],
                teamList:[],
                success:false,
                type:'default',
                language:{
                    team:{},
                    candy:{},
                    common:{}
                },
                formData: {
                    account: null
                },
            }
        },
        mixins: [languageMixin],
        created(){
            //this.InitLanguage获取多语言
            this.InitLanguage().then(() => {
                let {team,candy,common} = this.lang;
                this.language = {team,candy,common};
            })

             console.log('openid:' + this.$route.query.openid);
            if(this.$route.query.type&&this.$route.query.type.openid || this.$route.query.openid){
                if (this.$route.query.openid) {
                    this.formData.account = this.$route.query.openid;
                    this.type = 'default';
                    this.login();
                    Init.loginState().then(res => {})
                }else if(this.$route.query.type.openid){
                    this.type = 'income';
                    this.formData.account = this.$route.query.type.openid;
                    this.login();
                    Init.loginState().then(res => {})
                }else{
                    mui.toast('您还没有登录哦');
                    this.goBack();
                    return;
                }
            }else{
                this.getCandyInfo();
                this.getInviteInfo();
                this.success = true;
            }
        },
        computed:{
            ...mapGetters(['uid'])
        },
        methods:{
            goBack() {
                //返回主页
                if(this.type === 'default'){
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
                }else if(this.type === 'income'){
                    this.$router.go(-1);
                }
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

                        this.getTeamInfo();
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
            },
            getCandyInfo(){
                if(this.$route.query.type === 'candy'){
                    Index.getCandyText().then(res => {
                        if(res.code === 1){
                            console.log(res.data);
                            this.candyContent = res.data;
                        }else{
                            mui.toast(res.msg);
                        }
                    })
                }
            },
            getInviteInfo(){
                if(this.$route.query.type === 'invite'){
                    Index.getInviteRecord().then(res => {
                        if(res.code === 1){
                            console.log(res);
                            this.inviteList = res.data;
                        }else{
                            mui.toast(res.msg);
                        }
                    })
                }
            },
            getTeamInfo(){
                if(this.$route.query.type !== 'invite' && this.$route.query.type !== 'candy'){
                    Owner.getTeam({uid:this.uid}).then(res => {
                        if(res.code === 1){
                            console.log(res);
                            this.teamList = res.data.td;
                        }else{
                            mui.toast(res.msg);
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped lang="less">
  .page{
    .header /deep/ header{
      position: fixed;
      nav p{
        color: #333333;
      }
    }

    .content{
      padding: 30px;
      ul{
        li{
          display: flex;
          justify-content: space-between;
          height: 90px;
          align-items: center;
          background-color: #fff;
          border-bottom: 1px solid #f6f6f6;

          &:first-of-type{
            border-radius:26px 26px 0px 0px;
            background:linear-gradient(130deg,rgba(52,136,255,1) 0%,rgba(51,133,255,1) 100%);
            span{
              color: #fff;
            }
          }

          span{
            flex: 1;
            text-align: center;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }

      >p{
        color: #333333;
      }
    }

  }

</style>
