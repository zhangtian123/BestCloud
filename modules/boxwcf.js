/**
 * nodejs访问wcf
 * 状态反馈相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var moment = require('moment');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
var flag=0;
var aflag=0;

//获取集装箱列表(进港、送箱、回箱、离厂、到厂)
exports.BoxList = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	flag=0;
	aflag=0;
	var addstring = '<BCOrderXiangDan_GetOrderXiangDanList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCOrderXiangDan_GetOrderXiangDanList>';
 //   var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanList";
 	var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//callback(response);
    	var arraystr=[];
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderXiangDan_GetOrderXiangDanListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.BCOrderXiangDan_GetOrderXiangDanListResponse.BCOrderXiangDan_GetOrderXiangDanListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
//					var str3 = str1[i].OriginalValues;
					arraystr.push(str1[i]);
					if(i<str1.length)
					{
						boxDetail(str1[i].XiangDanID,i,function(result){
							if(arraystr[flag])
							{   //箱号、封铅号、尺寸/规格
//								var str4 ={XiangDanID:arraystr[flag].XiangDanID,ContainerNo:arraystr[flag].ContainerNo,
//									SealNo:arraystr[flag].SealNo,ContainerType:arraystr[flag].ContainerType,
//									ContainerSize:arraystr[flag].ContainerSize,DETAIL:result};
								var str4={XiangDanID:arraystr[flag].XiangDanID,ContainerNo:arraystr[flag].ContainerNo,HBLNO:arraystr[flag].HBLNO,EIRNO:arraystr[flag].EIRNO,EirType:arraystr[flag].EIRType,CustomerName:arraystr[flag].CustomerName,ContainerOwner:arraystr[flag].ContainerOwner,Vessel:arraystr[flag].Vessel,VoyNo:arraystr[flag].VoyNo,DriverName:arraystr[flag].DriverName,DriverTel:arraystr[flag].DriverTel,TruckCompany:arraystr[flag].TruckCompany,Yard:arraystr[flag].Yard,SealNo:arraystr[flag].SealNo,ContainerType:arraystr[flag].ContainerType,ContainerSize:arraystr[flag].ContainerSize,DETAIL:result};
								array.push(str4);
							}
							aflag++;
							if(aflag==str1.length)
							{
								callback(array);
							}
						})
					}
					
				}
			}
		});
    })
}

//获取集装箱列表(提箱)
exports.BoxTXList = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	flag=0;
	aflag=0;
	var addstring = '<BCOrderXiangDan_GetOrderXiangDanList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCOrderXiangDan_GetOrderXiangDanList>';
 //   var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanList";
 	var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//callback(response);
    	var arraystr=[];
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderXiangDan_GetOrderXiangDanListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.BCOrderXiangDan_GetOrderXiangDanListResponse.BCOrderXiangDan_GetOrderXiangDanListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
//					var str3 = str1[i].OriginalValues;
					arraystr.push(str1[i]);
					if(i<str1.length)
					{
						boxDetail(str1[i].XiangDanID,i,function(result){
							if(arraystr[flag])
							{   //尺寸/规格
								var str4 ={SealNo:arraystr[flag].SealNo,ContainerType:arraystr[flag].ContainerType,ContainerSize:arraystr[flag].ContainerSize,DETAIL:result};
								array.push(str4);
							}
							aflag++;
							if(aflag==str1.length)
							{
								callback(array);
							}
						})
					}
					
				}
			}
		});
    })
}

//进港、送箱、回箱、离厂、到厂完成
exports.Finish  = function(orderNodes,operateFlag, accesList , callback){
	var addstring = '<BCOrderNodes_OperateOrderNodes xmlns="http://tempuri.org/">' +
	                       '<orderNodes>'+orderNodes+'</orderNodes>' +
	                       '<operateFlag>'+operateFlag+'</operateFlag>'+
	                       '<accesList>'+accesList+'</accesList>' +
	                     '</BCOrderNodes_OperateOrderNodes>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderNodes_OperateOrderNodes";
   Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderNodes_OperateOrderNodesResponse.BCOrderNodes_OperateOrderNodesResult;
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

//提箱完成
exports.caseFinish = function(orderNodes, containerNo, sealNo, accesList, callback){
	var addstring = '<BCOrderXiangDan_OperateXiangDanTX xmlns="http://tempuri.org/">' +
	                       '<orderNodes>'+orderNodes+'</orderNodes>' +
	                       '<containerNo>'+containerNo+'</containerNo>' +
	                       '<sealNo>'+sealNo+'</sealNo>' +
	                       '<accesList>'+accesList+'</accesList>' +
	                     '</BCOrderXiangDan_OperateXiangDanTX>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_OperateXiangDanTX";
    Basic.BasicConnect(addstring, messagestring, function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderXiangDan_OperateXiangDanTXResponse.BCOrderXiangDan_OperateXiangDanTXResult;
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

var boxDetail = function(mainID, mainType, callback){
	var addstring = '<BCOrderNodes_GetOrderNodesList xmlns="http://tempuri.org/">' +
	                       '<mainID>'+mainID+'</mainID>' +
	                       '<mainType>'+1+'</mainType>' +
	                     '</BCOrderNodes_GetOrderNodesList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderNodes_GetOrderNodesList";
    Basic.BasicConnect(addstring, messagestring, function(response){
//  	console.log(response);
    	flag=mainType;
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
