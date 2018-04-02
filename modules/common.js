/**
 * 2017/8/16
 * nodejs访问wcf
 * 通用js
 * */
exports.BasicConnect = function(addstring, messagestring,callback){
	var BasicHttpBinding = require('wcf.js').BasicHttpBinding
	  , Proxy = require('wcf.js').Proxy
	  , binding = new BasicHttpBinding({})
	  , proxy = new Proxy(binding, "http://192.168.100.243:8080/BestLOGWebApp.svc?wsdl")
	  , message = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
	             '<Header />' +
	               '<Body>' +
	                 addstring+
	                '</Body>' +
	           '</Envelope>';
	
	proxy.send(message, messagestring, function(response, ctx) {
		callback(response);
	});
}