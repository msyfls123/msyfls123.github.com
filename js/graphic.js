$(function() {
	 $("#cas").html5_3d_animation({
	        window_width: '1000',
	        window_height: '400',
	        window_background: '#157a7a',
	        star_count: '1000',
	        star_color: '#bcd',
	        star_depth: '200'
	    });
	$('#header a:eq(0)').tooltip({placement:"right"})
	$('#header h1').tooltip({placement:"bottom"})
	$('body #contact li').tooltip({placement:"top"})
	$('#menu li:nth-child(5) a').tooltip({placement:"right"})
	$('#dryer').tooltip({placement:"bottom"})
	$("body #contact li:eq(0)").hover(function(){$("#qrcode").addClass("q").stop(true,true).slideDown()},function(){$("#qrcode").stop(true,true).slideUp().removeClass("q")});
	$("body #contact li:eq(1)").hover(function(){$("#qrcode").addClass("w").stop(true,true).slideDown()},function(){$("#qrcode").stop(true,true).slideUp().removeClass("w")});

	$(window).load(function(){
			$("#news").mCustomScrollbar({
				theme:"light",
				scrollButtons:{ enable: false },
				autoHideScrollbar: true
			});
	});
})

$("body #contact li img").each(function(i){
	$(this).mouseenter(function(){
		$(this).css({"top":"-30px"});
	})
	$(this).mouseleave(function(){
		$(this).css({"top":"0px"});
	})
});


function resize(){
	var NeedHeight=window.innerHeight-$("#contact").offset().top;
	var contactTop=(NeedHeight-60>0)?(NeedHeight-30):30;
	$("#contact").css({"margin-top":contactTop+"px","visibility":"visible"});
}
window.onresize = function() {resize()};
window.onload = function() {resize();$("#swift").html("更多精彩")};


// d3可视化中的阳光小箭头
  var light=function(dis1,dis2){svg.append("image")
    .attr("x",dis1)
    .attr("y",dis2)
    .attr("width",10)
    .attr("height",10)
    .attr("xlink:href","img/light.svg")
    .attr("opacity",.1)
    .transition()
    .duration(1000)
    .ease("linear")
    .attr("x",dis1+15)
    .attr("y",dis2+15)
    .attr("opacity",1)
    .transition()
    .duration(1000)
    .ease("linear")
    .attr("x",dis1+30)
    .attr("y",dis2+30)
    .attr("opacity",.1)
    .remove();
  }

// d3可视化中的水流
var water=function(x){
var random=.5*Math.random()+.75;
	svg.append("circle")
	.attr("cx",340+x)
	.attr("cy",200)
	.attr("r",2)
	.attr("fill","#5be")
	.attr("opacity",0)
	.transition()
	.delay(1570)
	.duration(1000)
	.ease("linear")
	.attr("cx",340+1.5*x*random)
	.attr("cy",250)
	.attr("opacity",1)
	.transition()
	.duration(1000)
	.ease("linear")
	.attr("cx",340+2*x*random)
	.attr("cy",300)
	.attr("opacity",.1)
	.remove()
}

