/**
 * nodejs访问wcf
 * 用户注册审核相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});

exports.Registerlist = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	var addstring = '<BCCustomer_GetRegisterList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCCustomer_GetRegisterList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCCustomer_GetRegisterList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCCustomer_GetRegisterListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.BCCustomer_GetRegisterListResponse.BCCustomer_GetRegisterListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
//					var str3 = str1[i].OriginalValues;
				
					var str4 = {CustomerID:str1[i].CustomerID,RegisterUser:str1[i].LoginCode,NameC:str1[i].NameC,NameE:str1[i].NameE,TaxNo:str1[i].TaxNo,RegisterDate:str1[i].CreateDate,Address:str1[i].Address,AddressEN:str1[i].AddressEN,Emila:str1[i].Emial};
					//console.log(str4);
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}

/* 获取图片地址*/
exports.getphoto = function(jobID, callback){
	var addstring = '<BCAcces_GetAccesListByJobID xmlns="http://tempuri.org/">' +
	                       '<jobID>'+jobID+'</jobID>' +
	                     '</BCAcces_GetAccesListByJobID>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCAcces_GetAccesListByJobID";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCAcces_GetAccesListByJobIDResponse.BCAcces_GetAccesListByJobIDResult;
			str1 = JSON.parse(status);
			var str4 = 0;
			if(str1.length!=0)
			{
//				var str3 = str1[i].OriginalValues;
				str4 = {FilePath:str1[i].FilePath};
				console.log(str4.FilePath+"----------");
			}
			callback(str4);
		});
    })
}

/* 注册审核*/
exports.RegisterAudit = function(customerID,operateFlag,operateUser,remark,  callback){
	var addstring = '<BCCustomer_PassOrBackCustomer xmlns="http://tempuri.org/">' +
	                       '<customerID>'+customerID+'</customerID>' +
	                       '<operateFlag>'+operateFlag+'</operateFlag>' +
	                       '<operateUser>'+operateUser+'</operateUser>' +
	                       '<remark>'+remark+'</remark>' +
	                     '</BCCustomer_PassOrBackCustomer>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCCustomer_PassOrBackCustomer";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
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
			callback(str1);
		});
    })
}

