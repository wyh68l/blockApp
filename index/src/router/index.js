import Vue from 'vue';
import Router from 'vue-router';
import {Util} from '@/assets/commonjs/utils.js';
// import store from '../store/index';
// import { resolve } from 'url';

const notFoundPage = () => import('@/views/404Page');
const Welcome = () => import('@/views/welcome');
const UploadWgt = () => import('@/views/uploadWgt');


// 用户相关  -start
const SetPwd = resolve => require(['@/views/init/set-pwd.vue'], resolve);
const Login = resolve => require(['@/views/init/login.vue'], resolve);
const BackPwd = resolve => require(['@/views/init/back-pwd.vue'], resolve);
const Register = resolve => require(['@/views/init/register.vue'], resolve);

// 用户相关  -end

// 理财  ----
const Financial = resolve => require(['@/views/financial/index.vue'], resolve);
const MyFin = resolve => require(['@/views/financial/myFin.vue'], resolve);
const MyFinDetail = resolve => require(['@/views/financial/myFinDetail.vue'], resolve);

// --------------------------------------------------------------------------


// const Agreement = resolve => require(['@/views/init/rentAgreement.vue'], resolve);
// 资产
const Transfer = () => import('@/views/assets/transfer.vue');
const Exchange = () => import('@/views/assets/exchange.vue');
const CoinDetail = () => import('@/views/assets/coinDetail.vue');
const Bill = () => import('@/views/my/nav/bill.vue');


//理财模块
const Index = () => import('@/views/index/index.vue');
const Purchase = () => import('@/views/index/purchase.vue');
const Service = () => import('@/views/service/index.vue');
const My = () => import('@/views/my/index.vue');
const Assets = () => import('@/views/assets/index.vue');
const Trade = () => import('@/views/trade/index.vue');
const Find = () => import('@/views/find/index.vue');


// 淘金区模块  --start

const StartMining = resolve => require(['@/views/pan-gold/start-mining.vue'], resolve)
const BuyResule = resolve => require(['@/views/pan-gold/buy-result.vue'], resolve)
//申诉
// const Appeal = resolve => require(['@/views/pan-gold/appeal.vue'], resolve)
const NoticeDetail = resolve => require(['@/views/index/noticeDetail.vue'], resolve)
const Notice = resolve => require(['@/views/index/notice.vue'], resolve)
const CarRent = resolve => require(['@/views/trade/carRent.vue'], resolve)//矿机租凭
const MyRent = resolve => require(['@/views/financial/myRent/index.vue'], resolve)//我的租凭
const CollocationInfo = resolve => require(['@/views/financial/collocation.vue'], resolve)//托管
const Collocation_2 = resolve => require(['@/views/financial/collocation_2.vue'], resolve)//托管版本2
const ExitRentInfo = resolve => require(['@/views/financial/exitRentInfo.vue'], resolve)//退出租凭详情
const ExitRent = resolve => require(['@/views/financial/ExitRent.vue'], resolve)//退出出租
const Checkout = resolve => require(['@/views/financial/checkoutList.vue'], resolve)//收款记录
const CheckoutInfo = resolve => require(['@/views/financial/checkoutInfo.vue'], resolve)//融资租凭
const TradeInfo = resolve => require(['@/views/find/tradeInfo.vue'], resolve)//行业咨询
const Rent = resolve => require(['@/views/financial/rent.vue'], resolve)//立即租凭
const CollocationList = resolve => require(['@/views/financial/CollocationList.vue'], resolve)//立即租凭
const RenInfo = resolve => require(['@/views/financial/myRent/renInfo.vue'], resolve)//融资租凭
const rentAgreement = resolve => require(['@/views/financial/rentAgreement.vue'], resolve)//协议
const CarInfo = resolve => require(['@/views/trade/carInfo.vue'], resolve)//矿机详情
const CarRentInfo = resolve => require(['@/views/trade/carRentInfo.vue'], resolve)//矿机租凭详情
const MyRentCar = resolve => require(['@/views/trade/myRentCar.vue'], resolve)//我的矿机
const MyRentCarInfo = resolve => require(['@/views/trade/myRentCarInfo.vue'], resolve)//我的矿机详情
const Details = resolve => require(['@/views/find/details.vue'], resolve)//动态内容
const Upload = resolve => require(['@/views/find/upload.vue'], resolve)//动态上传文件
const MyCircle = resolve => require(['@/views/find/myCircle.vue'], resolve)//动态我上传的文件
const Advertise = resolve => require(['@/views/find/advertise.vue'], resolve)//动态里的广告
const Sign = resolve => require(['@/views/my/sign.vue'], resolve)//签到
const Message = resolve => require(['@/views/my/message.vue'], resolve)//消息中心
const SystemList = resolve => require(['@/views/my/busi/systemList.vue'], resolve)//系统列表
const OrderList = resolve => require(['@/views/my/orderList.vue'], resolve)//订单列表
const SystemInfo = resolve => require(['@/views/my/SystemInfo.vue'], resolve)//系统信息
const Income = resolve => require(['@/views/my/income.vue'], resolve)//收益中心
// 淘金区模块  --end


