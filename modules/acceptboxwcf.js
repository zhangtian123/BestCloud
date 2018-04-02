/**
 * nodejs访问wcf
 * 提箱审核
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});


//提箱审核
exports.BoxAudit = function(orderNodes, accesList = "", containerNo, callback){
	var addstring = '<BCOrderNodes_OperateOrderNodes xmlns="http://tempuri.org/">' +
	                       '<orderNodes>'+orderNodes+'</orderNodes>' +
	                       '<accesList>'+accesList+'</accesList>' +
	                         '<operateFlag>'+operateFlag+'</operateFlag>' +  
	                     '</BCOrderNodes_OperateOrderNodes>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderNodes_OperateOrderNodes";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCCustomer_PassOrBackCustomerResponse.BCCustomer_PassOrBackCustomerResult;
			str1 = JSON.parse(status);
			if(operateFlag == 'true')
			{
				status='true';
			}
			else
			{
				status='false';
			}
			callback(str1.status);
		});
    })
}
