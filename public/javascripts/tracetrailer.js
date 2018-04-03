/*判断是否为偶数，是的话返回1*/
function chk(number) {
	number = parseInt(number);
	var type = (number % 2 == 0) ? 1 : 0;
	return type;
}
//function getStatus(index,col_number){
//	if(index==1)
//		return 1;
//	else
//	{
//		if(!chk(index/col_number+1))
//		{
//			if(index%col_number==0)
//				status=4;
//			else{
//				if(index%col_number==1)
//					status=5;
//				else
//					status=2;
//			}
//		}
//		else
//		{
//			if(index%col_number==0)
//				status=2;
//			else	
//			{
//				if(index%col_number==1)
//					status=3;
//				else
//					status=4;
//			}
//		}
//		return status;
//	}
//}
//index 索引号，从1开始
//col_number 每列有几个状态
function getStatus(index, row_number, total_number) {
	if(index != total_number) {

		if(index < row_number) {
			status = 1; //第一种画线情况,右横线
		} else if(index == row_number) {
			status = 2; //第二种画线情况，右下竖线
		} else if(index > row_number) {
			status = 3; //第三种画线情况，左横线
		}
	} else {
		status = 4; //第4种画线情况，无横线
	}

	return status;
}

function trace(data) {
	/*首先要根据状态判断到底利用哪种方式来对这个点和线进行渲染*/
	var tempx = 15;
	var tempy = 15;
	if(data.total_number==2){
		tempx+=15;
		tempy+=15;
	}
	var windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
	console.log(windowWidth)
	var widthSpace = windowWidth / 10;
	/*初始化画布*/
	var canvas = document.getElementById(data.id);
	if(canvas == null)
		return false;
	var context = canvas.getContext("2d");

	//设置色彩
	var mainColor = "#df3c01";
	var textColor = "white";

	var grayColor = "#ebebeb"
	var grayText = "#a8a8a8"

	var emptyFlag = false;
	//遍历所有状态节点
	console.log(data.id)
	for(var index = 1; index <= data.total_number; ++index) {
		var status = getStatus(index, data.row_number, data.total_number);
		var times = data.datainit[index - 1].time.replace('T', ' ').split(':');
		if(times.length >= 3) {
			data.datainit[index - 1].time = times[0] + ':' + times[1];
		}

		//圆角矩形尺寸参数
		var width = widthSpace * 1.3;
		if(data.total_number==2){//四个字的节点
			width*=2;
		}
		var height = 0.7 * widthSpace;
		var radius = 10;
		if(width < 2 * radius)
			radius = width / 2;
		if(height < 2 * radius)
			radius = height / 2;

		var name = data.datainit[index - 1].name;
		var time = data.datainit[index - 1].time;
		console.log(name + " " + time)
		if(emptyFlag == true || time == "") {
			//节点未完成
			context.fillStyle = grayColor;
			context.strokeStyle = grayColor;
			textStyle = grayText;
			emptyFlag = true;
		} else {
			context.strokeStyle = mainColor;
			textStyle = textColor;
		}
		if(status == 1) {
			//第一种画线情况,右横线
			var x = tempx + (index - 1) * widthSpace * 1.8;
			var y = tempy;
			if(emptyFlag == false) {
				var grad = context.createLinearGradient(x, y, x + width, y);
				grad.addColorStop(0, 'rgb(255,154,118)');
				grad.addColorStop(1, 'rgb(239,60,1)')
				context.fillStyle = grad;
			}

			context.beginPath();
			context.moveTo(x + radius, y);
			context.arcTo(x + width, y, x + width, y + height, radius);
			context.arcTo(x + width, y + height, x, y + height, radius);
			context.arcTo(x, y + height, x, y, radius);
			context.arcTo(x, y, x + width, y, radius);
			context.closePath();
			context.moveTo(x + width, y + height / 2);
			context.lineTo(x + width + widthSpace, y + height / 2)
			context.stroke();

			//绘制文本
			context.fill()
			context.fillStyle = textStyle;
			context.textAlign = "center"
			context.font = "1.2rem 微软雅黑"
			context.fillText(name, x + width / 2, y + 0.7 * height);
			context.fillStyle = " #79797a";
			context.font = "0.8rem 微软雅黑" //context.font = "0.2rem 微软雅黑"
			var tempIndex = 10;
			context.fillText(time.substring(0, tempIndex), x + width / 2, y + 1.5 * height);
			context.fillText(time.substring(tempIndex, time.length), x + width / 2, y + 2 * height)

		} else if(status == 2) {
			//第二种画线情况，右下竖线

			var x = tempx + widthSpace * 5.4;
			var y = tempy;
			if(emptyFlag == false) {
				var grad = context.createLinearGradient(x, y, x + width, y);
				grad.addColorStop(0, 'rgb(255,154,118)');
				grad.addColorStop(1, 'rgb(239,60,1)')
				context.fillStyle = grad;
			}

			context.beginPath();
			context.moveTo(x + radius, y);
			context.arcTo(x + width, y, x + width, y + height, radius);
			context.arcTo(x + width, y + height, x, y + height, radius);
			context.arcTo(x, y + height, x, y, radius);
			context.arcTo(x, y, x + width, y, radius);
			context.closePath();

			context.fill();
			context.moveTo(x + width, y + height / 2);
			context.lineTo(x + width + 12, y + height / 2)
			context.stroke();
			context.moveTo(x + width + 12, y + height / 2);
			context.lineTo(x + width + 12, y + height / 2 + 70)
			context.stroke();
			context.moveTo(x + width + 12, y + height / 2 + 70);
			context.lineTo(x + width, y + height / 2 + 70)
			context.stroke();

			//绘制文本
			context.fill()
			context.fillStyle = textStyle;
			context.textAlign = "center"
			context.font = "1.2rem 微软雅黑"
			context.fillText(name, x + width / 2, y + 0.7 * height);
			context.fillStyle = " #79797a";
			context.font = "0.8rem 微软雅黑"
			var tempIndex = 10;
			context.fillText(time.substring(0, tempIndex), x + width / 2, y + 1.5 * height);
			context.fillText(time.substring(tempIndex, time.length), x + width / 2, y + 2 * height)
		} else if(status == 3) {
			//第三种画线情况，左横线

			var x = tempx + widthSpace * 5.4;
			x = x - (index - 5) * widthSpace * 1.8;
			var y = tempy + 70;
			if(emptyFlag == false) {
				var grad = context.createLinearGradient(x, y, x + width, y);
				grad.addColorStop(0, 'rgb(255,154,118)');
				grad.addColorStop(1, 'rgb(239,60,1)')
				context.fillStyle = grad;
			}
			context.beginPath();
			context.moveTo(x + radius, y);
			context.arcTo(x + width, y, x + width, y + height, radius);
			context.arcTo(x + width, y + height, x, y + height, radius);
			context.arcTo(x, y + height, x, y, radius);
			context.arcTo(x, y, x + width, y, radius);
			context.closePath();
			context.moveTo(x + width, y + height / 2);
			context.lineTo(x + width - widthSpace * 1.8, y + height / 2)
			context.stroke();

			//绘制文本
			context.fill()
			context.fillStyle = textStyle;
			context.textAlign = "center"
			context.font = "1.2rem 微软雅黑"
			context.fillText(name, x + width / 2, y + 0.7 * height);
			context.fillStyle = " #79797a";
			context.font = "0.8rem 微软雅黑"
			var tempIndex = 10;
			context.fillText(time.substring(0, tempIndex), x + width / 2, y + 1.5 * height);
			context.fillText(time.substring(tempIndex, time.length), x + width / 2, y + 2 * height)
		} else if(status==4){
			//第五种画线情况，无横线
			//绘制圆角矩形
			if(data.total_number==2){//右移动
				var x = tempx + index*widthSpace * 1.8;
				var y = tempy;
			}else{//左移动
				var x = tempx + widthSpace * 5.4;
				x = x - (index - 5) * widthSpace * 1.8;
				var y = tempy + 70;
			}
			if(emptyFlag == false) {
				var grad = context.createLinearGradient(x, y, x + width, y);
				grad.addColorStop(0, 'rgb(255,154,118)');
				grad.addColorStop(1, 'rgb(239,60,1)')
				context.fillStyle = grad;
			}
			context.beginPath();
			context.moveTo(x + radius, y);
			context.arcTo(x + width, y, x + width, y + height, radius);
			context.arcTo(x + width, y + height, x, y + height, radius);
			context.arcTo(x, y + height, x, y, radius);
			context.arcTo(x, y, x + width, y, radius);
			context.closePath();

			//绘制文本
			context.fill()
			context.fillStyle = textStyle;
			context.textAlign = "center"
			context.font = "1.2rem 微软雅黑"
			context.fillText(name, x + width / 2, y + 0.7 * height);
			context.fillStyle = " #79797a";
			context.font = "0.8rem 微软雅黑"
			var tempIndex = 10;
			context.fillText(time.substring(0, tempIndex), x + width / 2, y + 1.5 * height);
			context.fillText(time.substring(tempIndex, time.length), x + width / 2, y + 2 * height)
		}
	}
}