var lines=[
[0,"#5be","M20 380 l 107 0 q 5.5 0 5.5 -5 l 0 -234","349","Cold water comes"],
[1,"#f5b090","M190 110 l 30 30 l 0 64.5 l -74.5 0 l 0 139 l 53 0 q 5 0 5 -5 l 0 -8","389","With the sunshine, enter the water heater"],
[2,"#f5b090","M203 324 l 0 -9","10",""],
[3,"#ea5431","M216 315 l 0 19 q 0 10 10 10 l 48 0 q 10 0 10 -10 l 0 -20 q 0 -11 11 -11","200","Become very hot"],
[4,"#5be","M526 363 l -5 0 q -10 0 -10 -10 q 0 -10 -10 -10 l -170 0 q -10 0 -10 -10 l 0 -20 q 0 -10 -10 -10 l -3 0","262","Mixed with the cold water again"],
[5,"#f5b090","M302 298 l 0 -108 q 0 -10 10 -10 l 18 0 q 10 0 10 10","157","Flow to bath"],
]

	$(document).ready(function(){


	    //d3可视化

		// 添加房屋图片
		svg=d3.selectAll("#chart").append("svg").attr("width",600).attr("height",400)
		  svg.append("image")
		    .attr("x",0)
		    .attr("y",0)
		    .attr("width",600)
		    .attr("height",400)
		    .attr("xlink:href","img/waterflow.svg");



		  setInterval("light(100,80);light(110,70);light(90,90);light(80,100)",666)

		    var LineArr=new Array();
		    var flag=-1;

		  function addLine(id,color,str,length,text,all){
		    var flow=svg.append("path")
		      .attr("stroke",color)
		      .attr("stroke-width",2)
		      .attr("fill","none")
		      .attr("d",str)
		      .attr("stroke-dasharray","0 "+length)
		      transform(id,flow,length,text,all)
		      flag=id
		      return flow
		  }

		  function transform(id,obj,end,text,all){
		    var sum=0;
		    for (var i = id-1; i >= 0; i--) {
		      sum+=lines[i][3]*10;
		    };
		    var time=all?sum:0;
		    var lintra=obj.transition()
		    .delay(time)
		    .duration(end*10)
		    .attr("stroke-dasharray",end+" 0")
		    .tween("text",function(){
		      if(text!=""){$("#text").stop(false,false).text('" '+text+' "')}
		      if(id==5){waterOn=setInterval("water(0);water(-10);water(10)",300)}
		    })
		  }

		  var lines=[
		    [0,"#5be","M20 380 l 107 0 q 5.5 0 5.5 -5 l 0 -234","349","Cold water comes"],
		    [1,"#f5b090","M190 110 l 30 30 l 0 64.5 l -74.5 0 l 0 139 l 53 0 q 5 0 5 -5 l 0 -8","389","With the sunshine, enter the water heater"],
		    [2,"#f5b090","M203 324 l 0 -9","10",""],
		    [3,"#ea5431","M216 315 l 0 19 q 0 10 10 10 l 48 0 q 10 0 10 -10 l 0 -20 q 0 -11 11 -11","200","Become very hot"],
		    [4,"#5be","M526 363 l -5 0 q -10 0 -10 -10 q 0 -10 -10 -10 l -170 0 q -10 0 -10 -10 l 0 -20 q 0 -10 -10 -10 l -3 0","262","Mixed with the cold water again"],
		    [5,"#f5b090","M302 298 l 0 -108 q 0 -10 10 -10 l 18 0 q 10 0 10 10","157","Flow to bath"],
		  ]

		    $("#run").on("click",function(){
		      for (var i=0; i <= lines.length - 1; i++) {
		        Line=new addLine(lines[i][0],lines[i][1],lines[i][2],lines[i][3],lines[i][4],true)
		        LineArr.push(Line)
		      };
		      flag=-1
		    })
		    $("#stop").on("click",function(){
		      for (var i = LineArr.length - 1; i >= 0; i--) {
		        LineArr[i].interrupt().transition()
		        LineArr[i].remove()
		      };
		      flag=-1
		    $("#text").text("")
		    clearInterval(waterOn)
		    })

		    $("#step").on("click",function(){
		      var i=flag+1
		      Line=new addLine(lines[i][0],lines[i][1],lines[i][2],lines[i][3],lines[i][4],false)
		      LineArr.push(Line)
		    })
		    $(function(){$('[data-toggle="tooltip"]').tooltip({placement:"top"});})

		// d3可视化结束


		var shopName=new Array();
		var chartWidth=$(".board").width(),chartHeight=$(".board").height();
		$.get("file/data.csv",function(csv){
			//读取csv的店铺名
			csvArr=csv.replace(/\n/g,",").split(",");
        	for (var i = 3; i <= csvArr.length-2; ) {
        		shopName[i/3-1]=csvArr[i];
        		i=i+3;
        	};

			chart = new Highcharts.Chart({
				chart: {
					renderTo: "dryer",
		            type: 'scatter',
		            width: chartWidth,
		            height: chartHeight,
		            zoomType: 'xy',
		            backgroundColor:'#012',
		            spacing:[10,10,10,0]
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
		})

		$('#dryer').bind('dblclick', function () {
			$(this).tooltip('toggle');
	        $(".board").toggleClass('modall');
	        $(".board").toggleClass('hei');
	        $(this).highcharts().setSize($(".board").width(), $(".board").height())
    	});

	});
