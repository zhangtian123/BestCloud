/**
 * 2017/8/16
 * nodejs访问wcf
 * 用户登录相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//用户登录时检查用户名密码是否正确
exports.Usercheck1 = function(WechatOpenID,loginCode, password, statusCode, callback){
	console.log(loginCode);
	var addstring = '<BCUsers_ValidateLogin xmlns="http://tempuri.org/">' +
						   '<openID>'+WechatOpenID+'</openID>' +
	                       '<loginCode>'+loginCode+'</loginCode>' +
	                       '<passWord>'+password+'</passWord>' +
	                       '<StatusCode>'+statusCode+'</StatusCode>' +
	                     '</BCUsers_ValidateLogin>';
	var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_ValidateLogin";
	Basic.BasicConnect(addstring, messagestring,function(response){
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			console.log(str1);
			var status = str1.BCUsers_ValidateLoginResponse.statusCode;
			if(status==-1 || status==-2 || status==-3 || status==-4)
			{
				response = status;
			}
			else
			{
				var str2 = str1.BCUsers_ValidateLoginResponse.BCUsers_ValidateLoginResult;
				str1 = JSON.parse(str2);
				console.log(str1);
				response = {
					UserID:str1.UserID,
					LoginCode:str1.LoginCode,					
					CustomerID:str1.CustomerID,
					WechatOpenID:str1.WechatOpenID,
					RegDate:str1.RegDate,
					WeChatID:str1.WeChatID,
					Password:str1.Password,
					UserCode:str1.UserCode,
					UserName:str1.UserName,
					Email:str1.Email,
					MobileNo:str1.MobileNo,
					UserFlag:str1.UserFlag,
				}
			}
			callback(response);
		});
	})
}
exports.Usercheck2 = function(loginCode, password, statusCode, callback){
	console.log(loginCode);
	var addstring = '<BCUsers_ValidateLogin xmlns="http://tempuri.org/">' +
	                       '<loginCode>'+loginCode+'</loginCode>' +
	                       '<passWord>'+password+'</passWord>' +
	                       '<StatusCode>'+statusCode+'</StatusCode>' +
	                     '</BCUsers_ValidateLogin>';
	var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_ValidateLogin";
	Basic.BasicConnect(addstring, messagestring,function(response){
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			console.log(str1);
			var status = str1.BCUsers_ValidateLoginResponse.statusCode;
			if(status==-1 || status==-2 || status==-3 || status==-4)
			{
				response = status;
			}
			else
			{
				var str2 = str1.BCUsers_ValidateLoginResponse.BCUsers_ValidateLoginResult;
				str1 = JSON.parse(str2);
				response = {
					UserID:str1.UserID,
					LoginCode:str1.LoginCode,					
					CustomerID:str1.CustomerID,
					WechatOpenID:str1.WechatOpenID,
					RegDate:str1.RegDate,
					WeChatID:str1.WeChatID,
					Password:str1.Password,
					UserCode:str1.UserCode,
					UserName:str1.UserName,
					Email:str1.Email,
					MobileNo:str1.MobileNo,
					UserFlag:str1.UserFlag,
				}
			}
			callback(response);
		});
	})
}

//忘记密码时匹配用户名，邮箱
exports.IsValidUser = function(loginCode, Email, callback){
	var addstring = '<BCUsers_IsValidUsers xmlns="http://tempuri.org/">' +
	                       '<loginCode>'+loginCode+'</loginCode>' +
	                       '<Email>'+Email+'</Email>' +
	                     '</BCUsers_IsValidUsers>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_IsValidUsers";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCUsers_IsValidUsersResponse.BCUsers_IsValidUsersResult;
			if(status=='true')
			{
				response = 1;
			}
			else
			{
				response=0;
			}
			callback(response);
		});
    })
}

//用户修改密码，传入用户ID，原密码，新密码做参数，返回0：修改成功，1：原始密码错误，3：其他错误
exports.ChangePwd = function(loginCode, Email,NewPwd, callback){
	var addstring = '<BCUsers_SaveNewPwd xmlns="http://tempuri.org/">' +
	                       '<loginCode>'+loginCode+'</loginCode>' +
	                       '<Email>'+Email+'</Email>' +
	                       '<NewPwd>'+NewPwd+'</NewPwd>' +
	                     '</BCUsers_SaveNewPwd>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_SaveNewPwd";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCUsers_SaveNewPwdResponse.BCUsers_SaveNewPwdResult;
			if(status>0)
			{
				response = status;
			}
			else
			{
				response=0;
			}
			callback(response);
		});
    })
}

//用户绑定OpenID
exports.ChangeOpenId = function(userId, openId,userFlag, callback){
	console.log(openId);
	var addstring = '<BCUsers_BindingOpenID xmlns="http://tempuri.org/">' +
	                       '<userID>'+userId+'</UserID>' +
	                       '<openID>'+openId+'</openID>' +
	                     '</BCUsers_BindingOpenID>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_BindingOpenID";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCUsers_BindingOpenIDResponse.BCUsers_BindingOpenIDResult;
			if(status>0)
			{
				response = status;
			}
			else
			{
				response=0;
			}
			callback(response);
		});
    })
}