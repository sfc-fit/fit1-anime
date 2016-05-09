//初期設定
var count=0;
var phase=0;
var execMode=0;
var who = "world"
var y;
var index;
var action = 0;

//コード追加
parseText(0,'<!DOCTYPE　html>\n<html>\n\n　<head>\n　　<meta　charset="utf-8">\n　　<title>引数の練習</title>\n　　<script　src="ex06-5.js"></script>\n　</head>\n\n　<body>\n　　<h1>引数の練習</h1>\n　　<input　type="button"　value="あいさつ"　onclick="sayhello();">\n　　<input　type="button"　value="太郎"　onclick="someone(\'太郎\');">\n　　<input　type="button"　value="花子"　onclick="someone(\'花子\');">\n　</body>\n</html>');
parseText(1,'var　who=\'world\';\n\nfunction sayhello(){\n　alert(\'Hello,\'　+　who　+　\'!\');\n}\n\n function someone(x){\n　who = x;\n}');

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
addComponent(ellipseUI(1315,170,110,50,"white",1,"black",2));								//component[7]
addComponent(labelUI(1230,165,19,"","function sayhello()","black"));						//component[8]
addComponent(labelUI(1230,185,19,"","function someone","black"));							//component[9]							//component[10]
addComponent(labelUI(1300,255,20,"","関数の登録","black"));									//component[10]
addComponent(rectHard(650,90,100,40,"white",1,"black",2));									//component[11]
addComponent(rectHard(650,140,100,40,"white",1,"black",2));									//component[12]
addComponent(rectHard(650,190,100,40,"white",1,"black",2));									//component[13]
addComponent(labelUI(658,118,20,"",["あいさつ　onclick=\"","sayhello()",";\""],"black"));		//component[14]
addComponent(labelUI(675,168,20,"",["太郎　　onclick=\"","someone(",'太郎',")",";\""],"black"));	//component[15]
addComponent(labelUI(675,218,20,"",["花子　　onclick=\"","someone(",'花子',")",";\""],"black"));	//component[16]
addComponent(labelUI(620,68,25,"","引数の練習",1,"black",2));									//component[17]
addComponent(rectHard(770,80,220,120,"white",1,"black",2));									//component[18]
addComponent(labelUI(790,155,35,"","Hello,world","black"));									//component[19]
addComponent(rectHard(1220,400,100,30,"white",1,"black",2));								//component[20]
addComponent(labelUI(1220,390,20,"","var x","black"));									    //component[21]
addComponent(labelUI(1242,422,20,"","太郎","black"));										//component[22]
addComponent(labelUI(924,168,20,"","太郎","red"));											//component[23]
addComponent(labelUI(924,218,20,"","花子","red"));											//component[24]
addComponent(labelUI(1242,82,20,"","world","black"));										//component[25]


jsText[3].attr("text",["　alert(\'Hello,\'　+　","who","　+　\'!\');"]);
jsText[6].attr("text",["function  someone(","x","){"]);
addShadow(component[18]);

function supplement(mode){
	if(mode==1){
		highlight(jsText[3].selectAll("tspan")[1]);
		highlight(jsText[6].selectAll("tspan")[1]);
	} else {
		defuse(jsText[3].selectAll("tspan")[1]);
		defuse(jsText[6].selectAll("tspan")[1]);
	}
}

