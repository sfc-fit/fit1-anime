/*
このファイルを読み込む場合は、どこかにupdate関数を置いてください
update関数は毎フレーム読み込まれます
*/

var started=false;
var auto=false;
var called=false;
var limitCount=0;
/*document.getElementById("resetButton").style.opacity=0;
document.getElementById("aheadButton").style.opacity=0;*/

function exec(){
	started=true;
	//document.getElementById("aheadButton").style.opacity=1;
	if(phase==0&&called==false){
		fixBox();
		checkVariable();
		parent();
		called=true;
		/*if(document.getElementById("autoBox").checked==false){
			draw();
		}*/
	}
}

function replay(){
	started=false;
	document.getElementById("resetButton").style.opacity=0;
	document.getElementById("aheadButton").style.opacity=0;
	reset();
}

function ahead(){
	/*if(started==false){
		fixBox();
		checkVariable();
		started=true;
	}*/
	if(called==false){
		fixBox();
		checkVariable();
		parent();
		called=true;
	}
	if(limitCount==0){
		draw();
		limitCount=60;
	}
}

//updata関数を呼び続ける
function parent(){
	/*if(document.getElementById("autoBox").checked==false){
		auto=false;
	}
	else{
		auto=true;
	}*/
	requestAnimationFrame(parent);
	if(started==true){
		requestAnimationFrame(update);
	}
	if(limitCount>0){
		limitCount--;
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