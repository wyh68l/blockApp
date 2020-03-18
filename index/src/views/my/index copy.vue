<template>
    <div class="page">
        <m-header title="我的" :icon="'iconfont iconqkk_icon_wode'">
        </m-header>
        <section class="body">
            <div class="info">
                <img class="img" src="../../assets/images/gzlz/touxiang.png" alt="">
                <!-- <div class="img"></div> -->
                <!-- <img class="img" src="../../assets/images/gzlz/logo.png" alt=""> -->
                <div class="info-data">
                    <p class="item"><span>{{info?info.username:'游客用户'}}</span> <i class="mark">{{info?info.levelname:'-'}}</i></p>
                    <p class="item"><i> ID/手机：{{info?info.mobile:'-'}}</i></p>
                </div>
            </div>
            <ul class="record">
                <li class="item" v-for="(item,index) in recordList" :key="index" @click="goTo(item.route)">
                    <img class="img" :src="item.src" alt="">
                    <p class="name">{{item.name}}</p>
                </li>
            </ul>
            <ul class="capital">
                <li class="item" v-for="(item,index) in capitalList" :key="index" @click="goTo(item.route,item.type)">
                    <p class="num">{{item.num}}</p>
                    <p class="name">{{item.name}}</p>
                </li>
            </ul>
            <ul class="menu">
                <li class="item" v-for="(item,index) in menuList" :key="index" @click="goTo(item.route)">
                    <img class="img" :src="item.src" alt="">
                    <p class="name">{{item.name}}</p>
                </li>
            </ul>
        </section>
        <m-Footer></m-Footer>
    </div>
</template>
<script>
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
            capitalList:[
                {
                    num:"0.00",
                    name:'区块Mine',
                    route:'BlockMine',
                    type:'credit2'
                },
                {
                    num:"0.00",
                    name:'DOGE',
                    route:'BlockMine',
                    type:'credit4'

                },
                {
                    num:"0.00",
                    name:'矿机',
                    route:'MiningMachine',
                    type:'credit1'
                },
                {
                    num:"0.00",
                    name:'我的收益',
                    route:'BlockMine',
                    type:'credit5'
                },
                {
                    num:"0.00",
                    name:'总资产',
                    type:'total'

                },
                {
                    num:"0.00",
                    name:'推广收益',
                    route:'MiningMachine',
                    type:'credit3'
                }
            ],
            recordList:[
                {
                    src:require('@/assets/images/gzlz/Icon_reservation.png'),
                    name:'预约记录',
                    route:'Bestpeak'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_loot.png'),
                    name:'抢矿记录',
                    route:'Mine'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_assignment.png'),
                    name:'转让记录',
                    route:'Attorn'
                }
            ],
            menuList:[
                {
                    src:require('@/assets/images/gzlz/Icon_recommended.png'),
                    name:'邀请好友',
                    route:'Invite'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_real name.png'),
                    name:'实名验证',
                    route:'Certify'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_payment.png'),
                    name:'支付信息',
                    route:'PayInfo'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_team.png'),
                    name:'我的团队',
                    route:'Team'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_turntable.png'),
                    name:'幸运转盘',
                    route:'Dial'
                },
                {
                    src:require('@/assets/images/gzlz/Icon_settings.png'),
                    name:'其它设置',
                    route:'Set'
                },
            ]
        }
    },
    mounted () {
        // if(!localStorage.getItem('userInfo'))
        this.getUser(this.uid);
        this.getCoin();
        if(!this.userInfo)
        window.location.reload();
    },
    computed:{
        ...mapGetters(['uid','userInfo'])
    },
    methods:{
        initData(){

        },
        goTo(route,type){
            this.$router.push({name:route,query:{type}})
        },
        getCoin(){
            Owner.getUserCoin({id:this.uid}).then((res)=>{
                if(res.code == 1){
                    this.assignData(this.capitalList,res.data.data)
                }else{
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        // 处理返回来的数据
        assignData(lastData,data){
// console.log(data);
            lastData[0].num = data.credit2.money;
            lastData[1].num = data.credit4.money;
            lastData[2].num = data.credit1.money;
            lastData[3].num = data.credit5.money;
            lastData[4].num = data.total.money;
            lastData[5].num = data.credit3.money;
        },
        // 获取用户信息  ！！！弃用！！！！
        // getUser(id){
        //     Init.getUser({id}).then(res=>{
        //         if(res.code == 1){
        //             localStorage.setItem('userInfo',JSON.stringify(res.data[0]));
        //         }else {
        //             mui.toast(res.msg);
        //             return ;
        //         }
        //     })
        // },
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
        padding: @padding-primary;
        background-color: @bg-color;
        .info {
            .display-flex();
            flex-direction: row;
            .img {
                height: 110px;
                // margin-left: 10px;
                // width: 110px;
                margin: 0 10px;
                // background-image: url(../../assets/images/gzlz/logo.png);
                // background-size: 80%;
                // background-repeat: no-repeat;
                // background-position: center;
                // border-radius: 50%;
            }
            .info-data {
                .display-flex();
                flex-direction: column;
                justify-content: space-between;
                padding: 10px;
                .item {
                    color: white;
                    font-size: 32px;
                    >i {
                        font-size: 20px;
                        vertical-align: middle;
                        &.mark {
                            background-color: @primary-color;
                            padding: 5px 25px;
                            border-radius: 8px;
                            margin-left: 40px;
                        }    
                    }
                }
            }
        }
        // 记录
        .record {
            .display-flex();
            justify-content: space-between;
            margin-top: @l-margin;
            .item {
                width: 31%;
                background-color: @bg-card-color;
                padding: 40px 0;
                text-align: center;
                border-radius: 10px;
                .img {
                    height: 88px;
                }
                .name {
                    font-size: 28px;
                }
            }
        }
        // 资产
        .capital {
            margin-top: @margin-primary;
            background-color: @bg-card-color;
            padding: 20px 0;
            text-align: center;
            .item {
                width: 33%;
                display: inline-block;
                padding: 20px 0;
                >p {
                    text-align: center;
                    font-size: 32px;
                    color: @primary-color;
                    &.name {
                        font-size: 24px;
                        color: white;
                    }
                }
            }
        }
        .menu {
            background-color: @bg-card-color;
            margin-top: @margin-primary;
            padding: 10px 0;
            border-radius: 10px;
            .item {
                width: 33%;
                text-align: center;
                padding: 20px 0;
                display: inline-block;
                .img {
                    height: 36px;
                }
                .name {
                    font-size: 24px;
                }
            }
        }
    }
</style>
