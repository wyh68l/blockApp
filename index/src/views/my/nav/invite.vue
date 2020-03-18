<template>
    <div class="page">
        <m-header title="邀请好友" :canback="Boolean(1)">
          <span style="color: #333333;" @click="goTo('Team','invite')">邀请记录</span>
        </m-header>
        <section class="body">
            <div class="img-box">
                <h3>我的邀请码</h3>
                <p v-if="userInfo" class="url">{{api+'#'+'/register/'+uid+'/'+userInfo.mobile}}</p>
                <button>立即复制</button>
                <p>复制邀请码，邀请更多好友加入</p>
                <img class="img" :src="inviteSrc" alt="">
            </div>
        </section>
    </div>
</template>
<script>
import QRCode from 'qrcode';
import {mapGetters} from 'vuex';
export default {
    name:"invite",
    data(){
        return {
            inviteSrc:null,
            inviteUrl:null,
        }
    },
    mounted(){
        // console.log(this.userInfo)
        this.initData();
        this.setCode(this.inviteUrl);
    },
    computed:{
        ...mapGetters(['uid','userInfo','api','language'])
    },
    methods:{
        initData(){
            // this.inviteUrl = location.href.split('#')[0]+'#'+'/register/'+this.uid+'/'+this.userInfo.mobile;
            // this.inviteUrl = process.env.API+process.env.PORT+'/dist/index.html#'+'/register/'+this.uid+'/'+this.userInfo.mobile;
            this.inviteUrl = this.api+'/dist/index.html#'+'/register/'+this.uid+'/'+this.userInfo.mobile;
        },
        setCode(url){
            QRCode.toDataURL(url).then(url => {
                this.inviteSrc = url;
            })
            .catch(err => {
                console.error(err)
            })
        },
        goTo(routerName,type) {
            this.$router.push({name:routerName,query:{type}});
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        // .display-flex();
        // flex-direction: column;
        // justify-content: space-around;
        // align-items: center;
        text-align: center;
        background-image: url(~assets/images/bjwz/bg4.png);
        background-size: 100% 100%;
        .title {
            font-size: 40px;
            color: @primary-color;
            margin-top: 5%;
        }
        .url {
            margin-bottom: 20px;
        }
        .img-box {
            position: absolute;
            top: 50%;
            left: 50%;
            .transform(translateX(-50%));

          p{
            margin: 25px auto;
          }

          h3{
            font-size:34px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:48px;
          }
          button{
            width:320px;
            height:60px;
            border-radius:34px;
            border:2px solid rgba(255,255,255,1);
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:60px;
          }
        }
        @media screen and (max-height:667px){
            .img-box {
            position: absolute;
            bottom: 10%;
            left: 50%;
            .transform(translateX(-50%));
        }
        }
    }
</style>
