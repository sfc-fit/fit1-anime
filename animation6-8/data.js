

function init(){
    setupAllSVGData();
    setupAnimationFunction();
    switchEffect(person);
    // debugIndex();
    // setGridChart();
}

function debugIndex(){
    debugAnimationStartIndex = AnimationFunctionAry.length;
    if(debugAnimationStartIndex != 0){
	var i;
	for(i = 0; i < debugAnimationStartIndex; i++){
	    if(AnimationFunctionAry.length > 0){
		AnimationFunctionAry.shift()();
	    }
	}
    }
}

function tspanRangeAnimation(id, index1, index2, effectObj){
    var i;
    for(i = index1; i <= index2; i++){
	execStringAnimationByTspan(id, 1, i, effectObj);
    }
}

function switchEffect(p){
    if(irreversible === true){
	return;
    }
    if(p == ConditionStatus.Taro){
	eA("animationTaroSwitch", "rect", { fill: "aquamarine", stroke: "green" });
	eA("animationTaroSwitch", "taroバージョンを実行する", { fill: "green", stroke: "green", strokeWidth: 1 });
	eA("animationHanakoSwitch", "rect", { fill: "white", stroke: "black" });
	eA("animationHanakoSwitch", "hanakoバージョンを実行する", { fill: "black", stroke: "black", strokeWidth: 1 });
    }else{
	eA("animationHanakoSwitch", "rect", { fill: "aquamarine", stroke: "green" });
	eA("animationHanakoSwitch", "hanakoバージョンを実行する", { fill: "green", stroke: "green", strokeWidth: 1 });
	eA("animationTaroSwitch", "rect", { fill: "white", stroke: "black" });
	eA("animationTaroSwitch", "taroバージョンを実行する", { fill: "black", stroke: "black", strokeWidth: 1 });
    }
}

function setRect(id, x1, y1, charSize, width, curve, offset, text){
    // var width = text.length * charSize + space;
    var r = SVG.rect(x1, y1, width, 30).attr({ fill: "white", stroke: "black", strokeWidth: 1, opacity: 0, r: curve });
    var msg = SVG.text(x1 + 15 + offset, y1 + 21, text).attr({ strokeWidth: 1, stroke: "black", opacity: 0 });
    SVGAry.push(r); SVGIDLog.push([id, "rect"]);
    SVGAry.push(msg); SVGIDLog.push([id, text]);
    return [r, msg];
}

function setFunctionBalloon(){
    var eclipse;
    eclipse = SVG.ellipse(950, 200, 110, 70).attr({ fill: "white", stroke: "black", strokeWidth: 2, opacity: 0 });
    SVGAry.push(eclipse); SVGIDLog.push(["balloon", "eclipse"]);
    // i * 23
    setText("fSayHello", 873, 185, "function sayhello()").attr({ strokeWidth: 1, opacity: 0 });
    setText("fTaro", 873,     185 + 1 * 23, "function taro()").attr({ strokeWidth: 1, opacity: 0 });
    setText("fHanako", 873,   185 + 2 * 23, "function hanako()").attr({ strokeWidth: 1, opacity: 0 });
}

function insertFirefoxImage(){
    var redCircle, yellowCircle, greenCircle;
    var i = SVG.image("Firefox-logo.png", 435, 140, 150, 150).attr({ opacity: 1 });
    var x = 300, y = 50, r = 5;
    redCircle = SVG.circle(x + 20, y + 16, r).attr({ fill: "#FA5858", opacity: 1 });
    yellowCircle = SVG.circle(x + 42, y + 16, r).attr({ fill: "#FFFF00", opacity: 1 });
    greenCircle = SVG.circle(x + 64, y + 16, r).attr({ fill: "#2EFE2E", opacity: 1 });
    SVGAry.push(i);            SVGIDLog.push(["firefox", "png"]);
    SVGAry.push(redCircle);    SVGIDLog.push(["redCircle", "circle"]);
    SVGAry.push(yellowCircle); SVGIDLog.push(["yellowCircle", "circle"]);
    SVGAry.push(greenCircle);  SVGIDLog.push(["greenCircle", "circle"]);
}

