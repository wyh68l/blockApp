import axios from 'axios'
import qs from 'qs'

/**
 * 基础模块
 */
export const Base = new class {
  constructor() {
    this.cityApi = '/api/user/getcity';//地区
    this.uploadApi = '/api/user/upload';  //上传
    this.sendcodeApi = '/api/sms/send';//验证码
    this.imgcodeApi = '/api/Captcha/get'; //图形验证码
    this.bankApi = '/api/user/getbank';//银行
    this.download = '/api/app/info'; //下载
    this.uploadWgtApi = '/api/upload/upFile';//上传wgt
    this.downloadWgtAPi = '/api/upload/downfile';//下载资源更新
    this.getVersionAPi = '/api/upload/getVersion'; //获取服务器版本号
  }

  getCity() {
    return axios.post(this.cityApi).then((res) => res.data);
  }

  getBank() {
    return axios.post(this.bankApi).then((res) => res.data);
  }

  upload(params) {
    return axios.post(this.uploadApi, params).then((res) => res.data);
  }

  sendCode(params) {
    return axios.post(this.sendcodeApi, qs.stringify(params)).then((res) => res.data);
  }

  getImgCode(params) {
    return axios.get(this.imgcodeApi, {params}).then((res) => res.data);
  }

  getDownload() {
    return axios.get(this.download).then((res) => res.data);
  }

  uploadWgt(params) {
    return axios.post(this.uploadWgtApi, params).then((res) => res.data);
  }

  getVersion() {
    return axios.get(this.getVersionAPi).then((res) => res.data);
  }
}

/**
 * 用户模块
 */
export const Init = new class {
  constructor() {
    this.uploadApi = '/api/user/upload';  //上传
    this.registerApi = '/api/user/register';  //注册
    this.changepwdApi = '/api/user/getbackpass';  //修改
    this.backpwdApi = '/api/user/getbackpass';  //忘记密码
    this.userApi = '/api/user/getinfo'; //用户信息
    this.capitalApi = ''; //用户资产
    this.realApi = '/api/user/changeisreal';  //实名认证
    this.realInfoApi = '/api/user/changeisrealinfo'; //实名信息
    this.loginApi = '/api/user/login';  //登录
    this.loginStateApi = '/api/user/login_state';//检测登录状态
    this.backTradeApi = '/api/user/uppaypsw';//修改交易密码
    this.quitApi = '/api/user/logout';//退出登录
    this.agreementApi = '/api/user/registerxieyi'; //用户协议
    this.setLanguageApi = '/api/user/setLanguage'; //设置语言
    this.getLanguageApi = '/api/user/getLanguage'; //获取多语言

  }

  upload(params) {
    return axios.post(this.uploadApi, params).then((res) => res.data)
  }

  getLanguage(params) {
    return axios.post(this.getLanguageApi, params).then((res) => res.data)
  }

  register(params) {
    return axios.post(this.registerApi, qs.stringify(params)).then((res) => res.data)
  }

  changePwd(params) {
    return axios.post(this.changepwdApi, qs.stringify(params)).then((res) => res.data)
  }

  backpwd(params) {
    return axios.post(this.backpwdApi, qs.stringify(params)).then((res) => res.data)
  }

  getUser(params) {
    return axios.post(this.userApi, qs.stringify(params)).then((res) => res.data)
  }

  getCapital(params) {
    return axios.post(this.capitalApi, qs.stringify(params)).then((res) => res.data)
  }

  toReal(params) {
    return axios.post(this.realApi, qs.stringify(params)).then((res) => res.data)
  }

  getReal() {
    return axios.post(this.realInfoApi).then((res) => res.data)
  }

  login(params) {
    return axios.post(this.loginApi, qs.stringify(params)).then((res) => res.data)
  }

  backTrade(params) {
    return axios.post(this.backTradeApi, qs.stringify(params)).then((res) => res.data)
  }

  quit() {
    return axios.get(this.quitApi).then((res) => res.data)
  }

  getAgree() {
    return axios.post(this.agreementApi).then((res) => res.data);
  }

  setLanguage(params) {
    return axios.post(this.setLanguageApi, qs.stringify(params)).then((res) => res.data);
  }
  loginState(params) {
    return axios.get(this.loginStateApi).then((res) => res.data);
  }
}

/**
 * 资产
 */
