
function changeJsonAttr(id, str, times, json)
{
    var index = searchSVGElementIndex(id, str, times);
    if(index == -1){
	alert("failed to find the animation target by ID.");
    }
    SVGAry[index].animate(json, 0);
}

function setTspanStrs(id, x, y, strAry, json){
    var svgStrAryText = SVG.text(x, y, strAry).attr(json);
    SVGAry.push(svgStrAryText);
    SVGPushLog.push([id, "tspan"]);
}

function execStringAnimationByTspan(id, times, strIndex, json){
    var i = searchSVGElementIndex(id, "tspan", times);
    if(i == -1){
	alert("failed to find the animation target by double ID.");
    }
    SVGAry[i].selectAll("tspan")[strIndex].animate(json, animationSpeed);
}

function execAnimation(id, str, times, json)
{
    var index = searchSVGElementIndex(id, str, times);
    if(index == -1){
	alert("failed to find the animation target by ID.");
    }
    SVGAry[index].animate(json, animationSpeed);
}

function searchSVGElementIndex(id, str, times)
{
    var findCount = 0;
    for(var i = 0; i < SVGPushLog.length; i++){
	if(id == SVGPushLog[i][0]){
	    if(str == SVGPushLog[i][1]){
		if(findCount == (times - 1)){
		    return i;
		}else{
		    findCount++;
		}
	    }
	}
    }
    return -1;
}

function setGridChart(){
    var i, k, tmp;
    var interval = 100;
    var circleSize = 3;
    for(i = 1; i < (svgSize / interval) - 3; i++){
	for(k = 1; k < (svgSize / interval) - 3; k++){
	    tmp = SVG.circle(i * interval, k * interval, circleSize).
		attr({ opacity: 0.5, fill: "cyan", stroke: "blue", strokeWidth: 1 });
	    SVGAry.push(tmp);
	    SVGPushLog.push(["grid", (i + "," + k)]);
	}
    }
    // the center of SVG. make new center.
    SVGAry.push(SVG.circle(500, 500, 5).attr({ opacity: 0.8, fill: "pink", stroke: "red", strokeWidth: 2 }));
    SVGPushLog.push("center", "5,5"); 
    // remove the duplication of SVG circle. make the center tmp circle 'transparent'
    execAnimation("grid", "5,5", 1, { opacity: 0 }); 
}

function setLine(id, x1, y1, x2, y2){
    var p = SVG.line(x1, y1, x2, y2).attr({ stroke: "black", strokeWidth: 1,  "stroke-dasharray" : "10" });
    SVGAry.push(p);
    SVGPushLog.push([id, "line"]);
}

function setEllipse(id, x1, y1, width, height){
    var eclipse = SVG.ellipse(x1, y1, width, height)
	    .attr({ fill: "white", stroke: "black", strokeWidth: 1 });
    SVGAry.push(eclipse);
    SVGPushLog.push([id, "eclipse"]);
}

function setBallon(id, lineX, lineY, ballonX, ballonY, text){
    var width = text.length * 5;
    var height = 40;
    var offset = (text.length / 2) * 8;
    setLine(id, lineX, lineY, ballonX, ballonY);
    setEllipse(id, ballonX, ballonY, width, height);
    setText(id, ballonX - offset, ballonY + 5, text);
    changeJsonAttr(id, "line", 1, { opacity: 0 });
    changeJsonAttr(id, "eclipse", 1, { opacity: 0 });
    changeJsonAttr(id, text, 1, { opacity: 0 });
}

function setAllElement(){
    for (var i = snappaths.length - 1; i >= 0; i--) {
	snappaths[i].animate({ strokeDashoffset: 0 }, 1000);
    }
}

