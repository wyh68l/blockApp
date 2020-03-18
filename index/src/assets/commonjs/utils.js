import {Base} from '@/server/server.js';
// import axios from 'axios';
import store from '../../store';
export const Util = new class {
	constructor(){
		this.lanList = ['zh-cn','en'];
	}
	/**
	 *
	 * @param {文字数组['中文','英文']} strArr
	 */
	setLanTxt(strArr){
		for(let i = 0;i<this.lanList.length;i++){
			if(store.state.language == this.lanList[i]){
				return strArr[i]
			}
		}
	}
  /**
   * 页面生成base64
   * @param {vue实例} vue
   * @param {成功的回调} callback
   * @param {主体，默认为html当前页面} dom
   */
  pageToImg(vue,callback,dom='.body'){
    vue.html2canvas(document.querySelector(dom)).then(canvas=>{
      callback(canvas.toDataURL())
    })
  }
    /**
	 * 图片上传 base64 格式
	 * @param {图片上传的file} file
	 * @param {回调} callback
	 * @param {错误} error
	 */
	uploadImg(_vue, file, callback) {
		if(file.type == "image/gif" || file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/bmp" || file.type == "image/png") {} else {
			mui.alert("请上传正确的图片类型");
			return;
		}
		let reader = new FileReader();
		reader.onload = function(e) {
			callback(reader.result);
		}
		reader.readAsDataURL(file);
	}

	/**
     * 网页file限制大小的上传图片
     * @param {vue} _vue
     * @param {图片} file
     * @param {回调} callback
     */
	uploadImgLimit(file, callback) {
		if (file.type == "image/gif" || file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/bmp" || file.type == "image/png") {
		} else {
			mui.toast("请上传正确的图片类型");
			return;
		}
		let reader = new FileReader();
		reader.onload =  function () {
			let image = new Image();
			image.src = reader.result;
			let url = reader.result;
			// console.log(url)
			image.onload = function () {
				var cvs = document.createElement("canvas");
				var scale = 1;
				if (this.width > 1000 || this.height > 1000) { //1000只是示例，可以根据具体的要求去设定
					if (this.width > this.height) {
						scale = 1000 / this.width;
					} else {
						scale = 1000 / this.height;
					}
				};
				cvs.width = this.width * scale;
				cvs.height = this.height * scale;
				var ctx = cvs.getContext("2d");
				ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
				var urlScale = 1;
				if (url.length > 204800) {
					urlScale = url.length / 204800
					if (urlScale > 0 && urlScale <= 10) {
						urlScale = urlScale / 10;
						var a = urlScale - 1;
						urlScale = urlScale - a;
					}
					if (urlScale > 10 && urlScale <= 20) {
						urlScale = urlScale / 20;
						urlScale = urlScale / 10;
						var a = urlScale - 1;
						urlScale = urlScale - a;
					}
				}
				let newImageData = cvs.toDataURL("image/jpeg", urlScale);
				callback(newImageData);
			}
		}
		reader.readAsDataURL(file);
	}


	/**
	 *  时间戳转换日期
	 * @param {时间戳} datetime
	 */
	formatDate(datetime){
		let date  = new Date(datetime*1000);
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		if(Number(seconds)<10){
			seconds = '0'+seconds;
		};
		if(Number(minutes)<10){
			minutes = '0'+minutes;
		};
		if(Number(hours)<10){
			hours = '0'+hours;
		};
		return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
	}
	/**
	 *  时间戳转换时间
	 * @param {时间戳} datetime
	 */
	formatTime(datetime){
		let date  = new Date(datetime*1000);
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		if(Number(seconds)<10){
			seconds = '0'+seconds;
		};
		if(Number(minutes)<10){
			minutes = '0'+minutes;
		};
		if(Number(hours)<10){
			hours = '0'+hours;
		};
		return hours+':'+minutes+':'+seconds;
	}

	/**
	 * 路由白名单
	 * @param {*} route
	 */
	isWhite(route){
		let whiteRoutes = ['Login','Register','BackPwd','Download','Welcome','UploadWgt','Agreement']
		// routes.some(value=>value.indexOf(whiteRoutes)>=0)
		return whiteRoutes.indexOf(route)>=0
	}

	/**
	 * 获取分秒
	 * @param {创建时间} ctime
	 * @param {当前时间} ntime
	 */
	getSecond(ctime,ntime){
		let [minute,second] = [0,0];
// console.log(ctime,parseInt(ntime/1000))
// console.log(parseInt(ntime/1000) - ctime -1800)
		if((ctime+1800 - parseInt(ntime/1000)) > 0){
			minute = parseInt((ctime+1800-parseInt(ntime/1000))/60);
			second = (ctime+1800-parseInt(ntime/1000))%60;
			return [minute,second];
		}else {
			return false;
		}
	}

	/**
	 * 上传接口 by url
	 * @param {文件} file
	 */
	async uploadByUrl(file){
		let [formData,url] = [new FormData(),null];
		formData.append('image',file);
		await Base.upload(formData).then((res)=>{
			if(res.code == 1){
				url  =  res.data;
			}else {
				mui.toast(res.msg);
				return ;
			}
		})
		return url;
	}
	/**  ！！！！弃用！！！！
	 * 判断对象空值存在
	 * @param {对象} obj
	 */
	filterData(obj){
		if(!obj)
		return null;
		let [arr,flag] = [Object.values(obj),true];
		arr.forEach((item,index)=>{
			if(item == null){
				flag =  false;
				return ;
			}
		})
		return flag;
	}
	/**
	 * 判断对象空值存在并返回key
	 * @param {对象} obj
	 */
	checkEmpry(obj){
		if(!obj)
		return null;
		let [arr,flag,arrKey,msg] = [Object.values(obj),true,Object.keys(obj),null];
		arr.forEach((item,index)=>{
			if(flag)
			if(item == null ||item ==''||item == ' '){
				flag =  false;
				switch(arrKey[index]){
					case 'username':
						msg = '请输入手机号！';
						break;
					case 'account':
						msg = '请输入手机号！';
						break;
					case 'mobile':
						msg = '请输入手机号！';
						break;
					case 'captcha':
						msg = '请输入手机验证码！';
						break;
					case 'paypwd':
						msg = '请输入交易密码！';
						break;
					case 'imgcaptcha':
						msg = '请输入图形验证码！';
						break;
					case 'password':
						msg = '请输入密码！';
						break;
					case 'newpassword':
						msg = '请输入密码！';
						break;
					case 'num':
						msg = '请输入数量！';
						break;
					case 'number':
						msg = '请输入数量！';
						break;
					case 'money':
						msg = '请输入数量！';
						break;
					case 'address':
						msg = '请输入钱包地址！';
						break;
					case 'realname':
						msg = '请输入真实姓名！';
						break;
					case 'alipayname':
						msg = '请输入支付宝昵称！';
						break;
					case 'wechaname':
						msg = '请输入微信昵称！';
						break;
					case 'wechatact':
						msg = '请输入微信账户！';
						break;
					case 'wechaturl':
						msg = '请上传微信二维码！';
						break;
					case 'alipayact':
						msg = '请输入支付宝账户！';
						break;
					case 'alipayurl':
						msg = '请上传支付宝二维码！';
						break;
					case 'bank':
						msg = '请选择银行名称！';
						break;
					case 'bankname':
						msg = '请输入只行名称！';
						break;
					case 'bankuname':
						msg = '请输入账户姓名！';
						break;
					case 'bankact':
						msg = '请输入银行卡账号！';
						break;
					case 'paypwd':
						msg = '请输入交易密码！';
						break;
					case 'hkmoney':
						msg = '请输入汇款数量！';
						break;
					case 'hkimg':
						msg = '请上传支付凭证！';
						break;
					case 'img':
						msg = '请上传图片！';
						break;
					case 'image':
						msg = '请上传图片！';
						break;
				}
			}
		})
		return msg;
	}

	/**
	 * 表单验证 未完善
	 * @param {规则对象} rule
	 */
	formValidate(rule){
		if(!rule)
		return null;
		let msg = null;
		for(let item of Object.values(rule)){
			if(item.validate == false){
				msg = item.msg;
				break;
			}
		}
		return msg;
	}

	/**
	 * 请求校验
	 * @param {提交数据} formData
	 * @param {规则} rule
	 */
	isValidate(formData,rule){
		return this.checkEmpry(formData||null) ||this.formValidate(rule||null);
	}
	/**
	 * 清楚cookie
	 */
	clearAllCookie() {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		}
		if(cookies.length > 0)
		{
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			var domain = location.host.substr(location.host.indexOf('.'));
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
			}
		}
	}

	/**
	 * 获取cookie
	 * @param {key} name
	 */
	getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
}
/**
 * 加载/底部加载 框
 */
