//初期設定
var count=0;
var phase=0;
var execMode=0;

//コード追加
parseText(0,'<!DOCTYPE　html>\n<html>\n\n　<head>\n　　<meta　charset="utf-8">\n　　<title>変数の練習</title>\n　　<script　src="ex06-5.js"></script>\n　</head>\n\n　<body>\n　　<h1>変数の練習</h1>\n　　<input　type="button"　value="あいさつ"　onclick="sayhello();">\n　　<input　type="button"　value="太郎"　onclick="taro();">\n　　<input　type="button"　value="花子"　onclick="hanako();">\n　</body>\n</html>');
parseText(1,'var　who=\'world\';\n\nfunction　sayhello(){\n　alert(\'Hello,\'　+　who　+　\'!\');\n}\n\nfunction　taro(){\n　who=\'太郎\';\n}\n\nfunction　hanako(){\n　who=\'花子\';\n}');

//フレーム設定
setFrame(1,1,1);

//コードをセット
setText();

//フレーム名を設定
setLabels("ex06-5.html","file:///hoge/ex06-5.html","ex06-5.js");

/*
コンポーネント追加
上から順に配列に格納していく
component[num]で参照できる
後に書いたものほど手前に表示される点に注意
*/
addComponent(labelUI(630,70,25,"","変数の練習","black"));										//component[0]
addComponent(labelUI(470,200,20,"","スクリプトファイルの指定","black"));							//component[1]
addComponent(labelUI(870,260,20,"","指定したスクリプトファイルが読み込まれる","black"));			//component[2]
addComponent(rectHard(1220,60,100,30,"white",1,"black",2));									//component[3]
addComponent(labelUI(1220,50,20,"","var who","black"));										//component[4]	
addComponent(labelUI(1242,82,20,"","world","black"));										//component[5]
addComponent(labelUI(1220,115,20,"","変数の宣言","black"));									//component[6]
addComponent(ellipseUI(1315,180,110,50,"white",1,"black",2));								//component[7]
addComponent(labelUI(1230,165,19,"","function sayhello()","black"));						//component[8]
addComponent(labelUI(1230,185,19,"","function taro()","black"));							//component[9]
addComponent(labelUI(1230,205,19,"","function hanako()","black"));							//component[10]
addComponent(labelUI(1300,255,20,"","関数の登録","black"));									//component[11]
addComponent(rectHard(650,90,100,40,"white",1,"black",2));									//component[12]
addComponent(rectHard(650,140,100,40,"white",1,"black",2));									//component[13]
addComponent(rectHard(650,190,100,40,"white",1,"black",2));									//component[14]
addComponent(labelUI(658,118,20,"",["あいさつ　onclick=\"","sayhello()",";\""],"black"));		//component[15]
addComponent(labelUI(675,168,20,"",["太郎　　onclick=\"","taro()",";\""],"black"));			//component[16]
addComponent(labelUI(675,218,20,"",["花子　　onclick=\"","hanako()",";\""],"black"));			//component[17]
addComponent(rectHard(770,80,220,120,"white",1,"black",2));									//component[18]
addComponent(labelUI(790,155,35,"","Hello,world","black"));									//component[19]
addComponent(labelUI(1242,82,23,"","world","black"));


jsText[3].attr("text",["　alert(\'Hello,\'　+　","who","　+　\'!\');"]);
addShadow(component[18]);
addShadow(component[20]);

//毎フレーム呼ばれる関数
function update(){
	if(started==true){
		if(count%3==0){
			//checkText();	//テキスト等の要素が枠内にあるかチェック
		}
		if(count%120==0&&phase<20&&auto==true){
			draw();
		}
		count++;
	}
}

