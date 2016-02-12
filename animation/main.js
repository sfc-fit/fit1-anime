var count=0;
var phase=0;
parseText(0,'<!DOCTYPE html>\n<html>\n \n  <head>\n    <meta charset="utf-8">\n    <title>練習問題05-11</title>\n  </head>\n \n  <body>\n    <h1>　　　　　　　　　　　</h1>\n    <input type="button" value="　　　　　　　" onclick="alert(\'Hello, world!\');">\n  </body>\n \n</html>');
//parseText(1,'function　student()　{\n　　var　f　=　\'不明\';\n　　var　x　=　document.getElementsByName(\'faculty\');\n　　var　i　=　0;\n　　while　(i　<　x.length)　{\n　　　　if　(x[i].checked)　{\n　　　　　　f　=　x[i].value;\n　　　　}\n　　　　i　=　i+1;\n　　}\n　　alert(f);\n}');
setFrame(1,1,0);
setText();
setLabels("ex05-11.html","file:///hoge/ex05-11.html","");
addComponent(labelUI(630,100,25,"","イベントハンドラの練習","black"));
addComponent(rectSoft(630,150,100,50,"#ccc",0,"black",1));
addComponent(labelUI(635,180,13,"","ここをクリック","black"));
addComponent(rectHard(770,135,330,70,"#fff",0,"black",1))
addComponent(labelUI(795,180,23,"",'onclick="　　　　　　　　 "',"black"));
addComponent(labelUI(885,180,23,"","alert('Hello,World!')","black"));
addComponent(rectHard(630,230,130,70,"#fff",0,"black",1));
addComponent(labelUI(642,272,20,"","Hello,World!","black"));
addVariable(component[0]);
addVariable(component[2]);

setBox(103,429,162,"イベントハンドラの練習",htmlText[9],0);
setBox(257,452,103,"ここをクリック",htmlText[10],0);

function update(){
	if(started==true){
		if(count%5==0){
			checkText();
		}
		if(count%60==0&&phase<5&&auto==true){
			draw();
		}
		count++;
	}
}

function draw(){
	switch(phase){
		case 0:
			showArrow();
			highlight(htmlText[9]);
			setVisible(0,1);
			setArrow(htmlText[9],component[0]);
			break;
		case 1:
			highlight(htmlText[10]);
			highlight(htmlText[11]);
			defuse(htmlText[9]);
			setVisible(1,1);
			setVisible(2,1);
			setVisible(3,0.1);
			setVisible(4,1);
			setVisible(5,0.1);
			setArrow(htmlText[10],component[1]);
			break;
		case 2:
			defuse(htmlText[10]);
			defuse(htmlText[11]);
			highlight(component[1]);
			highlight(component[5]);
			hideArrow();
			break;
		case 3:
			defuse(component[1]);
			setVisible(6,1);
			setVisible(7,1);
			setArrow(component[5],component[6]);
			showArrow();
			scroll(1);
			break;
		case 4:
			alert("アニメーションが終了しました");
			document.getElementById("resetButton").style.opacity=1;
			break;
	}
	phase++;
}

function reset(){
	count=0;
	phase=0;
	started=false;
	resetAll();
}