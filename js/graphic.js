	$(document).ready(function(){ 
		var shopName=new Array();
		$.get("file/data.csv",function(csv){
			//读取csv的店铺名
			csvArr=csv.replace(/\n/g,",").split(",");
        	for (var i = 3; i <= csvArr.length-2; ) {
        		shopName[i/3-1]=csvArr[i];
        		i=i+3;
        	};

			chart = new Highcharts.Chart({
				chart: {
					renderTo: "int",
		            type: 'scatter',
		            zoomType: 'xy',
		            backgroundColor:'#012',
		            spacing:[10,10,0,0]
		        },
		        data: {
		        	name: '干衣机',
		            csv: csv,
		            startColumn:1,
		        },
		        plotOptions:{
		        	scatter:{
		        		cropThreshold:300,
		        		marker:{
		        			radius:2,
		        			fillColor: '#f00',		        			
		        		},
		        		dataLabels: {
				            enabled: true,
				            formatter: function() {
				            	var sum=this.x * this.y/1000;
				                return (sum>50)?(sum.toFixed(1)+'k'):'<50k';
			            	},
			            	style:{
			            		fontSize:"8px",
			            		fontWeight:"light",
			            		color: "#abc"
			            	}
       					}
		        	}
		        },
		        legend:{
		        	enabled:false,
		        	labelFormatter:function(){
		        		return  ' 单款干衣机（销售总额）';
		        	},
		        	floating: true,
		            align: 'right',
		            verticalAlign: 'top',
		            x: 0,
		            y: 45,
		            itemStyle:{
		            	'fontSize':"9px",
		            	color:'#aaa'
		            }
		        },
		        title: {
		            text: 'Dryer Sales on Tmall',
		            style:{
		            	fontSize:'9px',
		            	color:'#efefef'
		            }
		        },
				yAxis: {
					title: {
						text: 'Sales',
						margin: 10
					},
					ceiling: 4000,
					gridLineColor:"#345"
				},
				xAxis: {
					title: {
						text: 'Price',
						margin: 0
					},
					gridLineWidth:1,
					gridLineColor:"#345"
				},
				tooltip: {
					// headerFormat: shopName[Number(this.point.index)],
					formatter:function(){
						return '<b>'+shopName[this.point.index]+'</b><br><span>价格： </span><span style="color:#17a">'+this.point.x+'</span><br><span>销量： </span><span style="color:#17a">'+this.point.y+'</span><br><span>总价： </span><span style="color:#c03;font-weight:bold">'+this.point.y*this.point.x+'</span>'
					},
					crosshairs: [{            // 设置准星线样式
					    width: 1.5,
					    color: '#f03030',
					}, {
					    width: 1.5,
					    color: "#f03030",
					}],
				},
				credits:{
					enabled:false
				}
			});
			$('#int').bind('dblclick', function () {
	        $(".board").toggleClass('modall');
	        $(".board").toggleClass('hei');
	        $(this).tooltip('toggle');
	        $(this, ".board").highcharts().reflow();
    	});
		})

	    $("#cas").html5_3d_animation({
	        window_width: '1000',
	        window_height: '400',
	        window_background: '#112238',
	        star_count: '1000',
	        star_color: '#bcd',
	        star_depth: '200'
	    });
	});

// canvas绘图
/*
    var canvas = document.getElementById("cas");
    var ctx = canvas.getContext("2d");

    resize();
    window.onresize = resize;

    function resize(){
        canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        canvas.height = document.documentElement.clientHeight || document.body.clientHeight;
    }

    var RAF = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    // 鼠标活动时，获取鼠标坐标
    var warea = {x: null, y: null, max: 20000};
    window.onmousemove = function(e){
        e = e || window.event;

        warea.x = e.clientX;
        warea.y = e.clientY;
    };
    window.onmouseout = function(e){
        warea.x = null;
        warea.y = null;
    };

    // 添加粒子
    // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
    var dots = [];
    for(var i=0;i<125;i++){
        var x = Math.random()*canvas.width;
        var y = Math.random()*canvas.height;
        var xa = Math.random()/4 - .125;
        var ya = Math.random()/4 - .125;

        dots.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000
        })
    }

    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
    setTimeout(function(){
        animate();
    }, 100);

    // 每一帧循环的逻辑
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
        var ndots  = [warea].concat(dots);

        dots.forEach(function(dot){

            // 粒子位移
            dot.x += dot.xa;
            dot.y += dot.ya;

            // 遇到边界将加速度反向
            dot.xa *= (dot.x > canvas.width || dot.x < 0)? -1 : 1;
            dot.ya *= (dot.y > canvas.height || dot.y < 0)? -1 : 1;

            // 绘制点
            var light=Math.random()/3;
            ctx.fillStyle="rgba(255,255,255,"+light+")";
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

            // 循环比对粒子间的距离
            for (var i = 0; i < ndots.length; i++) {
                var d2 = ndots[i];

                if (dot === d2 || d2.x === null || d2.y === null) continue;

                var xc = dot.x - d2.x;
                var yc = dot.y - d2.y;

                // 两个粒子之间的距离
                var dis = xc * xc + yc * yc;

                // 距离比
                var ratio;

                // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                if(dis < d2.max){

                    // 如果是鼠标，则让粒子向鼠标的位置移动
                    if (d2 === warea && dis > (d2.max / 2)) {
                        dot.x -= xc * 0.03;
                        dot.y -= yc * 0.03;
                    }

                    // 计算距离比
                    ratio = (d2.max - dis) / d2.max;

                    // 画线
                    ctx.beginPath();
                    ctx.lineWidth = ratio/2;
                    ctx.strokeStyle = 'rgba(200,228,255,' + (ratio / 7) + ')';
                    ctx.moveTo(dot.x , dot.y);
                    ctx.lineTo(d2.x , d2.y);
                    ctx.stroke();
                }
            }

            // 将已经计算过的粒子从数组中删除
            ndots.splice(ndots.indexOf(dot), 1);
        });

        RAF(animate);
    }
*/