function setupAllSVGData(){
    /* browser */
    setBrowser(300, 50, 450, 310, "file:///hoge/ex06-8.html", [ ]);
    insertFirefoxImage();
    /* url */
    setText("browserURL", 420, 71, "file:///hoge/ex06-8.html").attr({ strokeWidth: 0, opacity: 1 });
    /* html file */
    var htmlText = [
	'',
	'<html>',
	'<head>',
	'<meta charset="utf-8">',
	'<title>練習問題06-8.js</title>',
	'<script src="ex06-8.js"></script>',
	'',	'<body>',
	'<h1>JavaScriptによる変更の練習</h1>',
	'<input type="button" value="あいさつ"',
	'onclick="sayhello();">',
	'<input type="button" value="太郎"',
	'onclick="taro();">',
	'<input type="button" value="花子"',
	'onclick="hanako();">',
	'', // '<p id="who"></p>
	'</body>',
	'',
	'</html>'
    ];
    var htmlX = 40;
    setTextRectangle(htmlX, 450, 370, "ex06-8.html", htmlText);
    // 1行目 : y + 27
    setText("doctype", htmlX + 13, 450 + 27, "<!DOCTYPE html>").attr({ fill: "black", stroke: "black", strokeWidth: 0 , opacity: 1 });
    // pタグ行
    setTspanStrs("pTag", htmlX + 13, 450 + 27 + (23 * 15), ['<p id="who">', 'world', '</p>', ], { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("TaroTag", htmlX + 13, 450 + 27 + (23 * 15), ['<p id="who">', '太郎', '</p>', ], { fill: "black", strokeWidth: 1, opacity: 0 });
    setTspanStrs("HanakoTag", htmlX + 13, 450 + 27 + (23 * 15), ['<p id="who">', '花子', '</p>', ], { fill: "black", strokeWidth: 1, opacity: 0 });
    var jsText = [
	'function sayhello(){',
	'', 
	'}',
	'',
	'function taro(){',
	'',
	'}',
	'',
	'function hanako(){',
	'',
	'}'
    ];
    // y + 27 : 第1行目
    // y + 27 + (i * 23) : i行目
    // x座標 : x + 13
    setTextRectangle(580, 450, 540, "ex06-8.js", jsText);
    setTspanStrs("plain", 580 + 13 + 5, 450 + 27 + (1 * 23), ["alert('Hello, ' + ", "document", ".", "getElementById('", "who", "')", ".innerHTML", " + '!');"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("taro", 580 + 13 + 5, 450 + 27 + (5 * 23), ["document", ".", "getElementById('", "who", "')", ".innerHTML", " = ", "'", "太郎", "';"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("hanako", 580 + 13 + 5, 450 + 27 + (9 * 23), ["document", ".", "getElementById('", "who", "')", "innerHTML", " = ", "'", "花子", "';"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    function AutomaticButtonFunction(){
	executedStatus = Status.AutoExecution;
	execManager({ state: 0 });
    }
    function ManualButtonFunction(){
	executedStatus = Status.ManualExecution;
	execManager({ state: 1 });
    }
    makeButton("Automatic", 209, 145, 40, AutomaticButtonFunction, { fill: "white", stroke: "black", strokeWidth: 2 });
    makeButton("Manual", 209, 260, 40, ManualButtonFunction, { fill: "white", stroke: "black", strokeWidth: 2 });
    makeButton("Reset", 115, 200, 40, function(){ location.reload(); }, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("AutomaticButtonStr", 191, 150, "自動").attr({ strokeWidth: 1, opacity: 1 });
    setText("ManualButtonStr", 191, 265, "次へ").attr({ strokeWidth: 1, opacity: 1 });
    setText("ResetButtonStr", 115 - 25 , 200 + 7, "最初へ").attr({ strokeWidth: 1, opacity: 1 });
    pushE("ResetButtonStr", "最初へ", function(){ location.reload(); });
    pushE("AutomaticButtonStr", "自動", AutomaticButtonFunction);
    pushE("ManualButtonStr", "次へ", ManualButtonFunction);
    var svgTmp; // for debug or parameter tuning.
    svgTmp = setArrow("FromScriptSrcJsToBrowser", 300, 570, 420, 330);
    svgTmp = setText("fileAssignment", 150, 405, "スクリプトファイルの指定").attr({ opacity: 0, strokeWidth: 1 });
    svgTmp = setArrow("FromJsToBrowser", 820, 470, 700, 330);
    svgTmp = setText("loadJs", 600, 405, "指定されたスクリプトファイルが読み込まれる").attr({ opacity: 0, strokeWidth: 1 });
    setFunctionBalloon();
    svgTmp = setText("FunctionRegister", 910, 315 ,"関数の登録").attr({ strokeWidth: 1, opacity: 0 });
    // h1 ~ p tag
    svgTmp= setText("h1Tag", 400, 120, "JavaScriptによる変更の練習").attr({ strokeWidth: 0, opacity: 0 });
    svgTmp = setRect("firstBrowserRect", 350, 140, 5, 100, 5, 0, "あいさつ");
    svgTmp = setTspanStrs("BrowserFuncSayHello()", 500, 160, ['onclick="', "sayhello()" ,'";'], { opacity: 0 });
    svgTmp.attr({ fill: "black", strokeWidth: 0, opacity: 0 });
    svgTmp = setRect("SecondBrowserRect", 350, 190, 5, 100, 5, 18, "太郎");
    svgTmp = setTspanStrs("BrowserFuncTaro", 500, 210, ['onclick="', "taro()" ,'";'], { opacity: 0 });
    svgTmp = setRect("ThirdBrowserRect", 350, 240, 5, 100, 5, 18, "花子");
    svgTmp = setTspanStrs("BrowserFuncHanako", 500, 260, ['onclick="', "hanako()" ,'";'], { opacity: 0 });
    // browser text
    svgTmp = setText("FirstPTagOutput", 378, 310, "world");
    svgTmp = setText("SecondPTagOutput", 383, 310, "太郎");
    svgTmp = setText("ThirdPTagOutput", 383, 310, "花子");
    svgTmp = setArrow("FromBrowserSayHelloFuncToJsFuncDefinition", 600, 170, 680, 430);
    svgTmp = setArrow("FromH1TagToPTagArrow", 300, 635, 400, 330);
    svgTmp = setArrow("SayHelloDefinitionDocumentToHTML", 750, 510, 380, 630);
    svgTmp = setText("documentObjectExp", 430, 560, "ウェブページ全体");
    svgTmp = setArrow("getElementByIdToPTag", 820, 520, 200, 800);
    svgTmp = setText("getElementByIDExp", 350, 750, 'id="who"の要素を探す');
    svgTmp = setArrow("innerHTMLToPTagWorld", 950, 515, 245, 805);
    svgTmp = setText("innerHTMLToPTagExp", 500, 720, "要素の中身の部分");
    svgTmp = setArrow("sayhelloAlertToBrowserAlert", 680, 480, 600, 330);
    // hello world alert
    svgTmp = setRect("HelloWorldTaroAlert", 465, 285, 5, 125, 0, 0, "Hello, 太郎!");
    svgTmp = setRect("HelloWorldHanakoAlert", 465, 285, 5, 125, 0, 0, "Hello, 花子!");
    svgTmp = setRect("HelloWorldAlert", 465, 285, 5, 125, 0, 0, "Hello, world!");
    // taro
    svgTmp = setArrow("onclickTaroToTaroDefinition", 550, 220, 680, 550);
    svgTmp = setArrow("TaroDocumentToDocumentObj", 590, 590, 380, 660);
    svgTmp = setText("AllDocumentObj", 305, 610, "ウェブページ全体");
    svgTmp = setArrow("TaroGetElementByID", 750, 610, 245, 805);
    svgTmp = setText("tarGetElementByID", 350, 785, 'id="who"の要素を探す');
    svgTmp = setArrow("taroInnerHTMLArrow", 800, 610, 245, 805);
    svgTmp = setText("taroInnerHTMLToPTagExp", 440, 770, "要素の中身の部分");
    svgTmp = setText("changeWorld", 420, 770, "この部分を'太郎'に書き換える");
    svgTmp = setText("moveTaroStr", 800, 660, "太郎");
    svgTmp.attr({ opacity: 0, stroke: "black", strokeWidth: 1, fill: "black" });
    svgTmp = setArrow("fromPTagTaroToWorld", 200, 800, 400, 340);
    svgTmp = setText("moveTaroStrToBrowser", 230, 800, "太郎");
    
    // hanako
    svgTmp = setArrow("Browser:hanako:onclick:arrow", 600, 280, 680, 630);
    svgTmp = setArrow("Js:hanako:document", 570, 680, 350, 710);
    svgTmp = setText("Js:hanako:document:text", 415, 720, "ウェブページ全体");
    svgTmp = setArrow("Js:hanako:document.getElementById('who')", 750, 705, 250, 800);
    svgTmp = setText("Js:hanako:document.getElementById('who')", 415, 720, 'id="who"の要素を探す');
    svgTmp = setArrow("Js:hanako:document.getElementById('who'):text", 750, 735, 250, 800);
    svgTmp = setArrow("Js:hanako:document.getElementById('who').innerHTML", 800, 705, 250, 800);
    svgTmp = setText("Js:hanako:document.getElementById('who').innerHTML:text", 425, 790, "要素の中身の部分");
    svgTmp = setArrow("Js:hanako:assign", 800, 705, 250, 810);
    svgTmp = setText("Js:Moving:hanako", 800, 725, "花子");
    svgTmp = setArrow("html:browser:ptag:arrow", 220, 800, 375, 330);
    svgTmp = setText("html:Moving:hanako", 250, 800 ,"花子");
    
    // debug button
    var sAry = ["Taro", "Hanako"];
    function switchToTaroState(){
	if(person == ConditionStatus.Hanako){
	    person = ConditionStatus.Taro;
	    switchEffect(person);
	}
    }
    function switchToHanakoState(){
	if(person == ConditionStatus.Taro){
	    person = ConditionStatus.Hanako;
	    switchEffect(person);
	}
    }
    svgTmp = setRect("animationTaroSwitch", 600, 750, 5, 225, 5, 3, "taroバージョンを実行する");
    svgTmp[0].attr({ opacity: 1 }); svgTmp[1].attr({ opacity: 1 });
    pushE("animationTaroSwitch", "rect", switchToTaroState);
    pushE("animationTaroSwitch", "taroバージョンを実行する", switchToTaroState);
    svgTmp = setRect("animationHanakoSwitch", 840, 750, 5, 245, 5, 0, "hanakoバージョンを実行する");
    svgTmp[0].attr({ opacity: 1 }); svgTmp[1].attr({ opacity: 1 });
    pushE("animationHanakoSwitch", "rect", switchToHanakoState);
    pushE("animationHanakoSwitch", "hanakoバージョンを実行する", switchToHanakoState);
    
}

function setupAnimationFunction(){
    AnimationFunctionAry = [
	function(){
	    eA("firefox", "png", { opacity: 0 });
	},
	function(){
	    eA("ex06-8.html", '<script src="ex06-8.js"></script>', { strokeWidth: 1, fill: "red", stroke: "red" });
	    execArrowAnimation("FromScriptSrcJsToBrowser", { opacity: 1 });
	},
	function(){
	    eA("fileAssignment", "スクリプトファイルの指定", { opacity: 1 });
	},
	function(){
	    execArrowAnimation("FromScriptSrcJsToBrowser", { opacity: 0 });
	    eA("fileAssignment", "スクリプトファイルの指定", { opacity: 0 });
	    eA("ex06-8.html", '<script src="ex06-8.js"></script>', { strokeWidth: 0, fill: "black", stroke: "black", opacity: 1 });
	},
	function(){
	    eA("ex06-8.js", "title", { fill: "red", strokeWidth: 1, stroke: "red", opacity: 1 });
	    execArrowAnimation("FromJsToBrowser", { opacity: 1 });
	},
	function(){
	    eA("loadJs", "指定されたスクリプトファイルが読み込まれる", { opacity: 1 });
	},
	function(){
	    execEffectSVGIndexes("ex06-8.js", "function sayhello(){", 1, "ex06-8.js", "}", 3, { fill: "red", strokeWidth: 1, stroke: "red" }, animationSpeed);
	    eA("plain", "tspan", { fill: "red", strokeWidth: 1, stroke: "red" });
	    eA("taro", "tspan", { fill: "red", strokeWidth: 1, stroke: "red" });
	    eA("hanako", "tspan", { fill: "red", strokeWidth: 1, stroke: "red" });
	},
	function(){
	    eA("balloon", "eclipse", { fill: "white", stroke: "black", strokeWidth: 2, opacity: 1 });
	    execEffectSVGIndexes("fSayHello", "function sayhello()", 1, "fHanako", "function hanako()", 1,
				 { stroke: "black", strokeWidth: 1, opacity: 1 }, animationSpeed);
	},
	function(){
	    eA("FunctionRegister", "関数の登録", { opacity: 1 });
	},
	function(){
	    eA("ex06-8.js", "title", { fill: "black", strokeWidth: 0, stroke: "black", opacity: 1 });
	    execArrowAnimation("FromJsToBrowser", { opacity: 0 });
	    eA("loadJs", "指定されたスクリプトファイルが読み込まれる", { opacity: 0 });
	    execEffectSVGIndexes("ex06-8.js", "function sayhello(){", 1, "ex06-8.js", "}", 3, { fill: "black", strokeWidth: 0, stroke: "black" }, animationSpeed);
	    eA("plain", "tspan", { fill: "black", strokeWidth: 0, stroke: "black" });
	    eA("taro", "tspan", { fill: "black", strokeWidth: 0, stroke: "black" });
	    eA("hanako", "tspan", { fill: "black", strokeWidth: 0, stroke: "black" });
	    eA("balloon", "eclipse", { fill: "white", stroke: "black", strokeWidth: 1, opacity: 1 });
	    execEffectSVGIndexes("fSayHello", "function sayhello()", 1, "fHanako", "function hanako()", 1, { stroke: "black", strokeWidth: 0, opacity: 1 }, animationSpeed);
	    eA("FunctionRegister", "関数の登録", { opacity: 0 });
	},
	function(){
	    execEffectSVGIndexes("ex06-8.html", "<h1>JavaScriptによる変更の練習</h1>", 1,
				 "ex06-8.html", 'onclick="hanako();">', 1, { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
	    eA("pTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("FromH1TagToPTagArrow", { opacity: 1 });
	},
	function(){
	    eA("h1Tag", "JavaScriptによる変更の練習", { strokeWidth: 0, opacity: 1 });
	    execEffectSVGIndexes("firstBrowserRect", "rect", 1, "FirstPTagOutput", "world", 1, { strokeWidth: 1, opacity: 1 }, animationSpeed);
	},
	function(){
	    execArrowAnimation("FromH1TagToPTagArrow", { opacity: 0 });
	    execEffectSVGIndexes("ex06-8.html", "<h1>JavaScriptによる変更の練習</h1>", 1,
				 "ex06-8.html", 'onclick="hanako();">', 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
	    eA("pTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
	},
	// 1回目のsayhello関数の実行
	function(){
	    eA("firstBrowserRect", "rect", { fill: "pink", stroke: "red" });
	    eA("firstBrowserRect", "あいさつ", { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "red", stroke: "red" });
	},
	function(){
	    execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 1 });
	},
	function(){
	    execStringAnimationByTspan("plain", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    // reset
	    eA("firstBrowserRect", "rect", { fill: "white", stroke: "black" });
	    eA("firstBrowserRect", "あいさつ", { fill: "black", stroke: "black", strokeWidth: 1 });
	    execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 0 });
	},
	function(){
	    execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 1 });
	    eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 1 });
	},
	function(){
	    execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
	    eA("pTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    // reset
	    execStringAnimationByTspan("plain", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
	    eA("pTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
	    execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 0 });
	    eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 0 });
	},
	function(){
	    // document.getElementById('who')
	    execStringAnimationByTspan("plain", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 2, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 3, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 4, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 5, { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("getElementByIdToPTag", { opacity: 1 });
	    eA("getElementByIDExp", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 1 });
	},
	function(){
	    eA("pTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    // reset
	    execArrowAnimation("getElementByIdToPTag", { opacity: 0 });
	    eA("getElementByIDExp", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 0 });
	    execStringAnimationByTspan("plain", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execStringAnimationByTspan("plain", 1, 2, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execStringAnimationByTspan("plain", 1, 3, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execStringAnimationByTspan("plain", 1, 4, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execStringAnimationByTspan("plain", 1, 5, { fill: "black", stroke: "black", strokeWidth: 0 });
	    eA("pTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
	},
	function(){
	    execStringAnimationByTspan("plain", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 2, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 3, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 4, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 5, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execStringAnimationByTspan("plain", 1, 6, { fill: "red", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("innerHTMLToPTagWorld", { opacity: 1 });
	    eA("innerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 1 });
	},
	function(){
	    execStringAnimationByTspan("pTag", 1, 1, { fill: "red", strokeWidth: 1, stroke: "red" });
	},
	function(){
	    tspanRangeAnimation("plain", 1, 6, { fill: "black", stroke: "black", strokeWidth: 0 });
	    execArrowAnimation("innerHTMLToPTagWorld", { opacity: 0 });
	    eA("innerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 0 });
	    execStringAnimationByTspan("pTag", 1, 1, { fill: "black", strokeWidth: 0, stroke: "black" });
	},
	function(){
	    execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 1 });
	},
	function(){
	    eA("HelloWorldAlert", "Hello, world!", { fill: "black", stroke: "black", strokeWidth: 1, opacity: 1 });
	    eA("HelloWorldAlert", "rect", { opacity: 1 });
	},
	function(){
	    eA("HelloWorldAlert", "Hello, world!", { fill: "red", stroke: "red", strokeWidth: 1, opacity: 1 });
	    eA("HelloWorldAlert", "rect", { fill: "pink", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    // reset 'Hello, World !' rect
	    execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 0 });
	    eA("HelloWorldAlert", "Hello, world!", { fill: "red", stroke: "red", strokeWidth: 1, opacity: 0 });
	    eA("HelloWorldAlert", "rect", { fill: "white", stroke: "red", strokeWidth: 0 });
	    decideSwitchAppendAnimationFunctions(person);
	}];
}

function decideSwitchAppendAnimationFunctions(state){
    irreversible = true;
    if(state == ConditionStatus.Taro){
	// ユーザのスイッチ、条件分岐！！
	// erase button
	eA("animationHanakoSwitch", "rect", { opacity: 0 });
	eA("animationHanakoSwitch", "hanakoバージョンを実行する", { opacity: 0 });
	FunctionStorage = [
	    function(){
		eA("SecondBrowserRect", "太郎", { fill: "red", stroke: "red", strokeWidth: 1, opacity: 1 });
		eA("SecondBrowserRect", "rect", { fill: "pink", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execStringAnimationByTspan("BrowserFuncTaro", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("onclickTaroToTaroDefinition", { opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("taro", 1, 0, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("TaroDocumentToDocumentObj", { opacity: 1 });
		// reset
		eA("SecondBrowserRect", "太郎", { fill: "black", stroke: "black", strokeWidth: 1, opacity: 1 });
		eA("SecondBrowserRect", "rect", { fill: "white", stroke: "black", strokeWidth: 1 });
		execStringAnimationByTspan("BrowserFuncTaro", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 }); 
		execStringAnimationByTspan("taro", 1, 0, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("onclickTaroToTaroDefinition", { opacity: 0 });
	    },
	    function(){
		eA("AllDocumentObj", "ウェブページ全体", { strokeWidth: 1, opacity: 1 });
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
		eA("pTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "red", strokeWidth: 1, stroke: "red" });
	    },
	    function(){
		// reset <html> ~ </html>
		eA("AllDocumentObj", "ウェブページ全体", { strokeWidth: 1, opacity: 0 });
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
		eA("pTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "black", strokeWidth: 0, stroke: "black" });
		execArrowAnimation("TaroDocumentToDocumentObj", { opacity: 0 });
	    },
	    function(){
		tspanRangeAnimation("taro", 0, 4, { fill: "red", stroke: "red", strokeWidth: 1 });
		execArrowAnimation("TaroGetElementByID", { opacity: 1 });
	    },
	    function(){
		eA("tarGetElementByID", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 1 });
		tspanRangeAnimation("pTag", 0, 2, { fill: "red", strokeWidth: 1, stroke: "red" }); 
	    },
	    function(){
		// reset
		tspanRangeAnimation("taro", 0, 4, { fill: "black", stroke: "black", strokeWidth: 0 });
		tspanRangeAnimation("pTag", 0, 2, { fill: "black", strokeWidth: 0, stroke: "black" });
		eA("tarGetElementByID", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 0 });
		execArrowAnimation("TaroGetElementByID", { opacity: 0 });
	    },
	    function(){
		tspanRangeAnimation("taro", 0, 5, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("taroInnerHTMLArrow", { opacity: 1 });
	    },
	    function(){
		eA("taroInnerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 1 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		eA("taroInnerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 0 });
		execArrowAnimation("taroInnerHTMLArrow", { opacity: 0 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		tspanRangeAnimation("taro", 0, 5, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		execStringAnimationByTspan("taro", 1, 8, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("taroInnerHTMLArrow", { opacity: 1 });
		eA("moveTaroStr", "太郎", { opacity: 1 });
	    },
	    function(){
		eA("pTag", "tspan", { opacity: 0 });
		eA("moveTaroStr", "太郎", { x: 300, y: 825, opacity: 0 }); // "太郎" 文字列の移動
		eA("TaroTag", "tspan", { opacity: 1 });
	    },
	    function(){
		execArrowAnimation("taroInnerHTMLArrow", { opacity: 0 });
		eA("moveTaroStr", "太郎", { opacity: 0 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("taro", 1, 8, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		execArrowAnimation("fromPTagTaroToWorld", { opacity: 1 });
		eA("moveTaroStrToBrowser", "太郎", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		eA("moveTaroStrToBrowser", "太郎", { x: 410, y: 410, opacity: 0 });
		eA("FirstPTagOutput", "world", { opacity: 0 });
		eA("SecondPTagOutput", "太郎", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("fromPTagTaroToWorld", { opacity: 0 });
		eA("SecondPTagOutput", "太郎", { fill: "red", stroke: "red", strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		eA("SecondPTagOutput", "太郎", { fill: "black", stroke: "black", strokeWidth: 1 });
	    },
	    // 2回目のsayhello関数の実行アニメーション
	    function(){
		eA("firstBrowserRect", "rect", { fill: "pink", stroke: "red" });
		eA("firstBrowserRect", "あいさつ", { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1});
	    },
	    function(){
		execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("plain", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		eA("firstBrowserRect", "rect", { fill: "white", stroke: "black" });
		eA("firstBrowserRect", "あいさつ", { fill: "black", stroke: "black", strokeWidth: 1 });
		execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 0 });
	    },
	    function(){
		execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 1 });
		eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
		eA("TaroTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		// reset
		execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 0 });
		eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 0 });
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
		eA("TaroTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("plain", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		tspanRangeAnimation("plain", 1, 5, { stroke: "red", strokeWidth: 1, fill: "red" });
	    },
	    function(){
		execArrowAnimation("getElementByIdToPTag", { opacity: 1 });
		eA("getElementByIDExp", 'id="who"の要素を探す', { opacity: 1 });
		eA("TaroTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("getElementByIdToPTag", { opacity: 0 });
		eA("getElementByIDExp", 'id="who"の要素を探す', { opacity: 0 });
		eA("TaroTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		tspanRangeAnimation("plain", 1, 5, { stroke: "black", strokeWidth: 0, fill: "black" });
	    },
	    function(){
		tspanRangeAnimation("plain", 1, 6, { stroke: "red", strokeWidth: 1, fill: "red" });
		execArrowAnimation("getElementByIdToPTag", { opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
		eA("taroInnerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		// reset 
		tspanRangeAnimation("plain", 1, 6, { stroke: "black", strokeWidth: 0, fill: "black" });
		execArrowAnimation("getElementByIdToPTag", { opacity: 0 });
		eA("taroInnerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 0 });
		execStringAnimationByTspan("TaroTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 1 });
	    },
	    function(){
		eA("HelloWorldAlert", "rect", { opacity: 0 });
		eA("HelloWorldTaroAlert", "Hello, 太郎!", { opacity: 1, fill: "red", stroke: "red", strokeWidth: 1 });
		eA("HelloWorldTaroAlert", "rect", { opacity: 1, fill: "pink", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		eA("HelloWorldTaroAlert", "Hello, 太郎!", { opacity: 0, fill: "black", stroke: "red", strokeWidth: 0 });
		eA("HelloWorldTaroAlert", "rect", { opacity: 0, fill: "white", stroke: "white", strokeWidth: 0 });
		execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 0 });
	    },
	    function(){
		alert("アニメーションは終了しました。");
	    }];
    }else{
	// erase button
	eA("animationTaroSwitch", "rect", { opacity: 0 });
	eA("animationTaroSwitch", "taroバージョンを実行する", { opacity: 0 });
	
	FunctionStorage = [
	    function(){
		eA("ThirdBrowserRect", "花子", { fill: "red", stroke: "red", strokeWidth: 1 });
		eA("ThirdBrowserRect", "rect", { fill: "pink", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execStringAnimationByTspan("BrowserFuncHanako", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("Browser:hanako:onclick:arrow", { opacity: 1 });
	    },
	    function(){
		execArrowAnimation("Browser:hanako:onclick:arrow", { opacity: 0 });
		eA("ThirdBrowserRect", "花子", { fill: "black", stroke: "black", strokeWidth: 1 });
		eA("ThirdBrowserRect", "rect", { fill: "white", stroke: "black", strokeWidth: 1 });
		execStringAnimationByTspan("BrowserFuncHanako", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("hanako", 1, 0, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("Js:hanako:document", { opacity: 1 });
		eA("Js:hanako:document:text", "ウェブページ全体", { opacity: 1, strokeWidth: 1 });
	    },
	    function(){
	    	execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, 
				     { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
		execStringAnimationByTspan("pTag", 1, 0, { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("pTag", 1, 2, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		// reset 
	    	execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
		execStringAnimationByTspan("pTag", 1, 0, { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("pTag", 1, 2, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("Js:hanako:document", { opacity: 0 });
		eA("Js:hanako:document:text", "ウェブページ全体", { opacity: 0, strokeWidth: 0 });
		tspanRangeAnimation("hanako", 0, 0, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		tspanRangeAnimation("hanako", 0, 4, { fill: "red", stroke: "red", strokeWidth: 1 });
		execArrowAnimation("Js:hanako:document.getElementById('who')", { opacity: 1 });
	    },
	    function(){
		eA("Js:hanako:document.getElementById('who')", 'id="who"の要素を探す', { opacity: 1, strokeWidth: 1 });
	    },
	    function(){
		tspanRangeAnimation("pTag", 0, 2, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		tspanRangeAnimation("pTag", 0, 2, { fill: "black", stroke: "black", strokeWidth: 0 });
		eA("Js:hanako:document.getElementById('who')", 'id="who"の要素を探す', { opacity: 0, strokeWidth: 1 });
		execArrowAnimation("Js:hanako:document.getElementById('who')", { opacity: 0 });
		tspanRangeAnimation("hanako", 0, 4, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		tspanRangeAnimation("hanako", 0, 5, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("Js:hanako:document.getElementById('who').innerHTML", { opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("pTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
		eA("Js:hanako:document.getElementById('who').innerHTML:text", "要素の中身の部分", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		tspanRangeAnimation("hanako", 0, 5, { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("pTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("Js:hanako:document.getElementById('who').innerHTML", { opacity: 0 });
		eA("Js:hanako:document.getElementById('who').innerHTML:text", "要素の中身の部分", { strokeWidth: 1, opacity: 0 });
	    },
	    function(){
		execArrowAnimation("Js:hanako:assign", { opacity: 1 });
		execStringAnimationByTspan("hanako", 1, 8, { fill: "red", stroke: "red", strokeWidth: 1 });
		eA("Js:Moving:hanako", "花子", { opacity: 1, strokeWidth: 1 });
	    },
	    function(){
		eA("Js:Moving:hanako", "花子", { x: 260, y: 840, opacity: 0 });
		tspanRangeAnimation("HanakoTag", 0, 2, { opacity: 1 });
		eA("pTag", "tspan", { opacity: 0 });
		eA("HanakoTag", "tspan", { opacity: 1});
		execStringAnimationByTspan("pTag", 1, 1, { opacity: 0 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execStringAnimationByTspan("hanako", 1, 8, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("Js:hanako:assign", { opacity: 0 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		execArrowAnimation("html:browser:ptag:arrow", { opacity: 1 });
		eA("html:Moving:hanako", "花子", { opacity: 1, strokeWidth: 1 });
	    },
	    function(){
		eA("html:Moving:hanako", "花子", { x: 400, y: 350, opacity: 0 });
		eA("FirstPTagOutput", "world", { opacity: 0 });
		eA("ThirdPTagOutput", "花子", { opacity: 1, strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("html:browser:ptag:arrow", { opacity: 0 });
	    },
	    // sayhello関数の2回目の呼び出し
	    function(){
		eA("firstBrowserRect", "rect", { fill: "pink", stroke: "red" });
		eA("firstBrowserRect", "あいさつ", { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 1 });
	    },
	    function(){
		eA("firstBrowserRect", "rect", { fill: "white", stroke: "black" });
		eA("firstBrowserRect", "あいさつ", { fill: "black", stroke: "black", strokeWidth: 1 });
		execStringAnimationByTspan("BrowserFuncSayHello()", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("FromBrowserSayHelloFuncToJsFuncDefinition", { opacity: 0 });
	    },
	    function(){
		execStringAnimationByTspan("plain", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 1 });
		eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "red", stroke: "red", strokeWidth: 1 }, animationSpeed);
		eA("HanakoTag", "tspan", { fill: "red", stroke: "red", strokeWidth: 1 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		// 
		execStringAnimationByTspan("plain", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("SayHelloDefinitionDocumentToHTML", { opacity: 0 });
		eA("documentObjectExp", "ウェブページ全体", { strokeWidth: 1, opacity: 0 });
		execEffectSVGIndexes("ex06-8.html", "<html>", 1, "ex06-8.html", "</html>", 1, { fill: "black", stroke: "black", strokeWidth: 0 }, animationSpeed);
		eA("HanakoTag", "tspan", { fill: "black", stroke: "black", strokeWidth: 0 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		// "alert('Hello, ' + ",
		// "document",
		// ".",
		// "getElementById('",
		// "who",
		// "')",
		// ".innerHTML",
		// " + '!');"],
		tspanRangeAnimation("plain", 1, 5, { fill: "red", stroke: "red", strokeWidth: 1 });
		execArrowAnimation("getElementByIdToPTag", { opacity: 1 });
		eA("getElementByIDExp", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		// reset
		tspanRangeAnimation("plain", 1, 5, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("getElementByIdToPTag", { opacity: 0 });
		eA("getElementByIDExp", 'id="who"の要素を探す', { strokeWidth: 1, opacity: 0 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		tspanRangeAnimation("plain", 1, 6, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		execArrowAnimation("innerHTMLToPTagWorld", { opacity: 1 });
		eA("innerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 1 });
	    },
	    function(){
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		// reset
		tspanRangeAnimation("plain", 1, 6, { fill: "black", stroke: "black", strokeWidth: 0 });
		execArrowAnimation("innerHTMLToPTagWorld", { opacity: 0 });
		eA("innerHTMLToPTagExp", "要素の中身の部分", { strokeWidth: 1, opacity: 0 });
		execStringAnimationByTspan("HanakoTag", 1, 1, { fill: "black", stroke: "black", strokeWidth: 0 });
	    },
	    function(){
		execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 1 });
	    },
	    function(){
		eA("HelloWorldAlert", "rect", { opacity: 0 });
		eA("HelloWorldHanakoAlert", "Hello, 花子!", { opacity: 1, fill: "red", stroke: "red", strokeWidth: 1 });
		eA("HelloWorldHanakoAlert", "rect", { opacity: 1, fill: "pink", stroke: "red", strokeWidth: 1 });
	    },
	    function(){
		eA("HelloWorldHanakoAlert", "Hello, 花子!", { opacity: 0, fill: "red", stroke: "red", strokeWidth: 1 });
		eA("HelloWorldHanakoAlert", "rect", { opacity: 0, fill: "pink", stroke: "red", strokeWidth: 1 });
		execArrowAnimation("sayhelloAlertToBrowserAlert", { opacity: 0 });
	    },
	    function(){
		alert("アニメーションは終了しました。");
	    }
	];
    }
}
