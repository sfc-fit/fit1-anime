//var arrow=line(0,0,0,0,3,"#e8383d",1);
var markerShape=new Array();
var arrow=new Array();
var marker=new Array();

for(var i=0;i<5;i++){
	markerShape[i]=svg.path("M0,0L8,5L0,10L4,5z");
	marker[i]=markerShape[i].marker(0,0,10,10,5,5);
	marker[i].attr({
		"fill":"#e8383d",
		"opacity":0
	});
	arrow[i]=line(0,0,0,0,1.5,"#e8383d",1);
	arrow[i].attr({
		markerStart: "none",
		markerMid: "none",
		markerEnd: marker[i],
		opacity:0,
		zIndex:3
	});
}

var autoButton=circleUI(170,60,35,"#0073a8",1,"black",0);
var aheadButton=circleUI(270,60,35,"#65ab31",1,"black",0);
var resetButton=circleUI(370,60,35,"#f3981d",1,"black",0);
var autoText=labelUI(149,68,20,"","自動","white");
var aheadText=labelUI(249,68,20,"","手動","white");
var resetText=labelUI(340,68,20,"","最初へ","white");

autoButton.mousedown(function(){
	repaint(autoButton,"#193f60",1,100);
})
autoButton.mouseup(function(){
	//repaint(autoButton,"#0073a8",1,100);
	auto=true;
	started = true;
	exec();
})

aheadButton.mousedown(function(){
	repaint(aheadButton,"#417038",1,100);
})
aheadButton.mouseup(function(){
	auto=false;
	ahead();
})

resetButton.mousedown(function(){
	repaint(resetButton,"#bc611e",1,100);
})
resetButton.mouseup(function(){
	reset();
})

svg.mouseup(function(){
	repaint(autoButton,"#0073a8",1,100);
	repaint(aheadButton,"#65ab31",1,100);
	repaint(resetButton,"#f3981d",1,100);
})

//以下、ラジオボタンセット
var radioPanel=circleUI(507,63,63,"#303030",1,"black",0);
var allCheck=circleUI(480,20,8,"white",1,"#303030",2);
var taroCheck=circleUI(480,60,8,"white",1,"#303030",2);
var hanakoCheck=circleUI(480,100,8,"white",1,"#303030",2);
var allText=labelUI(500,25,15,"","全編","#fff");
var taroText=labelUI(500,66,15,"","太郎編","#fff");
var hanakoText=labelUI(500,106,15,"","花子編","#fff");
repaint(allCheck,"aquamarine",1,0);

allCheck.mousedown(function(){
	repaint(allCheck,"aquamarine",1,100);
	repaint(taroCheck,"#fff",1,100);
	repaint(hanakoCheck,"#fff",1,100);
	execMode=0;
})

taroCheck.mousedown(function(){
	repaint(taroCheck,"aquamarine",1,100);
	repaint(allCheck,"#fff",1,100);
	repaint(hanakoCheck,"#fff",1,100);
	execMode=1;
})

hanakoCheck.mousedown(function(){
	repaint(hanakoCheck,"aquamarine",1,100);
	repaint(taroCheck,"#fff",1,100);
	repaint(allCheck,"#fff",1,100);
	execMode=2;
})