export const Assets = new class {
  constructor() {
    this.coinListApi = '/api/withdrawal/open';  //币种列表
    this.coinTypeAPi = '/api/withdrawal/rollOut';//币种类型
    this.exchangeApi = '/api/withdrawal/exchange'; //币种兑换
    this.exchangeLogApi = '/api/withdrawal/getExchangeLog'; //兑换记录
    this.billAPi = '/api/log/ccdetails';//账户明细
    this.itbDepositApi = '/api/user/decitb';//i淘币转出
    this.jcbDepositApi = '/api/user/decjcb';//剿巢币转出
    this.balanceApi = '/api/index/bzinfo'//币种信息
    this.valueApi = '/api/user/selecc'//币余额
    this.recodeApi = '/api/user/record'; //账户明细
    this.dhLogApi = '/api/user/dhlog';//兑换记录
    this.dhrateApi = '/api/index/dhbl';//兑换的比例
  }

  getValue() {
    return axios.get(this.valueApi).then((res) => res.data);
  }

  getBalance() {
    return axios.get(this.balanceApi).then((res) => res.data);
  }

  handleJcbDepositApi(params) {
    return axios.post(this.jcbDepositApi, qs.stringify(params)).then((res) => res.data);
  }

  handleItbDepositApi(params) {
    return axios.post(this.itbDepositApi, qs.stringify(params)).then((res) => res.data);
  }

  getCoin(params) {
    return axios.post(this.coinListApi, qs.stringify(params)).then((res) => res.data);
  }

  getCoinType(params) {
    return axios.post(this.coinTypeAPi, qs.stringify(params)).then((res) => res.data);
  }

  exchange(params) {
    return axios.post(this.exchangeApi, qs.stringify(params)).then((res) => res.data);
  }

  getExchangeLog(params) {
    return axios.post(this.exchangeLogApi, qs.stringify(params)).then((res) => res.data);
  }

  getBill(params) {
    return axios.post(this.billAPi, qs.stringify(params)).then((res) => res.data);
  }

  getBillRecord(params) {
    return axios.post(this.recodeApi, qs.stringify(params)).then((res) => res.data);
  }

  getDhLog(params) {
    return axios.post(this.dhLogApi, qs.stringify(params)).then((res) => res.data);
  }

  getDhRate() {
    return axios.post(this.dhrateApi).then((res) => res.data);
  }

}

/**
 * 个人中心
 */
