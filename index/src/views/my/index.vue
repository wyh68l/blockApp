<template>
    <div class="page">
        <!-- <m-header title="我的" :icon="'iconfont iconqkk_icon_wode'"></m-header> -->
        <section class="body">
            <div class="info">
                <div class="head-left">
                    <img src="../../assets/images/hbtz/licai.png" alt="">
                    <p>{{userInfo && userInfo.username}}</p>
                </div>
                <button class="head-btn" @click="routerGo('/assets')">总资产</button>
                <div class="content">
                    <p>昨日剿巢币收益</p>
                    <h2>{{yest}}</h2>
                </div>
            </div>

            <!-- 买卖单 -->
            <div class="buy">
                <div
                    class="item"
                    v-for="(item,index) in orderNav"
                    :key="index"
                    @click="routerGo(item.path)">
                    <img :src="item.src" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>

            <!-- 导航 -->
            <ul class="nav-list">
                <li class="item"
                    v-for="(item,index) in navList"
                    :key="index"
                    @click="routerGo(item.path)">
                    <div >
                        <img class="item-img" :src="item.src" alt="">
                        <span class="name">{{item.name}}</span>
                    </div>
                    <i class="iconfont iconright"></i>
                </li>
            </ul>
        </section>
        <m-Footer></m-Footer>
    </div>
</template>
<script>
import {MyTxt} from '@/assets/commonjs/lan.js';
import {mapGetters} from 'vuex';
import {Owner,Init} from '@/server/server.js';
export default {
    name:'my',
    data(){
        return {
            info:{
                levelname:null,
                mobile:null,
                username:null,
            },
            orderNav:[
                {
                    src:require('@/assets/images/gzxz/my_icon_wdzc@2x.png'),
                    name:"我的买单",
                    enName:'My bill',
                    path:'/my/busi/buy'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_wdsy.png'),
                    name:"我的卖单",
                    enName:'My bill',
                    path:'/my/busi/sell'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_slb.png'),
                    name:"我的理财包",
                    enName:'My bill',
                    path:'/myfin'
                }
            ],
            navList:[
                {
                    src:require('@/assets/images/gzxz/my_icon_wdtd.png'),
                    name:"我的团队",
                    enName:"Transaction Orders",
                    path:'/team'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_sd.png'),
                    name:"闪兑",
                    enName:"Node Sharing",
                    path:'/addshan'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_yqhy.png'),
                    name:"邀请好友",
                    enName:"Incubation Record",
                    path:'/invite'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_wdhb.png'),
                    name:"支付信息",
                    enName:"My Team",
                    path:'/payinfo'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"其他设置",
                    enName:"My Team",
                    path:'/set'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"签到",
                    enName:"Sign in",
                    path:'/sign'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"消息中心",
                    enName:"Message",
                    path:'/message'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"矿机租凭",
                    enName:"carRent",
                    path:'/trade/carRent'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"收益中心",
                    enName:"Income",
                    path:'/Income'
                },
                {
                    src:require('@/assets/images/gzxz/my_icon_zxly.png'),
                    name:"糖果中心",
                    enName:"Income",
                    path:'/Income?type=candy'
                },
            ],
            allTxt:null,
            yest:'0.00'
        }
    },
    mounted () {
        this.initData();
        this.getUserMessage();
        this.getMachineY();
        // this.getUser(this.uid);
    },
    computed:{
        ...mapGetters(['uid','userInfo','language','temp'])
    },
    methods:{
        getMachineY(){
            Owner.getMachineY().then(res=>{
                if(res.code ==1){
                    this.yest = Number(res.data).toFixed(2) ;
                }
            })
        },
        routerGo(route){
            this.$router.push({path:route})
        },
        initData(){
            this.allTxt = MyTxt;
        },
        getUserMessage(){
            Init.getUser({id:this.uid}).then(res=>{
                console.log(res.data[0])
                this.$store.commit('saveTemp',res.data[0])
                localStorage.setItem('temp',JSON.stringify(res.data[0]))
            })
        },
        goTo(route,type){
            this.$router.push({name:route,query:{type}})
        },
        certify(){
            this.$router.push({name:'Certify'})
        },
        getUser(id){
            Init.getUser({id}).then(res=>{
                if(res.code ==1){
                    this.info = res.data[0];
                    if(res.data[0]){
                        localStorage.setItem('userInfo',JSON.stringify(res.data[0]));
                        this.$store.commit('saveUserInfo',res.data[0]);
                    }
                }else {
                    mui.toast(res.msg)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        // padding: @padding-primary;
        background-color: #f5f5f5;
        .info {
            position: relative;
            height: 397px;
            background-image: url(../../assets/images/gzxz/my_bg@2x.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: -1;
            .head-left{
                position: relative;
                img{
                    width:58px;
                    height:58px;
                    position: absolute;
                    left: 30px;
                    top: 55px;
                }
                p{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:40px;
                    position: absolute;
                    left: 98px;
                    top: 64px;
                }
            }
            .head-btn{
                width:150px;
                height:48px;
                border-radius:10px;
                border:2px solid rgba(255,255,255,1);
                position: absolute;
                right: 30px;
                top: 65px;
            }
            .content{
                text-align: center;
                padding-top: 148px;
                P{
                    height:45px;
                    font-size:32px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:45px;
                };
                h2{
                    height:84px;
                    font-size:60px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:84px;
                }
            }
        }
        //买卖单
        .buy{
            width:690px;
            height:170px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            margin-top: -85px;
            margin-left: 30px;
            display: flex;
            z-index: 99;
            >div{
                flex: 1;
                text-align: center;
                img{
                    width:48px;
                    height:48px;
                    margin: 36px 82px 12px 82px;
                }
                p{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:40px;
                }
            }
        }
        // 导航
        .nav-list {
            width:690px;
            margin: 30px 30px;;
            border-radius:8px;
            background:rgba(255,255,255,1);
            .item {
                background-color: white;
                .display-flex();
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(211,211,211,.3);
                margin: 0 30px;

                >div{
                    padding: 41px 33px;
                    .item-img{
                        width:48px;
                        height:48px;
                        vertical-align: middle;
                    }
                    .name {
                        height:45px;
                        font-size:32px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:48px;
                        margin-left: 11px;
                    }
                }
                &:last-of-type {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
