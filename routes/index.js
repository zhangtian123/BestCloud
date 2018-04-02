var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
var Userwcf = require('../modules/userwcf');
var Userreg = require('../modules/userregister');
var box = require('../modules/boxwcf');
var case2 = require('../modules/casewcf');
var card = require('../modules/cardwcf');
var boxlist = require('../modules/BoxListwcf');
var Register = require('../modules/registerauditwcf');
var acceptcard = require('../modules/acceptcardwcf');
var acceptbox = require('../modules/acceptboxwcf');
var Time = require('../modules/getNowDate');
//var upload = require('../modules/ftp.js');
var Mail = require('../modules/mail');
var sms = require('../modules/smssender');
var moment = require('moment');
var DispatchList = require('../modules/BCDispatchwcf');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'BestCloud'
	});
});

/* GET . */
router.get('/service', function(req, res, next) {
	var openid = req.query.openid;
	if(req.session.user) {
		if(req.session.user.UserFlag == "USER") {
			res.render('personalProfileForManager', {
				title: 'BestCloud',
				username: req.session.user.LoginCode,
				flag: req.session.user.FLAG,
				openid: req.session.user.WechatOpenID
			});
		} else if(req.session.user.UserFlag == "DC") {
			res.render('personalProfileForThird', {
				title: 'BestCloud',
				username: req.session.user.LoginCode,
				flag: req.session.user.FLAG,
				openid: req.session.user.WechatOpenID
			});
		} else {
			res.render('personalProfileForClient', {
				title: 'BestCloud',
				username: req.session.user.LoginCode,
				flag: req.session.user.FLAG,
				openid: req.session.user.WechatOpenID
			});
		}
	} else {
		if(req.query.code) {
			request.get({
				url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf45ab4faa6dbb5fe&secret=22708990c65541dca36376fb9ed13ec6&code=' + req.query.code + '&grant_type=authorization_code',
				form: {}
			}, function(error, response, body) {
				if(!error && response.statusCode == 200) {
					if(body.indexOf('errcode') != -1) {
						res.render('loginMain', {
							title: 'BestCloud'
						});
					} else {
						var jsondata = JSON.parse(body);
						Userwcf.Usercheck1(jsondata.openid, null, null, 0, function(result) {
							req.session.openid = jsondata.openid;
							if(result == 0) {
								res.render('loginMain', {
									title: 'BestCloud'
								});
							} else {
								req.session.user = result;
								req.session.user.FLAG = 1;
								if(result.UserFlag == "USER") {
									res.render('personalProfileForManager', {
										title: 'BestCloud',
										username: req.session.user.LoginCode,
										flag: req.session.user.FLAG,
										openid: req.session.user.WechatOpenID
									});
								} else if(result.UserFlag == "DC") {
									res.render('personalProfileForThird', {
										title: 'BestCloud',
										username: req.session.user.LoginCode,
										flag: req.session.user.FLAG,
										openid: req.session.user.WechatOpenID
									});
								} else {
									res.render('personalProfileForClient', {
										title: 'BestCloud',
										username: req.session.user.LoginCode,
										flag: req.session.user.FLAG,
										openid: req.session.user.WechatOpenID
									});
								}
							}
						})
					}
				}
			});
		} else {
			res.render('loginMain', {
				title: 'BestCloud'
			});
		}
	}
});

/* GET 管理员. */
router.get('/manager', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForManager', {
			title: 'BestCloud',
			username: req.session.user.LoginCode,
			flag: req.session.user.FLAG,
			openid: req.session.user.WechatOpenID
		});
	} else {
		res.render('loginMain', {
			title: 'BestCloud'
		});
	}
});

/* GET 第三方. */
router.get('/third', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForThird', {
			title: 'BestCloud',
			username: req.session.user.LoginCode,
			flag: req.session.user.FLAG,
			openid: req.session.user.WechatOpenID
		});
	} else {
		res.render('loginMain', {
			title: 'BestCloud'
		});
	}
});

