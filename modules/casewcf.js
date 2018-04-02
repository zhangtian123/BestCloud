/**
 * nodejs访问wcf
 * 提箱
 */

var Basic = require('./common');
var xml2js = require('xml2js');
var moment = require('moment');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//获取预约提箱接受提箱集装箱列表 可直接获取节点
exports.BoxList2 = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	flag=0;
	aflag=0;
	var addstring = '<BCOrderXiangDan_GetOrderXiangDanTXList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</BCOrderXiangDan_GetOrderXiangDanTXList>';
 //   var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanTXList";
 	var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderXiangDan_GetOrderXiangDanTXList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//callback(response);
    	var arraystr=[];
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderXiangDan_GetOrderXiangDanTXListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.BCOrderXiangDan_GetOrderXiangDanTXListResponse.BCOrderXiangDan_GetOrderXiangDanTXListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
//					var str3 = str1[i].OriginalValues;
					arraystr.push(str1[i]);
					if(i<str1.length)
					{
						boxDetail2(str1[i].XiangDanID,i,function(result){
							if(arraystr[flag])
							{
								var str4 ={XiangDanID:arraystr[flag].XiangDanID,ContainerNo:arraystr[flag].ContainerNo,HBLNO:arraystr[flag].HBLNO,EIRNO:arraystr[flag].EIRNO,EirType:arraystr[flag].EIRType,CustomerName:arraystr[flag].CustomerName,ContainerOwner:arraystr[flag].ContainerOwner,Vessel:arraystr[flag].Vessel,VoyNo:arraystr[flag].VoyNo,DriverName:arraystr[flag].DriverName,DriverTel:arraystr[flag].DriverTel,TruckCompany:arraystr[flag].TruckCompany,Yard:arraystr[flag].Yard,SealNo:arraystr[flag].SealNo,ContainerType:arraystr[flag].ContainerType,ContainerSize:arraystr[flag].ContainerSize,DETAIL:result};
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



//获取节点流
var boxDetail2 = function(mainID, mainType, callback){
	var addstring = '<BCOrderNodes_GetOrderNodesList xmlns="http://tempuri.org/">' +
	                       '<mainID>'+mainID+'</mainID>' +
	                       '<mainType>'+1+'</mainType>' +
	                     '</BCOrderNodes_GetOrderNodesList>';
    var messagestring = "http://tempuri.org/IBestLOGWebAppService/BCOrderNodes_GetOrderNodesList";
    Basic.BasicConnect(addstring, messagestring, function(response){
    	//console.log(response);
    	flag=mainType;
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BCOrderNodes_GetOrderNodesListResponse.BCOrderNodes_GetOrderNodesListResult;
			str1 = JSON.parse(status);
			var array=[];
			for(var i=0;i<str1.length;i++)
			{
				var nodecode = str1[i].NodeCode;
				if(str1[i].IsFinished && (nodecode == 'YS_YYTX' || nodecode== 'YS_JSTX'))
				{
					var str4 = {NodeCode:str1[i].NodeCode,FinishTime:moment(str1[i].FinishTime).format('YYYY-MM-DD hh:mm')};
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}