//客服中心
// const Help = resolve => require(['@/views/service/help.vue'], resolve)
const Problem = resolve => require(['@/views/service/problem.vue'], resolve)
const QuestionDetails = resolve => require(['@/views/my/nav/help/question-details.vue'], resolve)
const QuestionList = resolve => require(['@/views/my/nav/help/question-list.vue'], resolve)


// 服务  ----start

// 服务  ----end


// 我的  --start
const Bestpeak = resolve => require(['@/views/my/record/bestpeak.vue'], resolve);
const Mine = resolve => require(['@/views/my/record/mine.vue'], resolve);
const Attorn = resolve => require(['@/views/my/record/attorn.vue'], resolve);
const Detail = resolve => require(['@/views/my/record/detail.vue'], resolve);
const Invite = resolve => require(['@/views/my/nav/invite.vue'], resolve);
const Certify = resolve => require(['@/views/my/certify.vue'], resolve);
const PayInfo = resolve => require(['@/views/my/nav/pay/index.vue'], resolve);
const AddShan = resolve => require(['@/views/my/add-shandui.vue'], resolve)
const ExchangeLog = resolve => require(['@/views/my/exchangeLog.vue'], resolve)
const AddCard = resolve => require(['@/views/my/nav/pay/add-card.vue'], resolve);
const Bind = resolve => require(['@/views/my/nav/pay/bind.vue'], resolve);
const Team = resolve => require(['@/views/my/nav/team/index.vue'], resolve);
const TeamList = resolve => require(['@/views/my/nav/team/team-list.vue'], resolve);
const Set = resolve => require(['@/views/my/set.vue'], resolve);
const ShaiTu = resolve => require(['@/views/my/shaitu.vue'], resolve);
const Dial = resolve => require(['@/views/my/dial.vue'], resolve);
const BlockMine = resolve => require(['@/views/my/middle/block-mine.vue'], resolve);
const Extract = resolve => require(['@/views/my/middle/extract.vue'], resolve);
const ExtractRecord = resolve => require(['@/views/my/middle/extract-record.vue'], resolve)
const MiningMachine = resolve => require(['@/views/my/middle/mining-machine.vue'], resolve)
const TurnOut = resolve => require(['@/views/my/middle/turn-out.vue'], resolve)
const Recharge = resolve => require(['@/views/my/middle/recharge.vue'], resolve)
const CheckUpdate = resolve => require(['@/views/my/checkUpdate.vue'], resolve)
const HatchRecord = resolve => require(['@/views/my/nav/hatchRecord.vue'], resolve)
const Buy = resolve => require(['@/views/my/busi/buy.vue'], resolve)
const AddOrder = resolve => require(['@/views/my/busi/addOrder.vue'], resolve)
const Appeal = resolve => require(['@/views/my/busi/appeal.vue'], resolve)
const Order = resolve => require(['@/views/my/busi/order.vue'], resolve)
const Sell = resolve => require(['@/views/my/busi/Sell.vue'], resolve)
const OrderDetail = resolve => require(['@/views/my/busi/orderDetail.vue'], resolve)
const Card = resolve => require(['@/views/my/busi/card.vue'], resolve)
const ChangeMobile = resolve => require(['@/views/my/nav/changeMobile.vue'], resolve)
const Help = resolve => require(['@/views/my/nav/help/index.vue'], resolve)
const Question = resolve => require(['@/views/my/nav/help/question.vue'], resolve)
const Customer = resolve => require(['@/views/my/nav/help/customer.vue'], resolve)


// 我的  --end


