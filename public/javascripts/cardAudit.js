$(document).ready(function(){
	
	//页面加载完成时获取集装箱，初始为未审核
	$.ajax({
		type:"get",
		url:"/BoxList3",
		async:true,
		success:function(data){
			DATA = data;
			for(var o in DATA)
			{
				var result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
			alert(Totalcount);
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
		var HBLNO = $('input[name="HBLNO"]').val();
		var ContainerNO = $('input[name="ContainerNO"]').val();
		var EIRNO = $('input[name="EIRNO "]').val();
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);
		$.ajax({
			type:"get",
			url:"/BoxList3",
			data:{
				HBLNO:HBLNO,
				ContainerNO:ContainerNO,
				EIRNO:EIRNO,
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

$('body').on("tap",'#agree',function() {
		var btnArray = ['是','否'];
		var operateFlag=true;
		mui.confirm('确定审核接受此打单？','确认',btnArray,function(e){
			if(e.index==0){
				
				var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('.getXiangdanID').eq(0).val();
				$.ajax({
					type:"post",
					url:"/CardAudit",
					data:{
						XiangdanID:text2,
						operateFlag:operateFlag,
						state:"YS_JSDD",
					},
					async:true,
					success:function(data){
						var result = eval(data);
						if(result.result == 0)
						{
							$(".maincontent").find(".content-item:eq("+n+")").remove();
							mui.alert("成功通过");
						}
						else
						{
							mui.alert("系统处理错误");
						}
					},
					error:function(){
						mui.alert("系统处理错误");
					}
				});
			}
			else{
				mui.alert("未通过");
			}
		})
	})
	

	$('body').on("tap","#reject",function(e){
		var operateFlag=flase;
		e.preventDefault();
		var btnArray = ['确定','取消'];
		mui.prompt('请输入驳回理由：','详细条目不对','驳回',btnArray,function(e){
			if(
				var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('.getXiangdanID').eq(0).val();
				//$(".maincontent").find(".content-item:eq("+n+")").remove();
				$.ajax({
					type:"post",
					url:"/CardAudit",
					data:{
						XiangdanID:text2,
						operateFlag:operateFlag,
						state:"YS_JSDD",
						
					},
					async:true,
					success:function(data){
						var result = eval(data);
						if(result.result == 0)
						{
							$(".maincontent").find(".content-item:eq("+n+")").remove();
							mui.alert("成功驳回");
						}
						else
						{
							mui.alert("系统处理错误");
						}
					},
					error:function(){
						mui.alert("系统处理错误");
					}
				});
			}
			else{
				mui.alert("取消");
			}
		})
	})
	
})