function setRect(id, x1, y1, charSize ,space, curve, text){
    var width = text.length * charSize + space;
    var r = SVG.rect(x1, y1, width, 30).attr({ fill: "white", stroke: "black", strokeWidth: 0, opacity: 0, r: curve });
    var msg = SVG.text(x1 + 15, y1 + 21, text).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(r);
    SVGAry.push(msg);
    SVGPushLog.push([id, "rect"]);
    SVGPushLog.push([id, text]);
}

function setText(id, x1, y1, str){
    var msg = SVG.text(x1, y1, str).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(msg);
    SVGPushLog.push([id, str]);
}

function execArrowAnimation(id, times, json){
    execAnimation(id, "tip", 1, json);
    execAnimation(id, "line", 1, json);
}

function setArrow(id, x1, y1, x2, y2){
    var lineP = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;
    var markerShape = SVG.path("M0,0L8,5L0,10L4,5z").attr({ fill: "black", opacity: 0 });
    var tip = markerShape.marker(0, 0, 10, 10, 5, 5);
    var arrowLine = SVG.path(lineP).attr({ stroke: "black", strokeWidth: 2 , opacity: 0 , markerEnd: tip });
    SVGAry.push(markerShape);
    SVGAry.push(arrowLine);
    SVGPushLog.push([id, "tip"]);
    SVGPushLog.push([id, "line"]);
}

function setTitleAreaRectangle(x, y, width, height, title, text)
{
    var rec = SVG.rect(x, y, width, height).attr({ fill: "white", stroke: "black", strokeWidth: 2 });
    var line = SVG.path("M " + x + " "+ (y + 30) + " h " + width).attr({ stroke: "black", strokeWidth: 2 });
    var text = SVG.text(x + 10, y + 21, title);
    SVGAry.push(line);
    SVGAry.push(text);
    SVGAry.push(rec);
    SVGPushLog.push([title, "line"]);
    SVGPushLog.push([title, "title"]);
    SVGPushLog.push([title, "rect"]);
}

function setTextRectangle(x, y, width, title, strAry){
    var space = 30;
    var height = strAry.length * 23 + space; // the height of text area.
    var lineX, lineY, firstLine = y + 27;
    var titleX = x + 10 , titleY = y - 9;
    SVGAry.push(SVG.rect(x, y, width, height).attr({ fill: "white", strokeWidth: 2, stroke: "black" })); // the frame of text.
    SVGAry.push(SVG.text(titleX, titleY, title)); // the element of title text.
    SVGPushLog.push([title, "rect"]);
    SVGPushLog.push([title, "title"]);
    for(var i = 0; i < strAry.length; i++){
	lineX = x + 10;
	lineY = firstLine + (i * 23);
	SVGAry.push(SVG.text(lineX, lineY, strAry[i])); // every stmnt.
	SVGPushLog.push([title, strAry[i]]);
    }
}

function setAllSVGData(){
    
    setTitleAreaRectangle(300, 50, 400, 250,
			  "file:///hoge/ex06-1.html",
			  [ ]);
    setTextRectangle(50, 390, 400,
		     "ex06-1.html", ["<!DOCTYPE html>",
				     "<html>", "", "<head>",
				     "<meta charset=\"utf-8\">",
				     "<title> 練習問題06-1 </title>",
				     "<script src=\"ex06-1.js\"><\/script>",
				     "</head>", "",
				     "<body>",
				     "<h1> 関数の練習 </h1>",
				     "<input type=\"button\" value=\"ここをクリック\"",
				     "onclick=\"sayhello();sayhello();\">",
				     "</body>", "", "</html>"]);
    setTextRectangle(600, 390, 300,
		     "ex06-1.js", [ "function sayhello(){", "alert('Hello, world!);", "}"]);
    
    setArrow("FirstArrow", 250, 540, 420, 250);
    setText("FirstText", 155, 340, "スクリプトファイルの指定");
    setArrow("SecondArrow", 650, 350, 550, 250);
    setText("SecondText", 660, 330, "指定されたスクリプトファイルが読み込まれる");
    setBallon("FunctionBallon", 550, 150, 850, 150, "function sayhello()");
    setText("RegisterFunction", 810, 220, "関数の登録");
    setArrow("ThirdArrow", 185, 625, 360, 160);
    setText("ThirdText", 325, 145, "関数の練習");
    setArrow("ClickHere", 300, 650, 370, 230);
    setRect("ClickHereRect", 325, 180, 15, 40, 5, "ここをクリック");
    setTspanStrs("onclick", 485, 250, ["onclick=\"", "sayhello();", "sayhello();", "\""],
		 { stroke: "black", strokeWidth: 0, opacity: 0 });
    setArrow("ForthArrow", 485 + 245, 240, 790, 220);
    setArrow("alertArrow", 580, 410, 450, 310);
    setArrow("FifthArrow", 850, 235, 750, 380);
    setArrow("fromClickHere", 460, 200, 550, 230);
    setRect("HelloWorldRect", 330, 260, 10 ,0 , 1, "Hello, world!");
    setArrow("SecondTimes", 460, 200, 660, 230);
    
}

