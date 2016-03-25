/*
このファイルを読み込む場合は、どこかにupdate関数を置いてください
update関数は毎フレーム読み込まれます
*/

var started=false;
var auto=false;
var pid = 0;

function animationExec(){
	pid = requestAnimationFrame(animationExec)
	if(started==true){
		update();
	}
}

function autoExec(){
	if(started==false){
		started = true;
		auto = true;
		animationExec();
	}
}

function reset(){
	count = 0;
	phase = 0;
	started = false;
	cancelAnimationFrame(pid);
	resetAll();
}

function stepExec(){
	draw();
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