<template>
    <div class="page">
        <m-header :title="type=='sale'?language=='zh-cn'?'创建卖单':allTxt&&allTxt['creteSale']:language=='zh-cn'?'创建买单':allTxt&&allTxt['creteBuy']" :canback="Boolean(1)"></m-header>
        <section class="body">
            <form >
                <ul class="post-list">
                    <li class="post-item" v-if="type=='sale'">
                        <label class="form-label" for="">{{language=='zh-cn'?'卖出数量':allTxt&&allTxt['sellQuantity']}}</label>
                        <input class="form-input" type="number" v-model="formData.amount1" :placeholder="language=='zh-cn'?' 请输入卖出数量':allTxt&&allTxt['saleTip']" >
                    </li>

                    <li class="post-item" v-else>
                        <label class="form-label" for="">{{language=='zh-cn'?'数量':allTxt&&allTxt['number']}}</label>
                        <input class="form-input" type="text" v-model="formData.amount1" :placeholder="language=='zh-cn'?'请输入购买数量':allTxt&&allTxt['buyTip']" >
                    </li>

                    <li class="post-item" v-if="type=='sale'">
                        <label class="form-label" for="">{{language=='zh-cn'? '到账数量':allTxt && allTxt['arriveAccount']}}</label>
                        <input class="form-input"  type="number" v-model="formData.amount2" value="0.00" readonly placeholder="0">
                    </li>

                    <li class="post-item">
                        <label class="form-label price-label" for="">{{language=='zh-cn'? '单价':allTxt&&allTxt['uprice']}}</label>
                        <input class="form-input" type="number" v-model="formData.uprice" :placeholder="language=='zh-cn'? '请输入您的单价':allTxt&&allTxt['upriceTip']" @blur="isPrice($event)">
                    </li>
                    
                    <li class="post-item">
                        <label class="form-label newline price-label" for="">{{language=='zh-cn'? '今日价格区间':allTxt &&allTxt['transaction']}}</label>
                        <input class="form-input" type="text"  :value="ccParam.minPrice+' ~ '+ccParam.maxPrice" readonly>
                    </li>
                    <li class="post-item">
                        <label class="form-label price-label" for="">{{language=='zh-cn'? '总金额':allTxt&& allTxt['totalAmount']}}</label>
                        <input class="form-input" type="number"  value="" v-model="totalprice" readonly placeholder="￥0.00">
                    </li>

                    <li class="post-item">
                        <label class="form-label" for="">{{language=='zh-cn'? '手机号':allTxt &&allTxt['mobile']}}</label>
                        <input class="form-input" type="number" :value="userInfo?(userInfo.mobile||userInfo.alipayact):'-'"  readonly>
                    </li>

                    <li class="post-item">
                        <label class="form-label" for="">{{language=='zh-cn'? '银行卡':allTxt&&allTxt['bankCard']}}</label>
                        <input class="form-input" type="number" :value="payInfo&&payInfo.bankact?payInfo.bankact:'-'" readonly >
                    </li>

                    <li class="post-item">
                        <label class="form-label" for="">{{language=='zh-cn'? '支付宝':allTxt && allTxt['aliPay']}}</label>
                        <input class="form-input" type="number" :value="payInfo &&payInfo.alipayact?payInfo.alipayact:'-'" readonly>
                    </li>
                    <li class="post-item post-item-code">
                        <label class="form-label" for="">{{language=='zh-cn'? '支付宝二维码':allTxt &&allTxt['aliCode']}}</label>
                        <img class="code" :src="payInfo?api+payInfo.alipay_url:'-'" alt="">
                    </li>
                    <li class="post-item">
                        <label class="form-label" for="">{{language=='zh-cn'? '微信':allTxt &&allTxt['wechat']}}</label>
                        <input class="form-input" type="number" :value="payInfo &&payInfo.wechatact?payInfo.wechatact:'-'" readonly>
                    </li>
                    <li class="post-item post-item-code">
                        <label class="form-label" for="">{{language=='zh-cn'? '微信二维码':allTxt &&allTxt['wechatCode']}}</label>
                        <img class="code" :src="payInfo &&payInfo.wechat_url?api+'/'+payInfo.wechat_url:'-'" alt="">
                    </li>
                </ul>
            </form>
            <button class="btn-add gradient-origin" @click="confirm">{{language=='zh-cn'? '确定':allTxt && allTxt['submit']}}</button>
        </section>

        <!-- <small-alert ref="buy" @go="go">
            <span slot="content">{{text}}<br>可以查看啦~</span>
        </small-alert> -->

        <pwd-alert ref="pwd" @pay="pay"></pwd-alert>

    </div>