//毎フレーム呼ばれる関数
function update(){
	if(started==true){
		if(count%3==0){
			//checkText();	//テキスト等の要素が枠内にあるかチェック
		}
		if(count%120==0&&auto==true){
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
			setArrow(htmlText[6],component[0],0);
			setVisible(1,1);
			showArrow(0);
			highlight(htmlText[6]);
			break;
		case 1:
			setArrow(jsTitle,component[0],0);
			defuse(htmlText[6]);
			for(i=0;i<9;i++){
				highlight(jsText[i]);
			}
			supplement(1);
			setVisible(1,0);
			setVisible(2,1);
			break;
		case 2:
			setVisible(2,0);
			hideArrow(0);
			for(i=0;i<9;i++){
				defuse(jsText[i]);
			}
			defuse(jsTitle);
			supplement(2);
			for(i=3;i<11;i++){
				setVisible(i,1);
			}
			break;
		case 3:
			for(i=11;i<18;i++){
				setVisible(i,1);
			}
			for(i=10;i<14;i++){
				highlight(htmlText[i]);
			}
			setArrow(htmlText[10],component[17],0);
			showArrow(0);
			break;
		case 4:
			component[5].attr("text",who);
			component[25].attr("text",who);
			for(i=10;i<14;i++){
				defuse(htmlText[i]);
			}			
			absoluteArrow(900,120,800,385,0);
			showArrow(0);
			highlight(component[14].selectAll("tspan")[1]);
			highlight(jsText[3]);
			highlight(jsText[3].selectAll("tspan")[1]);
			highlight(component[11]);
			break;
		case 5:
			defuse(component[14].selectAll("tspan")[1]);
			defuse(jsText[3]);
			defuse(component[11]);
			absoluteArrow(1250,90,780,400,0);
			showArrow(0);
			highlight(component[3]);
			highlight(component[5]);
			if(execMode!=0||action!=0){
				component[index+8].attr("fill","black");
				component[index+8].attr("filter",null);
				setVisible(index+8,1);
			} else {
				setVisible(25,1);
			}
			trans(component[5],750,400,400);
			addShadow(component[5]);
			break;
		case 6:
			setArrow(jsText[3],component[18],0);
			component[19].attr("text","Hello," + who);
			setVisible(19,1);
			setVisible(18,1);
			phase = 16;
			break;
		case 7:
			for(i=10;i<14;i++){
				defuse(htmlText[i]);
			}
			if(execMode==1||action==1){
				y = 170;
				index = 15;
			}
			if(execMode==2||action==2){
				y = 220;
				index = 16;
			}
			absoluteArrow(870,y,700,475,0);
			showArrow(0);
			highlight(component[index-3]);
			for(i=1;i<4;i++){
				highlight(component[index].selectAll("tspan")[i]);
			}
			setVisible(index+8,1);
			break;
		case 8:
			if(execMode==1||action==1){
				who = "太郎";
			}
			if(execMode==2||action==2){
				who = "花子";
			}
			absoluteArrow(950,y,750,475,0);
			defuse(component[index].selectAll("tspan")[1]);
			defuse(component[index].selectAll("tspan")[3]);
			highlight(jsText[6].selectAll("tspan")[1]);
			trans(component[index+8],720,475,400);
			addShadow(component[index+8]);
			break;
		case 9:
			defuse(jsText[6].selectAll("tspan")[1]);
			defuse(component[index-3]);
			absoluteArrow(760,475,1250,430,0);
			for(i=20;i<23;i++){
				if(i!=22){
					setVisible(i,1);
				}
			}
			trans(component[index+8],1300,422,400);
			break;
		case 10:
			defuse(component[index+8]);
			hideArrow(0);
			highlight(component[20]);
			component[22].attr("text",who);
			trans(component[index+8],component[22].attr("x"),component[22].attr("y"),400);
			setVisible(index+8,0);
			setVisible(22,1);
			break;
		case 11:
			absoluteArrow(1250,430,690,500,0);
			showArrow(0);
			setVisible(index+8,1);
			trans(component[index+8],680,485,400);
			break;
		case 12:
			absoluteArrow(690,500,1250,90,0);
			trans(component[index+8],1300,90,400);
			break;
		case 13:
			defuse(component[20]);
			hideArrow(0);
			highlight(component[3]);
			setVisible(index+8,0);
			component[5].attr("text",who);
			component[25].attr("text",who);
			trans(component[index+8],component[5].attr("x"),component[5].attr("y"),400);
			break;
		case 15:
			alert("アニメーションの終わりです");
			break;
		case 17:
			setVisible(18,0);
			setVisible(19,0);
			defuse(component[5]);
			defuse(component[3]);
			for(i=0;i<component.length;i++){
				component[i].attr("x",componentPosX[i]);
				component[i].attr("y",componentPos[i]);
				component[i].attr("filter",null);
			}
			hideArrow(0);
			supplement(0);
			break;
	}
	phase++;									
}

function branch(){
	console.log(phase,action)
	if(execMode!=0||action==2){
		switch(phase){
			case 4: 
				phase = 7;
				break;
			case 14: 
				phase = 4;
				break;
			case 18: 
				phase = 15;
				break;
		}
	} else {
		if(action==0){
			switch(phase){
				case 18: 
					phase = 7;
					action++;
					break;
			}
		}
		if(action==1){
			switch(phase){
				case 14: 
					phase = 4;
					break;
				case 18:
					phase = 7;
					action++;
					break;
			}
		}
	} 
}

/*
リセット関数
リセットボタンに反応
*/
function reset(){
	defuse(jsText[3].selectAll("tspan")[1]);
	defuse(component[14].selectAll("tspan")[1]);
	defuse(component[15].selectAll("tspan")[2]);
	defuse(component[16].selectAll("tspan")[2]);
	who = "world";
	count=0;
	phase=0;
	started=false;
	action=0;
	component[25].attr("text",who);
	component[5].attr("text",who);
	resetAll();
}