export const Owner = new class {
  constructor() {
    this.bespeakListApi = '';//预约列表
    this.teamApi = '/api/user/team';//团队
    this.kjfeeApi = '/api/user/getkjfee';//充值矿机费率
    this.payInfoApi = '/api/user/payinfo';//支付信息
    this.bindaliApi = '/api/user/uppay'; //支付宝绑定
    this.bindwechatApi = '/api/user/upwechar'; //微信绑定
    this.userCoinApi = '/api/user/getUserCoin'; //资产模块
    this.coinOrderApi = '/api/user/getCoinOrder';//明细
    this.coinApi = '/api/user/getCoin';//矿机与推广收益
    this.transferApi = '/api/user/transfer';//转出
    this.shaituApi = '/api/usershow/add';  //晒图
    this.rechargeInfoApi = '/api/user/getRechargeInfo'; //矿机充值信息
    this.rechargeApi = '/api/user/addRechargeLog'; //充值信息
    this.booklistApi = '/api/booking/booking/getlog'; //预约记录
    this.sellInfoApi = '/api/order/order/getSellPay'; //预约记录
    this.bindbankApi = '/api/user/upbank'; //银行卡绑定
    this.payApi = '/api/order/order/payment'; //支付
    this.diallistApi = '/api/turntable/getlist';  //转盘奖品
    this.rewardApi = '/api/turntable/getreward';  //奖品

    // 矿机记录
    this.buystutasApi = '/api/order/order/buyStutas'; //抢矿中列表
    this.buystutas2Api = '/api/order/order/buyStutas2'; //抢矿收益中列表
    this.buyappealApi = '/api/order/order/buyAppeal'; //抢矿申诉列表

    // 转让记录
    this.sellstatusApi = '/api/order/order/sellStatus'; //待转让列表
    this.sellstatus2Api = '/api/order/order/sellStatus2'; //转让中列表
    this.sellstatus4Api = '/api/order/order/sellStatus4'; //转让完成列表
    this.sellappealApi = '/api/order/order/sellAppeal'; //转让申诉列表
    // 申诉记录
    this.setappealApi = '/api/order/order/setAppeal';  //申诉
    this.buyerApi = '/api/order/order/payment'; //买家信息

    this.contractApi = '/api/order/order/renewContract'; //续约

    this.sellLogApi = '/api/order/sell/getselllog';  //收益出售记录   !!!!暂时不用！！！
    this.setSellApi = '/api/order/sell/setselllog';  //收益出售

    this.applyApi = '/api/wallet/apply'; //提取
    this.applyLogApi = '/api/wallet/lists'; //提取记录
    this.rateApi = '/api/wallet/getRate'; //兑换比例
    this.titleApi = '/api/notice/getTitles';  //公告
    this.noticeDetailApi = '/api/notice/details';  //公告详情

    this.changeMobileApi = '/api/user/binding_mobile';  //绑定手机号码
    this.interestLogApi = '/api/interest/getInterestLog'; //孵化记录
    this.extractApi = '/api/interest/extract'; //理财提取

    // 其他设置
    this.reSetPwd = '/api/docking/resetpwd' // 其他设置修改密码
    this.upPayPsw = '/api/docking/uppaypsw';
    this.machineYestApi = '/api/user/machine_yesterday'; //昨日理财收益

  }

  changePayPsw(params) {
    return axios.post(this.upPayPsw, qs.stringify(params)).then((res) => res.data);
  }

  changePwd(params) {
    return axios.post(this.reSetPwd, qs.stringify(params)).then((res) => res.data);
  }

  getTeam(params) {
    return axios.post(this.teamApi, qs.stringify(params)).then((res) => res.data);
  }

  getPayInfo(params) {
    return axios.get(this.payInfoApi, {params}).then((res) => res.data);
  }

  getUserCoin(params) {
    return axios.get(this.userCoinApi, {params}).then((res) => res.data);
  }

  getCoinOrder(params) {
    return axios.get(this.coinOrderApi, {params}).then((res) => res.data);
  }

  getCoin(params) {
    return axios.post(this.coinApi, qs.stringify(params)).then((res) => res.data);
  }

  getTransfer(params) {
    return axios.post(this.transferApi, qs.stringify(params)).then(res => res.data);
  }

  shaitu(params) {
    return axios.post(this.shaituApi, qs.stringify(params)).then(res => res.data);
  }

  getRechargeInfo(params) {
    return axios.post(this.rechargeInfoApi, qs.stringify(params)).then(res => res.data);
  }

  recharge(params) {
    return axios.post(this.rechargeApi, qs.stringify(params)).then(res => res.data);
  }

  getBooklist(params) {
    return axios.get(this.booklistApi, {params}).then(res => res.data);
  }

  getSellInfo(params) {
    return axios.get(this.sellInfoApi, {params}).then(res => res.data);
  }

  bindAli(params) {
    return axios.post(this.bindaliApi, qs.stringify(params)).then(res => res.data);
  }

  bindwechat(params) {
    return axios.post(this.bindwechatApi, qs.stringify(params)).then(res => res.data);
  }

  getOrder(params) {
    return axios.get(this.orderListApi, {params}).then(res => res.data);
  }

  addBank(params) {
    return axios.post(this.bindbankApi, qs.stringify(params)).then(res => res.data);
  }

  buyStutas(params) {
    return axios.get(this.buystutasApi, {params}).then(res => res.data);
  }

  buyStutas2(params) {
    return axios.get(this.buystutas2Api, {params}).then(res => res.data);
  }

  buyAppeal(params) {
    return axios.get(this.buyappealApi, {params}).then(res => res.data);
  }

  sellStatus(params) {
    return axios.get(this.sellstatusApi, {params}).then(res => res.data);
  }

  sellStatus2(params) {
    return axios.get(this.sellstatus2Api, {params}).then(res => res.data);
  }

  sellStatus4(params) {
    return axios.get(this.sellstatus4Api, {params}).then(res => res.data);
  }

  sellAppeal(params) {
    return axios.get(this.sellappealApi, {params}).then(res => res.data);
  }

  setAppeal(params) {
    return axios.post(this.setappealApi, params).then(res => res.data);
  }

  minePay(params) {
    return axios.post(this.payApi, params).then(res => res.data);
  }

  buyer(params) {
    return axios.get(this.buyerApi, {params}).then(res => res.data);
  }

  getDialList(params) {
    return axios.get(this.diallistApi, {params}).then(res => res.data);
  }

  getReward(params) {
    return axios.get(this.rewardApi, {params}).then(res => res.data);
  }

  contract(params) {
    return axios.post(this.contractApi, qs.stringify(params)).then(res => res.data);
  }

  sellLog() {
    return axios.get(this.sellLogApi).then(res => res.data);
  }

  setSell(params) {
    return axios.post(this.setSellApi, qs.stringify(params)).then(res => res.data);
  }

  apply(params) {
    return axios.post(this.applyApi, qs.stringify(params)).then(res => res.data);
  }

  getapplyList(params) {
    return axios.get(this.applyLogApi, {params}).then(res => res.data);
  }

  getrate() {
    return axios.get(this.rateApi).then(res => res.data);
  }

  getKjfee() {
    return axios.get(this.kjfeeApi).then(res => res.data);
  }

  getTitle(params) {
    return axios.get(this.titleApi, {params}).then(res => res.data)
  }

  getNoticeDetail(params) {
    return axios.get(this.noticeDetailApi, {params}).then(res => res.data)
  }

  changeMobile(params) {
    return axios.post(this.changeMobileApi, qs.stringify(params)).then(res => res.data)
  }

  getInterestLog(params) {
    return axios.post(this.interestLogApi, qs.stringify(params)).then(res => res.data)
  }

  extract(params) {
    return axios.post(this.extractApi, qs.stringify(params)).then(res => res.data)
  }

  getMachineY(params) {
    return axios.get(this.machineYestApi, {params}).then(res => res.data)
  }
}

