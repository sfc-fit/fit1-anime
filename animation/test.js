
function bloodtype(){
	var point=0;
	var type=["O","A","B","AB"];
	var inputs=new Array();
	inputs[0]=document.getElementById("a").value;
	inputs[1]=document.getElementById("b").value;

	for(var i=0;i<inputs.length;i++){
		if(inputs[i]=="yes"){
			point+=i+1;
		}
	}

	alert("あなたは"+type[point]+"型です");
}

generate(500,100,200,200,"white",1,"black",1);