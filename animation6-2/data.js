
function insertFirefoxImage(){
    var redCircle, yellowCircle, greenCircle;
    var i = SVG.image("Firefox-logo.png", 410, 120, 150, 150).attr({ opacity: 1 });
    var x = 300, y = 50, r = 5;
    redCircle = SVG.circle(x + 20, y + 16, r).attr({ fill: "#FA5858", opacity: 1 });
    yellowCircle = SVG.circle(x + 42, y + 16, r).attr({ fill: "#FFFF00", opacity: 1 });
    greenCircle = SVG.circle(x + 64, y + 16, r).attr({ fill: "#2EFE2E", opacity: 1 });
    SVGAry.push(i); SVGPushLog.push(["firefox", "png"]);
    SVGAry.push(redCircle);    SVGPushLog.push(["redCircle", "circle"]);
    SVGAry.push(yellowCircle); SVGPushLog.push(["yellowCircle", "circle"]);
    SVGAry.push(greenCircle);  SVGPushLog.push(["greenCircle", "circle"]);
}

function setSayHelloFuncSwitch(){
    function switchClickEvent(){
	var s1 = "sayhello関数を1回実行する";
	var s2 = "sayhello関数を2回実行する";
	if(isExecuted === true){
	    return;
	}
	if(GlobalKey == KeyStatus.Once){
	    GlobalKey = KeyStatus.Twice;
	    console.log("Twice");
	    eA("sayhelloSwitch", s1, { opacity : 1 });
	    eA("sayhelloSwitch", s2, { opacity : 0 });
	    eA("onceState", KeyStatus.Once + ">", { opacity: 0 });
	    eA("twiceState", KeyStatus.Twice + ">", { opacity: 1 });
	}else{
	    GlobalKey = KeyStatus.Once;
	    console.log("Once");
	    eA("sayhelloSwitch", s1, { opacity : 0 });
	    eA("sayhelloSwitch", s2, { opacity : 1 });
	    eA("onceState", KeyStatus.Once + ">", { opacity: 1 });
	    eA("twiceState", KeyStatus.Twice + ">", { opacity: 0 });
	}
    }
    var str1 = "sayhello関数を1回実行する", str2 = "sayhello関数を2回実行する";
    var rect = SVG.rect(150, 730, 250, 30).attr({ fill: "white", stroke: "black", strokeWidth: 2, r: 5 });
    var txt1 = SVG.text(170, 751, str1).attr({ fill: "black", stroke: "black", strokeWidth: 1, opacity: 0 });
    var txt2 = SVG.text(170, 751, str2).attr({ fill: "black", stroke: "black", strokeWidth: 1, opacity: 1 });
    SVGAry.push(rect); SVGPushLog.push(["sayhelloSwitch", "rect"]); rect.click(switchClickEvent);
    SVGAry.push(txt1); SVGPushLog.push(["sayhelloSwitch", str1]); txt1.click(switchClickEvent);
    SVGAry.push(txt2); SVGPushLog.push(["sayhelloSwitch", str2]); txt2.click(switchClickEvent);
}

