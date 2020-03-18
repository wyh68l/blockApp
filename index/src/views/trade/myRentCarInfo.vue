<template>
  <div class="page">
    <m-header :title="language.my_machine" :canback="Boolean(true)"></m-header>

    <div class="content">
      <ul>
        <li v-if="myRentCarDetail.length !== 0">
          <div class="title">
            <h3>{{language.numbering}}：{{myRentCarDetail.ordersn}}</h3>
          </div>
          <div class="content">
            <div class="itemLeft">
              <h3>{{myRentCarDetail.machinename}}</h3>
              <p class="sum" v-show="typeId === 0">{{language.total_deposit}}：{{myRentCarDetail.price}}XKB</p>
              <p class="sum" v-show="typeId === 1">{{language.total_deposit}}：{{myRentCarDetail.price}}USDT</p>
              <p>{{language.days}}：<span>{{myRentCarDetail.life}}</span></p>
              <p v-show="typeId === 0">{{language.pay_price}}：<span>{{myRentCarDetail.price}} XKB</span></p>
              <p v-show="typeId === 1">{{language.pay_price}}：<span>{{myRentCarDetail.price}} USDT</span></p>
              <p>{{language.currency}}：<span>{{myRentCarDetail.remark}}</span></p>
              <p>{{language.pay_date}}：<span>{{formatDate(myRentCarDetail.createtime)}}</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="submit">
      <button @click="cancel" v-if="myRentCarDetail.status === 'normal'">{{language.withdraw}}</button>
      <button v-if="myRentCarDetail.status === 'hidden'" style="background-color: rgb(153, 153, 153);">{{language.resold}}</button>
    </div>

    <Alert v-if="type === 'cancel'">
      <h3 slot="top" class="title">{{lang.common.pay_password}}</h3>
      <div slot="content" class="content">
        <img src="~assets/images/bjwz/tip.png" alt="">
        <p>{{rate.explain}}</p>
      </div>
      <div slot="bottom" class="button">
        <button @click="type = null" :disabled="isClick">{{lang.common.cancel}}</button>
        <button style="color: #3385FF;" @click="carRebate" :disabled="isClick">{{language.back}}</button>
      </div>
    </Alert>

<!--    <Alert v-if="type === 'rebate'">-->
<!--      <h3 slot="top" class="title">资金密码</h3>-->
<!--      <input slot="input" class="input" placeholder="请输入资金密码" v-model="formData.pwd" type="password">-->
<!--      <div slot="bottom" class="button">-->
<!--        <button @click="type = null">取消</button>-->
<!--        <button style="color: #3385FF;" @click="carRebate">确定</button>-->
<!--      </div>-->
<!--    </Alert>-->
  </div>
</template>

<script>
    import {Util} from '@/assets/commonjs/utils.js';
    import Alert from "../../components/Alert";
    import {Index} from '@/server/server.js';
    import {mapGetters} from 'vuex';

    export default {
        name: "myRentCarInfo",
        data() {
            return {
                type: null,
                typeId:0,
                myRentCarDetail: [],
                id: null,
                rate:null,
                isClick:false,
                formData: {
                    id: null,
                    // pwd: null
                },
                language:{},
            }
        },
        created() {
            this.language = this.lang.machine;
            this.typeId = Number(this.$route.query.typeId);
            this.getCarRebateRate();
            this.getMyRentCarMes();
        },
        computed: {
            ...mapGetters(['lang'])
        },
        methods: {
            cancel() {
                this.type = 'cancel'
            },
            // rebate() {
            //     this.type = 'rebate'
            // },
            getMyRentCarMes() {
                this.id = this.$route.query.id;
                Index.getMyRentCarDetail({id: this.id}).then(res => {
                    console.log(res.data);
                    if (res.code === 1) {
                        this.myRentCarDetail = res.data;
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            formatDate(time) {
                return Util.formatDate(time)
            },
            getCarRebateRate() {
                Index.getRebateRate().then(res => {
                    if (res.code === 1) {
                       this.rate = res.data
                    } else {
                        mui.toast(res.msg);
                    }
                })
            },
            carRebate() {
                this.formData.id = this.id;
                Index.carRebate(this.formData).then(res => {
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
    > .content {
      width: 92%;
      margin: 0 auto;
      margin-top: 20px;


      ul {
        li {
          background-color: #fff;
          padding: 30px 28px;
          margin-bottom: 20px;
          border-radius: 16px;

          .title {
            height: 86px;
            border-bottom: 1px solid #f6f6f6;

            h3 {
              font-size: 28px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(157, 166, 179, 1);
              line-height: 86px;

              span {
                float: right;
                font-size: 28px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 133, 255, 1);
                line-height: 86px;
              }
            }
          }

          .content {
            margin-top: 32px;

            .itemLeft {
              h3 {
                font-size: 32px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(51, 133, 255, 1);
              }

              p {
                font-size: 32px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #020202;
                line-height: 36px;
                margin-bottom: 30px;

                span {
                  float: right;
                  font-size: 28px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(143, 149, 170, 1);
                  line-height: 32px;
                }
              }

              .sum {
                font-size: 32px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                line-height: 36px;
                margin: 40px 0;
              }
            }
          }
        }
      }
    }

    .submit {
      border-radius: 4px;
      opacity: 0.9;
      text-align: center;

      button {
        width: 80%;
        height: 90px;
        margin: 80px auto;
        background: rgba(51, 133, 255, 1);
        border-radius: 16px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 90px;
      }
    }
  }

</style>