/* GET 客户. */
router.get('/client', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForClient', {
			title: 'BestCloud',
			username: req.session.user.LoginCode,
			flag: req.session.user.FLAG,
			openid: req.session.user.WechatOpenID
		});
	} else {
		res.render('loginMain', {
			title: 'BestCloud'
		});
	}
});

/* GET 统一登录入口. */
/*router.get('/mainpage', function(req, res, next) {
	res.render('mainpage', { title: 'BestCloud' });
});*/

/* GET 接受提箱. */
router.get('/BoxAudit', function(req, res, next) {
	res.render('caseAuditing', {
		title: 'BestCloud'
	});
});

/* GET 接受打单. */
router.get('/CardAudit', function(req, res, next) {
	res.render('cardAuditing', {
		title: 'BestCloud'
	});
});

/* GET 注册首页. */
router.get('/registerMain', function(req, res, next) {
	res.render('registerMain', {
		title: 'BestCloud'
	});
});

/* GET 注册设置密码页. */
router.get('/registerSetPw', function(req, res, next) {
	res.render('registerSetPw', {
		title: 'BestCloud'
	});
});

/* GET 注册填写公司信息页. */
router.get('/registerCominfo', function(req, res, next) {
	res.render('registerCominfo', {
		title: 'BestCloud'
	});
});

/* GET 注册填写公司信息页. */
router.get('/takephoto', function(req, res, next) {
	res.render('takephoto', {
		title: 'BestCloud'
	});
});

/* GET 注册填写完成. */
router.get('/registerWait', function(req, res, next) {
	res.render('registerWait', {
		title: 'BestCloud'
	});
});

/* GET 注册审核. */
router.get('/registerAudit', function(req, res, next) {
	res.render('registerAuditing', {
		title: 'BestCloud'
	});
});

router.get('/registerDetail', function(req, res, next) {
	res.render('registerDetail', {
		title: 'BestCloud',
		UserName: req.session.register.registeruser,
		TaxNo: req.session.register.TaxNo,
		NameC: req.session.register.NameC,
		NameE: req.session.register.NameE,
		Address: req.session.register.Address,
		AddressEN: req.session.register.AddressEN,
		Email: req.session.register.Email,
		FilePath: req.session.register.FilePath
	});
});

/* GET 登录首页. */
router.get('/loginMain', function(req, res, next) {
	res.render('loginMain', {
		title: 'BestCloud'
	});
});

/* GET 登录忘记密码. */
router.get('/loginForgetPw', function(req, res, next) {
	res.render('loginForgetPw', {
		title: 'BestCloud'
	});
});

/* GET 重设密码. */
router.get('/loginSetPw', function(req, res, next) {
	res.render('loginSetPw', {
		title: 'BestCloud'
	});
});

/* GET 状态反馈. */
router.get('/stateback', function(req, res, next) {
	res.render('boxtrack', {
		title: 'BestCloud'
	});
});

/* 预约提箱. */
router.get('/ordercase', function(req, res, next) {
	res.render('ordercase', {
		title: 'BestCloud'
	});
});

/* 预约打单. */
router.get('/ordercard', function(req, res, next) {
	res.render('ordercard', {
		title: 'BestCloud'
	});
});

/* GET 状态反馈之提箱. */
router.get('/statebackpickup', function(req, res, next) {
	res.render('statebackpickup', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark
	});
});

/* GET 状态反馈之送. */
router.get('/statebacksendbox', function(req, res, next) {
	res.render('statebacksendbox', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark,
		ContainerNo: req.session.conInfo.ContainerNo,
		SealNo: req.session.conInfo.SealNo
	});
});

