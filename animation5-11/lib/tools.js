var generate_count=0;
var label_count=0;
var ghost_count=0;
var rects=new Array();
var labels=new Array();
var ghosts={
	obj:new Array(),
	mode:new Array()
};
var dyings=new Array();
var target_param=new Array();
var target_label={
	obj:new Array(),
	value:new Array()
};
var is_parent=new Array();
var is_return=0;
var svg=Snap(1500,1200);
var frame=new Array();
var texts=[3];
var htmlText=new Array();
var jsText=new Array();
var scrollCount=[0,0,0];
var component=new Array();
var componentPos=new Array();
var componentCol=new Array();
var boxCount=0;
var componentV={
	obj:new Array(),
	no:new Array()
};
var boxList={
	"html":new Array(),
	"js":new Array(),
	"posX":new Array(),
	"posY":new Array(),
	"line":new Array(),
	"htmlObj":new Array(),
	"jsObj":new Array(),
	"exist":false
};
var relation={
	quotation:new Array(),
	target:new Array()
};
var blankRelation={
	obj:new Array(),
	no:new Array()
}
var highColor="#e8383d";
var shadowRep = Snap.filter.shadow(4,4,4,"black",1);
var shadow = svg.filter(shadowRep);
var htmlTitle;
var jsTitle;
var browserTitle;
textSet={};

//rect描画
function generate(posX,posY,w,h,col,op,st,stw){
	rects[generate_count]=svg.rect(posX,posY,w,h);
	rects[generate_count].attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw,
		r:15
	});
	//objects[generate_count]=rects[generate_count];
	is_parent[generate_count]=false;
	generate_count++;
}

//rect描画(任意の変数に代入可)
function rectSoft(posX,posY,w,h,col,op,st,stw){
	var obj=svg.rect(posX,posY,w,h);
	obj.attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw,
		r:5
	});
	return obj;
}

function rectHard(posX,posY,w,h,col,op,st,stw){
	var obj=svg.rect(posX,posY,w,h);
	obj.attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw,
		r:0
	});
	return obj;
}

function rectDot(posX,posY,w,h,col,op,st,stw){
	var obj=svg.rect(posX,posY,w,h);
	obj.attr({
		fill: col,
		opacity: op,
		stroke:st,
		strokeWidth:stw,
		strokeDasharray:7
	});
	return obj;
}

function circleUI(posX,posY,r,col,op,st,stw){
	var obj=svg.circle(posX,posY,r);
	obj.attr({
		fill:col,
		opacity:op,
		stroke:st,
		strokeWidth:stw
	});

	return obj;
}

function ellipseUI(posX,posY,w,h,col,op,st,stw){
	var obj=svg.ellipse(posX,posY,w,h);
	obj.attr({
		fill:col,
		opacity:op,
		stroke:st,
		strokeWidth:stw
	});

	return obj;
}

//テキスト描画
function label(posX,posY,size,family,content,col){
	labels[label_count]=svg.text(posX,posY,content);
	labels[label_count].attr({
		fontSize: size,
		fill: col,
		fontFamily: family,
		pointerEvents:"none",
		xml:space='preserve'
	})
	label_count++;
}

//テキスト描画(任意の変数に代入可)
function labelUI(posX,posY,size,family,content,col){
	var new_label=svg.text(posX,posY,content);
	new_label.attr({
		fontSize: size+"px",
		fill: col,
		fontFamily: family,
		pointerEvents:"none",
		xml:space='preserve'
	})
	if(family==""){
		new_label.attr("fontFamily","Helvetica");
	}
	return new_label;
}

function updateText(obj,new_text){
	obj.attr("text",new_text);
}

function line(x,y,x2,y2,w,col,op){
	var new_line=svg.line({
		x1: x,
		y1: y,
		x2: x2,
		y2: y2,
		stroke: col,
		strokeWidth: w,
		opacity: op
	});
	return new_line;
}