/**
 * 交易中心模块
 */
export const Trade = new class {
  constructor() {
    this.orderApi = '/api/cc/ccOrder';  //交易订单
    this.addsaleApi = '/api/cc/createSellOrder'; //创建卖单
    this.addbuyApi = '/api/cc/createBuyOrder'; //创建买单
    this.saleconfirmApi = '/api/cc/dealOrder'; //卖家确定
    this.payApi = '/api/cc/payOrder'; //买家付款
    this.ccparamApi = '/api/cc/getCcParam'; //区间价格与比例
    this.orderdetailApi = '/api/cc/detailOrder'; //订单详情
    this.buyApi = '/api/cc/orderSellOrder';  //买入卖单
    this.saleApi = '/api/cc/orderBuyOrder';  //卖出买单
    this.dueApi = '/api/cc/overdue';//订单失效
    this.appealApi = '/api/cc/complaint';//申诉
    this.myOrderApi = '/api/cc/myccOrder'; //我的订单
    this.myPayWayApi = '/api/cc/payinfo'; //已绑定支付方式
    this.getProfitApi = '/api/lease/get_profit'; //融资租赁--我的收益排行
    this.setCoinNameTypeApi = '/api/lease/set_coinName_type'; //融资租赁--设置币种
    this.getCoinNameTypeApi = '/api/lease/get_coinName_type'; //融资租赁--获取币种
    this.getBtypeListApi = '/api/lease/get_btype_list'; //融资租赁--获取默认的币种
    this.getCanoutListApi = '/api/lease/get_canout_list'; //融资租赁--申请退租币种
    this.do_outApi = '/api/lease/do_out'; //融资租赁--提交退租
    this.get_lease_listApi = '/api/lease/get_lease_list99'; //融资租赁--我的租凭订单状态（全部）
    this.get_lease_list0Api = '/api/lease/get_lease_list1'; //融资租赁--我的租凭订单状态（持有中）
    this.get_lease_list1Api = '/api/lease/get_lease_list2'; //融资租赁--我的租凭订单状态（申请中断）
    this.get_lease_list2Api = '/api/lease/get_lease_list6'; //融资租赁--我的租凭订单状态（申请买断）
    this.get_lease_list3Api = '/api/lease/get_lease_list3'; //融资租赁--我的租凭订单状态（已完成）
    this.get_lease_list4Api = '/api/lease/get_lease_list4'; //融资租赁--我的租凭订单状态（拒绝中断）
    this.get_lease_list5Api = '/api/lease/get_lease_list7'; //融资租赁--我的租凭订单状态（拒绝买断）
    this.get_lease_list6Api = '/api/lease/get_lease_list5'; //融资租赁--我的租凭订单状态（已中断）
    this.get_out_listApi = '/api/lease/get_out_list'; //融资租赁--我的租凭订单状态（全部）
    this.get_out_list0Api = '/api/lease/get_out_list0'; //融资租赁--我的租凭订单状态（持有中）
    this.get_out_list1Api = '/api/lease/get_out_list1'; //融资租赁--我的租凭订单状态（申请中断）
    this.get_out_list2Api = '/api/lease/get_out_list2'; //融资租赁--我的租凭订单状态（申请买断）
    this.do_add_btypeApi = '/api/lease/do_add_btype'; //融资租赁--添加币种
    this.getIntroduceApi = '/api/lease/get_introduce'; //融资租赁--产品介绍
    this.checkBindApi = '/api/userapi/checkBind'; //融资租赁--判断绑定手机号
    this.getMatchingApi = '/api/lease/get_matching'; //融资租赁--查找用户
    this.getRepaymentPeriodApi = '/api/lease/get_repayment_period'; //融资租赁--获取还款周期
    this.get_config_cycleApi = '/api/lease/get_config_cycle'; //融资租赁--获取可租凭周期
    this.get_retuan_logApi = '/api/lease/get_retuan_log'; //融资租赁--获取还款明细
    this.doLeaseApi = '/api/lease/do_lease'; //融资租赁--立即租赁
    this.getLeaseTreatyApi = '/api/lease/get_lease_treaty'; //租赁协议
    this.upTrusteeshipApi = '/api/lease/up_trusteeship'; //提交托管
    this.getTbListApi = '/api/lease/get_tb_list'; //出租列表
    this.getCycleApi = '/api/lease/get_cycle'; //我要出租的周期列表
    this.set_trusteeship_cycleApi = '/api/lease/set_trusteeship_cycle'; //添加我要出租的周期列表
    this.get_trusteeship_listApi = '/api/lease/get_trusteeship_list'; //托管列表
    this.getLeaseDetailApi = '/api/lease/get_lease_detail'; //我的租赁详情
    this.lease_repayApi = '/api/lease/lease_repay'; //我的租赁还款
    this.BuyoutApi = '/api/lease/Suspend'; //我的租赁买断
    this.getBuyoutApi = '/api/lease/get_buyout'; //我的租赁买断详情
    this.payinfoApi = '/api/lease/Suspend'; //我的租赁中断
    this.getSigndayApi = '/api/user/get_signday'; //获取连续签到天数
    this.checkPayApi = '/api/circle/check_pay'; //判断是否要扣糖果
    this.payCandyApi = '/api/circle/pay_candy'; //扣糖果--币圈
    this.payCandy1Api = '/api/circle/pay_candy1'; //扣糖果--秘讯
    this.circleallApi = '/api/circle/get_circleall'; //动态列表
    this.secretnewsApi = '/api/circle/get_secretnews'; //秘讯列表
    this.getInformationApi = '/api/userapi/getInformation'; //行业资讯列表
    this.applyCircleApi = '/api/circle/apply_circle'; //发布文章
    this.getMycircleLogApi = '/api/circle/get_mycircle_log'; //发布文章的列表
    this.commendApi = '/api/circle/commend'; //动态点赞
    this.stampApi = '/api/circle/stamp'; //动态踩
    this.getDataApi = '/api/circle/get_data'; //动态币圈/秘讯内容
    this.circleReplyApi = '/api/circle/circle_reply'; //动态币圈回复
    this.getCommentApi = '/api/circle/get_comment'; //动态币圈发表评论
    this.circleCommentApi = '/api/circle/circle_comment'; //动态币圈评论列表
    this.get_retuan_logApi = '/api/lease/get_retuan_log'; //获取收款记录
    this.get_hetongApi = '/api/lease/get_hetong'; //获取合同记录
    //this.myPayWayApi = '/api/cc/payinfo'; //动态秘讯二维码

  }

  getMyPayWay(params) {
    return axios.post(this.myPayWayApi, qs.stringify(params)).then((res) => res.data);
  }
  get_retuan_log(params) {
    return axios.post(this.get_retuan_logApi, qs.stringify(params)).then((res) => res.data);
  }
  get_hetong(params) {
    return axios.post(this.get_hetongApi, qs.stringify(params)).then((res) => res.data);
  }
  doLease(params) {
    return axios.post(this.doLeaseApi, qs.stringify(params)).then((res) => res.data);
  }
  getRepaymentPeriod(params) {
    return axios.post(this.getRepaymentPeriodApi, qs.stringify(params)).then((res) => res.data);
  }
  get_config_cycle(params) {
    return axios.post(this.get_config_cycleApi, qs.stringify(params)).then((res) => res.data);
  }
  getMatching(params) {
    return axios.post(this.getMatchingApi, qs.stringify(params)).then((res) => res.data);
  }
  getProfit(params) {
    return axios.post(this.getProfitApi, qs.stringify(params)).then((res) => res.data);
  }
  upTrusteeship(params) {
    return axios.post(this.upTrusteeshipApi, qs.stringify(params)).then((res) => res.data);
  }
  Buyout(params) {
    return axios.post(this.BuyoutApi, qs.stringify(params)).then((res) => res.data);
  }
  payinfo(params) {
    return axios.post(this.payinfoApi, qs.stringify(params)).then((res) => res.data);
  }
  leaseRepay(params) {
    return axios.post(this.lease_repayApi, qs.stringify(params)).then((res) => res.data);
  }
  getLeaseDetail(params) {
    return axios.post(this.getLeaseDetailApi, qs.stringify(params)).then((res) => res.data);
  }
  checkPay(params) {
    return axios.post(this.checkPayApi, qs.stringify(params)).then((res) => res.data);
  }
  applyCircle(params) {
    return axios.post(this.applyCircleApi, qs.stringify(params)).then((res) => res.data);
  }
  circleComment(params) {
    return axios.post(this.circleCommentApi, qs.stringify(params)).then((res) => res.data);
  }
  getData(params) {
    return axios.post(this.getDataApi, qs.stringify(params)).then((res) => res.data);
  }
  do_out(params) {
    return axios.post(this.do_outApi, qs.stringify(params)).then((res) => res.data);
  }
  circleReply(params) {
    return axios.post(this.circleReplyApi, qs.stringify(params)).then((res) => res.data);
  }
  set_trusteeship_cycle(params) {
    return axios.post(this.set_trusteeship_cycleApi, qs.stringify(params)).then((res) => res.data);
  }
  getBuyout(params) {
    return axios.get(this.getBuyoutApi, {params}).then((res) => res.data);
  }
  setCoinNameType(params) {
    return axios.get(this.setCoinNameTypeApi, {params}).then((res) => res.data);
  }
  getCoinNameType(params) {
    return axios.get(this.getCoinNameTypeApi, {params}).then((res) => res.data);
  }
  getTbList(params) {
    return axios.get(this.getTbListApi, {params}).then((res) => res.data);
  }
  getCycle(params) {
    return axios.get(this.getCycleApi, {params}).then((res) => res.data);
  }
  doAddtype(params) {
    return axios.get(this.do_add_btypeApi, {params}).then((res) => res.data);
  }
  getBtypeList(params) {
    return axios.get(this.getBtypeListApi, {params}).then((res) => res.data);
  }
  getIntroduce(params) {
    return axios.get(this.getIntroduceApi, {params}).then((res) => res.data);
  }
  checkBind(params) {
    return axios.get(this.checkBindApi, {params}).then((res) => res.data);
  }
  get_trusteeship_list(params) {
    return axios.get(this.get_trusteeship_listApi, {params}).then((res) => res.data);
  }
  getMycircleLog(params) {
    return axios.get(this.getMycircleLogApi, {params}).then((res) => res.data);
  }
  getLeaseTreaty(params) {
    return axios.get(this.getLeaseTreatyApi, {params}).then((res) => res.data);
  }
  getSignday(params) {
    return axios.get(this.getSigndayApi, {params}).then((res) => res.data);
  }
  get_lease_list(params) {
    return axios.get(this.get_lease_listApi, {params}).then((res) => res.data);
  }
  get_lease_list0(params) {
    return axios.get(this.get_lease_list0Api, {params}).then((res) => res.data);
  }
  get_lease_list1(params) {
    return axios.get(this.get_lease_list1Api, {params}).then((res) => res.data);
  }
  get_lease_list2(params) {
    return axios.get(this.get_lease_list2Api, {params}).then((res) => res.data);
  }
  get_lease_list3(params) {
    return axios.get(this.get_lease_list3Api, {params}).then((res) => res.data);
  }
  get_lease_list4(params) {
    return axios.get(this.get_lease_list4Api, {params}).then((res) => res.data);
  }
  get_lease_list5(params) {
    return axios.get(this.get_lease_list5Api, {params}).then((res) => res.data);
  }
  get_lease_list6(params) {
    return axios.get(this.get_lease_list6Api, {params}).then((res) => res.data);
  }
  get_out_list(params) {
    return axios.get(this.get_out_listApi, {params}).then((res) => res.data);
  }
  get_out_list0(params) {
    return axios.get(this.get_out_list0Api, {params}).then((res) => res.data);
  }
  get_out_list1(params) {
    return axios.get(this.get_out_list1Api, {params}).then((res) => res.data);
  }
  get_out_list2(params) {
    return axios.get(this.get_out_list2Api, {params}).then((res) => res.data);
  }

  payCandy(params) {
    return axios.get(this.payCandyApi, {params}).then((res) => res.data)
  }
  paySecretCandy(params) {
    return axios.get(this.payCandy1Api, {params}).then((res) => res.data)
  }
  getsecretnews(params) {
    return axios.get(this.secretnewsApi, {params}).then((res) => res.data)
  }
  getInformation(params) {
    return axios.get(this.getInformationApi, {params}).then((res) => res.data)
  }
  getCircleall(params) {
    return axios.get(this.circleallApi, {params}).then((res) => res.data)
  }
  commend(params) {
    return axios.get(this.commendApi, {params}).then((res) => res.data)
  }
  stamp(params) {
    return axios.get(this.stampApi, {params}).then((res) => res.data)
  }
  getComment(params) {
    return axios.get(this.getCommentApi, {params}).then((res) => res.data)
  }

  getOrder(params) {
    return axios.post(this.orderApi, qs.stringify(params)).then((res) => res.data);
  }

  addSale(params) {
    return axios.post(this.addsaleApi, qs.stringify(params)).then((res) => res.data);
  }

  addBuy(params) {
    return axios.post(this.addbuyApi, qs.stringify(params)).then((res) => res.data);
  }

  getCanoutList(params) {
    return axios.post(this.getCanoutListApi, qs.stringify(params)).then((res) => res.data);
  }

  saleConfirm(params) {
    return axios.post(this.saleconfirmApi, qs.stringify(params)).then((res) => res.data);
  }

  pay(params) {
    return axios.post(this.payApi, qs.stringify(params)).then((res) => res.data);
  }

  getCcParam() {
    return axios.post(this.ccparamApi).then((res) => res.data);
  }

  getDetail(params) {
    return axios.post(this.orderdetailApi, qs.stringify(params)).then((res) => res.data);
  }

  buy(params) {
    return axios.post(this.buyApi, qs.stringify(params)).then((res) => res.data);
  }

  sale(params) {
    return axios.post(this.saleApi, qs.stringify(params)).then((res) => res.data);
  }

  due(params) {
    return axios.post(this.dueApi, qs.stringify(params)).then((res) => res.data);
  }

  appeal(params) {
    return axios.post(this.appealApi, qs.stringify(params)).then((res) => res.data);
  }

  getMyOrder(params) {
    return axios.post(this.myOrderApi, qs.stringify(params)).then((res) => res.data);
  }
}