</template>
<script>
import navItem from '@/components/order-nav-item.vue';
import {TradeTxt,BaseTxt} from '@/assets/commonjs/lan.js';
// import orderItem from '@/components/order-item.vue';
import pwdAlert from '@/components/pwd-alert.vue';
import smallAlert from '@/components/small-alert.vue';
import {Trade,Base,Owner} from '@/server/server.js';
import {mapGetters} from 'vuex';
export default {
    name:'order',
    components:{
        navItem,pwdAlert,smallAlert
    },
    data () {
        return {
            type:'sale',
            text:'您的卖单已提交',
            formData:{
                pwd:null,
                amount1:null,
                amount2:null,
                uprice:null,
                totalprice:null,
            },
            ccParam:{
                minPrice:null,
                maxPrice:null,
                tradeCharge:null,
            },
            submitFlag:true,
            payInfo:null,
            allTxt:null
        }
    },
    mounted(){
        this.initData();
        this.getPayInfo(this.uid);
        this.getCcParam();

    },
    watch:{
        'formData.amount1'(newV){
            this.formData.amount2 = newV - this.cost(newV,this.ccParam.tradeCharge);
            this.formData.servicecharge = this.cost(newV,this.ccParam.tradeCharge);
        }
    },
    computed:{
        ...mapGetters(['uid','userInfo','api','language']),
        'totalprice'(){
            if(this.type == 'sale')
            return (this.formData.amount2 *this.formData.uprice)?(this.formData.amount2 *this.formData.uprice).toFixed(2):'0';
            return (this.formData.amount1 *this.formData.uprice)?(this.formData.amount1 *this.formData.uprice).toFixed(2):'0';
        }
    },
    methods:{
        initData(){
            this.type = this.$route.params.type;
            this.allTxt = Object.assign({},TradeTxt,BaseTxt);
        },
        // 获取区间等
        getCcParam(){
            Trade.getCcParam().then((res)=>{
                if(res.code == 1){
                    if(this.type == 'buy'){
                        this.ccParam.minPrice = res.data.cc_price.itb_income[0].name;
                        this.ccParam.maxPrice = res.data.cc_price.itb_income[1].name;
                    }else{
                        this.ccParam.minPrice = res.data.cc_price.itb_out[0].name;
                        this.ccParam.maxPrice = res.data.cc_price.itb_out[1].name;
                    }
                    this.ccParam.tradeCharge = res.data.trade_charge;
                }else {
                    mui.toast(res.msg);
                }
            })
        },
        // 校验单价
        isPrice(event){
            let [value,minPrice,maxPrice] = [event.target.value,Number(this.ccParam.minPrice),Number(this.ccParam.maxPrice)];
            if(value<minPrice){
                mui.toast('请修改单价为：'+minPrice+'~'+maxPrice);
                this.submitFlag = false;
            }else if(value>maxPrice){
                mui.toast('请修改单价为：'+minPrice+'~'+maxPrice);
                this.submitFlag = false;
            }else {
                this.submitFlag = true;
            }
        },
        // 手续费
        cost(data,ratio){
            return data*ratio/100;
        },
        // 支付请求
        addSale(params){
            let _This = this;
            Trade.addSale(params).then((res)=>{
                if(res.code == 1){
                    // _This.$refs['pwd'].close();
                    // _This.$refs['buy'].open();
                    // setTimeout(() => {
                        _This.$router.go(-1);
                    // }, 500);
                }else {
                    mui.toast(res.msg);
                    // _This.$refs['pwd'].close();
                    return ;
                }
            })
        },
        // 执行支付请求
        pay(value){
            let [_This,type] = [this,this.type];
            this.setText(type);
            if(type == 'sale'){
                let params = Object.assign({},_This.formData,{totalprice:_This.totalprice,pwd:value});
                this.addSale(params);
            }else {
                let params = {
                    uprice:_This.formData.uprice,
                    amount2:_This.formData.amount1,
                    totalprice:_This.totalprice,
                    pwd:value
                };
// console.log(params)
// return ;
                this.addBuy(params);
            }
        },
        // 弹出交易密码
        confirm(){
            
            let [_This,flag,minPrice,maxPrice] = [this,this.submitFlag,Number(this.ccParam.minPrice),Number(this.ccParam.maxPrice)];
            // let params = Object.assign({},this.formData,{totalprice:_This.totalprice}) ;
            // console.log(params)
            if(flag){
                this.$refs['pwd'].open();
            }else{
               mui.toast('请修改单价为：'+minPrice+'~'+maxPrice);
            }
        },
        // 创建买单
        addBuy(params){
            let _This = this;
            Trade.addBuy(params).then((res)=>{
                if(res.code ==  1){
                    // _This.$refs['buy'].open();
                    setTimeout(() => {
                        _This.$router.go(-1);
                    }, 500);
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        },
        // 设置提示语
        setText(type){
            switch(type){
                case 'sale':
                    this.text = '您的卖单已提交';
                    break;
                case 'buy':
                    this.text = '您的买单已提交';
                    break;
            }
        },
        go(){
            this.$router.go(-1);
        },
        async getPayInfo(id){
            let _this = this;
            await Owner.getPayInfo({id}).then(res=>{
                if(res.code == 1){
                    this.payInfo = res.data;
                let flag = Object.values(this.payInfo[0]).some(v=> String(v)!='null'&&v!='');
                if(!flag){
                    mui.alert('请先绑定支付方式',()=>{
                        _this.$router.go(-1);
                    })
                }
                }else {
                    mui.toast(res.msg);
                    return ;
                }
            })
        }
        // sendSms(){
        //     let params = {
        //         mobile:this.userInfo.mobile,
        //         event:this.type=='sale'?'sell':'buy'
        //     };
        //     Base.getSmsCode(params).then(res=>{});
        // }
    }
}
</script>

<style scoped lang="less">
@import '~link-less';
.body {
    background-color: @base-white;
    padding-bottom: 100px;
    .post-list {
        .post-item {
            background-color: white;
            font-size: 28px;
            height: 112px;
            // line-height: 112px;
            padding: @margin-primary;
            border-bottom: 1px solid #f3f3f3;
            .display-flex();
            align-items: center;
            .form-label {
                flex: 0 0 180px;
                margin-right: 30px;
            }
            .price-label {
                position: relative;
                &::after {
                    content: '￥';
                    position: absolute;
                    top: 50%;
                    .transform(translateY(-50%));
                    right: -30px;
                }
            }
            .newline {
                line-height: initial;
            }
            .form-input {
                border: none;
                padding: 0;
                margin: 0;
            }
            .hasValue {
                color: @font-primary-color;
            }
            .unit {
                flex: 1 1 180px;
            }
        }
        .post-item-code {
            height: auto;
            .code {
                height: 224px;
            }
        }
        // .post-item:first-child {
        //     border-bottom: none;
        // }
        .sms-code {
            color: @btn-primary-color;
            padding: 12px 30px;
            border: 2px solid @btn-primary-color;
            border-radius: 30px;
        }
        .un-click {
            background-color: #eee;
            color: #999;
            border: none;
        }
    }
    .btn-add {
        .btm-btn-primary();
        position: absolute;
        bottom: 0;
        width: 100%;
        margin-left: 0;
        border-radius: 0;
    }
}

</style >