function ghost(obj,obj2,value,mode,label){
	is_return++;
	var x=Number(obj.attr("x"))+Number(obj.attr("width"))/2;
	var y=Number(obj.attr("y"))+Number(obj.attr("height"))/2;
	var x2=Number(obj2.attr("x"))+Number(obj2.attr("width"))/2;
	var y2=Number(obj2.attr("y"))+Number(obj2.attr("height"))/2;
	var scale=Number(obj.attr("width"))*0.15;
	ghosts.obj[ghost_count]=svg.rect(x,y,scale,scale);
	ghosts.obj[ghost_count].attr({
		fill:chooseColor(value)+"",
		opacity:0.85,
		r:30,
		filter:blur
	});
	trans(ghosts.obj[ghost_count],x2,y2,400*def_speed/30);
	ghosts.mode[ghost_count]=mode;
	if(mode==0){
		setParent(ghosts.obj[ghost_count],obj);
		dyings[ghost_count]=obj;
	}
	else{
		target_param[ghost_count]=obj2;
		target_label.obj[ghost_count]=label;
		target_label.value[ghost_count]=value;
	}
	ghost_count++;
}

function chooseColor(value) {
	var min=min_value;
	var max=max_value;
 	var color_min = "#0000ff"//"#afeeee"; //最小値の色
 	var color_max = "#00ff00"; //最大値の色
 	var color;
 	$(function() {
  		color = $.xcolor.gradientlevel(color_min, color_max, value - min, max - min);
 	});
 	return color;
}

function repaint(obj,col,op,ms){
	obj.animate( { fill :col,opacity : op},ms );
}

function resize(obj,w,h,ms){
	obj.animate({
		width: w,
		height: h,
	},ms)

	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i]==obj.id&&relation.child[i].inAnim().length==0){
				//resize(relation.child[i],w*relation.width[i],h*relation.height[i],ms);
			}
		}
	}
}

//子要素がある場合は追従させる(子要素単独で移動した際に親との相対距離を修正する必要有り)
function trans(obj,px,py,ms){
	obj.animate({
		x: px,
		y: py
	},ms)

	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i]==obj.id){
				trans(relation.child[i],px+relation.x[i],py+relation.y[i],ms);
			}
		}
	}
}

function copyRect(obj1){
	var obj_clone=svg.rect();
	obj_clone.attr({
		x:obj1.attr("x"),
		y:obj1.attr("y"),
		width:obj1.attr("width"),
		height:obj1.attr("height"),
		fill: obj1.attr("fill"),
		opacity: obj1.attr("opacity"),
		stroke:obj1.attr("stroke"),
		strokeWidth:obj1.attr("strokeWidth"),
	});

	return obj_clone;
}

function copyLabel(obj1){
	var obj_clone=svg.text();
	obj_clone.attr({
		x:obj1.attr("x"),
		y:obj1.attr("y"),
		fontSize:obj1.attr("fontSize"),
		fontFamily:obj1.attr("fontFamily"),
		text:obj1.attr("text"),
		fill: obj1.attr("fill"),
		pointerEvents:"none"
	});

	return obj_clone;
}

function duplicate(obj1){
	var obj_clone;
	if(obj1.attr("width")==null){
		obj_clone=svg.text();
		obj_clone=copyLabel(obj1);
	}
	else{
		obj_clone=svg.rect();
		obj_clone=copyRect(obj1);
	}
	return obj_clone;
}

function remove(obj){
	if(obj.id.indexOf("func")>-1){
		for(var i=0;i<rises.length;i++){
			if(onTrigger(rises[i],obj)==true){
				on_rise[i]=false;
			}
		}
	}
	if(obj.id.indexOf("parent")>-1){
		for(var i=0;i<relation.parent.length;i++){
			if(relation.parent[i]==obj.id){
				remove(relation.child[i]);
			}
		}
	}
	obj.remove();
}

function onCollision(obj1,obj2){
	var x1=obj1.attr("x")-0;
	var x2=obj2.attr("x")-0;
	var y1=obj1.attr("y")-0;
	var y2=obj2.attr("y")-0;
	var lx1=obj1.attr("width")-0;
	var lx2=obj2.attr("width")-0;
	var ly1=obj1.attr("height")-0;
	var ly2=obj2.attr("height")-0;
	//console.log(x2+lx2);
	if(x1<=x2+lx2&&y1<=y2+ly2&&x2<=x1+lx1&&y2<=y1+ly1){
		var distanceX;
		var distanceY;
		if(x2-x1>=0)distanceX=x2+(lx1-(x2-x1));
		else distanceX=x2+(-lx1-(x2-x1));
		if(y2-y1>=0)distanceY=y2+(ly1-(y2-y1));
		else distanceY=y2+(-ly1-(y2-y1));
		trans(obj2,distanceX,distanceY,0);
		return true;
	}
	else{
		return false;
	}
}