var callAnimation = function(){
    switch(animationStepIndex){
    case 0: case 1:
	execAnimation("ex06-1.html",
		      "<script src=\"ex06-1.js\"><\/script>",
		      1, { fill: "black", stroke: "red", strokeWidth: 2 });
	break;
    case 2:
	execArrowAnimation("FirstArrow", 1, { opacity: 1 });
	break;
    case 3:
	execAnimation("FirstText", "スクリプトファイルの指定", 1, { opacity: 1, strokeWidth: 1 });
	break;
    case 4:
	execAnimation("ex06-1.html", "<script src=\"ex06-1.js\"><\/script>", 1,
		      { fill: "black", stroke: "black", strokeWidth: 1 });
	break;
    case 5:
	execAnimation("ex06-1.js", "title", 1, { fill: "black", stroke: "red", strokeWidth: 2 });
	break;
    case 6:
	execArrowAnimation("SecondArrow", 1, { opacity: 1 });
	break;
    case 7:
	execAnimation("SecondText", "指定されたスクリプトファイルが読み込まれる", 1, { opacity: 1, strokeWidth: 1 });
	break;
    case 8:
	execAnimation("FunctionBallon", "line", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	execAnimation("FunctionBallon", "eclipse", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	execAnimation("FunctionBallon", "function sayhello()", 1, { stroke: "black", strokeWidth: 0, opacity: 1 });
	break;
    case 9:
	execAnimation("RegisterFunction", "関数の登録", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	break;
    case 10:
	execAnimation("FunctionBallon", "line", 1, { opacity: 0 });
	execAnimation("ex06-1.js", "title", 1, { stroke: "black", strokeWidth: 0 });
	execAnimation("ex06-1.html", "<script src=\"ex06-1.js\"><\/script>", 1, { stroke: "black", strokeWidth: 0 });
	execArrowAnimation("FirstArrow", 1, { opacity: 0 });
	execArrowAnimation("SecondArrow", 1, { opacity: 0 });
	execAnimation("FirstText", "スクリプトファイルの指定", 1, { opacity: 0 });
	execAnimation("SecondText", "指定されたスクリプトファイルが読み込まれる", 1, { opacity: 0 });
	execAnimation("RegisterFunction", "関数の登録", 1, { strokeWidth: 0 });
	break;
    case 11:
	break;
    case 12:
	execAnimation("ex06-1.html", "<h1> 関数の練習 </h1>", 1, { strokeWidth: 1, stroke: "red", fill: "black" });
	break;
    case 13:
	execArrowAnimation("ThirdArrow", 1, { opacity: 1 });
	break;
    case 14:
	execAnimation("ThirdText", "関数の練習", 1, { opacity: 1, stroke: 1, strokeWidth: 1 });
	break;
    case 15:
	execArrowAnimation("ThirdArrow", 1, { opacity: 0 });
	break;
    case 16:
	execAnimation("ex06-1.html", "<h1> 関数の練習 </h1>", 1, { stroke: "black", strokeWidth: 0 });
	execAnimation("ThirdText", "関数の練習", 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	break;
    case 17:
	break;
    case 18:
	execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1,  { strokeWidth: 1, fill: "black", stroke: "red" });
	execAnimation("ex06-1.html", "onclick=\"sayhello();sayhello();\">", 1, { strokeWidth: 1, fill: "black", stroke: "red" });
	break;
    case 19:
	execArrowAnimation("ClickHere", 1, { opacity: 1 });
	break;
    case 20:
	execAnimation("ClickHereRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "white", stroke: "black", strokeWidth: 1, opacity: 1 });
	break;
    case 21:
	execAnimation("onclick", "tspan", 1, { opacity: 1 });
	break;
    case 22:
	execArrowAnimation("ClickHere", 1, { opacity: 0 });
	execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	execAnimation("ex06-1.html", "onclick=\"sayhello();sayhello();\">", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	break;
    case 23:
	execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	execAnimation("ClickHereRect", "rect", 1, { fill: "pink", stroke: "red", strokeWidth: 1 });
	break;
    case 24:
	execArrowAnimation("fromClickHere", 1, { opacity: 1 });
	break;
    case 25:
	execStringAnimationByTspan("onclick", 1, 1, { stroke: "red", fill: "black", strokeWidth: 1 });
	break;
    case 26:
	execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "black", stroke: "black", strokeWidth: 1 });
	execAnimation("ClickHereRect", "rect", 1, { fill: "white", stroke: "black", strokeWidth: 1 });			    
	execArrowAnimation("fromClickHere", 1, { opacity: 0 });
	break;
    case 27:
	execArrowAnimation("ForthArrow", 1, { opacity: 1 });
	break;
    case 28:
	execArrowAnimation("ForthArrow", 1, { opacity: 0 });
	execArrowAnimation("FifthArrow", 1, { opacity: 1 });
	break;
    case 29:
	execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "red", strokeWidth: 1 });
	break;
    case 30:
	execArrowAnimation("FifthArrow", 1, { opacity: 0 });
	break;
    case 31:
	execArrowAnimation("alertArrow", 1, { opacity: 1 });
	break;
    case 32:
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 1 });
	break;
    case 33:
	execArrowAnimation("alertArrow", 1, { opacity: 0 });
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "red", fill: "pink", strokeWidth: 1 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "pink", stroke: "red" });
	break;
    case 34:
	execStringAnimationByTspan("onclick", 1, 1, { fill: "black", strokeWidth: 0 });
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", fill: "white", strokeWidth: 1, opacity: 0 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 0 });
	execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	break;
    case 35:
	execStringAnimationByTspan("onclick", 1, 2, { stroke: "blue", fill: "black", strokeWidth: 1 });
	break;
    case 36:
	execArrowAnimation("ForthArrow", 1, { opacity: 1});
	break;
    case 37:
	execArrowAnimation("ForthArrow", 1, { opacity: 0 });
	execArrowAnimation("FifthArrow", 1, { opacity: 1 });
	break;
    case 38:
	execArrowAnimation("FifthArrow", 1, { opacity: 0 });
	break;
    case 39:
	execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "blue", strokeWidth: 1 });
	break;
    case 40:
	execArrowAnimation("alertArrow", 1, { opacity: 1 });
	break;
    case 41:
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 1 });
	break;
    case 42:
	execArrowAnimation("alertArrow", 1, { opacity: 0 });
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "blue", fill: "cyan", strokeWidth: 1 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "cyan", stroke: "blue" });
	break;
    case 43:
	execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "black", strokeWidth: 0, opacity: 1 });
	execArrowAnimation("alertArrow", 1, { opacity: 0 });
	execAnimation("HelloWorldRect", "rect", 1, { stroke: "blue", fill: "cyan", strokeWidth: 1, opacity: 0 });
	execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "cyan", stroke: "blue", opacity: 0 });
	execStringAnimationByTspan("onclick", 1, 2, { stroke: "black", fill: "black", strokeWidth: 0 });
	break;
    default:
	return;
    }
    animationStepIndex++;
};

