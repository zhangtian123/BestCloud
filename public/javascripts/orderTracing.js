var array = [];

$(document).ready(function() {

	//页面加载完成时获取集装箱，初始为未审核
	$.ajax({
		type: "get",
		url: "/BoxList",
		async: true,
		success: function(data) {
			DATA = data;
			for(var o in DATA) {
				var result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
			//			alert(Totalcount);
			if(mui.os.plus) {
				mui.plusReady(function() {
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);
				});
			} else {
				mui.ready(function() {
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);
				});
			}
		},
		error: function() {
			mui.alert("系统处理错误");
		}
	})

	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function() {
		offCanvasWrapper.offCanvas('close'); //关闭菜单栏
		//		显示loading动画
		document.getElementById("over").style.display = "block";
		document.getElementById("layout").style.display = "block";
		var type = $('input[name="radio"]:checked').val();
		var begin = $('#begin').val();
		var end = $('#end').val();
		var HBLNO = $('input[name="HBLNO"]').val();
		var ContainerNo = $('input[name="ContainerNo"]').val();
		var EIRNO = $('input[name="EIRNO"]').val();
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);

		$.ajax({
			type: "get",
			url: "/BoxList",
			data: {
				HBLNO: HBLNO,
				ContainerNo: ContainerNo,
				EIRNO: EIRNO,
				begin: begin,
				type: type,
				end: end,
			},
			async: true,
			success: function(data) {
				//				隐藏loading动画
				document.getElementById("over").style.display = "none";
				document.getElementById("layout").style.display = "none";
				currentlist = 0;
				count = 0;
				downflag = 0;
				upflag = 0;
				Totalcount = 0;
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML = "";
				for(var o in DATA) {
					var result = eval(DATA[o]);
					Totalcount = result[0].COUNT;
				}
				//alert(Totalcount);
				if(mui.os.plus) {
					mui.plusReady(function() {
						setTimeout(function() {
							mui('#pullrefresh').pullRefresh().pullupLoading();
						}, 1000);
					});
				} else {
					mui.ready(function() {
						setTimeout(function() {
							mui('#pullrefresh').pullRefresh().pullupLoading();
						}, 1000);
					});
				}
			},
			error: function() {
				//				隐藏loading动画
				document.getElementById("over").style.display = "none";
				document.getElementById("layout").style.display = "none";
				mui.alert("系统处理错误");
			}
			//			success:function(data){
			//				DATA = data;
			//				var aDiv = document.body.querySelector('.maincontent');
			//				aDiv.innerHTML="";
			//				var flag1=0;
			//				var flag = 0;
			//				//alert(flag1+" "+currentlist+" "+flag);
			//				for(var o in DATA)
			//				{
			//					var result = eval(DATA[o]);
			//					result.shift();
			//					$.each(result,function(key,value){
			//						//alert(flag1+" "+currentlist+" "+flag);
			//						if(flag1>=currentlist && flag<3)
			//						{
			//							var oDiv = document.createElement('div');
			//							oDiv.className = 'mui-card content-item';
			//							Inner(value.BILLNO,value.BILLID,value.CURRENCY,value.TOTALAMOUNT,value.BILLDATE,value.LASTDATE,value.PAYTYPE,value.BRANCHCODE,value.BANKADDRESS,oDiv);
			//							aDiv.append(oDiv);
			//							flag++;
			//							currentlist++;
			//							flag1++;
			//						}
			//						else if(flag1<currentlist) 
			//						{
			//							flag1++;
			//							return true;
			//						}
			//					}) 
			//				}
			//			},
			//			error:function(){
			//				mui.alert("系统处理错误");
			//			}
		});
	})

	/*查看详细条目*/
	$('body').on("tap", '#Detail', function() {
		var n = $(this).parents('.content-item').index();
		//n = n + 1;
		var text2 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.getXiangDanID').eq(0).val();
		//		alert(text2);
		if(!array[text2]) {
			array[text2] = 1;
			var aDiv = $(this).siblings('.mui-collapse-content');
			$.ajax({
				type: "get",
				//				url:"/getTest",
				url: "/getboxDetail",
				data: {
					XiangDanID: text2,
				},
				async: true,
				success: function(data) {
					//					alert("OK");
					var time1 = "",
						time2 = "",
						time3 = "",
						time4 = "",
						time5 = "",
						time6 = "",
						time7 = "",
						time8 = "";
					for(var o in data) {
						var result = eval(data[o]);
						$.each(result, function(key, value) {
							//var time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,time11,time12="";
							switch(value.NodeCode) {
								case 'YS_TX':
									time1 = value.FinishTime;
									break;
								case 'YS_SX':
									time2 = value.FinishTime;
									break;
								case 'YS_DC':
									time3 = value.FinishTime;
									break;
								case 'YS_LC':
									time4 = value.FinishTime;
									break;
								case 'YS_HX':
									time5 = value.FinishTime;
									break;
								case 'YS_JG':
									time6 = value.FinishTime;
									break;
								case 'YS_ZC':
									time7 = value.FinishTime;
									break;
								case 'YS_LG':
									time8 = value.FinishTime;
									break;
								default:
									break;
							}
						})
					}
					trace({
						"id": text2,
						"row_number": 4, //每行有几个圆
						"col_number": 2, //每列有几个圆
						"total_number": 8, //一共有多少个圆
						"datainit": [{
								"name": "提箱",
								"time": time1
							},
							{
								"name": "送箱",
								"time": time2
							},
							{
								"name": "到厂",
								"time": time3
							},
							{
								"name": "离厂",
								"time": time4
							},
							{
								"name": "回箱",
								"time": time5
							},
							{
								"name": "进港",
								"time": time6
							},
							{
								"name": "装船",
								"time": time7
							},
							{
								"name": "离港",
								"time": time8
							},
						]
					});
				},
				error: function() {
					mui.alert("系统处理错误");
				}
			});
		}
	})
})

