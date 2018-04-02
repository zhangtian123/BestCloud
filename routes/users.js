//var express = require('express');
//var router = express.Router();
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//res.send('respond with a resource');
//});
//
//module.exports = router;

//var User = require('../modules/userwcf');
//var arr = new Array;
//arr.push("2014-5-20 17:00:00");
//arr.push("2014-3-20 18:00:00");
/*function Arr(createdate,opdate){
	this.createdate=createdate;
	this.opdate = opdate;
}
var arr = new Arr("2017-06-05 19:08:45.000","Fee_CQK");*/
//var arr=["2017-06-05 19:08:45.000","Fee_CQK"];
//var arr1 = new Array;
//arr1.push("2017-06-05 19:08:45.000");
//var arr = JSON.stringify(arr);
//arr.push("Fee_CQK");
//var arr = '2017-06-05 19:08:45.000';
////条件，values[]，页数，每页数据量，排序字段，总数据量
//User.Accountbill('STATUSNAME==@0 && BILLCODE>=@1',arr, 2, 2,'BILLCODE', 0, function(response){
////	var x = response.indexOf('{"PAYTYPE"');
////	var str = response.substring(x,response.indexOf('}')+1);
////	var str1 = JSON.parse(str);
//	console.log(response);
//})
/*var User = require('../modules/trailerwcf');
User.carOrderList("","",1,2,"BILLNO",0,function(result){
	console.log(result);
	var x = result.indexOf('{')+1;
	result = result.substring(x);
	var x = result.indexOf('{');
    var array=[];
	while(x!=-1)
	{
		console.log(result);
		var y = result.indexOf('}')+1;
		var str = result.substring(x,y);
		console.log(str);
		var str1 = JSON.parse(str);
		array.push(str1);
		result = result.substring(y);
		x = result.indexOf('{')+1;
		result = result.substring(x);
		console.log(result);
		x = result.indexOf('{');
	}
	for(var o in array)
	{
		console.log(array[o]);
	}
})*/
/*var User = require('../modules/userregister');
//var arr = new Array;
//arr.push("2013-3-24 17:00:00")
//var obj = {"date":"2013-4-20 17:00:00"}
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
console.log(guid1);
console.log(guid2);
//COMCONTACTID:'+guid1+',CONTACTCOMGUID:'+guid2+',
//BILLID:'+guid2+',
var userstr = {COMCONTACTID:guid1,CONTACTCOMGUID:guid2,USERCODE:"name",IDPASSWORD:"password",EMAIL:"telephone",RowState:"4"};
var com = {BILLID:guid2,COMNAMECN: "ComChiname",COMNAME: "ComEngname",TAXNUMBER: "321456",COMADDRESS: "ComChiadd",COMADDRESSEN: "ComEngadd",EMAIL: "ComEmail",RowState:"4"};
var user = JSON.stringify(userstr);
var company = JSON.stringify(com);
console.log(userstr);
console.log(company);
User.setUser(user,company,function(response){
	console.log(response);
})*/
//var User = require('../modules/trailerwcf');
//
//var str = {BILLID:"4871c3953b204854a55df2269282ecd6",GETCONTIME:"2017-7-20 00:08:00",CONTAINERNO:"aabb",SEALNO:""}
//var str1 = JSON.stringify(str);
//User.trailerFinish(str1,"Fee_CQK05","admin",function(result){
//	console.log(result);
//})

/*var User = require('../modules/Remittancewcf');

var str = {BOXID:"4871c3953b204854a55df2269282ecd6",BOXNO:""}
var str1 = JSON.stringify(str);
User.AccountbillFinish(str1,"Fee_CQK05","admin",function(result){
	console.log(result);
})*/
var user = require('../modules/test');
user.setUser("admin","user1","user2",function(result){
	console.log(result);
})
