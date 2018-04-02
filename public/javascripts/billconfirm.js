var currentlist = 0;
var newlist = 1;

$(document).ready(function(){
	
	//页面加载完成时获取请款列表，初始为未审核
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
		url:"/getRemittanceList",
		data:{
			begin:begin,
			end:end,
		},
		async:true,
		success:function(data){
			DATA = data;
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
	
	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function(){
		currentlist=0;
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
			url:"getRemittanceList",
			data:{
				begin:begin,
				end:end,
			},
			async:true,
			success:function(data){
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML="";
				var flag1=0;
				var flag = 0;
				//alert(flag1+" "+currentlist+" "+flag);
				for(var o in DATA)
				{
					var result = eval(DATA[o]);
					$.each(result,function(key,value){
						//alert(flag1+" "+currentlist+" "+flag);
						if(flag1>=currentlist && flag<3)
						{
							var oDiv = document.createElement('div');
							oDiv.className = 'mui-card content-item';
							Inner(value.BILLNO,value.BILLID,value.CURRENCY,value.TOTALAMOUNT,value.BILLDATE,value.LASTDATE,value.PAYTYPE,value.BRANCHCODE,value.BANKADDRESS,oDiv);
							aDiv.append(oDiv);
							flag++;
						}
						else if(flag1<currentlist) 
						{
							flag1++;
							return true;
						}
						else
						{
							currentlist+=3;
							return false;
						}
					}) 
				}
			},
			error:function(){
				mui.alert("系统处理错误");
			}
		});
	})
	
	/*通过请款时，要提醒用户是否确认，确认后删除页面上选中的请款并在数据库中改为已审核*/
	$('body').on("tap",'#agree',function() {
		var btnArray = ['是','否'];
		mui.confirm('确定此账单？','确认',btnArray,function(e){
			if(e.index==0){
				var n = $(this).parents('.content-item').index();
				n = n + 1;
				var text1 = $(".maincontent").find(".content-item:eq("+n+")").find('.mui-card-header').eq(0).text();
				var remittanceid = text1.substr(text1.indexOf('：')+1,9);
				var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('.getBILLID').eq(0).val();
				$(".maincontent").find(".content-item:eq("+n+")").remove();
				$.ajax({
					type:"post",
					url:"/agreeRemittance",
					data:{
						remittanceid:remittanceid,
						BILLid:text2,
					},
					async:true,
					success:function(data){
						mui.alert("已确认");
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
	
	/*驳回请款时，要让用户输入驳回理由，向后台传回请款单号和驳回理由*/
	$('body').on("tap","#reject",function(e){
		e.preventDefault();
		var btnArray = ['确定','取消'];
		mui.prompt('请输入问题：','详细条目不对','已反馈问题',btnArray,function(e){
			if(e.index == 0){
				var n = $(this).parents('.content-item').index();
				n = n + 1;
				var text1 = $(".maincontent").find(".content-item:eq("+n+")").find('.mui-card-header').eq(0).text();
				var remittanceid = text1.substr(text1.indexOf('：')+1,9);
				var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('.getBILLID').eq(0).val();
				$(".maincontent").find(".content-item:eq("+n+")").remove();
				$.ajax({
					type:"post",
					url:"/rejectRemittance",
					data:{
						remittanceid:text2,
						reason:e.value,
					},
					async:true,
					success:function(data){
						mui.alert("已驳回");
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

var Inner = function(id, billid,currency, money, submittime, latesttime, way, branch, account, oDiv){
	oDiv.innerHTML=oDiv.innerHTML+
	    		'<div class="toplabel"></div>'+
				'<!--页眉，放置标题-->'+
				'<div class="mui-card-header">账单编号：'+id+'</div>'+
				'<input class="getBILLID" type="hidden" id="'+id+'" value="'+billid+'"/>'+
				'<!--内容区-->'+
				'<div class="mui-card-content">'+
					'<div class="item">'+
						'<span class="item-title">总金额</span>'+
						'<span>'+currency+' '+money+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">通知日期</span>'+
						'<span>'+submittime+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">最迟付款日</span>'+
						'<span>'+latesttime+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">结算方式</span>'+
						'<span>'+way+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">开户行</span>'+
						'<span>'+branch+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">银行账号</span>'+
						'<span>'+account+'</span>'+
					'</div>'+
				'</div>'+
				 '<ul class="mui-table-view"> '+
			        '<li class="mui-table-view-cell mui-collapse">'+
			            '<a class="mui-navigate-right" href="#">点击查看详细条目</a>'+
			            '<div class="mui-collapse-content">'+
					        '<ul class="item-row">'+
								'<li>序号</li>'+
								'<li>账单条目</li>'+
								'<li>币别</li>'+
								'<li>金额</li>'+
							'</ul><hr>'+
							'<ul class="item-row">'+
								'<li>1</li>'+
								'<li>报关费</li>'+
								'<li>USD</li>'+
								'<li>30.00</li>'+
							'</ul>'+
							'<ul class="item-row">'+
								'<li>2</li>'+
								'<li>总计</li>'+
								'<li>USD</li>'+
								'<li>30.00</li>'+
							'</ul>'+
							'<hr>'+
							'<div class="buttonbar">'+
								'<button id="agree" type="button" class="mui-btn mui-btn-primary">确认账单</button>'+
								'<button id="reject" type="button" class="mui-btn mui-btn-primary">我有疑问</button>'+
							'</div>'+
						'</div>'+
			        '</li>'+
			    '</ul>';
}