/*
描画関数
updateから一定時間ごとに呼ばれる
次へボタンを押したときにも呼ばれる
アニメーションの設定を書く
*/
function draw(){
	branch();
	switch(phase){
		case 0:
			updateText(component[20],"world");
			showArrow(0);
			setVisible(1,1);
			setArrow(htmlText[6],component[0],0);
			highlight(htmlText[6]);
			break;

		case 1:
			defuse(htmlText[6]);
			highlight(jsTitle);
			setVisible(2,1);
			showArrow(1);
			setArrow(jsTitle,component[0],1);
			break;
		case 2:
			for(var i=3;i<7;i++){
				setVisible(i,1);
			}
			defuse(jsTitle);
			highlight(jsText[0]);
			break;
		case 3:
			for(var i=7;i<12;i++){
				setVisible(i,1);
			}
			defuse(jsText[0]);
			for(var i=1;i<13;i++){
				highlight(jsText[i]);
			}
			highlight(jsText[3].selectAll("tspan")[1]);
			break;
		case 4:
			setVisible(0,1);
			setVisible(1,0);
			setVisible(2,0);
			hideArrow(1);
			setArrow(htmlText[10],component[14],0);
			for(var i=12;i<18;i++){
				setVisible(i,1);
			}
			for(var i=10;i<14;i++){
				highlight(htmlText[i]);
			}
			for(var i=1;i<13;i++){
				defuse(jsText[i]);
			}
			break;
		case 5:
			for(var i=10;i<14;i++){
				defuse(htmlText[i]);
			}
			highlight(component[12]);
			highlight(component[15].selectAll("tspan")[1]);
			highlight(jsText[3]);
			//setArrow(component[15],jsText[3]);
			absoluteArrow(900,120,800,385,0);
			break;
		case 6:
			defuse(component[12]);
			defuse(component[15].selectAll("tspan")[1]);
			defuse(jsText[3]);
			highlight(component[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			//setVisible(18,1);
			//setVisible(19,1);
			showArrow(1);
			//setArrow(jsText[3],component[18],0);
			hideArrow(0);
			absoluteArrow(1250,90,780,400,1);
			component[20].attr("opacity",1);
			highlight(component[20]);
			trans(component[20],740,400,400);
			break;
		case 7:
			setVisible(18,1);
			setVisible(19,1);
			showArrow(0);
			setArrow(jsText[3],component[18],0);
			hideArrow(1);
			defuse(component[3]);
			break;
		case 8:
			setVisible(18,0);
			setVisible(19,0);
			component[20].attr("opacity",0);
			//trans(component[20],componentPosX[20],componentPos[20],0);
			defuse(component[3]);
			defuse(jsText[3].selectAll("tspan")[1]);
			highlight(component[13]);
			highlight(component[16].selectAll("tspan")[1]);
			highlight(jsText[7]);
			hideArrow(1);
			absoluteArrow(850,170,700,470,0);
			break;
		case 9:
			defuse(component[13]);
			defuse(component[16].selectAll("tspan")[1]);
			updateText(component[20],"太郎");
			component[20].attr({
				x:700,
				y:500,
				opacity:1
			});
			trans(component[20],1320,85,400);
			//updateText(component[5],"太郎");
			//highlight(component[3]);
			setArrow(jsText[7],component[3]);
			break;
		case 10:
			updateText(component[5],"太郎");
			highlight(component[3]);
			setVisible(20,0);
			trans(component[20],componentPosX[20],componentPos[20],200);
			break;
		case 11:
			defuse(component[3]);
			defuse(jsText[7]);
			highlight(component[12]);
			highlight(component[15].selectAll("tspan")[1]);
			highlight(jsText[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			absoluteArrow(900,120,800,385,0);
			break;
		case 12:
			defuse(component[12]);
			defuse(component[15].selectAll("tspan")[1]);
			defuse(jsText[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			highlight(component[3]);
			//setVisible(18,1);
			//setVisible(19,1);
			updateText(component[19],"Hello,太郎");
			component[20].attr("opacity",1);
			trans(component[20],740,400,400);
			//setArrow(jsText[3],component[18]);
			hideArrow(0);
			showArrow(1);
			absoluteArrow(1250,90,780,400,1);
			break;
		case 13:
			setVisible(18,1);
			setVisible(19,1);
			showArrow(0);
			defuse(component[3]);
			hideArrow(1);
			setArrow(jsText[3],component[18]);
			break;
		case 14:
			setVisible(18,0);
			setVisible(19,0);
			component[20].attr("opacity",0);
			trans(component[20],componentPosX[20],componentPos[20],0);
			defuse(jsText[3].selectAll("tspan")[1]);
			defuse(component[3]);
			hideArrow(1);
			highlight(component[14]);
			highlight(jsText[11]);
			highlight(component[17].selectAll("tspan")[1]);
			absoluteArrow(850,220,700,590,0);
			break;
		case 15:
			defuse(component[14]);
			defuse(component[17].selectAll("tspan")[1]);
			//highlight(component[3]);
			//updateText(component[5],"花子");
			updateText(component[20],"花子");
			component[20].attr({
				x:700,
				y:600,
				opacity:1
			});
			trans(component[20],1320,85,400);
			setArrow(jsText[11],component[3],0);
			break;
		case 16:
			updateText(component[5],"花子");
			highlight(component[3]);
			setVisible(20,0);
			trans(component[20],componentPosX[20],componentPos[20],200);
			break;
		case 17:
			defuse(component[3]);
			defuse(jsText[11]);
			highlight(component[12]);
			highlight(component[15].selectAll("tspan")[1]);
			highlight(jsText[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			absoluteArrow(900,120,800,385,0);
			break;
		case 18:
			defuse(component[12]);
			defuse(component[15].selectAll("tspan")[1]);
			defuse(jsText[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			highlight(component[3]);
			//setVisible(18,1);
			//setVisible(19,1);
			updateText(component[19],"Hello,花子");
			//setArrow(jsText[3],component[18]);
			hideArrow(0);
			showArrow(1);
			absoluteArrow(1250,90,780,400,1);
			component[20].attr("opacity",1);
			trans(component[20],740,400,400);
			break;
		case 19:
			setVisible(18,1);
			setVisible(19,1);
			showArrow(0);
			defuse(component[3]);
			hideArrow(1);
			setArrow(jsText[3],component[18]);
			break;
		case 20:
			alert("アニメーションが終了しました");
			break;

	}
	//updateText(component[20],component[5].attr("text"));
	phase++;									
}

function branch(){
	switch(execMode){
		case 0:
			break;
		case 1:
			if(phase==14){
				phase=20;
			}
			break;
		case 2:
			if(phase==8){
				phase=14;
			}
			break;
	}
}

/*
リセット関数
リセットボタンに反応
*/
function reset(){
	updateText(component[19],"Hello,world");
	updateText(component[5],"world");
	defuse(jsText[3].selectAll("tspan")[1]);
	defuse(component[15].selectAll("tspan")[1]);
	defuse(component[16].selectAll("tspan")[1]);
	defuse(component[17].selectAll("tspan")[1]);
	count=0;
	phase=0;
	started=false;
	resetAll();
}