function setSVG(key){
    var dummyTag = "<d>dummy</d>";
    var html = ["<!DOCTYPE html>",
		"<html>", "", "<head>",
		"<meta charset=\"utf-8\">",
		"<title> 練習問題06-1 </title>",
		"<script src=\"ex06-1.js\"><\/script>",
		"</head>", "",
		"<body>",
		"<h1> 関数の練習 </h1>",
		"<input type=\"button\" value=\"ここをクリック\"",
		"",
		"</body>", "", "</html>"];
    
    setBrowser(300, 50, 400, 250, "file:///hoge/ex06-1.html", [ ]);
    setTextRectangle(50, 390, 400, "ex06-1.html", html); // html file.
    setText("onceState", 60, 693, KeyStatus.Once + ">");
    eA("onceState", KeyStatus.Once + ">", { fill: "black", stroke: "black", strokeWidth: 0, opacity: 1 });
    setText("twiceState", 60, 693, KeyStatus.Twice + ">");
    eA("twiceState", KeyStatus.Twice + ">", { fill: "black", stroke: "black", strokeWidth: 0, opacity: 0 });
    setTextRectangle(600, 390, 300,"ex06-1.js", [ "function sayhello(){", "alert('Hello, world!);", "}"]);
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
    setTspanStrs("onclick", 485, 250, ["onclick=\"", "sayhello();", "sayhello();", "\""], { stroke: "black", strokeWidth: 0, opacity: 0 });
    setTspanStrs("partialOnclick", 485, 250, ["onclick=\"", "sayhello();", "\""], { stroke: "black", strokeWidth: 0, opacity: 0 });
    // sayhello()の回数で分岐する。
    setArrow("ForthArrow", 485 + 245, 240, 790, 220);
    setArrow("AnotherForthArrow", 650, 240, 790, 220);
    setArrow("alertArrow", 580, 410, 450, 310);
    setArrow("FifthArrow", 850, 235, 750, 380);
    setArrow("fromClickHere", 460, 200, 550, 230);
    setRect("HelloWorldRect", 330, 260, 10 ,0 , 1, "Hello, world!");
    var autoButtonTriggerFunc = function(){
	isExecuted = true;
	fixSwitchFuncCallButton();
	executedStatus = ButtonClickStatus.AutoExecution;
	ClickLog.push(executedStatus);
	appendFunctionStorage();
	execManager({ state : 0 });
    };
    var nextButtonTriggerFunc = function(){
	isExecuted = true;
	fixSwitchFuncCallButton();
	executedStatus = ButtonClickStatus.ManualExecution;
	ClickLog.push(executedStatus);
	appendFunctionStorage();
	execManager({ state : 1 });
    };
    
    makeButton("Automatic", 209, 135, 40, autoButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    makeButton("Manual", 209, 250, 40, nextButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("AutomaticButtonStr", 191, 140, "自動"); // button's x - 18, button's y + 5
    setText("ManualButtonStr", 191, 255, "次へ");
    execAnimation("AutomaticButtonStr", "自動", 1, { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    execAnimation("ManualButtonStr", "次へ", 1, { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    pushEventBySVGID("AutomaticButtonStr", "自動", 1, autoButtonTriggerFunc);
    pushEventBySVGID("ManualButtonStr", "次へ", 1, nextButtonTriggerFunc);
    setText("newURL", 400, 71, "URL: file:///hoge/ex06-1.html");
    changeJsonAttr("newURL", "URL: file:///hoge/ex06-1.html", 1, { strokeWidth: 0 });
    var resetAnimationFunc = function(){
	isExecuted = false;
	location.reload();
    };
    makeButton("reset", 115, 190, 40, resetAnimationFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("ResetButtonStr", 115 - 25 , 190 + 7, "最初へ");
    eA("ResetButtonStr", "最初へ", { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    pushEventBySVGID("ResetButtonStr", "最初へ", 1, resetAnimationFunc);
    setSayHelloFuncSwitch();
    insertFirefoxImage();
}

function fixSwitchFuncCallButton(){
    var s1 = "sayhello関数を1回実行する";
    var s2 = "sayhello関数を2回実行する";
    if(GlobalKey == KeyStatus.Once){
	eA("sayhelloSwitch", "rect", { fill: "aquamarine", stroke: "green" });
	eA("sayhelloSwitch", s2, { stroke: "green", fill: "green" });
    }else{
	eA("sayhelloSwitch", "rect", { fill: "aquamarine", stroke: "green" });
	eA("sayhelloSwitch", s1, { stroke: "green", fill: "green" });
    }
}

function setUpFunctionAry(){
    AnimationFunctionAry = [
	function(){
	    eA("firefox", "png", { opacity: 0 });
	},
	function(){
	    execAnimation("file:///hoge/ex06-1.html", "title", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("newURL", "URL: file:///hoge/ex06-1.html", 1, { strokeWidth: 0, stroke: "black", opacity: 1});
	    eA("newURL", "URL: file:///hoge/ex06-1.html", { strokeWidth: 0, stroke: "black", opacity: 1});
	},
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
	    eA("onceState", KeyStatus.Once + ">", { fill: "black", stroke: "red", strokeWidth: 1 });
	    eA("twiceState", KeyStatus.Twice + ">", { fill: "black", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("ClickHereRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "white", stroke: "black", strokeWidth: 1, opacity: 1 });
	},
	function(){
	    if(GlobalKey == KeyStatus.Once){
		execAnimation("partialOnclick", "tspan", 1, { opacity: 1 });
	    }else{
		execAnimation("onclick", "tspan", 1, { opacity: 1 });
	    }
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 0 });
	    execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	    eA("onceState", KeyStatus.Once + ">", { fill: "black", stroke: "black", strokeWidth: 0 });
	    eA("twiceState", KeyStatus.Twice + ">", { fill: "black", stroke: "black", strokeWidth: 0 });
	},
	function(){
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execAnimation("ClickHereRect", "rect", 1, { fill: "pink", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("fromClickHere", 1, { opacity: 1 });
	},
	function(){
	    if(GlobalKey != KeyStatus.Once){
		execStringAnimationByTspan("onclick", 1, 1, { stroke: "red", fill: "black", strokeWidth: 1 });
	    }else{
		execStringAnimationByTspan("partialOnclick", 1, 1, { stroke: "red", fill: "black", strokeWidth: 1 });
	    }
	},
	function(){
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "black", stroke: "black", strokeWidth: 1 });
	    execAnimation("ClickHereRect", "rect", 1, { fill: "white", stroke: "black", strokeWidth: 1 });
	    execArrowAnimation("fromClickHere", 1, { opacity: 0 });
	},
	function(){
	    if(GlobalKey == KeyStatus.Once){
		execArrowAnimation("AnotherForthArrow", 1, { opacity: 1 });
	    }else{
		execArrowAnimation("ForthArrow", 1, { opacity: 1 });
	    }
	},
	function(){
	    if(GlobalKey == KeyStatus.Once){
		execArrowAnimation("AnotherForthArrow", 1, { opacity: 0 });
	    }else{
		execArrowAnimation("ForthArrow", 1, { opacity: 0 });
	    }
	    
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
	    if(GlobalKey != KeyStatus.Once){
		execStringAnimationByTspan("onclick", 1, 1, { fill: "black", strokeWidth: 0 });
	    }else{
		execStringAnimationByTspan("partialOnclick", 1, 1, { fill: "black", strokeWidth: 0 });
	    }
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", fill: "white", strokeWidth: 1, opacity: 0 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 0 });
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	}];
}

function appendFunctionStorage(){
    if(GlobalKey == KeyStatus.Once){
	AnimationFunctionAry.push(function(){
	    alert("アニメーションは終了しました。");
	});
    }else{
	    FunctionStorage = [
		function(){
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
		},
		function(){
		    alert("アニメーションは終了しました。");
		}
	    ];
	for(var i = 0; i < FunctionStorage.length ; i++){
	    AnimationFunctionAry.push(FunctionStorage[i]);
	}
    }
}
