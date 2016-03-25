

function preUserChoise(){
    var ellipseWidth = 135;
    var ellipseHeight = 135;
    var ellipseY = 350;
    var strY = ellipseY + 5;
    var onceButtonTriggerFunc = function(){
	if(select == true){
	    return;
	}
	erasePreButton();
	select = true;
	setSVG("onclick=\"sayhello();\"");
	execEffectSVGIndexes("file:///hoge/ex06-1.html", "line", 1, "ex06-1.js", "}", 1,{ opacity: 1 }, 0);
	setUpFunctionAry("onclick=\"sayhello();\"");
	selectiveFunctionExecution(selectiveDebugIndex, debugAnimationStartIndex);
    };
    var twiceButtonTriggerFunc = function(){
	if(select == true){
	    return;
	}
	erasePreButton();
	select = true;
	setSVG("onclick=\"sayhello();sayhello();\"");
	execEffectSVGIndexes("file:///hoge/ex06-1.html", "line", 1, "ex06-1.js", "}", 1, { opacity: 1 }, 0);
	setUpFunctionAry("onclick=\"sayhello();sayhello();\"");
	selectiveFunctionExecution(selectiveDebugIndex, debugAnimationStartIndex);
    };
    makeEllipseButton("callOnce", 300, ellipseY, ellipseWidth, ellipseHeight, onceButtonTriggerFunc, { fill: "mistyrose", stroke: "red", strokeWidth: 2 });
    makeEllipseButton("callTwice", 650, ellipseY, ellipseWidth, ellipseHeight,twiceButtonTriggerFunc, { fill: "mistyrose", stroke: "red", strokeWidth: 2 });
    /* once */
    setText("leftButtonText", 223, strY, "onclick=\"sayhello();\"");
    // setText("case1", 270, 376, "の場合");
    setText("case1", 270, 381, "の場合");
    changeJsonAttr("leftButtonText",     "onclick=\"sayhello();\"", 1, { stroke : "red", fill: "red", strokeWidth: 1, opacity: 1 });
    changeJsonAttr("case1", "の場合", 1, { stroke: "red", fill: "red", strokeWidth: 1, opacity: 1 });
    pushEventBySVGID("leftButtonText", "onclick=\"sayhello();\"", 1, onceButtonTriggerFunc);
    pushEventBySVGID("case1", "の場合", 1, onceButtonTriggerFunc);
    /* twice */
    setText("rightButtonText", 540, strY, "onclick=\"sayhello();sayhello();\"");
    // setText("case2", 625, 376, "の場合");
    setText("case2", 625, 381, "の場合");
    pushEventBySVGID("rightButtonText", "onclick=\"sayhello();sayhello();\"", 1, twiceButtonTriggerFunc);
    pushEventBySVGID("case2", "の場合", 1, twiceButtonTriggerFunc);
    changeJsonAttr("rightButtonText",     "onclick=\"sayhello();sayhello();\"", 1, { stroke : "red", fill: "red", strokeWidth: 1, opacity: 1 });
    changeJsonAttr("case2", "の場合", 1, { stroke: "red", fill: "red", strokeWidth: 1, opacity: 1 });
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
		// "onclick=\"sayhello();sayhello();\">",
		"<d>dummy</d>", // dummyTag
		"</body>", "", "</html>"];
    var dummyIndex = searchTextAryIndex(html, dummyTag);
    html[dummyIndex] = key + ">";
    setBrowser(300, 50, 400, 250, "file:///hoge/ex06-1.html", [ ]);
    setTextRectangle(50, 390, 400, "ex06-1.html", html); // html file.
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
	executedStatus = ButtonClickStatus.AutoExecution;
	ClickLog.push(executedStatus);
	execManager({ state : 0 });
    };
    var nextButtonTriggerFunc = function(){
	executedStatus = ButtonClickStatus.ManualExecution;
	ClickLog.push(executedStatus);
	execManager({ state : 1 });
    };
    
    // makeButton("Automatic", 209, 135, 40, autoButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    // makeButton("Manual", 209, 250, 40, nextButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    makeButton("Automatic", 209, 135, 40, autoButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    makeButton("Manual", 209, 250, 40, nextButtonTriggerFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("AutomaticButtonStr", 191, 140, "自動"); // button's x - 18, button's y + 5
    setText("ManualButtonStr", 191, 255, "次へ");
    execAnimation("AutomaticButtonStr", "自動", 1, { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    execAnimation("ManualButtonStr", "次へ", 1, { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    pushEventBySVGID("AutomaticButtonStr", "自動", 1, autoButtonTriggerFunc);
    pushEventBySVGID("ManualButtonStr", "次へ", 1, nextButtonTriggerFunc);
    
    // draw browser
    // setChromeBrowser(300, 50, 400, 250, "URL:"); // black url.
    setText("newURL", 400, 71, "URL: file:///hoge/ex06-1.html");
    changeJsonAttr("newURL", "URL: file:///hoge/ex06-1.html", 1, { strokeWidth: 0 });
    
    // reset button
    var resetAnimationFunc = function(){
	location.reload();
    };
    
    // makeButton("reset", 110, 190, 40, resetAnimationFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    // setText("ResetButtonStr", 110 - 25 , 190 + 7, "最初へ");
    makeButton("reset", 110, 135, 40, resetAnimationFunc, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("ResetButtonStr", 110 - 25 , 135 + 7, "最初へ");
    eA("ResetButtonStr", "最初へ", { stroke: "black", strokeWidth: 1, fill: "black", opacity: 1 });
    pushEventBySVGID("ResetButtonStr", "最初へ", 1, resetAnimationFunc);

    // checkbox
    var switchKeyState = function(){
	if(GlobalKey == KeyStatus.Once){
	    GlobalKey = KeyStatus.Twice;
	    eA("changeNumberText", "1回実行", { opacity: 1 });
	    eA("changeNumberText", "2回実行", { opacity: 0 });
	    // main
	    window.alert("temp");	    
	}else{
	    GlobalKey = KeyStatus.Once;
	    eA("changeNumberText", "1回実行", { opacity: 0 });
	    eA("changeNumberText", "2回実行", { opacity: 1 });
	    // main
	    window.alert("temp");
	}
    };
    
    makeButton("changeNumberOfFuncCall", 110, 250, 40, switchKeyState, { fill: "white", stroke: "black", strokeWidth: 2 });
    setText("changeNumberText", 110 - 30, 250 + 7, "1回実行");
    setText("changeNumberText", 110 - 30, 250 + 7, "2回実行");
    changeJsonAttr("changeNumberText", "1回実行", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
    changeJsonAttr("changeNumberText", "2回実行", 1, { stroke: "black", strokeWidth: 1, opacity: 0 });
    pushEventBySVGID("changeNumberText", "1回実行", 1, switchKeyState);
    pushEventBySVGID("changeNumberText", "2回実行", 1, switchKeyState);
}

function setUpFunctionAry(key){
    AnimationFunctionAry = [
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
	    execAnimation("ex06-1.html", key + ">", 1, { strokeWidth: 1, fill: "black", stroke: "red" });
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 1 });
	},
	function(){
	    execAnimation("ClickHereRect", "rect", 1, { stroke: "black", strokeWidth: 1, opacity: 1 });
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "white", stroke: "black", strokeWidth: 1, opacity: 1 });
	},
	function(){
	    if(key == KeyStatus.Twice){
		execAnimation("onclick", "tspan", 1, { opacity: 1 });
	    }else{
		execAnimation("partialOnclick", "tspan", 1, { opacity: 1 });
	    }
	},
	function(){
	    execArrowAnimation("ClickHere", 1, { opacity: 0 });
	    execAnimation("ex06-1.html", "<input type=\"button\" value=\"ここをクリック\"", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	    if(key == KeyStatus.Once){
		execAnimation("ex06-1.html", "onclick=\"sayhello();\">", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	    }else{
		execAnimation("ex06-1.html", "onclick=\"sayhello();sayhello();\">", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	    }
	},
	function(){
	    execAnimation("ClickHereRect", "ここをクリック", 1, { fill: "red", stroke: "red", strokeWidth: 1 });
	    execAnimation("ClickHereRect", "rect", 1, { fill: "pink", stroke: "red", strokeWidth: 1 });
	},
	function(){
	    execArrowAnimation("fromClickHere", 1, { opacity: 1 });
	},
	function(){
	    if(key != KeyStatus.Once){
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
	    if(key == KeyStatus.Once){
		execArrowAnimation("AnotherForthArrow", 1, { opacity: 1 });
	    }else{
		execArrowAnimation("ForthArrow", 1, { opacity: 1 });
	    }
	},
	function(){
	    if(key == KeyStatus.Once){
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
	    if(key != KeyStatus.Once){
		execStringAnimationByTspan("onclick", 1, 1, { fill: "black", strokeWidth: 0 });
	    }else{
		execStringAnimationByTspan("partialOnclick", 1, 1, { fill: "black", strokeWidth: 0 });
	    }
	    execAnimation("HelloWorldRect", "rect", 1, { stroke: "black", fill: "white", strokeWidth: 1, opacity: 0 });
	    execAnimation("HelloWorldRect", "Hello, world!", 1, { fill: "black", stroke: "black", opacity: 0 });
	    execAnimation("ex06-1.js", "alert('Hello, world!);", 1, { stroke: "black", fill: "black", strokeWidth: 0 });
	}	
    ];
    if(key == KeyStatus.Once){
	AnimationFunctionAry.push(function(){
	    alert("アニメーションは終了しました。");
	});
	return;
    }
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
