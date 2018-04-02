/**
 * nodejs访问wcf
 * 集装箱相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var moment = require('moment');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});

exports.DispatchList = function(predicate, values, pageNum, pageSize, orderByProperty, 
	rowsCount, callback){
//	console.log(predicate+values);
	var addstring = '<BCDispatch_GetBCDispatchList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCDispatch_GetBCDispatchList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCDispatch_GetBCDispatchList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCDispatch_GetBCDispatchListResponse.BCDispatch_GetBCDispatchListResult;
			str1 = JSON.parse(status);
			var array=[];

//			var count = {COUNT:str1.length};
//			array.push(count);
			for(var i=0;i<str1.length;i++)
			{
				var str4 = {id:str1[i].DispatchID, XiangDanID:str1[i].DispatchID,OrderID:"",ContainerNo:str1[i].ContainerNo,HBLNO:str1[i].BLNO,EIRNO:str1[i].DispatchId,EirType:"",CustomerName:"",ContainerOwner:"",Vessel:str1[i].Vessel,VoyNo:str1[i].VoyNo,DriverName:"",DriverTel:"",TruckCompany:"",Yard:"",SealNo:"",ContainerType:"",ContainerSize:""};
				array.push(str4);
			}
			callback(array);
		});
    })
}
	
exports.BackConNo = function(DispatchID, ConNo, callback){
	var addstring = '<BCDispatch_BackConNo xmlns="http://tempuri.org/">' +
	                       '<DispatchID>'+DispatchID+'</DispatchID>' +
	                       '<ConNo>'+ConNo+'</ConNo>' +
	                     '</BCDispatch_BackConNo>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCDispatch_BackConNo";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			console.log(response);
			//var str1=result["s:Envelope"]["s:Body"];
			response=0;
			callback(response);
		});
    })
 }

