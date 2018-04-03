$(document).ready(function(){
	
	//页面加载完成时获取集装箱，初始为未审核
	$.ajax({
		type:"get",
		url:"/BoxList2",
		async:true,
		success:function(data){
			DATA = data;
			for(var o in DATA)
			{
				var result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
//			alert(Totalcount);
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
		offCanvasWrapper.offCanvas('close'); //关闭菜单栏
		//		显示loading动画
		document.getElementById("over").style.display = "block";
		document.getElementById("layout").style.display = "block";
		var type = $('input[name="radio"]:checked').val();
		var begin = $('#begin').val();
		var end = $('#end').val();
		var HBLNO = $('input[name="HBLNO"]').val();
		var ContainerNo = $('input[name="ContainerNo"]').val();
		var EIRNO = $('input[name="EIRNO "]').val();
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);
		$.ajax({
			type:"get",
			url:"/BoxList2",
			data:{
				HBLNO:HBLNO,
				ContainerNo:ContainerNo,
				EIRNO:EIRNO,
			},
			async:true,
			success:function(data){
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
	

})