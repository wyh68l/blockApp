<template>
  <div class="page">
    <m-header :title="setLanTxt(['理财项目',allTxt && allTxt['financialP']])" :canback="true"></m-header>
    <section class="body">
        <ul class="type-list">
            <li class="item"><span>{{setLanTxt(['产品期限',allTxt && allTxt['productTerm']])}}：<i>{{detail && detail.all_day}}</i> 天</span></li>
            <li class="item"><span>{{setLanTxt(['最低产品期限',allTxt && allTxt['minTerm']])}}：<i>{{detail && detail.all_day}}</i> 天</span></li>
            <li class="item"><span>{{setLanTxt(['可用资产',allTxt && allTxt['avaAssets']])}}：<i>{{credit1||'0.00'}}</i></span></li>
            <li class="item">
                <span>
                    <i>{{setLanTxt(['理财币种',allTxt && allTxt['coinType']])}}</i><br>
                    <i>TBE</i>
                </span>
                <!-- <span>
                    <i>理财币种</i><br>
                    <i>TBE</i>
                </span> -->
                <span>
                    <i>{{setLanTxt(['预期回报率',allTxt && allTxt['rateReturn']])}}</i><br>
                    <i>{{detail && detail.percent}}%</i>
                </span>
            </li>
        </ul>
        <form class="base-form">
            <p class="label">{{setLanTxt(['投入数量',allTxt && allTxt['inQuantity']])}}（TBE）</p>
            <div class="form-item">
                <input type="text" class="inp" :class="{'error-border':rules.total.msg}"  v-model="submitData.total" :placeholder="setLanTxt(['最低投入量',allTxt && allTxt['minQuantity']])+'10.00，'+setLanTxt(['最高投入量',allTxt && allTxt['maxQuantity']])+'1000.00'" v-vals="rules.total">
                <span class="error" v-show="rules.total.msg">{{rules.total.msg}}</span>
            </div>
                <button type="button" class="btn btn-blue btn-submit" @click="buy">{{setLanTxt(['立即抢购',allTxt && allTxt['buyNow']])}}</button>
        </form>
    </section>
    <m-Footer></m-Footer>
  </div>
</template>
<script>
import { Index } from "@/server/server.js";
import {mapGetters} from 'vuex';
import {Validates} from '@/assets/commonjs/utils.js';
import {IndexTxt} from '@/assets/commonjs/lan.js';
import {Util} from '@/assets/commonjs/utils.js';

export default {
    data(){
        return {
            rules:{
                total:{
                    rule:[
                        {val:'required',msg:'请输入投入数量'},  //可以有多个规则对象
                    ],
                    msg:null
                }
            },
            typePicker : new mui.PopPicker(),
            typeList:[
                {
                    value:1,
                    text:'aaaaa'
                }
            ],
            detail:null,
            credit1:null,
            submitData:{
                total:null,
                id:null,
                uid:null
            },
            allTxt:null
        }
    },
    mounted(){
        this.initData();
        this.getInterestDetail();
    },
    computed:{
        ...mapGetters(['uid','language'])
    },
    methods:{
        initData(){
            // this.typePicker.setData(this.typeList);
            this.submitData = Object.assign({},this.submitData,{id:this.$route.params.id,uid:this.uid});
            this.allTxt = Object.assign({},IndexTxt);
        },
        setLanTxt(strArr){
          return Util.setLanTxt(strArr)
        },
        choiceType(){
            let _This = this;
            this.typePicker.show(function(items) {
console.log(items)
                
            });
        },
        getInterestDetail(){
            Index.getInterestDetail({id:this.submitData.id,uid:this.uid}).then(res=>{
                if(res.code ==1){
                    this.detail = res.data && res.data.data;
                    this.credit1 = res.data && res.data.user.credit1;
                }else{
                    mui.toast(res.msg);
                }
            })
        },
        buy(){
            let msg = Validates.formValidate(this.rules);  
            if(msg){
                mui.toast(msg);
                return ;
            }
            Index.buyInterest(this.submitData).then(res=>{
                if(res.code == 1){
                    mui.alert(res.msg,()=>{
                        this.$router.go(-1);
                    })
                }else{
                    mui.toast(res.msg);
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "~link-less";
.body {
    padding: @margin-primary 0;
    background-color: white;
    .type-list {
        padding: 12px 30px ;
        background-color: @base-blue;
        color: white;
        .item {
            .display-flex();
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            >span {
                text-align: center;
            }
        }
    }
    .base-form {
        font-size: 28px;
        .label {
            color: black;
            margin-left: 30px;
        }
        .form-item {
            box-shadow: none;
            &:last-of-type {
                margin-bottom: 80px;
            }
        }
    }
}
</style>