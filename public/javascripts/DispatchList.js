var array = [];

$(document).ready(function(){

	//页面加载完成时获取集装箱，初始为未审核
	$.ajax({
		type:"get",
		url:"/GetDispatchList",
		async:true,
		success:function(data){
			DATA = data;
			for(var o in DATA)
			{
				var result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
			
			if (mui.os.plus) {
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
		error:function(){
			mui.alert("系统处理错误");
		}
	})
	
	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function(){
		var begin = $('#begin').text();
		var end = $('#end').text();
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);
		
		$.ajax({
			type:"get",
			url:"/GetDispatchList",
			data:{
				begin:begin,
				end:end,
			},
			async:true,
			success:function(data){
				currentlist = 0;
				count = 0;
				downflag = 0;
				upflag = 0;
				Totalcount = 0;
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML="";
				for(var o in DATA)
				{
					var result = eval(DATA[o]);
					Totalcount = result[0].COUNT;
				}
				//alert(Totalcount);
				if (mui.os.plus) {
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
			error:function(){
				mui.alert("系统处理错误");
			}

		});
	})
	
	/*查看详细条目*/
$('body').on("tap",'#Detail',function() {
    var n = $(this).parents('.content-item').index();
    var text3 = $(".maincontent").find(".content-item:eq("+n+")").find('.getXiangDanID').eq(0).val();
		mui.openWindow('/ConRecognition?id='+text3);
})
})

var Inner = function(id,XiangDanID,NodeCode,eirtype,eirno,hblno,customername,containerowner,vessel,voyno,sealno,containersize,containertype,drivername,drivertel,truckcompany,yard,oDiv){
			oDiv.innerHTML = oDiv.innerHTML+
//			'<div   class="mui-card content-item">'+
						'<div class="toplabel"></div>'+
						'<!--页眉，放置标题-->'+
						'<div class="mui-card-header">blno：'+hblno+'</div>'+
						'<input class="getXiangDanID" type="hidden" value="'+XiangDanID+'"/>'+
						'<div class="mui-card-content">'+
					'<div class="item">'+
						'<span class="item-title">提单号</span>'+
						'<span>'+hblno+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">船名/船次</span>'+
						'<span>'+vessel+'/'+voyno+'</span>'+
					'</div>'+

						'<!--内容区-->'+
						'<ul class="mui-table-view"> '+
			       ' <li class="mui-table-view-cell mui-collapse">'+
			           ' <a class="mui-navigate-right" id="Detail" href="#">点击反馈箱号</a>'+
			          '  <div class="mui-collapse-content">'+
					     '   <canvas id="'+XiangDanID+'" width="310px" height="300px"></canvas>'+
						'</div>'+
			       ' </li>'+
			        ' </ul>'+	
			        '</div>'+
			        '</div>';
		   };