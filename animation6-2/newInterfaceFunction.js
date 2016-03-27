

function setChromeBrowser(x, y, width, height, urlText){
    var rec = SVG.rect(x, y, width, height).attr({ fill: "white", stroke: "black", strokeWidth: 2, r: 5 });
    var line = SVG.path("M " + x + " "+ (y + 30) + " h " + width).attr({ stroke: "black", strokeWidth: 2 });
    var url = SVG.text(x + 100, y + 21, urlText);
    var google = SVG.text(x + (width / 4) + 10, y + 21 + (height / 2), ["G", "o", "o", "g", "l", "e"]).attr({ strokeWidth: 3, fontSize: 50, opacity: 1 });
    var googleColor = ["#0080FF", "#FA5858", "#FFFF00", "#0080FF", "#2EFE2E", "#FA5858"];
    for(var i = 0; i < googleColor.length; i++){
	google.selectAll("tspan")[i].animate({ fill: googleColor[i], stroke: googleColor[i] }, 0);
    }
    var redCircle, yellowCircle, greenCircle, r = 5;
    var searchText = SVG.rect(x + 100, y + 180, 200, 21).attr({ fill: "white", stroke: "gray", opacity: 1, r: 2 });
    redCircle = SVG.circle(x + 20, y + 16, r).attr({ fill: "#FA5858", opacity: 1 });
    yellowCircle = SVG.circle(x + 42, y + 16, r).attr({ fill: "#FFFF00", opacity: 1 });
    greenCircle = SVG.circle(x + 64, y + 16, r).attr({ fill: "#2EFE2E", opacity: 1 });
    SVGAry.push(rec);  SVGPushLog.push(["googleRect", "rect"]);
    SVGAry.push(line); SVGPushLog.push(["googleLine", "line"]);
    SVGAry.push(url);  SVGPushLog.push(["googleURL", "text"]);
    SVGAry.push(searchText);   SVGPushLog.push(["searchArea", "rect"]);
    SVGAry.push(google);       SVGPushLog.push(["google", "text"]);
    SVGAry.push(redCircle);    SVGPushLog.push(["redCircle", "circle"]);
    SVGAry.push(yellowCircle); SVGPushLog.push(["yellowCircle", "circle"]);
    SVGAry.push(greenCircle);  SVGPushLog.push(["greenCircle", "circle"]);
}

function setCheckboxBySVG(id, x, y, json){
    var checkPath = "M " + (x + 5) + "," + (y + 15) + " L " + (x + 15)+ "," + (y + 24) + " L " + (x + 25) + "," + (y + 5);
    var box = SVG.rect(x, y, 30, 30).attr(json);
    SVGAry.push(box); SVGPushLog.push([id, "rect"]);
    var check = SVG.path(checkPath).attr(json);
    SVGAry.push(check); SVGPushLog.push([id, "check"]);
}

function eA(id, strID, json){ // times : 1
    var i = searchSVGElementIndex(id, strID, 1);
    if(i != -1){
	SVGAry[i].animate(json, animationSpeed);
    }else{
	alert("failed to find SVG element by ID.");
    }
}

function execSVGAnimation(json, sec){
    var from = 0;
    var to = SVGAry.length - 1;
    for(var i = 0; i <= to; i++){
	SVGAry[i].animate(json, sec);
    }
}

function makeEllipseButton(id, x1, y1, width, height, event, json){
    var ellipse = SVG.ellipse(x1, y1, width, height).attr(json);
    ellipse.click(event);
    SVGAry.push(ellipse);
    SVGPushLog.push([id, "eclipse"]);
}

function makeButton(id, x, y, size, event, json){
    var button = SVG.circle(x, y, size).attr(json);
    button.click(event);
    SVGAry.push(button); SVGPushLog.push([id, "button"]);
}

function execEffectSVGIndexes(id1, str1, times1, id2, str2, times2, effectJson, sec){
    var from = searchSVGElementIndex(id1, str1, times1);
    var to = searchSVGElementIndex(id2, str2, times2);
    if(from == -1){
	alert("failed to find animation 1st index.");
    }
    if(to == -1){
	alert("failed to find animation 2nd index.");
    }
    for(var i = from; i <= to; i++){
	SVGAry[i].animate(effectJson, sec);
    }
}

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
	alert("failed to find the animation target by ID.");
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
    // the center of SVG. make new center and remove the duplication of SVG circle. make the center tmp circle 'transparent'.
    var c = SVG.circle(500, 500, 5).attr({ opacity: 0.8, fill: "pink", stroke: "red", strokeWidth: 2 });
    SVGAry.push(c);
    SVGPushLog.push(["center", "5,5"]);
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

function d(str){
    if((SVGPushLog.length) != (SVGAry.length)){
	console.log("msg : " + str);
	console.log("SVGPushLog.length : " + SVGPushLog.length + ", SVGAry.length : " + SVGAry.length);
    }
}

function setRect(id, x1, y1, charSize ,space, curve, text){
    var width = text.length * charSize + space;
    var r = SVG.rect(x1, y1, width, 30).attr({ fill: "white", stroke: "black", strokeWidth: 0, opacity: 0, r: curve });
    var msg = SVG.text(x1 + 15, y1 + 21, text).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(r); SVGPushLog.push([id, "rect"]);
    SVGAry.push(msg); SVGPushLog.push([id, text]);
}

function setText(id, x1, y1, str){
    var msg = SVG.text(x1, y1, str).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(msg); SVGPushLog.push([id, str]);
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
    SVGAry.push(markerShape); SVGPushLog.push([id, "tip"]);
    SVGAry.push(arrowLine); SVGPushLog.push([id, "line"]);
}

