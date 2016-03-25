var count = 0;
var phase = 0;
parseText(0,'<!DOCTYPE　html>\n<html>\n　<head>\n　<meta　charset="utf-8">\n　<title>　練習問題　06-1</title>\n　<script　src="ex06-1.js"></script>\n　</head>\n　<body>\n　<h1>　関数の練習　</h1>\n　</body>\n</html>\n');
parseText(1,'function　sayhello()　{\n　alert(\'Hello,　world!\');\n}');
var arrow1,arrow2;

setFrame(1,1,1);
setText();
var labels = setLabels("ex06-1.html","file://hoge/ex06-1.html","ex06-1.js");

addComponent(labelUI(450,150,25,"","スクリプトファイルの指定","black"));
addComponent(labelUI(920,250,25,"","指定されたファイルが読み込まれる","black"));
addComponent(rectSoft(770,120,100,50,"#ccc",0,"black",1));
addComponent(labelUI(1100,100,25,"","function sayhello()","black"));
addComponent(labelUI(1150,160,25,"","関数の登録","black"));
addComponent(setEllipse(1200,90,130,25,"#fff",0,"black",1));
addComponent(labelUI(650,100,25,"","関数の練習","black"));
addComponent(setLine(900,90,1072,90,"black",1));

function update(){
	if(count%60==0&&phase<5&&auto==true){
		draw();
	}
	count++;
}

function draw(){
	switch(phase){
		case 0:
			showArrow();
			setVisible(0,1);
			setArrow(htmlText[5],component[2]);
			highlight(htmlText[5]);
			break;
		case 1:
			defuse(htmlText[5])
			setVisible(0,0);
			setVisible(1,1);
			setArrow(labels[2],component[2]);
			highlight(labels[2]);
			break;
		case 2:
			defuse(labels[2]);
			setVisible(1,0);
			hideArrow();
			setVisible(3,1);
			setVisible(4,1);
			setVisible(5,1);
			component[7].attr("opacity",1);
			break;
		case 3:
			setVisible(6,1);
			break;
		default :
			setReset();
			break;
	}
	phase++;
}

var a = document.getElementById("autoButton");
var s = document.getElementById("stepButton");
var r = document.getElementById("resetButton");

a.addEventListener('click',autoExec,false);
s.addEventListener('click',stepExec,false);
r.addEventListener('click',reset,false);