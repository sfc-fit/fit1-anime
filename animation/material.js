/*
このファイルを読み込む場合は、どこかにupdate関数を置いてください
update関数は毎フレーム読み込まれます
*/

var started=false;
var auto=false;
document.getElementById("resetButton").style.opacity=0;
document.getElementById("aheadButton").style.opacity=0;

function exec(){
	started=true;
	document.getElementById("resetButton").style.opacity=1;
	document.getElementById("aheadButton").style.opacity=1;
	checkVariable();
	if(document.getElementById("autoBox").checked==false){
		draw();
	}
	parent();
}

function replay(){
	started=false;
	document.getElementById("resetButton").style.opacity=0;
	document.getElementById("aheadButton").style.opacity=0;
	reset();
}

function ahead(){
	draw();
}

//updata関数を呼び続ける
function parent(){
	if(document.getElementById("autoBox").checked==false){
		auto=false;
	}
	else{
		auto=true;
	}

	if(started==true){
		requestAnimationFrame(parent);
		requestAnimationFrame(update);
	}
}

//textを出力し改行
function line(chara){
	document.write(chara+"<br>");
}

//ローカルストレージに保存
function set(key,value){
	window.localStorage.setItem(key,value);
}

//ローカルストレージから読み込み
function get(key){
	window.localStorage.getItem(key);
}