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
	    $("#cas").html5_3d_animation({
	        window_width: '1000',
	        window_height: '400',
	        window_background: '#112238',
	        star_count: '1000',
	        star_color: '#bcd',
	        star_depth: '200'
	    });

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
	});