// 用户相关  -start
// const SetPwd = resolve => require(['@/views/init/set-pwd.vue'], resolve);
// const Login = resolve => require(['@/views/init/login.vue'], resolve);
// const BackPwd = resolve => require(['@/views/init/back-pwd.vue'], resolve);
// const Register = resolve => require(['@/views/init/register.vue'], resolve);


// 用户相关  -end

// 下载
const Download = resolve => require(['@/views/download.vue'], resolve)


// 资产
// const assets = resolve => require(['@/views/download.vue'], resolve)


Vue.use(Router);
let routes = [
  {
    path: '/',
    redirect: {name: 'Index'}
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/uploadwgt',
    name: 'UploadWgt',
    component: UploadWgt
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/coindetail/:type/:num',
    name: 'CoinDetail',
    component: CoinDetail
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: Exchange
  },
  {
    path: '/purchase/:id',
    name: 'Purchase',
    component: Purchase
  },
  // {
  //     path: '/agreement',
  //     name:'Agreement',
  //     component:Agreement
  // },
  {
    path: '/my/hatchrecord',
    name: 'HatchRecord',
    component: HatchRecord
  },
  {
    path: '/my/busi/buy',
    name: 'Buy',
    component: Buy
  },
  {
    path: '/my/busi/sell',
    name: 'Sell',
    component: Sell
  },
  {
    path: '/my/busi/orderDetail/:id/:state',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/my/busi/card',
    name: 'Card',
    component: Card
  },
  {
    path: '/my/busi/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/my/nav/changeMobile',
    name: 'ChangeMobile',
    component: ChangeMobile
  },
  {
    path: '/my/nav/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/my/nav/question',
    name: 'Question',
    component: Question
  },
  {
    path: '/my/nav/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/my/nav/bill',
    name: 'Bill',
    component: Bill
  },
  {
    path: '/my/order/appeal/:tradesn',
    name: "Appeal",
    component: Appeal
  },
  {
    path: '/my/order/addOrder/:type',
    name: "AddOrder",
    component: AddOrder
  },

  //淘金区
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/my',
    name: 'My',
    component: My
  },
  {
    path: '/bestpeak',
    name: 'Bestpeak',
    component: Bestpeak
  },
  {
    path: '/bestpeak',
    name: 'Bestpeak',
    component: Bestpeak
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/attorn',
    name: 'Attorn',
    component: Attorn
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite
  },
  {
    path: '/certify',
    name: 'Certify',
    component: Certify
  },
  {
    path: '/payinfo',
    name: 'PayInfo',
    component: PayInfo
  },
  {
    path: '/addcard',
    name: 'AddCard',
    component: AddCard
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/teamlist',
    name: 'TeamList',
    component: TeamList
  },
  {
    path: '/bind/:type',
    name: 'Bind',
    component: Bind
  },
  {
    path: '/set',
    name: 'Set',
    component: Set
  },
  {
    path: '/setpwd',
    name: 'SetPwd',
    component: SetPwd
  },
  {
    path: '/shaitu',
    name: 'ShaiTu',
    component: ShaiTu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/backpwd',
    name: 'BackPwd',
    component: BackPwd
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dial',
    name: 'Dial',
    component: Dial
  },
  {
    path: '/my/middle/block-mine',
    name: 'BlockMine',
    component: BlockMine
  },
  {
    path: '/my/middle/extract',
    name: 'Extract',
    component: Extract
  },
  {
    path: '/my/middle/extract-record',
    name: 'ExtractRecord',
    component: ExtractRecord
  },
  {
    path: '/my/middle/mining-machine',
    name: 'MiningMachine',
    component: MiningMachine
  },
  {
    path: '/my/middle/turn-out',
    name: 'TurnOut',
    component: TurnOut
  },
  {
    path: '/my/middle/recharge',
    name: 'Recharge',
    component: Recharge
  },
  {
    path: '/index/notice',
    name: 'Notice',
    component: Notice
  },
  {
    path: '/index/noticeDetail/:id',
    name: "NoticeDetail",
    component: NoticeDetail
  },
  {
    path: '/my/checkupdate',
    name: "CheckUpdate",
    component: CheckUpdate
  },
  {
    path: '/financial/myRent',
    name: "MyRent",
    component: MyRent
  },
  {
    path: '/financial/collocationInfo',
    name: "CollocationInfo",
    component: CollocationInfo
  },
  {
    path: '/financial/collocation',
    name: "Collocation_2",
    component: Collocation_2
  },
  {
    path: '/financial/exitRentInfo',
    name: "ExitRentInfo",
    component: ExitRentInfo
  },
  {
    path: '/financial/exitRent',
    name: "ExitRent",
    component: ExitRent
  },
  {
    path: '/financial/rent',
    name: "Rent",
    component: Rent
  },
  {
    path: '/financial/collocationList',
    name: "CollocationList",
    component: CollocationList
  },
  {
    path: '/financial/myRent/renInfo',
    name: "RenInfo",
    component: RenInfo
  },
  {
    path: '/financial/rentAgreement',
    name: "rentAgreement",
    component: rentAgreement
  },
  {
    path: '/trade/CarInfo',
    name: "CarInfo",
    component: CarInfo
  },
  {
    path: '/trade/carRentInfo',
    name: "CarRentInfo",
    component: CarRentInfo
  },
  {
    path: '/trade/carRent',
    name: "CarRent",
    component: CarRent
  },
  {
    path: '/trade/myRentCar',
    name: "MyRentCar",
    component: MyRentCar
  },
  {
    path: '/trade/myRentCarInfo',
    name: "MyRentCarInfo",
    component: MyRentCarInfo
  },
  {
    path: '/find',
    name: "Find",
    component: Find
  },
  {
    path: '/find/details',
    name: "Details",
    component: Details
  },
  {
    path: '/find/details/advertise',
    name: "Advertise",
    component: Advertise
  },
  {
    path: '/sign',
    name: "Sign",
    component: Sign
  },
  {
    path: '/message',
    name: "Message",
    component: Message
  },
  {
    path: '/systemList',
    name: "SystemList",
    component: SystemList
  },
  {
    path: '/orderList',
    name: "OrderList",
    component: OrderList
  },
  {
    path: '/systemInfo',
    name: "SystemInfo",
    component: SystemInfo
  },
  {
    path: '/income',
    name: "Income",
    component: Income
  },
  {
    path: '/upload',
    name: "Upload",
    component: Upload
  },
  {
    path: '/myCircle',
    name: "MyCircle",
    component: MyCircle
  },
  {
    path: '/checkout',
    name: "Checkout",
    component: Checkout
  },
  {
    path: '/checkoutInfo',
    name: "CheckoutInfo",
    component: CheckoutInfo
  },
  {
    path: '/tradeInfo',
    name: "TradeInfo",
    component: TradeInfo
  },