/* 获取传递箱单明细信息 */
router.post('/getConinfo', function(req, res, next) {
	var parameter = req.body;
	var conInfo = {
		XiangDanID: parameter.xiangDanID,
		ContainerNo: parameter.containerNo,
		ContainerSize: parameter.containerSize,
		ContainerType: parameter.containerType,
		SealNo: parameter.sealNo,
		Remark: parameter.remark,
	}
	req.session.conInfo = conInfo;
	res.send({
		result: 1
	});
})

/* GET 状态反馈之回箱. */
router.get('/statebackrepay', function(req, res, next) {
	res.render('statebackrepay', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark,
		ContainerNo: req.session.conInfo.ContainerNo,
		SealNo: req.session.conInfo.SealNo
	});
});

/* GET 状态反馈之离厂. */
router.get('/statebackleave', function(req, res, next) {
	res.render('stackbackleave', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark,
		ContainerNo: req.session.conInfo.ContainerNo,
		SealNo: req.session.conInfo.SealNo
	});
});

/* GET 状态反馈之到厂. */
router.get('/statebackarrivefactory', function(req, res, next) {
	res.render('statebackarrivefactory', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark,
		ContainerNo: req.session.conInfo.ContainerNo,
		SealNo: req.session.conInfo.SealNo
	});
});

/* GET 状态反馈之进港. */
router.get('/statebackarriveport', function(req, res, next) {
	res.render('statebackarriveport', {
		title: 'BestCloud',
		XiangDanID: req.session.conInfo.XiangDanID,
		ContainerSize: req.session.conInfo.ContainerSize,
		ContainerType: req.session.conInfo.ContainerType,
		Remark: req.session.conInfo.Remark,
		ContainerNo: req.session.conInfo.ContainerNo,
		SealNo: req.session.conInfo.SealNo
	});
});

/* GET 集装箱查询. */
router.get('/boxsearch', function(req, res, next) {
	res.render('boxsearch', {
		title: 'BestCloud'
	});
});

/* GET 注册审核. */
router.post('/saveregisterDetail', function(req, res, next) {
	var parameter = req.body;
	Register.getphoto(parameter.id, function(result) {
		var register = {
			registeruser: parameter.user,
			TaxNo: parameter.taxno,
			NameC: parameter.namec,
			NameE: parameter.namee,
			Address: parameter.address,
			AddressEN: parameter.addressen,
			Email: parameter.email,
		}

		if(result != 0) {
			register.FilePath = result.FilePath;
		}
		result = 1;
		req.session.register = register;
		res.send({
			result: result
		});
	})
});

/* Get 向客户的邮箱发送验证码. */
router.post('/identifyCode', function(req, res, next) {
	var parameter = req.body;
	var emailaddress = parameter.emailaddress;
	var num = "";
	for(var i = 0; i < 6; i++)
		num += Math.floor(Math.random() * 10);
	//console.log(num);
	//Mail.sendMail(emailaddress, num);
	sms.singleSmsSend(0, '86', emailaddress, num + '为您的注册验证码，请于5分钟内填写', '', '', function(data) {
		var ret = JSON.parse(data);
		if(ret.result == 0) {
			req.session.identifyCode = num;
			res.send({
				result: '验证码已发送成功，5分钟内有效'
			});
		} else {
			res.send({
				result: '验证码发送失败'
			});
		}
	});

})

/* GET 客户注册，分三步，一步用户名和联系方式，第二步密码，第三步公司信息. */
router.post('/saveusername', function(req, res, next) {
	var parameter = req.body;
	var username = parameter.username;
	var email = parameter.email;
	var identifyCode = parameter.identifyCode;
	//console.log(username+telephone);
	if(identifyCode == req.session.identifyCode) {
		Userreg.CheckisExist(username, function(result) {
			console.log(result);
			if(result == 0) {
				var user = {
					USERCODE: username,
					EMAIL: email,
				};
				req.session.user2 = user;
			}
			res.send({
				result: result
			});
		})
	} else {
		res.send({
			result: 2
		});
	}
});

