
function eAs(id, str, id2, str2, json, sec){
    var from = searchSVGElementIndex(id, str, 1);
    var to = searchSVGElementIndex(id2, str2, 1);
    if(from == -1){
	alert("failed to find animation 1st index.");
    }
    if(to == -1){
	alert("failed to find animation 2nd index.");
    }
    for(var i = from; i <= to; i++){
	SVGAry[i].animate(json, sec);
    }
}

function eA(id, strID, json){
    var i = searchSVGElementIndex(id, strID, 1);
    if(i != -1){
	SVGAry[i].animate(json, animationSpeed);
    }else{
	alert("failed to find SVG element by ID.");
    }
}

function makeEllipseButton(id, x1, y1, width, height, event, json){
    var ellipse = SVG.ellipse(x1, y1, width, height).attr(json);
    ellipse.click(event);
    SVGAry.push(ellipse); SVGIDLog.push([id, "eclipse"]);
    return ellipse;
}

function makeButton(id, x, y, size, event, json){
    var button = SVG.circle(x, y, size).attr(json);
    button.click(event);
    SVGAry.push(button); SVGIDLog.push([id, "button"]);
    return button;
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

function setTspanStrs(id, x, y, strAry, json){
    var svgStrAryText = SVG.text(x, y, strAry).attr(json);
    SVGAry.push(svgStrAryText);
    SVGIDLog.push([id, "tspan"]);
    return svgStrAryText;
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
    for(var i = 0; i < SVGIDLog.length; i++){
	if(id == SVGIDLog[i][0]){
	    if(str == SVGIDLog[i][1]){
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
    for(i = 1; i < (SvgSize / interval) - 3; i++){
	for(k = 1; k < (SvgSize / interval) - 3; k++){
	    tmp = SVG.circle(i * interval, k * interval, circleSize).
		attr({ opacity: 0.5, fill: "cyan", stroke: "blue", strokeWidth: 1 });
	    SVGAry.push(tmp);
	    SVGIDLog.push(["grid", (i + "," + k)]);
	}
    }
    // the center of SVG. make new center and remove the duplication of SVG circle. make the center tmp circle 'transparent'.
    var c = SVG.circle(500, 500, 5).attr({ opacity: 0.8, fill: "pink", stroke: "red", strokeWidth: 2 });
    SVGAry.push(c); SVGIDLog.push(["center", "5,5"]);
    execAnimation("grid", "5,5", 1, { opacity: 0 });
}

function setLine(id, x1, y1, x2, y2){
    var p = SVG.line(x1, y1, x2, y2).attr({ stroke: "black", strokeWidth: 1 });
    SVGAry.push(p); SVGIDLog.push([id, "line"]);
    return p;
}

function setEllipse(id, x1, y1, width, height){
    var eclipse = SVG.ellipse(x1, y1, width, height).attr({ fill: "white", stroke: "black", strokeWidth: 1 });
    SVGAry.push(eclipse);
    SVGIDLog.push([id, "eclipse"]);
    return eclipse;
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
    return ["tmp"];
}

function setStringRect(id, x1, y1, charSize ,space, curve, text){
    var width = text.length * charSize + space;
    var r = SVG.rect(x1, y1, width, 30).attr({ fill: "white", stroke: "black", strokeWidth: 0, opacity: 0, r: curve });
    var msg = SVG.text(x1 + 15, y1 + 21, text).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(r);   SVGIDLog.push([id, "rect"]);
    SVGAry.push(msg); SVGIDLog.push([id, text]);
    return [r, msg];
}

function setText(id, x1, y1, str){
    var msg = SVG.text(x1, y1, str).attr({ strokeWidth: 2, stroke: "black", opacity: 0 });
    SVGAry.push(msg); SVGIDLog.push([id, str]);
    return msg;
}

function execArrowAnimation(id, json){
    execAnimation(id, "tip", 1, json);
    execAnimation(id, "line", 1, json);
}

function setArrow(id, x1, y1, x2, y2){
    var lineP = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;
    var markerShape = SVG.path("M0,0L8,5L0,10L4,5z").attr({ fill: "black", opacity: 0 });
    var tip = markerShape.marker(0, 0, 10, 10, 5, 5);
    var arrowLine = SVG.path(lineP).attr({ stroke: "black", strokeWidth: 2 , opacity: 0 , markerEnd: tip });
    SVGAry.push(markerShape); SVGIDLog.push([id, "tip"]);
    SVGAry.push(arrowLine); SVGIDLog.push([id, "line"]);
    return [markerShape, arrowLine];
}

function setBrowser(x, y, width, height, title, text)
{
    var rect = SVG.rect(x, y, width, height).attr({ fill: "white", stroke: "black", strokeWidth: 2, r: 5 });
    var line = SVG.path("M " + x + " " + (y + 30) + " h " + width).attr({ stroke: "black", strokeWidth: 2 });
    var content = SVG.text(x + 100, y + 21, text).attr({ stroke: "black", fill: "black" });
    SVGAry.push(rect);  SVGIDLog.push([title, "rect"]);
    SVGAry.push(line); SVGIDLog.push([title, "line"]);
    SVGAry.push(content); SVGIDLog.push([title, "title"]);
    return [rect, line, content];
}

function setTextRectangle(x, y, width, title, strAry){
    var space = 30;
    var height = strAry.length * 23 + space;
    var lineX, lineY, firstLine = y + 27;
    var titleX = x + 10 , titleY = y - 9;
    var elemAry = [ ];
    var rect = SVG.rect(x, y, width, height).attr({ fill: "white", strokeWidth: 2, stroke: "black", r: 5 });
    var fileTitle = SVG.text(titleX, titleY, title);
    var tmp;
    SVGAry.push(rect);                SVGAry.push(fileTitle);
    SVGIDLog.push([title, "rect"]);   SVGIDLog.push([title, "title"]);
    elemAry.push(rect);               elemAry.push(fileTitle);
    for(var i = 0; i < strAry.length; i++){
	lineX = x + 13;
	lineY = firstLine + (i * 23);
	tmp = SVG.text(lineX, lineY, strAry[i]);
	SVGAry.push(tmp);
	SVGIDLog.push([title, strAry[i]]);
	elemAry.push(tmp);
    }
    return elemAry;
}

function searchTextAryIndex(stringAry, str){
    for(var i = 0; i < stringAry.length; i++){
	if(stringAry[i] == str){
	    return i;
	}
    }
    alert("failed to find 'dummy' tag.");
}

function pushE(id, str, f){
    var index = searchSVGElementIndex(id, str, 1);
    if(index == -1){
	alert("failed to find SVG element by ID.");
    }
    SVGAry[index].click(f);
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
	for(var k = 0; k < fromIndex; k++){
	    AnimationFunctionAry.shift();
	}
    }
}

function execManager(userInput){
    var current = new Date();
    var diff = current - t;
    var state = userInput.state;
    if(state === 0){ // 自動
	(function animationLoop(){
	    if(executedStatus == Status.AutoExecution){
		if(AnimationFunctionAry.length > 0){
		    AnimationFunctionAry.shift()();
		}else{
		    if(FunctionStorage.length > 0){
			FunctionStorage.shift()();
		    }
		}
		window.setTimeout(animationLoop, 2000);
	    }
	}());
    }else if(state === 1){ // 次へ
	if(AnimationFunctionAry.length > 0){
	    animationStepIndex++;
	    AnimationFunctionAry.shift()();
	}else{
	    if(FunctionStorage.length > 0){
		FunctionStorage.shift()();
	    }
	}
    }
}