function setUpDefaultFunctionAry(){
    AnimationFunctionAry = [
	function(){
	    execAnimation("ex06-1.html", "<script src=\"ex06-1.js\"><\/script>", 1, { fill: "black", stroke: "red", strokeWidth: 2 });
	},
	function(){
	    execArrowAnimation("FirstArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("FirstText", "スクリプトファイルの指定", 1, { opacity: 1, strokeWidth: 1 });
	},
	function(){
	    execAnimation("ex06-1.html", "<script src=\"ex06-1.js\"><\/script>", 1, { fill: "black", stroke: "black", strokeWidth: 1 });
	},
	function(){
	    execAnimation("ex06-1.js", "title", 1, { fill: "black", stroke: "red", strokeWidth: 2 });
	},
	function(){
	    execArrowAnimation("SecondArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("SecondText", "指定されたスクリプトファイルが読み込まれる", 1, { opacity: 1, strokeWidth: 1 });
	},
	function(){
	    execAnimation("FunctionBallon", "line", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("FunctionBallon", "eclipse", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("FunctionBallon", "function sayhello()", 1, { stroke: "black", strokeWidth: 0, opacity: 1 });
	},
	function(){
	    execAnimation("RegisterFunction", "関数の登録", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	},
	function(){
	    execAnimation("FunctionBallon", "line", 1, { opacity: 0 });
	    execAnimation("ex06-1.js", "title", 1, { stroke: "black", strokeWidth: 0 });
	    execAnimation("ex06-1.html", "<script src=\"ex06-1.js\"><\/script>", 1, { stroke: "black", strokeWidth: 0 });
	    execArrowAnimation("FirstArrow", 1, { opacity: 0 });
	    execArrowAnimation("SecondArrow", 1, { opacity: 0 });
	    execAnimation("FirstText", "スクリプトファイルの指定", 1, { opacity: 0 });
	    execAnimation("SecondText", "指定されたスクリプトファイルが読み込まれる", 1, { opacity: 0 });
	    execAnimation("RegisterFunction", "関数の登録", 1, { strokeWidth: 0 });
	},
	function(){
	    execAnimation("ex06-1.html", "<h1> 関数の練習 </h1>", 1, { strokeWidth: 1, stroke: "red", fill: "black" });
	},
	function(){
	    execArrowAnimation("ThirdArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("ThirdText", "関数の練習", 1, { opacity: 1, stroke: 1, strokeWidth: 1 });
	},
	function(){
	    execAnimation("ex06-1.html", "<h1> 関数の練習 </h1>", 1, { stroke: "black", strokeWidth: 0 });
	    execAnimation("ThirdText", "関数の練習", 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execArrowAnimation("ThirdArrow", 1, { opacity: 0 });
	},
	function(){ 
	    execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1,  { strokeWidth: 1, fill: "black", stroke: "red" });
	    // 条件分岐	    
	    execAnimation("ex06-1.html", "onclick=\"sayhello();sayhello();\">", 1, { strokeWidth: 1, fill: "black", stroke: "red" });
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("ClickHereRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "white", stroke: "black", strokeWidth: 1, opacity: 1 });
	},
	function(){
	    execAnimation("onclick", "tspan", 1, { opacity: 1 });
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 0 });
	    execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	    /* 条件分岐 */
	    execAnimation("ex06-1.html", "onclick=\"sayhello();sayhello();\">", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	},
	function(){
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execAnimation("ClickHereRect", "rect", 1, { fill: "pink", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("fromClickHere", 1, { opacity: 1 });
	},
	function(){ /* tspan */
	    execStringAnimationByTspan("onclick", 1, 1, { stroke: "red", fill: "black", strokeWidth: 1 });
	},
	function(){ /* tspan */
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "black", stroke: "black", strokeWidth: 1 });
	    execAnimation("ClickHereRect", "rect", 1, { fill: "white", stroke: "black", strokeWidth: 1 });			    
	    execArrowAnimation("fromClickHere", 1, { opacity: 0 });
	},
	function(){
	    execArrowAnimation("ForthArrow", 1, { opacity: 1 });
	},
	function(){
	    execArrowAnimation("ForthArrow", 1, { opacity: 0 });
	    execArrowAnimation("FifthArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("FifthArrow", 1, { opacity: 0 });
	    execArrowAnimation("alertArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 1 });
	},
	function(){
	    execArrowAnimation("alertArrow", 1, { opacity: 0 });
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "red", fill: "pink", strokeWidth: 1 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "pink", stroke: "red" });
	},
	function(){
	    /* tspan */
	    execStringAnimationByTspan("onclick", 1, 1, { fill: "black", strokeWidth: 0 });
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", fill: "white", strokeWidth: 1, opacity: 0 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 0 });
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	},
	function(){
	    /* tspan */
	    execStringAnimationByTspan("onclick", 1, 2, { stroke: "blue", fill: "black", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("ForthArrow", 1, { opacity: 1});
	},
	function(){
	    execArrowAnimation("ForthArrow", 1, { opacity: 0 });
	    execArrowAnimation("FifthArrow", 1, { opacity: 1 });
	},
	function(){
	    execArrowAnimation("FifthArrow", 1, { opacity: 0 });
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "blue", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("alertArrow", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 1 });
	},
	function(){
	    execArrowAnimation("alertArrow", 1, { opacity: 0 });
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "blue", fill: "cyan", strokeWidth: 1 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "cyan", stroke: "blue" });
	},
	function(){
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { fill: "black", stroke: "black", strokeWidth: 0, opacity: 1 });
	    execArrowAnimation("alertArrow", 1, { opacity: 0 });
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "blue", fill: "cyan", strokeWidth: 1, opacity: 0 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "cyan", stroke: "blue", opacity: 0 });
	    execStringAnimationByTspan("onclick", 1, 2, { stroke: "black", fill: "black", strokeWidth: 0 });
	}
    ];
}

function execTextRectAnimation(id, str, timesAry, jsonAry){
    execAnimation(id, "rect", timesAry[0], jsonAry[0]);
    execAnimation(id, str, timesAry[1], jsonAry[1]);
}

function setArc(){
    // var p = "M 75,125 A 60,40 15 1,0 125,75";
    var startX, startY, endX, endY;
    startX = 560; startY = 320;
    endX = 520; endY = 330;
    var p = "M " + startX + "," + startY + " A 30,25, 15, 1,1 " + endX + "," + endY;
    var markerShape = SVG.path("M0,0L8,5L0,10L4,5z").attr({ fill: "black", opacity: 1 });
    var tip = markerShape.marker(0, 0, 10, 10, 5, 5);
    var tmp = SVG.path(p)
	    .attr({ fill: "white", stroke: "black", strokeWidth: 2, markerEnd: tip });
    SVGAry.push(tmp);
    SVGPushLog.push(["load", "arc"]);
}

function generateDescriptiveJson(descriptiveOrder){
    var mergedJSON = { };
    var description;
    for(var i = 0; i < descriptiveJson.length; i++){
	description = descriptiveJson[i];
	switch(description){
	case "":
	    break;
	case "":
	    break;
	case "":
	    break;
	case "":
	    break;
	case "":
	    break;
	default:
	    alert("failed to find your descriptive order : " + description);
	    break;
	}
    }
    return mergedJSON;
}
