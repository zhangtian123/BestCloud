
$('body').on("tap",'#registerDetail',function(){
	var n = $(this).parents('.content-item').index();
	var id = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(0).attr('id');
	//alert(id);
	var mblno = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(1).attr('id');
	var vessel = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(2).attr('id');
	var VoyNo = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(3).attr('id');
	var Customer = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(4).attr('id');

	$.ajax({
		type:"post",
		url:"/BackConNo",
		data:{
			id:id,
			mblno:mblno,
			vessel:vessel,
			VoyNo:VoyNo,
		},
		async:true,
		success:function(data){
			var result = eval(data);
			//if(result.result == 1)
			{
				mui.alert("箱号反馈完成");
			}
			else{
				mui.alert("系统处理错误");
			}
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
	//n = n + 1;
})