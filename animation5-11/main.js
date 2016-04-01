//初期設定
var count=0;
var phase=0;

//コード追加
parseText(0,'<!DOCTYPE html>\n<html>\n \n  <head>\n    <meta charset="utf-8">\n    <title>練習問題05-11</title>\n  </head>\n \n  <body>\n    <h1>　　　　　　　　　　　</h1>\n    <input type="button" value="　　　　　　　" \nonclick="alert(\'　　　　　　\');">\n  </body>\n \n</html>');
//parseText(1,'function　student()　{\n　　var　f　=　\'不明\';\n　　var　x　=　document.getElementsByName(\'faculty\');\n　　var　i　=　0;\n　　while　(i　<　x.length)　{\n　　　　if　(x[i].checked)　{\n　　　　　　f　=　x[i].value;\n　　　　}\n　　　　i　=　i+1;\n　　}\n　　alert(f);\n}');

//フレーム設定
setFrame(1,1,0);

//コードをセット
setText();

//フレーム名を設定
setLabels("ex05-11.html","file:///hoge/ex05-11.html","");

/*
コンポーネント追加
上から順に配列に格納していく
component[num]で参照できる
後に書いたものほど手前に表示される点に注意
*/
addComponent(labelUI(630,80,25,"","イベントハンドラの練習","black"));		//component[0]
addComponent(rectSoft(630,130,100,50,"#ccc",0,"black",1));				//component[1]
addComponent(labelUI(635,160,15,"","ここをクリック","black"));				//component[2]
addComponent(rectDot(885,115,100,70,"#fff",1,"black",1));				//component[3]
addComponent(labelUI(895,160,23,"","onclick=alert(\"　\");","black"));	//component[4]
addComponent(labelUI(1040,160,23,"","","black"));						//component[5]
addComponent(rectHard(760,160,130,70,"#fff",0,"black",1));				//component[6]
addComponent(labelUI(765,202,20,"","Hello,World","black"));				//component[7]
addComponent(labelUI(500,100,50,"",["tspan","の","テスト"],"black",1));

/*
リレーション設定
第一引数に、onclick=alert("　　　")のような空白を含むテキスト
第二引数に、クオーテーションの中に入れたいテキスト
中身に応じて、空白部分が伸びる
*/
reQuotation(component[4],component[5]);
reQuotation(component[6],component[7]);
reQuotation(component[3],component[4]);
reQuotation(component[1],component[2]);

/*
可変コンポーネント追加
第二引数で指定したテキストボックスの内容が反映されるようになる
*/
addVariable(component[0],0);
addVariable(component[2],1);
addVariable(component[5],2);
addVariable(component[7],2);

//影指定
addShadow(component[4]);
addShadow(component[5]);
addShadow(component[6]);

/*
テキストボックス作成
引数はx,y,width,初期値,対応する行,対象コード(0:html,1:js)
*/
setBox(105,420,162,"イベントハンドラの練習",htmlText[9],0);
setBox(260,442,103,"ここをクリック",htmlText[10],0);
setBox(167,470,90,"Hello,world!",htmlText[11],0);

//毎フレーム呼ばれる関数
function update(){
	if(started==true){
		if(count%3==0){
			checkText();	//テキスト等の要素が枠内にあるかチェック
		}
		if(count%60==0&&phase<5&&auto==true){
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
	switch(phase){
		case 0:
			showArrow();							//矢印表示
			highlight(htmlText[9]);					//テキストハイライト
			setVisible(0,1);						//コンポーネント表示
			setArrow(htmlText[9],component[0]);		//矢印位置調整
			break;
		case 1:
			highlight(htmlText[10]);
			highlight(htmlText[11]);
			defuse(htmlText[9]);					//テキストハイライト解除
			setVisible(1,1);
			setVisible(2,1);
			setVisible(4,1);
			setVisible(5,1);
			setVisible(3,1);
			setArrow(htmlText[10],component[1]);
			if(Number(component[1].attr("width"))<30){
				component[1].attr("width",30);
			}
			break;
		case 2:
			defuse(htmlText[10]);
			defuse(htmlText[11]);
			highlight(component[1]);
			highlight(component[5]);
			hideArrow();							//矢印非表示
			break;
		case 3:
			defuse(component[1]);
			setVisible(6,1);
			setVisible(7,1);
			setArrow(component[5],component[7]);
			showArrow();
			if(Number(component[6].attr("width"))<70){
				component[6].attr("width",70);
			}
			//scroll(1);								//ブラウザスクロール
			break;
		case 4:
			alert("アニメーションが終了しました");
			end();									//アニメーション終了
			break;
	}
	phase++;									
}

/*
リセット関数
リセットボタンに反応
*/
function reset(){
	texts[0]='<!DOCTYPE html>\n<html>\n \n  <head>\n    <meta charset="utf-8">\n    <title>練習問題05-11</title>\n  </head>\n \n  <body>\n    <h1>　　　　　　　　　　　</h1>\n    <input type="button" value="　　　　　　　" \nonclick="alert(\'　　　　　　\');">\n  </body>\n \n</html>';
	hideArrow(0);
	count=0;
	phase=0;
	started=false;
	resetAll();
}