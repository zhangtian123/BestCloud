/**
 * nodejs访问wcf
 * 用户注册相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//用户注册时检查用户名是否已经注册，ownerID为空
exports.CheckisExist = function(loginCode, callback){
	//console.log(username);
	var addstring = '<BCUsers_IsExistUsers xmlns="http://tempuri.org/">' +
	                       '<loginCode>'+loginCode+'</loginCode>' +
	                     '</BCUsers_IsExistUsers>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCUsers_IsExistUsers";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCUsers_IsExistUsersResponse.BCUsers_IsExistUsersResult;
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

//用户注册时传入用户信息
exports.setUser = function(users,customer,accesList, callback){
	var addstring = '<BCCustomer_WeChatRegister xmlns="http://tempuri.org/">' +
	                       '<customer>'+customer+'</customer>' +
	                       '<users>'+users+'</users>' +
	                       '<accesList>'+accesList+'</accesList>' +
	                     '</BCCustomer_WeChatRegister>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCCustomer_WeChatRegister";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCCustomer_WeChatRegisterResponse.BCCustomer_WeChatRegisterResult;
			str1 = JSON.parse(status);
			callback(str1);
		});
    })
}