/**
 *  帮助中心
 */
export const Help = new class {
  constructor() {
    this.getCategoryListApi = '/api/question/getCategoryList';//全部问题
    this.getAllListApi = '/api/question/getAllList'
    this.getDetailApi = '/api/question/getDetail';//问题详情
    this.getCenterApi = '/api/question/getCenter';
    this.feedbackApi = '/api/question/addFeedback';  //提交问题

  }

  getCategoryList(params) {
    return axios.get(this.getCategoryListApi, {params}).then((res) => res.data)
  }

  getAllList(params) {
    return axios.post(this.getAllListApi, qs.stringify(params)).then((res) => res.data)
  }

  getDetail(params) {
    return axios.post(this.getDetailApi, qs.stringify(params)).then((res) => res.data)
  }

  getCenter(params) {
    return axios.get(this.getCenterApi, {params}).then((res) => res.data)
  }

  addFeedback(params) {
    return axios.post(this.feedbackApi, qs.stringify(params)).then((res) => res.data)
  }
}

// 理财
export const Financial = new class {
  constructor() {
    this.getListApi = '/api/machine/getList';  //理财列表
    this.finDetail = '/api/machine/detail'; //理财详情
    this.trade = '/api/machine/trade'; //
    this.myFinApi = '/api/machine/mylist'; //我的理财包
    this.myFinDetailApi = '/api/machine/mydetail'; //我的理财详情
    this.rebateApi = '/api/machine/rebate'; //退单

  }

  getList() {
    return axios.get(this.getListApi).then(res => res.data)
  }

  getDetail(params) {
    return axios.get(this.finDetail, {params}).then(res => res.data)
  }

  handleTrade(params) {
    return axios.post(this.trade, qs.stringify(params)).then(res => res.data)
  }

  getMyFin(params) {
    return axios.get(this.myFinApi, {params}).then(res => res.data)
  }

  getMyFinDetail(params) {
    return axios.get(this.myFinDetailApi, {params}).then(res => res.data)
  }

  rebate(params) {
    return axios.post(this.rebateApi, qs.stringify(params)).then((res) => res.data);
  }
}

