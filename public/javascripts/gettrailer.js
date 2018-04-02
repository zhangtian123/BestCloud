$(document).ready(function(){
	
	//页面加载完成时获取请款列表，初始为未审核(现已由下拉刷新步骤代替初始化)
	var aDiv = document.body.querySelector('.maincontent');
	var time = $('input[name="radio"]:checked').val();
	var begin = time;
	var end = 'now';
	//选择时间区间时获取时间
	if(time=='choose')
	{
		begin = $('#begin').text();
		end = $('#end').text();
	}
	$.ajax({
		type:"get",
		url:"/getTrailerList",
		async:true,
		success:function(data){
			DATA = data;
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
})