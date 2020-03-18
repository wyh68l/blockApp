<template>
    <div class="page">
        <m-header title="绑定银行卡" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form class="base-form">
                <div class="form-item">
                    <label for="name">银行名称</label>
                    <input type="text" placeholder="请输入银行名称" v-model="formData.bank" @click="choiceBank" readonly>
                </div>
                <div class="form-item">
                    <label for="name">支行名称</label>
                    <input type="text" placeholder="请输入支行名称" v-model="formData.bankname">
                </div>
                <div class="form-item">
                    <label for="name">账户姓名</label>
                    <input type="text" placeholder="请输入账户姓名" v-model="formData.bankuname">
                </div>
                <div class="form-item">
                    <label for="name">银行账号</label>
                    <input type="number" placeholder="请输入银行账号" @blur="IsBand($event)" v-model="formData.bankact" oninput="if(value.length>19)value=value.slice(0,19)">
                    <span class="error" v-show="!rule.isBank.validate">{{rule.isBank.msg}}</span>
                </div>
                <div class="form-item">
                    <label for="name">手机验证码</label>
                    <div class="item-flex code">
                        <input type="text" placeholder="请输入验证码" v-model="formData.captcha" oninput="if(value.length>4)value=value.slice(0,4)">
                        <button type="button" class="btn" :disabled="seconds>0" @click="getCode">{{seconds==0?"点击获取":"已发送("+seconds+"s)"}}</button>
                    </div>
                </div>
                <button type="button" class="btn-submit gradient-origin" @click="add">添加</button>
            </form>
        </section>
        <m-load ref="load"></m-load>
    </div>
</template>
<script>
import {Owner,Base} from '@/server/server.js';
import {mapGetters} from 'vuex';
import {Util,Load} from '@/assets/commonjs/utils.js';

export default {
    name:"AddCard",
    data(){
        return {
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
            },
            bankList:[],
            rule:{
                isBank:{
                    validate:true,
                    msg:'请输入正确的信息！'
                }
            }
        }
    },
    mounted(){
        let _This = this;
        _This.initData();
        _This.getBank((res)=>{
            _This.setBanks(res.data,(banks)=>{
                _This.bankPicker.setData(banks);
            })
        });
    },
    computed:{
        ...mapGetters(['uid','userInfo','temp','api'])
    },
    methods:{
        initData(){
            this.formData.id = this.uid;
        },
        getCode(){
            this.seconds = 60;
            let get =  setInterval(()=>{
                this.$nextTick(()=>{
                    this.seconds = this.seconds-1;
                    if(this.seconds<=0){
                        clearInterval(get);
                    }
                })
            },1000);
// return ;
            // 发送验证码
            Base.sendCode({mobile:this.userInfo.mobile}).then((res)=>{
                mui.toast(res.msg);
            })
        },
        add(){
            // if(!this.isValidate()){
            //   mui.toast('请输入正确的银行卡号码！');
            //   return ;
            // }
            let params = Object.assign({},this.formData,{mobile:this.userInfo.mobile});
// console.log(params);
// return ;
            let msg = Util.isValidate(params);
                if(msg){
                    mui.toast(msg);
                    return ;
                }
            Load.loadStart(this);
            Owner.addBank(params).then(res=>{
                if(res.code == 1){
                    setTimeout(()=>{
                        Load.loadEnd(this);
                        mui.toast(res.msg);
                        this.$router.go(-1);
                    },1000)
                }else {
                    mui.toast(res.msg);
                    Load.loadEnd(this);
                    return ;
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
console.log(items)
                _This.formData.bank = items[0].text;
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
        .base-form .error {
            left: 0;
        }
    }
</style>
