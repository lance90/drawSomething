//定義禁止選取網頁元素
(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function () {
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		h = window.innerHeight - 110,
		w = window.innerWidth - 40;

		canvas.height = h;
		canvas.width = w;

	(function( pen, $, undefined ) {
	   
	    pen.x = 390;
	    pen.y = 265;
	    pen.size = 10;
	    pen.color = "#000000";
	    marks = [];

	     
	    //Public Method
	    pen.move = function() {
	        penTipMove();
	    };
	    pen.draw = function() {
	    	drawMarks();
	    };
	     
	    //Private Method
	    function penTipMove() {
	    	ctx.clearRect(0, 0, w, h);      //移除canvas的區域設定
	    	
	    	_.each(marks, function (m) {
	    		ctx.fillStyle = m.color;
	    		ctx.fillRect(m.x, m.y, m.size, m.size);
	    	});
			
			//當畫筆的顏色是白色時的設定
	    	if (pen.color == '#ffffff') {
		      ctx.beginPath();   //The beginPath() method begins a path, or resets the current path.
		      ctx.rect(pen.x, pen.y, pen.size, pen.size);   //The rect(x,y,width,height) method creates a rectangle.
		      //ctx.arc(pen.x, pen.y, pen.size, 0, 2*Math.PI);
			  ctx.fillStyle = pen.color;
		      ctx.fill();    //The fill() method fills the current drawing (path)
		      ctx.lineWidth = 1;   //The lineWidth property sets or returns the current line width, in pixels.
		      ctx.strokeStyle = 'black';   //The strokeStyle property sets or returns the color, gradient, or pattern used for strokes
		      ctx.stroke();
	    	} else {
	    		ctx.fillStyle = pen.color;
				ctx.fillRect(pen.x, pen.y, pen.size, pen.size);
	    		
	    	}
	    };
		
		//定義畫筆留下的痕跡屬性
	    function Mark() {
	    	this.x = pen.x;
	    	this.y = pen.y;
	    	this.size = pen.size;
	    	this.color = pen.color;
	    };
		//定義添加畫筆痕跡的動作
	    function drawMarks() {
	    	penTipMove();
	    	marks.push(new Mark());    //push()添加新的元素
	    };
	}( window.pen = window.pen || {}, jQuery ));

	
	$('canvas').disableSelection();
	//設定滑鼠移動的動作
	$('#canvas').on('mousemove', function (e) {
		getPenPosition(e);
		pen.move();
	});
	
	//設定滑鼠放下開始畫畫動作
	$('#canvas').on('mousedown', function (e) {
		getPenPosition(e);
		pen.draw();	

		$('#canvas').on('mousemove', function (e) {
			getPenPosition(e);
			pen.draw();			
		});

		$('canvas').on('mouseup', function (e) {
			$('#canvas').off('mousemove', pen.draw());
			
			$('#canvas').on('mousemove', function (e) {
				getPenPosition(e);
				pen.move();
			});
		});
	});
	
	//設定畫筆顏色的改變
	$('.color').on('change', function () {
		var newColor = $('.color').val();    //val() 方法返回或设置被选元素的值。
		pen.color = '#' + newColor.toLowerCase();
	});
	//設定畫筆尺寸的改變
	$('.size').on('change', function () {
		var size = $('.size').val();

		if (!($.isNumeric(size))){   //he $.isNumeric() method checks whether its argument represents a numeric value
			alert('Size must be a number')
		} else {
			pen.size = size;
		}
	});
	
	$('.eraser').on('click', function () {
		pen.color = '#ffffff'
	});
	
	$('.erase_all').on('click', function () {
		if (confirm('Are you sure you want to erase everything?')){
			ctx.clearRect(0, 0, w, h);
			marks = [];
		} else {
			return;
		}
	})

	//定義畫筆的滑鼠位置
	function getPenPosition(e) {
		pen.x = e.pageX - canvas.offsetLeft;
		pen.y = e.pageY - canvas.offsetTop;
	}
});











