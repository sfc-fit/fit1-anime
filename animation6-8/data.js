
function init(){
    setGridChart();
    setupAllSVGData();
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

    setTextRectangle(120, 450, 370, "ex06-8.html", htmlText);

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
    setTspanStrs("plain", 580 + 13 + 5, 450 + 27 + (1 * 23), ["alert('Hello, ' + ", "document","." + "getElementById('", "who", "').innerHTML + '!');"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("taro", 580 + 13 + 5, 450 + 27 + (5 * 23), ["Hello", "World"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    setTspanStrs("hanako", 580 + 13 + 5, 450 + 27 + (9 * 23), ["Dummy", "Text"],
		 { fill: "black", strokeWidth: 1, opacity: 1 });
    
}
