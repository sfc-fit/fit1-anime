
function init(){
    setupAllSVGData();
    setupAnimationFunction();
    setGridChart();
}

function debugOpacity1(elem){
    if(elem instanceof Array){
	var i;
	for(i = 0; i < Array.length - 1; i++){
	    elem[i].attr({ opacity: 1 });
	}
    }else{
	elem.attr({ opacity: 1 });
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

function setFunctionBallon(){
    var eclipse;
    eclipse = SVG.ellipse(950, 200, 110, 70).attr({ fill: "white", stroke: "black", strokeWidth: 2 });
    // i * 23
    setText("fSayHello", 873, 185, "function sayhello()").attr({ strokeWidth: 1, opacity: 1 });
    setText("fTaro", 873,     185 + 1 * 23, "function taro()").attr({ strokeWidth: 1, opacity: 1 });
    setText("fHanako", 873,   185 + 2 * 23, "function hanako()").attr({ strokeWidth: 1, opacity: 1 });
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
    // insertFirefoxImage();
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
	'',
	'<body>',
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
    setTspanStrs("plain", 580 + 13 + 5, 450 + 27 + (1 * 23), ["alert('Hello, ' + ", "document", ".", "getElementById('", "who", "').innerHTML + '!');"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("taro", 580 + 13 + 5, 450 + 27 + (5 * 23), ["document", ".", "getElementById('", "who", "')", ".innerHTML", " = ", "'太郎'"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("hanako", 580 + 13 + 5, 450 + 27 + (9 * 23), ["document", ".", "getElementById('", "who", "')", "innerHTML", " = ", "'花子'"],
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
    var svgTmp;
    svgTmp = setArrow("FromScriptSrcJsToBrowser", 300, 570, 420, 330);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    setText("fileAssignment", 150, 405, "スクリプトファイルの指定").attr({ opacity: 1, strokeWidth: 1 });
    svgTmp = setArrow("FromJsToBrowser", 820, 470, 700, 330);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    setText("loadJs", 600, 405, "指定されたスクリプトファイルが読み込まれる").attr({ opacity: 1, strokeWidth: 1 });
    setFunctionBallon();
    setText("FunctionRegister", 910, 315 ,"関数の登録").attr({ strokeWidth: 1, opacity: 1 });

    // story 4
    setText("h1Tag", 400, 120, "JavaScriptによる変更の練習").attr({ strokeWidth: 0, opacity: 1 });
    
    svgTmp = setRect("firstBrowserRect", 350, 140, 5, 100, 0, 0, "あいさつ");
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setTspanStrs("BroserFuncSayHello()", 500, 160, ['onclick="', "sayhello()" ,'";']);

    svgTmp = setRect("SecondBroserRect", 350, 190, 5, 100, 0, 18, "太郎");
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setTspanStrs("BroserFuncTaro()", 500, 210, ['onclick="', "taro()" ,'";']);

    svgTmp = setArrow("FromBrowserSayHelloFuncToJsFuncDefinition", 600, 170, 680, 430);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setRect("ThirdBroserRect", 350, 240, 5, 100, 0, 18, "花子");
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setTspanStrs("BroserFuncHanako()", 500, 260, ['onclick="', "hanako()" ,'";']);

    svgTmp = setText("FirstPTagOutput", 378, 310, "world");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setText("SecondPTagOutput", 383, 310, "太郎");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setArrow("FromH1TagToPTagArrow", 300, 635, 400, 330);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setArrow("SayHelloDefinitionDocumentToHTML", 750, 510, 380, 630);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setText("documentObjectExp", 430, 560, "ウェブページ全体");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setArrow("getElementByIdToPTag", 820, 520, 200, 790);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setText("getElementByIDExp", 350, 750, 'id="who"の要素を探す');
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setArrow("innerHTMLToPTagWorld", 950, 515, 245, 805);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setText("innerHTMLToPTagExp", 500, 720, "要素の中身の部分");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setArrow("sayhelloAlertToBrowserAlert", 680, 480, 600, 330);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setRect("HelloWorldAlert", 465, 285, 5, 125, 0, 0, "Hello, world!");
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setArrow("onclickTaroToTaroDefinition", 550, 220, 680, 550);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setArrow("TaroDocumentToDocumentObj", 590, 590, 380, 660);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setText("AllDocumentObj", 305, 610, "ウェブページ全体");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setArrow("TaroGetElementByID", 750, 610, 245, 805);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });
    svgTmp = setText("tarGetElementByID", 350, 785, 'id="who"の要素を探す');
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });
    
    svgTmp = setArrow("taroInnerHTMLArrow", 800, 610, 245, 805);
    svgTmp[0].attr({ opacity: 1 });
    svgTmp[1].attr({ opacity: 1 });

    svgTmp = setText("innerHTMLToPTagExp", 440, 770, "要素の中身の部分");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });

    svgTmp = setText("changeWorld", 420, 770, "この部分を'太郎'に書き換える");
    svgTmp.attr({ strokeWidth: 1, opacity: 1 });
    
}

function setupAnimationFunction(){
    AnimationFunctionAry = [
	function(){
	    // eA("firefox", "png", { opacity: 0 });
	},
	function(){
	    execArrowAnimation("FromScriptSrcJsToBrowser", { opacity: 1 });
	},
	function(){
	    console.log("Animation ended.");
	}];
}
