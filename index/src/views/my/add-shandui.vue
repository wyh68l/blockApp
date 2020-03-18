<template>
    <div class="page">
        <m-header title="闪兑" :canback="Boolean(1)">
            <span @click="log">兑换记录</span>
        </m-header>
        <section class="body">
            <nav-item :navlist="navList" @change="navChange" class="top" v-if="false"></nav-item>
            <form class="base-form" v-if="id==0">
                <h2 class="base-h2">当前充值余额:10000元</h2>
                <div class="sele">
                    <label for="name" class="item-title" >转入币种</label>
                    <input class="form-input" type="text" v-model="formData.account" :placeholder="this.formData.bank" @click="choiceBank" readonly>
                </div>
                <div >
                    <label for="name" class="item-title">兑换数量</label>
                    <input type="text" class="item-inp" placeholder="请输入兑换数量" v-model="formData.num">
                </div>
                <button type="button" class="btn-submit gradient-origin" @click="add">确认兑换</button>
            </form>
            <form class="base-form" v-else>
                <div class="else-div">
                    <h2 class="base-h2-else">可用{{this.arr[0].bankName}}:{{accountData&&accountData.credit1}}元</h2>
                    <h2 class="base-h2-else">可用{{this.arr[1].bankName}}:{{accountData&&accountData.credit3}}元</h2>
                </div>
                
                <!-- <div class="sele">
                    <label for="name" class="item-title" >转入币种</label>
                    <input type="number" class="item-inp" placeholder="充值余额" v-model="formData.num"> 
                </div> -->
                <div class="sele">
                    <label for="name" class="item-title" >转出币种</label>
                    <input class="form-input" type="text" v-model="formData.account" :placeholder="this.formData.bank" @click="choiceBank" readonly>
                </div>
                <div >
                    <label for="name" class="item-title">兑换数量</label>
                    <input type="number" class="item-inp" placeholder="请输入兑换数量" v-model="num">
                </div>
                <p class="rate-tip"><span class="num">{{rate&&rate.jcb_bi}}</span> 个剿巢币 / <i class="num">1</i> 余额</p>
                <p class="rate-tip"><span class="num">{{rate&&rate.itb_bi}}</span> 个i淘币 / <i class="num">1</i> 余额</p>
                <button type="button" class="btn-submit gradient-origin" @click="add">确认兑换</button>
            </form>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Owner,Base,Assets} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';
import navItem from '@/components/order-nav-item.vue';

export default {
    name:"AddCard",
    data(){
        return {
            id:1,
            cityPicker : new mui.PopPicker({layer: 2}),
            bankPicker : new mui.PopPicker(),
            accountData:null,
            navList:[
                {
                    id:0,
                    name:'转入'
                },
                {
                    id:1,
                    name:'转出'
                },
            ],
            seconds:0,
            bankPicker : new mui.PopPicker(),
            formData:{
                id:null,
                bank:null,
                bankname:null,
                bankuname:null,
                bankact:null,
                mobile:null,
                captcha:null,
                itb:null,
                account:null
            },
            bankList:[],
            rule:{
                isBank:{
                    validate:true,
                    msg:'请输入正确的信息！'
                }
            },
            arr:[
                    { 
                        bankName:"剿巢币",bankId:'01'
                    },
                    { 
                        bankName:"i淘币",bankId:'02'
                    }
                ],
            num:null,
            rate:null
        }
    },
    mounted(){
        this.getListBottom();
        this.getValue();
        this.getDhRate();
        console.log(this.arr)
    },
    components:{
        navItem
    },
    computed:{
        ...mapGetters(['uid','userInfo','temp','api'])
    },
    methods:{
        log(){
            this.$router.push({name:'ExchangeLog'})
        },
        //下拉列表数据
        getListBottom(){
            this.formData.bank = '剿巢币';
            let _This = this;
            _This.initData();
            const arr = this.arr;
            // _This.getBank((res)=>{
                _This.setBanks(arr,(banks)=>{
                    _This.bankPicker.setData(banks);
                })
            // });
        },
        getValue(){
            Assets.getValue().then(res=>{
                if(res.code == 1){
                    this.accountData = res.data;
                }
                // console.log(res)
                // this.arr[1].bankName = res.data.jcb_name;
                // this.arr[0].bankName = res.data.itb_name;
            })
        },
        //头部切换
        navChange(id){
            this.id = id;
        },
        //获取id
        initData(){
            this.formData.id = this.uid;
        },
        add(){
            if(this.formData.bank=="i淘币"){
                const itb = this.num;
                Assets.handleItbDepositApi({itb}).then(res=>{
                    if(res.code ==1){
                        mui.toast(res.msg);
                        this.getValue();
                    }else {
                        mui.toast(res.msg);
                        return;
                    }
                })
            }else{
                const jcb = this.num;
                Assets.handleJcbDepositApi({jcb}).then(res=>{
                    if(res.code ==1){
                        mui.toast(res.msg);
                        this.getValue();
                    }else {
                        mui.toast(res.msg);
                        return;
                    }
                })
            }
        },
        getDhRate(){
            Assets.getDhRate().then(res=>{
                if(res.code ==1){
                    this.rate = res.data;
                }else{
                    mui.toast(res.msg);
                    return;
                }
            })
        },
        getBank(callback){
            Base.getBank().then((res)=>{
                callback(res)
            })
        },
        setBanks(banks,callback){
            for(let item of banks){
                this.bankList.push({value:item.bankId,text:item.bankName})
            }
            callback(this.bankList)
        },
        choiceBank(){
            let _This = this;
            this.bankPicker.show(function(items) {
                _This.formData.bank = items[0].text;
                // _This.formData.account = items[0].text;
            });
        },
        IsBand(event) {
          let regex =  /^([1-9]{1})(\d{14}|\d{18})$/;
          if (event.target.value.match(regex)) {
            this.rule.isBank.validate = true;
          } else {
            this.rule.isBank.validate = false;            
          }
        },
        isValidate(){
          if(!Util.formValidate(this.rule)|| !Util.filterData(this.formData)){
              return false;
            }else{
              return true;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '~link-less';
    .body {
        background-color: @base-white;
        padding: @padding-primary;
        .top{
            margin-top: -30px;
        }
        .base-form .error {
            left: 0;
        }
        .item-inp{
            width:650px;
            height:88px;
            background:rgba(241,241,241,1);
            border-radius:10px;

        }
        .base-h2{
            font-size: 24px;
            font-weight: none;
            margin-bottom: 30px;
        }
        .selected{
            border: 1px solid #333;
            color: rgba(0, 0, 0, 0.2);
            border: 20px solid #fff;
            padding-left: 30px;
            margin-bottom: 20px;
        }
        .else-div{
            margin-bottom: 30px;
            
            .base-h2-else{
                font-size: 24px;
                font-weight: none;
                margin-bottom: 10px;
            }
        }
        .form-input {
                background-color: #f1f1f1;
            }
        .rate-tip {
            color: #999;
            font-size: 12px;
            &:last-of-type{
                margin-bottom: 20px;
            }
            .num {
                color: @base-origin;
            }
        }
    }
</style>