function onTrigger(obj1,obj2){
	var x1=obj1.attr("x")-0;
	var x2=obj2.attr("x")-0;
	var y1=obj1.attr("y")-0;
	var y2=obj2.attr("y")-0;
	var lx1=obj1.attr("width")-0;
	var lx2=obj2.attr("width")-0;
	var ly1=obj1.attr("height")-0;
	var ly2=obj2.attr("height")-0;
	//console.log(x2+lx2);
	if(x1<=x2+lx2&&y1<=y2+ly2&&x2<=x1+lx1&&y2<=y1+ly1){
		return true;
	}
	else{
		return false;
	}
}

//親子関係を築く(リサイズ時に子要素の座標を調整する必要有り)
function setParent(child,parent){
	if(parent.id.indexOf("parent")<0){
		parent.id+="parent";
	}
	if(child.attr("width")==null){
		relation.parent[relation.num]=parent.id;
		relation.child[relation.num]=child;
		relation.x[relation.num]=(Number(child.attr("x")))-Number(parent.attr("x"));
		relation.y[relation.num]=(Number(child.attr("y")))-Number(parent.attr("y"));
		relation.num++;
	}
	else{
		relation.parent[relation.num]=parent.id;
		relation.child[relation.num]=child;
		relation.dis=Number(parent.attr("width"))-Number(parent.attr("width"))*0.7;
		relation.dis/=4;
		relation.x[relation.num]=(Number(child.attr("x"))+relation.dis)-Number(parent.attr("x"));
		relation.y[relation.num]=(Number(child.attr("y")))-Number(parent.attr("y"));
		relation.width[relation.num]=Number(child.attr("width"))/Number(parent.attr("width"));
		relation.height[relation.num]=Number(child.attr("height"))/Number(parent.attr("height"));
		relation.num++;
	}
}

function setLabels(html,browser,js){
	if(html!=""){
		htmlTitle=labelUI(160,160,30,"",html,"black");
	}
	if(browser!=""){
		browserTitle=labelUI(760,26,25,"",browser,"black");
	}
	if(js!=""){
		jsTitle=labelUI(850,295,30,"",js,"black");
	}
	return [html,browser,js];
}

function setFrame(html,browser,js){
	if(html>0){
		frame.push(rectSoft(50,170,500,400,"#fff",1,"black",1));
	}
	if(browser>0){
		frame.push(rectSoft(600,1,600,240,"#fff",1,"black",1));
		frame.push(rectSoft(600,1,600,30,"#ddd",1,"black",1));
	}
	if(js>0){
		frame.push(rectSoft(600,305,600,350,"#fff",1,"black",1));
	}
	for(var i=0;i<frame.length;i++){
		//frame[i].attr("fill","none");
		frame[i].attr("pointerEvents","none");
	}
}

var stringCounter = function(str,seq){
    return str.split(seq).length - 1;
}

function parseText(no,text){
	texts[no]=text;
}

function showText(no){
	var x=0;
	var y=0;
	switch(no){
		case 0:
			x=60;
			y=200;
			for(var i=0;i<textSet[no+""].length;i++){
				htmlText.push(labelUI(x,y+i*25,15,"",textSet[no+""][i],"black"));
			}
			resize(frame[0],Number(frame[0].attr("width")),Number(frame[0].attr("height"))+(htmlText.length-15)*25,0);
			break;
		case 1:
			x=620;
			y=335;
			for(var i=0;i<textSet[no+""].length;i++){
				jsText.push(labelUI(x,y+i*25,15,"",textSet[no+""][i],"black"));
			}
			resize(frame[3],Number(frame[3].attr("width")),Number(frame[3].attr("height"))+(jsText.length-13)*25,0);
			break;
	}
}

function setText(){
	var temp="";
	for(var i=0;i<texts.length;i++){
		textSet[i+""]=new Array();
		for(var j=0;j<texts[i].length;j++){
			if(texts[i][j]!="\n"){
				temp+=texts[i][j];
			}
			else{
				textSet[i+""].push(temp);
				temp="";
			}
			if(j==texts[i].length-1||temp.length>68){
				textSet[i+""].push(temp);
				temp="";
			}
		}
		showText(i);
	}
}