export const Load = new class{
	loadStart(vm){
		vm.$refs['load'].open();
	}
	loadEnd(vm){
		vm.$refs['load'].close();
	}
	loadNext(vm){
		vm.$refs['next'].open();
	}
	loadNextEnd(vm){
		vm.$refs['next'].close();
	}
}

/**
 * 正则验证
 */
export const Validates = new class{
	constructor(exp){
		this.exp = exp;
	}
	_isValidate(ruleName,value){
		switch(ruleName){
			case 'required':  //必填
				this.exp = new RegExp(/\S/);
				return this.exp.test(value);
			case 'int':  //整数
				this.exp = new RegExp(/^[0-9]*[1-9][0-9]*$/);
				return this.exp.test(value);
			case 'bank':  //银行卡
				this.exp = new RegExp(/^([1-9]{1})(\d{14}|\d{18})$/);
				return this.exp.test(value);
		}
	}
	/**
	 * 表单验证提交
	 * @param {表单的rules} rules
	 */
	formValidate(rules){
		if(!rules)
		return null;
		let msg = null;
		for(let item of Object.values(rules)){
			if(item.msg){
				msg = item.msg;
				break;
			}
		}
		return msg;
	}
}

export const HB = new class {
	constructor(){
		this.wgtVer = null;
		this.wgtUrl=store.state.API+'/api/upload/downfile'; //
	}

	/**
	 * hbuilder 拍照转base64
	 * @param {图片路径} path
	 * @param {回调} callback
	 */
	HBUploadImgLimit(_vue,path, callback) {
		Load.loadStart(_vue);
			let image = new Image();
			image.src = path;
			let url = path;
			image.onload = function () {
				var cvs = document.createElement("canvas");
				var scale = 1;
				if (this.width > 1000 || this.height > 1000) { //1000只是示例，可以根据具体的要求去设定
					if (this.width > this.height) {
						scale = 1000 / this.width;
					} else {
						scale = 1000 / this.height;
					}
				};
				cvs.width = this.width * scale;
				cvs.height = this.height * scale;
				var ctx = cvs.getContext("2d");
				ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
				var urlScale = 1;
				if (url.length > 204800) {
					urlScale = url.length / 204800
					if (urlScale > 0 && urlScale <= 10) {
						urlScale = urlScale / 10;
						var a = urlScale - 1;
						urlScale = urlScale - a;
					}
					if (urlScale > 10 && urlScale <= 20) {
						urlScale = urlScale / 20;
						urlScale = urlScale / 10;
						var a = urlScale - 1;
						urlScale = urlScale - a;
					}
				}
				let newImageData = cvs.toDataURL("image/jpeg", urlScale);
				Load.loadEnd(_vue);
				callback(newImageData);
			}
	}
  /**
   * 下载文件
   * @param {下载地址} url
   * @param {回调} callback
   * @param {提示语} tip
   */
  baseDownload(url,callback,tip='正在生成图片中...'){
    let _this = this;
    try{
      plus.nativeUI.showWaiting(tip);
      plus.downloader.createDownload( url, {filename:"_downloads/"}, function(d,status){
        if ( status == 200 ) {
          console.log("下载文件成功："+d.filename);
          callback(d.filename)
        } else {
          console.log("下载文件失败！");
        }
        plus.nativeUI.closeWaiting();
      }).start();
    }catch(e){

    }
  }
	/**
	 * 拍照上传
	 * @param {vue实例} _vue
	 */
	HBCapture(_vue,callback){
		let [_this,formData,that] = [_vue,new FormData(),this];
            // document.addEventListener( "plusready", this.upload(), false );
            try{
                let camera = plus.camera.getCamera();
                camera.captureImage(function(e){
                    plus.io.resolveLocalFileSystemURL(e, function(entry) {
                    let path = entry.toLocalURL()+ "?version=" + new Date().getTime();//图片本地路径
                    // var name=entry.name//图片名称
					Load.loadStart(_this);
					that.HBUploadImgLimit(_this,path,url=>{
						formData.append('image',url);
						Base.upload(formData).then((res)=>{
						Load.loadEnd(_this);
							if(res.code == 1){
								callback(res.data)
							}else {
								mui.toast(res.msg);
								return ;
							}
						})
					})
                }, function(e) {
                    mui.toast("读取拍照文件错误：" + e.message);
                },{
                    resolution:'320*240'
                })
            })

            }catch(e){}
	}

  /**
   * 保存到相册
   * @param {文件路径} file
   */
  saveToGallery(file,callback){
    try{
      plus.gallery.save(file, function() { //保存到相册方法
        mui.toast('图片已保存本地。')
        callback()
      }, function() {
        mui.$toast('图片已保存失败。')
      });
    }catch(e){}
  }
  /**
	 * 选择相册
	 * @param {vue实例} _vue
	 * @param {回调} callback
	 */
	picForGallery(_vue,callback){
		let [_this,formData,that] = [_vue,new FormData(),this];
		// document.addEventListener( "plusready", this.upload(), false );
		try{
			plus.gallery.pick(function(path){
			Load.loadStart(_this);
			that.HBUploadImgLimit(_this,path,url=>{
				formData.append('image',url);
				Base.upload(formData).then((res)=>{
				Load.loadEnd(_this);
					if(res.code == 1){
						callback(res.data)
					}else {
						mui.toast(res.msg);
						return ;
					}
				})
			})
		})

		}catch(e){}
	}

	/**
	 * 暂时闲置
	 */
	update(){
		let _this =this;
		try{
			if(plus){
				_this.getVersion();
			}else{
				document.addEventListener('plusready',_this.getVersion(),false);
			}
		}catch(e){}
	}
	/**
	 * 获取当前app的版本号
	 */
	async getVersion(callback){
		let _this = this;
		// 获取本地应用资源版本号
		try {
			await plus.runtime.getProperty(plus.runtime.appid,function(inf){
				_this.wgtVer=inf.version;
				callback(_this.wgtVer)
				console.log("当前应用版本："+_this.wgtVer);
			});
		}catch(e){}
	}
	/**
	 * 检查版本号
	 */
	checkVersion(){
		let _this = this;
		try {
			plus.nativeUI.showWaiting("检测更新...");
			Base.getVersion().then(res=>{
				if(res.code ==1){
					plus.nativeUI.closeWaiting();
					if(Number(res.data)>Number(_this.wgtVer)){
						plus.nativeUI.confirm('点击确定更新到最新版本',(e)=>{
							if(e.index ==0){
								_this.download();
							}
						})
					}
					else
						plus.nativeUI.alert("无新版本可更新！");
						console.log("无新版本可更新！")
				}else {
					mui.toast(res.msg);
					return;
				}
			})
		}catch(e){
			mui.confirm('客官，请移步至App~',()=>{})
		}
	}
	/**
	 * 自动检测更新下载
	 */
	autoUpdate(){
		let _this = this;
		try {
			plus.nativeUI.showWaiting("检测更新...");
			Base.getVersion().then(res=>{
				if(res.code ==1){
					plus.nativeUI.closeWaiting();
					if(Number(res.data)>Number(_this.wgtVer)){
						_this.download();
					}
					else
						console.log("无新版本可更新！");
				}else {
					mui.toast(res.msg);
					return;
				}
			})
		}catch(e){
		}
	}
	/**
	 * 下载更新资源
	 */
	download(){
		let _this = this;
		try{
			plus.nativeUI.showWaiting("下载资源文件...");
			plus.downloader.createDownload( _this.wgtUrl, {filename:"_doc/update/"}, function(d,status){
				if ( status == 200 ) {
					console.log("下载资源文件成功："+d.filename);
					_this.installWgt(d.filename); // 安装wgt包
				} else {
					console.log("下载资源文件失败！");
					plus.nativeUI.alert("下载资源文件失败！");
				}
				plus.nativeUI.closeWaiting();
			}).start();
		}catch(e){}
	}
	/**
	 * 安装资源包
	 * @param {资源包的路径} path
	 */
	installWgt(path){
		try{
			plus.nativeUI.showWaiting("更新资源文件...");
			plus.runtime.install(path,{},function(){
				plus.nativeUI.closeWaiting();
				console.log("更新资源文件成功！");
				plus.nativeUI.alert("应用资源更新完成！",function(){
					plus.runtime.restart();
				});
			},function(e){
				plus.nativeUI.closeWaiting();
				console.log("更新资源失败["+e.code+"]："+e.message);
				plus.nativeUI.alert("更新资源失败["+e.code+"]："+e.message);
			});
		}catch(e){}
	}
}
