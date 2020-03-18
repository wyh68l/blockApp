<template>
  <div class="page">
    <m-header :title="language.lease_details" :canback="Boolean(true)" class="header"></m-header>

    <div class="body">
      <ul class="wrap">
        <li class="list" v-if="rentCarDetail.list !== undefined">
          <span>{{rentCarDetail.list[listIndex].list_xh}}</span>
        </li>
        <li class="list">
          <span>{{language.machine_name}}</span>
          <input type="text" :placeholder="rentCarDetail.name" class="inp-num" readonly/>
        </li>
        <li class="list">
          <span>{{language.input_quantity}}</span>
          <input type="number" class="inp-num" v-model="formData.price" />
        </li>
        <li class="list">
            <span>{{language.cycle}}</span>
          <select name="" v-model="listIndex">
            <option :value="index" v-for="(item,index) in rentCarDetail.list" :key="index">{{item.life}}{{language.day}}</option>
          </select>
        </li>
        <li class="list sum">
          <span>{{language.total_amount_pay}}</span>
          <span>
            {{formData.price}}
            <span v-show="typeId === 0">XKB</span>
            <span v-show="typeId === 1">USDT</span>
          </span>
        </li>
        <li class="list pay">
          <div>
            <h3>{{language.payment_method}}</h3>
            <p v-show="typeId === 0"><img src="~assets/images/bjwz/pay.png" alt="">XKB{{language.pay}}</p>
            <p v-show="typeId === 1"><img src="~assets/images/bjwz/USDT.png" alt="">USDT{{language.pay}}</p>
          </div>
          <div class="mui-input-row mui-checkbox mui-left">
            <div></div>
            <input type="checkbox" class="treaty" v-model="isCheck"/>
          </div>
        </li>
      </ul>
      <button type="button" class="btn-add" @click="rent">{{language.immediate_lease}}</button>

      <Alert v-if="type === 'rent'">
        <h3 slot="top" class="title">{{lang.common.pay_password}}</h3>
        <input slot="input" class="input" :placeholder="lang.common.enter_pay_password" v-model="formData.pwd" type="password">
        <div slot="bottom" class="button">
          <button @click="type = null" :disabled="isClick">{{lang.common.cancel}}</button>
          <button style="color: #3385FF;" @click="buyCar" :disabled="isClick">{{lang.common.determine}}</button>
        </div>
      </Alert>
    </div>

  </div>
</template>

<script>
    import {Index} from '@/server/server.js';
    import {Load} from "@/assets/commonjs/utils.js";
    import Alert from "../../components/Alert";
    import {mapGetters} from 'vuex';

    export default {
        name: "carRentInfo",
        data() {
            return {
                type: null,
                typeId:0,
                id:null,
                listIndex:0,
                isCheck:true,
                isClick:false,
                formData:{
                    id:null,
                    list_xh:null,
                    price:null,
                    pwd:null,
                    type:'XKB'
                },
                rentCarDetail:{},
                language:{},
            }
        },
        created(){
            this.language = this.lang.machine;
            this.getRentCar();
        },
        computed: {
            ...mapGetters(['lang'])
        },
        methods: {
            rent() {
                this.type = 'rent'
            },
            getRentCar(){
                this.typeId = Number(this.$route.query.typeId);
                this.typeId === 0?this.formData.type = 'XKB':this.formData.type = 'USDT';
                this.id = this.$route.query.id;
                Index.getRentCarInfo({id:this.id}).then(res => {
                    console.log(res.data);
                    if(res.code === 1){
                        this.rentCarDetail = res.data;
                        this.length = this.rentCarDetail.list.length;
                    }else{
                        mui.toast(res.msg);
                    }
                })
            },
            buyCar() {
                if(!this.isCheck){
                    mui.toast(this.language.payment_method);
                    return false;
                }
                this.formData.id = this.id;
                this.formData.list_xh = this.rentCarDetail.list[this.listIndex].list_xh;
                console.log(this.formData);
                Index.buyCar(this.formData).then(res => {
                    let _This = this;
                    if (res.code === 1) {
                        mui.toast(res.msg);
                        this.isClick = true;
                        setTimeout(() => {
                            _This.$router.go(-1);
                        }, 500);
                    } else {
                        mui.toast(res.msg);
                    }
                })
            }
        },
        components: {
            Alert
        }
    }
</script>

<style scoped lang="less">
  .page {
    .body {
      .wrap {
        background-color: #fff;

        .list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 34px;
          border-bottom: 1px solid #eee;
          padding: 28px 32px;

          .inp-num {
            flex: 1;
            padding: 0 0 0 20px;
            height: auto;
            border: none;
            margin: 0;
            text-align: right;
          }

          select {
            width: 15%;
          }
        }

        .sum {
          height: 220px;
          margin: 0 auto;
          border-bottom: 38px solid #F7F9FC;
          border-top: 38px solid #F7F9FC;
          border-left: 24px solid #F7F9FC;
          border-right: 24px solid #F7F9FC;
        }

        .pay {
          height: 198px;

          h3 {
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
            margin-bottom: 20px;
          }

          img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            transform: translate(0, 5px);
          }

          p {
            font-size: 30px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
          }
        }
      }

      .mui-left {
        display: flex;
        align-items: center;
        background-color: #fff;
      }

      .mui-checkbox.mui-left div {
        padding-right: 15px;
        padding-left: 100px;
      }

      .mui-checkbox div {
        display: inline-block;
        float: none;
        width: 100%;
        padding-right: 58px;
      }

      .mui-input-row {
        overflow: initial;
      }

      .mui-input-row div {
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        line-height: 2;
        float: left;
        padding: 11px 15px;
      }

      .btn-add {
        width: 80%;
        display: block;
        padding: 30px;
        margin: 30px auto;
        background: #3385FF;
        border-radius: 10px;
        margin-top: 104px;
      }
    }
  }

</style>