function scroll(no,count){
	if(no==0){
		scrollCount[0]+=25;
		for(var i=0;i<htmlText.length;i++){
			trans(htmlText[i],htmlText[i].attr("x"),(130-scrollCount[0])+i*25,100);
		}
		for(var i=0;i<boxList["html"].length;i++){
			var id="box"+boxList["html"][i];
			var past=getBoxPos(id);
			scrollBox(0);
			//scrollBox(past-25,id);
		}
		scrollArrow(25,0);
	}
	if(no==1){
		scrollCount[1]+=50;
		for(var i=0;i<component.length;i++){
			trans(component[i],component[i].attr("x"),Number(component[i].attr("y")-scrollCount[1]),100);
		}
		scrollArrow(50,1);
	}
	if(no==2){
		scrollCount[2]+=25;
		for(var i=0;i<jsText.length;i++){
			trans(jsText[i],jsText[i].attr("x"),(335-scrollCount[2])+i*25,100);
		}
		for(var i=0;i<boxList["js"].length;i++){
			var id="box"+boxList["js"][i];
			var past=getBoxPos(id);
			scrollBox(1);
			//scrollBox(past-25,id);
		}
		scrollArrow(25,0);
	}
}

function scrollArrow(rate,mode,no){
	if(no==undefined||no==null){
		no=0;
	}
	if(mode==0){
		arrow[no].attr({
			y1:Number(arrow[no].attr("y1"))-rate
		});
	}
	else{
		arrow[no].attr({
			y1:Number(arrow[no].attr("y1"))-rate,
			y2:Number(arrow[no].attr("y2"))-rate
		});
	}
}

function getBoxPos(id){
	return Number(document.getElementById(id).style.top.replace("px",""));
}

function scrollBox(no){
	//document.getElementById(id).style.top=y;
	if(no==0){
		for(var i=0;i<boxList.htmlObj.length;i++){
			var target=boxList.htmlObj[i];
			trans(target,target.attr("x"),Number(target.attr("y"))-25,100);
		}
	}
	if(no==1){
		for(var i=0;i<boxList.jsObj.length;i++){
			var target=boxList.jsObj[i];
			trans(target,target.attr("x"),Nubmer(target.attr("y"))-25,100);
		}
	}
}

function checkText(){
	for(var i=0;i<htmlText.length;i++){
		if(htmlText[i].attr("y")<60){
			htmlText[i].attr("opacity",0);
		}
		else{
			htmlText[i].attr("opacity",1);
		}
	}
	for(var i=0;i<jsText.length;i++){
		if(jsText[i].attr("y")<335){
			jsText[i].attr("opacity",0);
		}
		else{
			jsText[i].attr("opacity",1);
		}
	}
	for(var i=0;i<component.length;i++){
		if(component[i].attr("y")<50){
			component[i].attr("opacity",0);
		}
		else
		if(component[i].attr("opacity")==0){
			//component[i].attr("opacity",1);
		}
	}
}

function addComponent(obj){
	obj.attr("opacity",0);
	obj.id+="Component";
	component.push(obj);
	componentPos.push(obj.attr("y"));
	componentCol.push(obj.attr("fill"));
}

function setVisible(no,rate){
	repaint(component[no],component[no].attr("fill"),rate,600);
}

function highlight(obj){
	repaint(obj,highColor,obj.attr("opacity"),400);
	if(boxList.exist==true){
		for(var i=0;i<boxList.line.length;i++){
			if(obj.id==boxList.line[i]){
				for(var j=0;j<boxList.html.length;j++){
					if(i==boxList.html[j]){
						highlight(boxList.htmlObj[j]);
					}
				}
				for(var j=0;j<boxList.js.length;j++){
					if(i==boxList.js[j]){
						highlight(boxList.jsObj[j]);
					}
				}
				//document.getElementById("box"+i).style.color=highColor;
			}
		}
	}
}