router.post('/saveuserpassword', function(req, res, next) {
	var parameter = req.body;
	var password = parameter.password;
	req.session.user2.PASSWORD = password;
	res.send({
		result: 0
	});
});

/* GET 报错照片 */
/*这部分是FTP初始化配置*/
var Client = require('ftp');
var fs = require('fs');
var c = new Client();
var connectionProperties = {
	host: "192.168.100.111",
	port: 21,
	user: "lh",
	password: "123"
};
/*FTP初始化部分*/
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.resolve('./public/uploads'));
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage
});

router.post('/profile', upload.single('avatar'), function(req, res, next) {
	/* 注册信息传递给wcf */
	var guid1 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var guid2 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var guid3 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var userstr = {
		UserID: guid1,
		CustomerID: guid2,
		Password: req.session.user2.PASSWORD,
		LoginCode: req.session.user2.USERCODE,
		EMail: req.session.user2.EMAIL,
		CREATEDATE: Time.getNowDate(0, 0, 0),
		RowState: "4"
	}
	var user = JSON.stringify(userstr);
	req.session.customer.CustomerID = guid2;
	req.session.customer.RowState = "4";
	var customer = JSON.stringify(req.session.customer);
	var filename = req.session.customer.NameE + req.session.user2.USERCODE;
	var filepath = 'uploads/' + path.basename(req.file.path);
	var arrayphoto = [];
	var AccesList = {
		AccesID: guid3,
		FileName: filename,
		FilePath: filepath,
		RowState: "4"
	};
	arrayphoto.push(AccesList);
	var acceslist = JSON.stringify(arrayphoto);
	Userreg.setUser(user, customer, acceslist, function(result) {
		req.session.user2 = null;
		req.session.customer = null;
		req.session.destroy();
		res.send({
			result: result
		});
	});
	/*同时还要上传FTP*/
	// console.log('uploads/' + path.basename(req.file.path));
	//c.on('ready', function() {
	//c.put('../uploads/'+path.basename(req.file.path),'BestFMSDoc/'+path.basename(req.file.path), function(err) {
	//   if (err) throw err;
	//    c.end();
	//  });
	//});
	//c.connect(connectionProperties);
});

router.post('/saveuserCus', function(req, res, next) {
	var parameter = req.body;
	var customer = {
		NameC: parameter.NameC,
		NameE: parameter.NameE,
		TaxNo: parameter.TaxNo,
		Address: parameter.Address,
		AddressEN: parameter.AddressEN,
		Email: parameter.Email,
	}
	req.session.customer = customer;
	console.log(req.session.customer);
	res.send({
		result: 1
	})
});