/**
 * 主页
 */
export const Index = new class {
  constructor() {
    // this.fa_blockApi = '/api/user/fa_block';  //矿机这也列表
    // this.fa_blockApi = '/api/ore/ore/getorelevel';  //矿机列表
    this.fa_blockApi = '/api/machine/getCategoryList';  //矿机类型
    this.rentCarApi = '/api/machine/getList';  //矿机列表
    this.rentCarInfoApi = '/api/machine/detail';  //矿机详情
    this.carRebateApi = '/api/machine/rebate';  //矿机退单
    this.carRebateRateApi = '/api/machine/sxf';  //矿机退单手续费
    this.buyCarApi = '/api/machine/trade';  //矿机租凭
    this.myRentCarInfoApi = '/api/machine/mylistinfo';  //我的矿机汇总
    this.myRentCarApi = '/api/machine/mylist';  //我的矿机列表
    this.myRentCarDetailApi = '/api/machine/mydetail';  //我的矿机详情
    this.miningApi = '/api/mining/mining/index';  //抢矿
    this.oreResultApi = '/api/mining/mining/getOreResult';  //抢矿结果
    this.bookingApi = '/api/booking/booking/setBooking';  //预约
    this.countDownApi = '/api/ore/ore/countDown'; //抢矿倒计时
    this.titleSystemApi = '/api/message/noticeTitles';  //消息中心--系统
    this.detailsSystemApi = '/api/message/noticeDetails';  //消息中心--系统--详情
    this.titleApi = '/api/message/order_msg';  //消息中心--订单
    this.lease_msgApi = '/api/message/lease_msg';  //消息中心--融资租凭
    this.revenueCenterTotalApi = '/api/user/revenue_center_total';  //收益中心汇总
    this.revenueCenterApi = '/api/user/revenue_center';  //收益中心
    this.candyCenterApi = '/api/user/getcandy_log';  //糖果中心
    this.candyTextApi = '/api/user/get_candytext';  //糖果获得
    this.inviteRecordApi = '/api/user/get_reglog';  //邀请记录
    this.isSignApi = '/api/user/dss_test';  //是否签到
    this.SignApi = '/api/user/return_dss';  //签到领糖果
    this.bannerAPi = 'api/question/getTopImg';
    this.lunboApi = '/api/notice/lunbo';  //轮播公告
    this.lunboDetailApi = '/api/notice/lunboinfo'; //轮播公告详情
    this.interestListApi = '/api/interest/getInterestList'; //理财列表
    this.interestDetailApi = '/api/interest/getInterestDetail';// 理财详情
    this.buyInterestApi = '/api/interest/buyInterest';//理财抢购
    this.itbApi = '/api/cc/itb_up'; //k线图

  }

  getMine(params) {
    return axios.get(this.fa_blockApi,{params}).then((res) => res.data)
  }
  getIsSign(params) {
    return axios.get(this.isSignApi,{params}).then((res) => res.data)
  }
  goSign(params) {
    return axios.get(this.SignApi,{params}).then((res) => res.data)
  }
  getInviteRecord(params) {
    return axios.get(this.inviteRecordApi,{params}).then((res) => res.data)
  }
  getRevenueCenter(params) {
    return axios.get(this.revenueCenterApi,{params}).then((res) => res.data)
  }
  getCandyText(params) {
    return axios.get(this.candyTextApi,{params}).then((res) => res.data)
  }
  getRevenueCenterInfo(params) {
    return axios.get(this.revenueCenterTotalApi,{params}).then((res) => res.data)
  }
  getCandyCenter(params) {
    return axios.get(this.candyCenterApi,{params}).then((res) => res.data)
  }
  getRentCarInfo(params) {
    return axios.get(this.rentCarInfoApi,{params}).then((res) => res.data)
  }
  getRentCarList(params) {
    return axios.get(this.rentCarApi,{params}).then((res) => res.data)
  }
  getMyRentCarList(params) {
    return axios.get(this.myRentCarApi,{params}).then((res) => res.data)
  }
  getMyRentCarInfo(params) {
    return axios.get(this.myRentCarInfoApi,{params}).then((res) => res.data)
  }
  getMyRentCarDetail(params) {
    return axios.get(this.myRentCarDetailApi,{params}).then((res) => res.data)
  }
  getRebateRate(params) {
    return axios.get(this.carRebateRateApi,{params}).then((res) => res.data)
  }
  buyCar(params) {
    return axios.post(this.buyCarApi, qs.stringify(params)).then(res => res.data)
  }
  carRebate(params) {
    return axios.post(this.carRebateApi, qs.stringify(params)).then(res => res.data)
  }

  mining(params) {
    return axios.get(this.miningApi, {params}).then((res) => res.data)
  }

  booking(params) {
    return axios.get(this.bookingApi, {params}).then((res) => res.data)
  }

  getcountDown(params) {
    return axios.post(this.countDownApi, qs.stringify(params)).then(res => res.data)
  }

  getoreResult(params) {
    return axios.post(this.oreResultApi, qs.stringify(params)).then(res => res.data)
  }

  getTitle(params) {
    return axios.get(this.titleApi, {params}).then(res => res.data)
  }
  getLeaseMsg(params) {
    return axios.get(this.lease_msgApi, {params}).then(res => res.data)
  }

  gettitleSystem(params) {
    return axios.get(this.titleSystemApi, {params}).then(res => res.data)
  }
  getDetailsSystem(params) {
    return axios.get(this.detailsSystemApi, {params}).then(res => res.data)
  }

  getBanner() {
    return axios.post(this.bannerAPi).then(res => res.data)
  }

  getLunbo() {
    return axios.post(this.lunboApi).then(res => res.data)
  }

  getLuboDetail(params) {
    return axios.post(this.lunboDetailApi, qs.stringify(params)).then(res => res.data)
  }

  getInterestList(params) {
    return axios.post(this.interestListApi, qs.stringify(params)).then(res => res.data)
  }

  getInterestDetail(params) {
    return axios.post(this.interestDetailApi, qs.stringify(params)).then(res => res.data)
  }

  buyInterest(params) {
    return axios.post(this.buyInterestApi, qs.stringify(params)).then(res => res.data)
  }

  getItb(params) {
    return axios.get(this.itbApi, {params}).then(res => res.data)
  }
}