function defuse(obj){
	if(obj.id.indexOf("Component")<0){
		repaint(obj,"black",1,500);
		if(boxList.exist==true){
			for(var i=0;i<boxList.line.length;i++){
				if(obj.id==boxList.line[i]){
					for(var j=0;j<boxList.html.length;j++){
						if(i==boxList.html[j]){
							defuse(boxList.htmlObj[j]);
						}
					}
					for(var j=0;j<boxList.js.length;j++){
						if(i==boxList.js[j]){
							defuse(boxList.jsObj[j]);
						}
					}
					//defuse(boxList.obj[i]);
					//document.getElementById("box"+i).style.color="black";
				}
			}
		}
	}
	else{
		for(var i=0;i<component.length;i++){
			if(component[i].id==obj.id){
				repaint(obj,componentCol[i],1,100);
			}
		}
	}
}	

function setArrow(obj,obj2,no){
	var x_1,x_2,y_1,y_2;
	if(no==null){
		no=0;
	}
	if(Number(obj.attr("x"))<Number(obj2.attr("x"))){
		x_2=Number(obj2.attr("x"));
	}
	else{
		if(obj.attr("width")!=undefined){
			x_2=Number(obj2.attr("x"))+Number(obj2.attr("width"));
		}
		else{
			x_2=Number(obj2.attr("x"))+obj2.attr("text").length*8;
		}
	}
	if(obj.attr("width")!=undefined){
		x_1=Number(obj.attr("x"))+Number(obj.attr("width"))/2;
	}
	else{
		x_1=Number(obj.attr("x"))+obj.attr("text").length*5;
	}
	if(Number(obj.attr("y"))<Number(obj2.attr("y"))){
		y_1=Number(obj.attr("y"))+5;
	}
	else{
		y_1=Number(obj.attr("y"))-10;
	}
	y_2=Number(obj2.attr("y"))+Number(obj2.attr("height"))/2;
	arrow[no].attr({
		x1:x_1,
		y1:y_1,
		x2:x_2,
		y2:y_2
	});
}

function absoluteArrow(x1,y1,x2,y2,no){
	if(no==null){
		no=0;
	}
	arrow[no].attr({
		x1:x1,
		y1:y1,
		x2:x2,
		y2:y2
	});
}

function showArrow(no){
	if(no==null){
		no=0;
	}
	repaint(arrow[no],arrow[no].attr("fill"),1,100);
	repaint(marker[no],marker[no].attr("fill"),1,100);
}

function hideArrow(no){
	if(no==null){
		no=0;
	}
	repaint(arrow[no],arrow[no].attr("fill"),0,100);
	repaint(marker[no],marker[no].attr("fill"),0,100);
}

function setBox(x,y,w,val,line,no){
	document.write('<input type="text" id="box'+boxCount+'">');
	document.getElementById("box"+boxCount).style.position="relative";
	var elm=document.getElementById("box"+boxCount);
	var rect = elm.getBoundingClientRect() ;
	document.getElementById("box"+boxCount).style.zIndex=0;
	document.getElementById("box"+boxCount).style.left=x-rect.left;
	document.getElementById("box"+boxCount).style.top=y-rect.top;
	document.getElementById("box"+boxCount).style.width=w;
	document.getElementById("box"+boxCount).style.height=20;
	document.getElementById("box"+boxCount).style.fontSize=13;
	document.getElementById("box"+boxCount).value=val;
	if(no==0){
		boxList["html"].push(boxCount);
	}
	else{
		boxList["js"].push(boxCount);
	}
	boxList.posX.push(x);
	boxList.posY.push(y);
	boxList["line"].push(line.id);
	if(boxList["exist"]==false){
		boxList["exist"]=true;
	}
	addBlankRelation(line,boxCount);
	boxCount++;
}

function fixBox(){
	for(var i=0;i<boxCount;i++){
		//document.getElementById("box"+i).style.border="none";
		document.getElementById("box"+i).style.pointerEvents="none";
		document.getElementById("box"+i).style.zIndex=-1;
		var x=boxList.posX[i]-10//Number(document.getElementById("box"+i).style.left.replace("px",""));
		var y=boxList.posY[i]+5//Number(document.getElementById("box"+i).style.top.replace("px",""));
		var val=document.getElementById("box"+i).value;
		var fixVal=labelUI(x,y,15,"",val,"black");
		for(var j=0;j<boxList.html.length;j++){
			if(i==boxList.html[j]){
				boxList.htmlObj.push(fixVal);
			}
		}
		for(var j=0;j<boxList.js.length;j++){
			if(i==boxList.js[j]){
				boxList.jsObj.push(fixVal);
			}
		}
		document.getElementById("box"+i).style.opacity=0;
		resizeBlank(blankRelation.obj[i],blankRelation.no[i]);
	}
}

