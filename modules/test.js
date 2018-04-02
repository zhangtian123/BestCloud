var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//用户注册时检查用户名是否已经注册，ownerID为空
exports.setUser = function(users,customer,accesList, callback){
	var addstring = '<BCCustomer_WeChatRegister xmlns="http://tempuri.org/">' +
	                       '<users>'+users+'</users>' +
	                       '<customer>'+customer+'</customer>' +
	                       '<accesList>'+accesList+'</accesList>' +
	                     '</BCCustomer_WeChatRegister>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCCustomer_WeChatRegister";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	console.log(response);
    	/*xmlParser.parseString(response, function (err, result) {
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
		});*/
    })
}