var Inner = function(id, XiangDanID, NodeCode, eirtype, eirno, hblno, customername, containerowner, vessel, voyno, sealno, containersize, containertype, drivername, drivertel, truckcompany, yard, oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		//			'<div   class="mui-card content-item">'+
		'<!--页眉，放置标题-->' + '<div class="information">' +
		'<div class="mui-card-header imp-color">集装箱号</div>' +
		'<div class="mui-card-header imp-color share-title-id">' + id + '</div></div>' +
		'<input class="getXiangDanID" type="hidden" id="' + id + '" value="' + XiangDanID + '"/>' +
		'<div class="ticket-style"><div class="circle-l"></div><div class="dashLine"></div><div class="circle-r"></div></div>' +
		'<div class="mui-card-content">' +
		'<div class="item">' +
		'<span class="item-title">EIR类型/NO</span>' +
		'<span class="right">' + eirtype + '/' + eirno + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">提单号</span>' +
		'<span class="right">' + hblno + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">用箱人/箱主</span>' +
		'<span class="right">' + customername + '/' + containerowner + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">船名/船次</span>' +
		'<span class="right">' + vessel + '/' + voyno + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">封铅号</span>' +
		'<span class="right">' + sealno + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">尺寸/规格</span>' +
		'<span class="right">' + containersize + '/' + containertype + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">司机/电话</span>' +
		'<span class="right">' + drivername + '/' + drivertel + '</span>' +
		'</div>' +
		'<div class="item">' +
		'	<span class="item-title">车队</span>' +
		'<span class="right">' + truckcompany + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">堆场</span>' +
		'<span class="right">' + yard + '</span>' +
		'</div></div>' +
		'<div class="ticket-style"   style="margin-top:2px;"><div class="circle-l"></div><div class="dashLine"></div><div class="circle-r"></div></div>' +
		'<!--内容区-->' +
		'<ul class="mui-table-view"> ' +
		' <li class="mui-table-view-cell mui-collapse">' +
		' <a class="mui-navigate-right" id="Detail" href="#">点击查看集装箱状态</a>' +
		'  <div class="mui-collapse-content">' +
		'   <canvas id="' + XiangDanID + '" width="310px" height="150px;"></canvas>' +
		'</div>' +
		' </li>' +
		' </ul>' ;
};