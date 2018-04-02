/**
 * nodejs访问wcf
 * 集装箱相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var moment = require('moment');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});

exports.BoxList = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
//	console.log(predicate+values);
	var addstring = '<BCOrderXiangDan_GetOrderXiangDanList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCOrderXiangDan_GetOrderXiangDanList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
//  		console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderXiangDan_GetOrderXiangDanListResponse.BCOrderXiangDan_GetOrderXiangDanListResult;
			str1 = JSON.parse(status);
			var array=[];
			var count = {COUNT:str1.length};
			array.push(count);
			for(var i=0;i<str1.length;i++)
			{
				var str4 = {XiangDanID:str1[i].XiangDanID,OrderID:str1[i].OrderID,ContainerNo:str1[i].ContainerNo,HBLNO:str1[i].HBLNO,EIRNO:str1[i].EIRNO,EirType:str1[i].EIRType,CustomerName:str1[i].CustomerName,ContainerOwner:str1[i].ContainerOwner,Vessel:str1[i].Vessel,VoyNo:str1[i].VoyNo,DriverName:str1[i].DriverName,DriverTel:str1[i].DriverTel,TruckCompany:str1[i].TruckCompany,Yard:str1[i].Yard,SealNo:str1[i].SealNo,ContainerType:str1[i].ContainerType,ContainerSize:str1[i].ContainerSize};
				array.push(str4);
			}
			callback(array);
		});
    })
}

//获取集装箱列表

//获取节点流
exports.boxDetail = function(mainID, mainType, callback){
	var addstring = '<BCOrderNodes_GetOrderNodesList xmlns="http://tempuri.org/">' +
	                       '<mainID>'+mainID+'</mainID>' +
	                       '<mainType>'+mainType+'</mainType>' +
	                     '</BCOrderNodes_GetOrderNodesList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderNodes_GetOrderNodesList";
    Basic.BasicConnect(addstring, messagestring, function(response){
//  	console.log(response);
//  	flag=mainType;
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderNodes_GetOrderNodesListResponse.BCOrderNodes_GetOrderNodesListResult;
			str1 = JSON.parse(status);
			var array=[];
			for(var i=0;i<str1.length;i++)
			{
				var NodeCode = str1[i].NodeCode;
				if(str1[i].IsFinished && (NodeCode == 'YS_LG' || NodeCode== 'YS_ZC' || NodeCode== 'YS_JG' 
				   || NodeCode== 'YS_HX' || NodeCode== 'YS_LC'|| NodeCode== 'YS_DC' || NodeCode== 'YS_SX'
				   || NodeCode== 'YS_TX'))
				{
					var str4 = {NodeCode:str1[i].NodeCode,FinishTime:moment(str1[i].FinishTime).format('YYYY-MM-DD hh:mm')};
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}