function rebirthBox(){
	for(var i=0;i<boxCount;i++){
		//document.getElementById("box"+i).style.border="outset";
		document.getElementById("box"+i).style.pointerEvents="auto";
		document.getElementById("box"+i).style.zIndex=1;
		document.getElementById("box"+i).style.opacity=1;
	}
}

function addVariable(obj,no){
	componentV["obj"].push(obj);
	componentV.no.push(no);
}

function checkVariable(){
	for(var i=0;i<componentV.obj.length;i++){
		componentV.obj[i].attr("text",document.getElementById("box"+componentV.no[i]).value);
	}

	var t="'";
	for(var i=0;i<relation.quotation.length;i++){
		if(relation.quotation[i].attr("width")==undefined){
			resizeBlank(relation.quotation[i],relation.target[i]);
		}
	}
	for(var i=0;i<relation.quotation.length;i++){
		if(relation.quotation[i].attr("width")!=undefined){
			relation.quotation[i].attr("width",inputCheck(relation.target[i].attr("text"))*20);
			//alert(relation.target[i].attr("text").length*11);
		}
	}
}

function reQuotation(obj,obj2){
	if(obj2!=null){
		relation.quotation.push(obj);
		relation.target.push(obj2);
	}
}

function addBlankRelation(obj,no){
	blankRelation.obj.push(obj);
	blankRelation.no.push(no);
}

function resizeBlank(obj,target){
	var t=obj.attr("text");
	var nt="";
	var blank=false;
	for(var i=0;i<t.length;i++){
		if(t[i]!="　"){
			if(blank==true){
				if(target>=0){
					dif=inputCheck(document.getElementById("box"+target).value);
				}
				else{
					dif=inputCheck(target.attr("text"));
				}
				//alert(dif);
				for(var j=0;j<dif;j++){
					nt+='　';
				}
			}
			nt+=t[i];
			blank=false;
		}
		else{
			blank=true;
		}
	}
	obj.attr("text",nt);
}

function inputCheck(val) {
	var half=0.0;
	var all=0;
	for(var i=0;i<val.length;i++){
		if (val[i].match(/[^A-Za-z0-9]+/)) {
	 		all+=1;
		}
		else{
			half+=0.5;
			if(half>=1){
				all+=1;
				half=0;
			}
		}
	}
	//alert(all+half);
	return half+all;
}

function addShadow(obj){
	obj.attr("filter",shadow);
}

function end(){
	//document.getElementById("resetButton").style.opacity=1;
}

function resetAll(){
	for(var i=0;i<htmlText.length;i++){
		defuse(htmlText[i]);
		//htmlText[i].attr("fill","black");
		htmlText[i].attr("opacity",1);
		htmlText[i].attr("y",200+i*25);
	}
	for(var i=0;i<jsText.length;i++){
		jsText[i].attr("fill","black");
		jsText[i].attr("opacity",1);
		jsText[i].attr("y",335+i*25);
	}
	for(var i=0;i<component.length;i++){
		component[i].attr("opacity",0);
		component[i].attr("opacity",0);
		component[i].attr("y",componentPos[i]);
		component[i].attr("fill",componentCol[i]);
	}
	for(var i=0;i<boxList.htmlObj.length;i++){
		remove(boxList.htmlObj[i]);
	}
	for(var i=0;i<boxList.jsObj.length;i++){
		remove(boxList.jsObj[i]);
	}
	boxList.htmlObj=new Array();
	boxList.hsObj=new Array();
	rebirthBox();
	defuse(htmlTitle);
	//defuse(jsTitle);
	defuse(browserTitle);
	called=false;
	limitCount=0;
	for(var i=0;i<scrollCount.length;i++){
		scrollCount[i]=0;
	}
	/*for(var i=0;i<boxList.posY.length;i++){
		//document.getElementById("box"+i).style.top=boxList.posY[i];
		//alert(document.getElementById("box"+i).style.top)
	}*/
	for(var i=0;i<arrow.length;i++){
		hideArrow(i);
	}
}