<template>
    <div class="page">
        <m-header :title="language == 'zh-cn'?'安全设置':allTxt &&allTxt['set']" :canback="Boolean(1)"></m-header>
        <section class="body">
            <ul class="list">
                <li class="item">
                    <div>
                        <span class="name">{{language =='zh-cn'? '用户名':allTxt && allTxt['userName']}}</span>
                        <span>{{userInfo?userInfo.username:'-'}}</span>
                    </div>
                    <img class="head" src="../../assets/images/touxiang.png" alt="">
                </li>
                <li class="item">
                        <span class="name">{{language =='zh-cn'? 'ID/手机':'Mobile'}}</span>
                        <span>{{userInfo?userInfo.mobile:'-'}}<i class="iconfont iconright"></i></span>
                    <!-- <span><i class="mark-text">{{language =='zh-cn'? '更换绑定':allTxt && allTxt['replaceBind']}}</i> <i class="iconfont iconright"></i></span> -->
                </li>
                <li class="item" @click="selectLan" v-show="false">
                    <span class="name" >{{language =='zh-cn'? '语言设置':'Language'}}</span>
                    <span><i class="mark-text">{{language=='zh-cn'?'中文':'English'}}</i><i class="iconfont iconright"></i></span>
                </li>
                <router-link class="item" :to="{name:item.route,query:{type:item.type}}" v-for="(item,index) in navList" :key="index">
                    <span>{{language =='zh-cn'? item.name:item.enName}}</span>
                    <i class="iconfont iconright"></i>
                </router-link>

            </ul>
            <button class="btn btn-red btn-quit" @click="toQuit">{{language =='zh-cn'? '退出登录':allTxt && allTxt['logout']}}</button>
        </section>
        <m-load ref="load"></m-load>
        <!-- <div class="layer" v-if="languageLayer">
            <div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row mui-radio mui-left">
						<label>中文</label>
						<input name="radio1" type="radio">
					</div>
					<div class="mui-input-row mui-radio mui-left">
						<label>English</label>
						<input name="radio1" type="radio" checked>
					</div>
				</form>
			</div>
        </div> -->
    </div>
</template>
<script>
import {Init} from '@/server/server.js';
import {Util,Load} from '@/assets/commonjs/utils.js';
import {mapGetters,mapMutations}  from 'vuex';
import {MyTxt} from '@/assets/commonjs/lan.js';
export default {
    name:'set',
    data(){
        return {
            languagePicker : new mui.PopPicker(),
            isreal:0,
            navList:[
                {
                    name:'实名认证',
                    enName:'Real-name authentication',
                    route:'Certify',
                    type:0
                },
                {
                    name:'修改登录密码',
                    enName:'Modify login password',
                    route:'SetPwd',
                    type:'login'
                },
                {
                    name:'修改交易密码',
                    enName:'Modify the transaction password',
                    route:'SetPwd',
                    type:'trade'
                },
                // {
                //     name:'帮助中心',
                //     enName:'Help Center',
                //     route:'Help',
                //     type:''
                // },
                // {
                //     name:'关于',
                //     route:'CheckUpdate',
                //     type:''
                // },
            ],
            languageLayer:false,
            allTxt:null
        }
    },
    mounted(){
        this.initData();
        this.getIseal();
    },
    computed:{
        ...mapGetters(['userInfo','language','uid'])
    },
    methods:{
        ...mapMutations(['saveLanguage']),

        getIseal(){
            this.getUserMessage({id:this.uid})
        },
        initData(){
            this.allTxt = Object.assign({},MyTxt);
            this.languagePicker.setData([{value:'zh-cn',text:'中文'},{value:'en',text:'English'}]);
        },
        getUserMessage(){
            Init.getUser({id:this.uid}).then(res=>{
                this.isreal = res.data[0].isreal;
                this.$store.commit('saveTemp',res.data[0])
                localStorage.setItem('temp',JSON.stringify(res.data[0]))
                console.log(123)
                console.log(res)
                this.navList[0].type=res.data[0].isreal;
            })
        },
        changeMobile(){
            this.$router.push({name:'ChangeMobile'})
        },
        selectLan(){
            let _this = this;
            this.languagePicker.show(function(items) {
                let value = items[0].value;
                _this.setLanguage(value)
            });
        },
        setLanguage(type){
            Init.setLanguage({type}).then(res=>{
                if(res.code ==1){
                    this.saveLanguage(type);
                    localStorage.setItem('language',type);
                    mui.alert(res.msg);
                }else{
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        toQuit(){
            try{
                if(plus){
                    mui.confirm('退出登录',actions=>{
                        if(actions.index==0)
                        this.quit();
                    })
                }
            }catch(e){
                mui.confirm('退出登录',actions=>{
                    if(actions.index==1)
                    this.quit();
                })
            }
        },
        quit(){
            Load.loadStart(this);
            Init.quit().then(res=>{
                if(res.code == 1){
                    setTimeout(() => {
                        this.clearLocal();
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        this.$router.replace({name:'Login'});
                    }, 1000);
                }else {
                    setTimeout(() => {
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        return ;
                    }, 1000);
                }
            })
        },
        clearLocal(){
            localStorage.clear();
            this.$store.commit('saveUserInfo',null);
            this.$store.commit('saveUserID',null);
            sessionStorage.setItem('btmNav',1);
            Util.clearAllCookie();
        }
    }

}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        color: #333;
        .list {
            margin: @margin-primary;
            .item {
                .display-flex();
                justify-content: space-between;
                align-items: center;
                padding: @padding-primary 0;
                // border-bottom: 1px solid #ddd;
                .head {
                    height: 68px;
                    width: 68px;
                }
                .name {
                    margin-right: 30px;
                }
                .mark-text {
                    color: #999;
                }
            }
        }
        .btn-quit {
            width: 90%;
            display: block;
            margin: @margin-primary auto;
        }
    }
    .layer {
        position: fixed;
        top: 50%;
        .transform(translate(-50%,-50%));
        left: 50%;
        z-index: 1;
        width: 80%;
        .layer-con {

        }
    }
</style>