// 淘金区模块  --start
  {
    path: '/pan-gold/start-mining/:level',
    name: 'StartMining',
    component: StartMining
  },
  {
    path: '/pan-gold/buy-result',
    name: 'BuyResule',
    component: BuyResule
  },


//客服中心

  // {
  //     path:'/service/help',
  //     name:'Help',
  //     component:Help
  // },
  {
    path: '/service/problem',
    name: 'Problem',
    component: Problem
  },
  {
    path: '/service/question-details',
    name: 'QuestionDetails',
    component: QuestionDetails
  },
  {
    path: '/service/question-list/:id',
    name: 'QuestionList',
    component: QuestionList
  },

  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets
  },
  {
    path: '/trade',
    name: 'Trade',
    component: Trade
  },
  {
    path: '/financial',
    name: 'Financial',
    component: Financial
  },
  {
    path: '/myfin',
    name: 'MyFin',
    component: MyFin
  },
  {
    path: '/myfin/detail/:id',
    name: 'MyFinDetail',
    component: MyFinDetail
  },
  // 闪兑
  {
    path: '/addshan',
    name: 'AddShan',
    component: AddShan
  },
  {
    path: '/addshan/log',
    name: 'ExchangeLog',
    component: ExchangeLog
  },


  {
    path: '*',
    name: '404Page',
    component: notFoundPage
  }
];
// routes = routes.concat(myCenterRouter);

let router = new Router({
  mode: "hash",
  routes: routes
});
// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('user_id')) {
//     if (Util.isWhite(to.name)) {
//       if (to.name == 'Login') {
//         next({name: 'Index'})
//       } else {
//         next({name: from.name});
//       }
//     } else {
//       next();
//     }
//   } else {
//     if (Util.isWhite(to.name)) {
//       next();
//     } else {
//       next({name: 'Login'});
//       // next({name:'Welcome'});
//     }
//   }
// });

export default router;