function setBrowser(x, y, width, height, title, text)
{
    var rec = SVG.rect(x, y, width, height).attr({ fill: "white", stroke: "black", strokeWidth: 2, r: 5 });
    var line = SVG.path("M " + x + " " + (y + 30) + " h " + width).attr({ stroke: "black", strokeWidth: 2 });
    // var text = SVG.text(x + 10, y + 21, title);
    var text = SVG.text(x + 100, y + 21, text);
    SVGAry.push(line); SVGPushLog.push([title, "line"]);
    SVGAry.push(text); SVGPushLog.push([title, "title"]);
    SVGAry.push(rec);  SVGPushLog.push([title, "rect"]);
}

function setTextRectangle(x, y, width, title, strAry){
    var space = 30;
    var height = strAry.length * 23 + space; // the height of text area.
    var lineX, lineY, firstLine = y + 27;
    var titleX = x + 10 , titleY = y - 9;
    SVGAry.push(SVG.rect(x, y, width, height).attr({ fill: "white", strokeWidth: 2, stroke: "black", r: 5 })); // the frame of text.
    SVGAry.push(SVG.text(titleX, titleY, title)); // the element of title text.
    SVGPushLog.push([title, "rect"]);
    SVGPushLog.push([title, "title"]);
    for(var i = 0; i < strAry.length; i++){
	lineX = x + 10;
	lineY = firstLine + (i * 23);
	SVGAry.push(SVG.text(lineX, lineY, strAry[i])); // every stmnt.
	// console.log("str : " + strAry[i] + ", y : " + lineY);
	SVGPushLog.push([title, strAry[i]]);
    }
}

function erasePreButton(){
    execAnimation("callOnce", "eclipse", 1, { opacity: 0 });
    execAnimation("callTwice", "eclipse", 1, { opacity: 0 });
    execAnimation("leftButtonText", "onclick=\"sayhello();\"", 1, { opacity: 0 });
    execAnimation("rightButtonText", "onclick=\"sayhello();sayhello();\"", 1, { opacity: 0 });
    changeJsonAttr("case1", "の場合", 1, { opacity: 0 });
    changeJsonAttr("case2", "の場合", 1, { opacity: 0 });
}

function init(){
    if(GlobalKey == KeyStatus.Once){
	setSVG(GlobalKey);
	execEffectSVGIndexes("file:///hoge/ex06-1.html", "line", 1, "ex06-1.js", "}", 1, { opacity: 1 }, 0);
	setUpFunctionAry();
	selectiveFunctionExecution(selectiveDebugIndex, debugAnimationStartIndex);
    }else{
	setSVG(GlobalKey);
	execEffectSVGIndexes("file:///hoge/ex06-1.html", "line", 1, "ex06-1.js", "}", 1,{ opacity: 1 }, 0);
	setUpFunctionAry();
	selectiveFunctionExecution(selectiveDebugIndex, debugAnimationStartIndex);
    }
}

function searchTextAryIndex(stringAry, str){
    for(var i = 0; i < stringAry.length; i++){
	if(stringAry[i] == str){
	    return i;
	}
    }
    alert("failed to find 'dummy' tag.");
    return -1;
}

function pushEventBySVGID(id, str, times, f){
    var index = searchSVGElementIndex(id, str, times);
    if(index == -1){
	alert("failed to find SVG element by ID.");
    }
    SVGAry[index].click(f);
}

function pushAry(ary, newElement){
    ary.push(newElement);
    return newElement;
}

function execTextRectAnimation(id, str, timesAry, jsonAry){
    execAnimation(id, "rect", timesAry[0], jsonAry[0]);
    execAnimation(id, str, timesAry[1], jsonAry[1]);
}

function setArc(){
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

// under development.
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

function selectiveFunctionExecution(indexAry, fromIndex){
    var index;
    for(var l = 0; l < indexAry.length; l++){
	if(indexAry[l] > fromIndex){
	    alert("debug logic is inappropriate. reset debug parameters.");
	    return;
	}
    }
    if(indexAry.length <= 0){
	if(fromIndex === 0){
	    return;
	}
    }
    for(var i = 0; i < indexAry.length; i++){
	index = indexAry[i];
	if((index >= 0) && (index < (AnimationFunctionAry.length))){
	    AnimationFunctionAry[index]();
	}
    }
    if(fromIndex !== 0){
	// remove functions.
	for(var k = 0; k < fromIndex; k++){
	    AnimationFunctionAry.shift();
	}
    }
}

function checkLastClickIsAutoButton(){
    var last = ClickLog.length - 1;
    var lastElem = ClickLog[last];
    if(ClickLog.length <= 0){
	return true;
    }
    if(lastElem == ButtonClickStatus.AutoExecution){
	return true;
    }
    return false;
}

function execManager(userInput){
    var current = new Date();
    var diff = current - LastButtonClickTime;
    var state = userInput.state;
    if(state === 0){ // 自動
	(function animationLoop(){
	    LastButtonClickTime = current;
	    var b1 = (executedStatus == ButtonClickStatus.AutoExecution);
	    var b2 = checkLastClickIsAutoButton();
	    if(b1 && b2){
		if(AnimationFunctionAry.length > 0){
		    AnimationFunctionAry.shift()();
		}
		window.setTimeout(animationLoop, 2000);
	    }
	}());
    }else if(state === 1){ // 次へ
	if(AnimationFunctionAry.length > 0){
	    animationStepIndex++;
	    AnimationFunctionAry.shift()();
	    LastButtonClickTime = current - 2000;
	}
    }
}