/* 注册审核 */
router.get('/registerlist', function(req, res, next) {
	//Register.Registerlist("WINODES==@0","CR_CUST03",1,100,"CREATEDATE",1,function(result){
	Register.Registerlist("", "", 0, 100, "CreateDate", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* 通过注册*/
router.post('/agreeregister', function(req, res, next) {
	var parameter = req.body;
	//Register.agreeRegister(parameter.customerID,"CR_CUST03",req.session.user.USERCODE,function(result){
	Register.RegisterAudit(parameter.customerID, parameter.operateFlag, req.session.user.LoginCode, parameter.remark, function(result) {
		res.send({
			result: result
		});
	})
})

/* 获取预约提箱接受提箱列表这个有直接调用节点 */
router.get('/BoxList2', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.HBLNO || req.query.ContainerNo || req.query.EIRNO) {
		var flag = 0;
		if(req.query.HBLNO != "" && typeof(req.query.HBLNO) != "undefined") {
			flag++;
			predicate += "HBLNO==@0";
			values += req.query.HBLNO;
		}
		if(req.query.ContainerNo != "" && typeof(req.query.ContainerNo) != "undefined") {
			if(flag == 0) {
				predicate += "ContainerNo==@0";
				values += req.query.ContainerNo;
			} else {
				predicate += "&&ContainerNo==@" + flag;
				values += "," + req.query.ContainerNo;
			}
			flag++;
		}
		if(req.query.EIRNO != "" && typeof(req.query.EIRNO) != "undefined") {
			if(flag == 0) {
				predicate += "EIRNO==@0";
				values += req.query.EIRNO;
			} else {
				predicate += "&&EIRNO==@" + flag;
				values += "," + req.query.EIRNO;
			}
			flag++;
		}
	}
	console.log(predicate);
	console.log(values);
	case2.BoxList2(predicate, values, 0, 100, "XiangDanID", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* GET预约提箱，接受提箱流程节点*/
router.get('/getboxDetail2', function(req, res, next) {
	var parameter = req.query;
	var XiangDanID = parameter.XiangDanID;
	console.log(XiangDanID);
	case2.boxDetail(XiangDanID, 1, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* 获取预约打单接受打单列表 这个有直接调用节点*/
router.get('/BoxList3', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.HBLNO || req.query.ContainerNo || req.query.EIRNO) {
		var flag = 0;
		if(req.query.HBLNO != "" && typeof(req.query.HBLNO) != "undefined") {
			flag++;
			predicate += "HBLNO==@0";
			values += req.query.HBLNO;
		}
		if(req.query.ContainerNo != "" && typeof(req.query.ContainerNo) != "undefined") {
			if(flag == 0) {
				predicate += "ContainerNo==@0";
				values += req.query.ContainerNo;
			} else {
				predicate += "&&ContainerNo==@" + flag;
				values += "," + req.query.ContainerNo;
			}
			flag++;
		}
		if(req.query.EIRNO != "" && typeof(req.query.EIRNO) != "undefined") {
			if(flag == 0) {
				predicate += "EIRNO==@0";
				values += req.query.EIRNO;
			} else {
				predicate += "&&EIRNO==@" + flag;
				values += "," + req.query.EIRNO;
			}
			flag++;
		}
	}
	console.log(predicate);
	console.log(values);
	card.BoxList3(predicate, values, 0, 100, "XiangDanID", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* GET预约打单，接受打单流程节点*/
router.get('/getboxDetail3', function(req, res, next) {
	var parameter = req.query;
	var XiangDanID = parameter.XiangDanID;
	console.log(XiangDanID);
	card.boxDetail(XiangDanID, 1, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* 通过打单 暂无数据测试*/
router.post('/CardAudit', function(req, res, next) {
	var parameter = req.body;
	var state = parameter.state;
	var operateFlag = parameter.operateFlag;
	acceptbox.CardAudit("", operateFlag, state, function(result) {
		res.send({
			result: result
		});
	})
})

/* 通过提箱  暂无数据测试*/
router.post('/BoxAudit', function(req, res, next) {
	var parameter = req.body;
	var state = parameter.state;
	var operateFlag = parameter.operateFlag;
	acceptbox.BoxAudit("", operateFlag, state, function(result) {
		res.send({
			result: result
		});
	})
})

/* 提箱完成  暂无数据测试*/
router.post('/statebackpickup', function(req, res, next) {
	var parameter = req.body;
	var nodeCode = parameter.state;
	var nodeName = parameter.nodeName;
	var xiangDanID = parameter.xiangDanID;
	var containerNo = parameter.containerNo;
	var finishedTime = parameter.finishTime;
	var indexNo = parameter.indexNo;
	var sealNo = parameter.sealNo;
	var accesList = parameter.accesList;
	var operateFlag = true;
	var orderNodesStr = {
		OrderXiangDanID: xiangDanID,
		IndexNo: indexNo,
		NodeCode: nodeCode,
		NodeName: nodeName,
		IsFinished: operateFlag,
		FinishTime: finishedTime,
		IsRefused: operateFlag ? false : true,
		RefuseTime: operateFlag ? null : finishedTime,
		CREATEBY: req.session.user.LoginCode,
		CREATEDATE: new Date().toLocaleString()
	};
	var orderNodes = JSON.stringify(orderNodesStr);
	box.caseFinish(orderNodes, containerNo, sealNo, accesList, function(result) {
		//console.log(result);
		res.send({
			result: result
		})
	})
});

/* 送箱回箱进厂离厂进港完成  暂无数据测试*/
router.post('/statebackfinish', function(req, res, next) {
	var parameter = req.body;
	var nodeCode = parameter.state;
	var nodeName = parameter.nodeName;
	var xiangDanID = parameter.xiangDanID;
	var finishedTime = parameter.finishTime;
	var indexNo = parameter.indexNo;
	var operateFlag = parameter.operateFlag;
	var orderNodesStr = {
		OrderXiangDanID: xiangDanID,
		IndexNo: indexNo,
		NodeCode: nodeCode,
		NodeName: nodeName,
		IsFinished: operateFlag,
		FinishTime: finishedTime,
		IsRefused: operateFlag == "true" ? "false" : "true",
		RefuseTime: operateFlag == "true" ? null : finishedTime,
		CREATEBY: req.session.user.LoginCode,
		CREATEDATE: new Date().toLocaleString()
	};
	var orderNodes = JSON.stringify(orderNodesStr);
	box.Finish(orderNodes, operateFlag, "", function(result) {
		res.send({
			result: result
		});
	})
})

/* 用户登录，用户名和密码验证.  */
router.post('/userlogin', function(req, res, next) {
	var parameter = req.body;
	var username = parameter.username;
	var password = parameter.password;
	console.log(username);
	Userwcf.Usercheck2(username, password, 0, function(result) {
		console.log(username);
		if(result != 0) {
			result.FLAG = 0;
			req.session.user = result;
		}

		res.send({
			result: result
		});
	})
});

/* 忘记密码用手机号和验证码找回.  */
router.get('/userForget', function(req, res, next) {
	var parameter = req.query;
	var username = parameter.username;
	var email = parameter.email;
	Userwcf.IsValidUser(username, email, function(result) {
		if(result == 1) {
			var user = {
				usercode: username,
				EMAIL: email,
			};
			req.session.user = user;
		}
		res.send({
			result: result
		});
	})
});

/* 重设密码.  */
router.post('/reSetpassword', function(req, res, next) {
	var parameter = req.body;
	var password = parameter.password;
	var userCode = req.session.user.USERCODE;
	var email = req.session.user.EMAIL;
	Userwcf.ChangePwd(userCode, email, password, function(result) {
		res.send({
			result: result
		});
	})
});

/* 集装箱跟踪GET集装箱列表*/
router.get('/BoxList4', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.HBLNO || req.query.ContainerNo || req.query.EIRNO || req.query.type || req.query.begin || req.query.end) {
		var flag = 0;
		if(req.query.HBLNO != "" && typeof(req.query.HBLNO) != "undefined") {
			flag++;
			predicate += "HBLNO==@0";
			values += req.query.HBLNO;
		}
		if(req.query.ContainerNo != "" && typeof(req.query.ContainerNo) != "undefined") {
			if(flag == 0) {
				predicate += "ContainerNO==@0";
				values += req.query.ContainerNo;
			} else {
				predicate += " && ContainerNO==@" + flag;
				values += "," + req.query.ContainerNo;
			}
			flag++;
		}
		if(req.query.EIRNO != "" && typeof(req.query.EIRNO) != "undefined") {
			if(flag == 0) {
				predicate += "EIRNO==@0";
				values += req.query.EIRNO;
			} else {
				predicate += " && EIRNO==@" + flag;
				values += "," + req.query.EIRNO;
			}
			flag++;
		}
		if(req.query.type != "" && typeof(req.query.type) != "undefined" && req.query.type != "all") {
			if(flag == 0) {
				predicate += "IsReback==" + (req.query.type == "done" ? true : false);
			} else {
				predicate += " && IsReback==" + (req.query.type == "done" ? true : false);
			}
		}
		if(typeof(req.query.begin) != "undefined" && req.query.begin != "" && req.query.begin != "起始") {
			if(flag == 0) {
				predicate += "PrintOrderDate>=MDFunctions.ParseDateTime(@0)"
				values += req.query.begin;
			} else {
				predicate += " && PrintOrderDate>=MDFunctions.ParseDateTime(@" + flag + ")";
				values += "," + req.query.begin;
			}
			flag++;
		}
		if(typeof(req.query.end) != "undefined" && req.query.end != "" && req.query.end != "终止") {
			if(flag == 0) {
				predicate += "MDFunctions.ParseDateTime(@0)>=PrintOrderDate"
				values += req.query.end;
			} else {
				predicate += " && MDFunctions.ParseDateTime(@" + flag + ")>=PrintOrderDate";
				values += "," + req.query.end;
			}
			flag++;
		}
	}
	//	if(req.query.HBLNO || req.query.containerNo || req.query.EIRNO )
	//	{
	//		var flag=0;
	//		if(req.query.HBLNO!="" && typeof(req.query.HBLNO)!="undefined")
	//		{
	//			flag++;
	//			predicate+="HBLNO==@0";
	//			values +=req.query.HBLNO;
	//		}
	//		if(req.query.containerNo!="" && typeof(req.query.containerNo)!="undefined")
	//		{
	//			if(flag==0)
	//			{
	//				predicate+="containerNo==@0";
	//				values +=req.query.containerNo;
	//			}
	//			else
	//			{
	//				predicate+="&&containerNo==@"+flag;
	//				values +=","+req.query.containerNo;
	//			}
	//			flag++;
	//		}
	//		if(req.query.EIRNO!="" && typeof(req.query.EIRNO)!="undefined")
	//		{
	//			if(flag==0)
	//			{
	//				predicate+="EIRNO==@0";
	//				values +=req.query.EIRNO;
	//			}
	//			else
	//			{
	//				predicate+="&&EIRNO==@"+flag;
	//				values +=","+req.query.EIRNO;
	//			}
	//			flag++;
	//		}
	//	}
	console.log(predicate);
	console.log(values);
	box.BoxList(predicate, values, 0, 100, "XiangDanID", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

router.get('/BoxList', function(req, res, next) {
	var predicate = "";
	var values = "";
	console.log(req.query);
	if(req.query.HBLNO || req.query.ContainerNo || req.query.EIRNO || req.query.type || req.query.begin || req.query.end) {
		var flag = 0;
		if(req.query.HBLNO != "" && typeof(req.query.HBLNO) != "undefined") {
			flag++;
			predicate += "HBLNO==@0";
			values += req.query.HBLNO;
		}
		if(req.query.ContainerNo != "" && typeof(req.query.ContainerNo) != "undefined") {
			if(flag == 0) {
				predicate += "ContainerNO==@0";
				values += req.query.ContainerNo;
			} else {
				predicate += " && ContainerNO==@" + flag;
				values += "," + req.query.ContainerNo;
			}
			flag++;
		}
		if(req.query.EIRNO != "" && typeof(req.query.EIRNO) != "undefined") {
			if(flag == 0) {
				predicate += "EIRNO==@0";
				values += req.query.EIRNO;
			} else {
				predicate += " && EIRNO==@" + flag;
				values += "," + req.query.EIRNO;
			}
			flag++;
		}
		if(req.query.type != "" && typeof(req.query.type) != "undefined" && req.query.type != "all") {
			if(flag == 0) {
				predicate += "IsReback==" + (req.query.type == "done" ? true : false);
			} else {
				predicate += " && IsReback==" + (req.query.type == "done" ? true : false);
			}
		}
		if(typeof(req.query.begin) != "undefined" && req.query.begin != "" && req.query.begin != "起始") {
			if(flag == 0) {
				predicate += "PrintOrderDate>=MDFunctions.ParseDateTime(@0)"
				values += req.query.begin;
			} else {
				predicate += " && PrintOrderDate>=MDFunctions.ParseDateTime(@" + flag + ")";
				values += "," + req.query.begin;
			}
			flag++;
		}
		if(typeof(req.query.end) != "undefined" && req.query.end != "" && req.query.end != "终止") {
			if(flag == 0) {
				predicate += "MDFunctions.ParseDateTime(@0)>=PrintOrderDate"
				values += req.query.end;
			} else {
				predicate += " && MDFunctions.ParseDateTime(@" + flag + ")>=PrintOrderDate";
				values += "," + req.query.end;
			}
			flag++;
		}
	}
	console.log(predicate);
	console.log(values);
	boxlist.BoxList(predicate, values, 0, 100, "ContainerNO", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* GET集装箱跟踪订单流程节点*/
router.get('/getboxDetail', function(req, res, next) {
	var parameter = req.query;
	var XiangDanID = parameter.XiangDanID;
	console.log(XiangDanID);
	boxlist.boxDetail(XiangDanID, 1, function(result) {
		//		console.log(result);
		res.send({
			result: result
		});
	})
})

router.post('/bindingwx', function(req, res, next) {
	var parameter = req.body;
	if(req.session.user) {
		var userId = req.session.user.UserID;
		var userFlag = req.session.user.UserFlag;
		console.log(req + "---------");
		console.log(res);
		var openId = req.session.user.WechatOpenID == null || req.session.user.WechatOpenID == '' ? req.session.openid : '';
		Userwcf.ChangeOpenId(userId, openId, userFlag, function(result) {
			if(result == 1) {
				req.session.user.WechatOpenID = openId;
			}
			res.send({
				result: result,
				userID: userId,
				UserFlag: userFlag,
				WechatOpenID: openId
			});
		})
	}
});

router.get('/downloadapp', function(req, res, next) {
	res.render('downloadapp', {
		title: 'BestCLOUD'
	});
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	req.session.destroy();
	res.render('loginMain', {
		title: 'BestCLOUD'
	});
});

router.get('/GetDispatchList', function(req, res, next) {

	var predicate = "";
	var values = "";
	//	console.log(req.query);
	//	var flag=0;
	//
	//	console.log(predicate);
	//	console.log(values);
	//	DispatchList.DispatchList(predicate,values,0,100,"DispatchID",0,function(result){
	//		res.send({result:result});
	//	})
	if(req.query.code) {
		request.get({
			url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf45ab4faa6dbb5fe&secret=22708990c65541dca36376fb9ed13ec6&code=' + req.query.code + '&grant_type=authorization_code',
			form: {}
		}, function(error, response, body) {
			if(!error && response.statusCode == 200) {} else {
				var jsondata = JSON.parse(body);
				predicate += "OpenID==@0";
				values += jsondata.openid;
				DispatchList.DispatchList(predicate, values, 0, 100, "DispatchID", 0, function(result) {
					res.send({
						result: result
					});
				})
			}
		})
	} else {
		predicate += "OpenID==@0";
		values += "oz-P_jvKjkizYn8L2hRAjy7zB0V0";
		DispatchList.DispatchList(predicate, values, 0, 100, "DispatchID", 0, function(result) {
			res.send({
				result: result
			})
		});
	}
})

router.get('/DispatchList', function(req, res, next) {
	res.render('DispatchList', {
		title: 'BestCloud'
	});
});

router.get('/ConRecognition', function(req, res, next) {
	res.render('ConRecognition', {
		title: 'BestCloud'
	});
});

router.post('/BackConNo', function(req, res, next) {
	var parameter = req.body;
	DispatchList.BackConNo(parameter.DispatchID, parameter.ContainerNo, function(result) {
		res.send({
			result: result
		});
	})
})

module.exports = router;