$(document).ready(function(){
	$('#submit').click(function(){
		var loadingportresult = $('#loadingportPicker').val(); 
		var desportresult = $('#desportPicker').val();
		var result = $('#datetimePicker').val();
		var num = $('#digitResult').val();
		var weight = $('#weight').val();
		var volume = $('#volume').val();
		var test = $('#test').val();
		var test1 = $('#test1').val();
		var test2 = $('#test2').val();
		//alert(loadingportresult+desportresult+result+num+weight+volume+test+test1+test2);
		$.ajax({
			type:"get",
			url:"/getFreightQuery",
			data:{
				loadingportresult :loadingportresult ,
				desportresult :desportresult,
				result :result,
				num :num,
				weight :weight,
				volume :volume,
				test :test,
				test1 :test1,
				test2 :test2,
			},
			async:true,
			success:function(data){
				var index=0;
				var aDiv = document.body.querySelector('.query-items');
				//var oDiv = document.getElementsByClassName('maincontent')[0];
				aDiv.innerHTML='';
				var result = eval(data);
				$.each(result.result,function(key,value){
					var oDiv = document.createElement('div');
					oDiv.className = 'mui-card content-item';
					Inner(index,value.id,value.begin,value.line,value.end,value.port,value.company,value.time,value.sail,value.expirydatebegin,value.expirydateend,value.GPprice20,value.GPprice40,value.HCprice40,oDiv);
					aDiv.append(oDiv);
					index++;
				})
				offCanvasWrapper.offCanvas('close');
				document.getElementById('test20g').value=test;
				document.getElementById('test40g').value=test1;
				document.getElementById('test40h').value = test2;
			}
		});
	})
})

var Inner = function(index,id,begin,line,end,port,company,time,sail,expirydatebegin,expirydateend,GPprice20,GPprice40,HCprice40,oDiv){
	oDiv.innerHTML = oDiv.innerHTML+
				'<div class="toplabel"></div>'+
				'<!--页眉，放置标题-->'+
				'<div class="mui-card-header">'+
					'<span class="left-text">'+begin+'-'+line+'-'+end+'</span>'+
					'<span class="right-text">'+port+'</span>'+
				'</div>'+
				'<!--内容区-->'+
				'<div class="mui-card-content">';
	if(index==0)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-benefit"></div>';
	else if(index==1)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-fast"></div>';
	oDiv.innerHTML = oDiv.innerHTML+
					'<div class="item">'+
						'<div class="img1"></div>'+
						'<span>船公司/船期/航程：</span>'+
						'<span>'+company+'/'+time+'/'+sail+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<div class="img2"></div>'+
						'<span>有效期：</span>'+
						'<span>'+expirydatebegin+'至'+expirydateend+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<div class="img3"></div>'+
						'<span>20GP/40GP/40HC：</span>'+
						'<span>'+GPprice20+'/'+GPprice40+'/'+HCprice40+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<div class="img4"></div>'+
						'<span>运费：</span>'+
						'<span>XXXX</span>'+
					'</div>'+
				'</div>';	
}
