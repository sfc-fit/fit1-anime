
var t1, t2;
console.log(t1 = new Date());

function sleep(time, callback){
    setTimeout(callback, time);
}

sleep(500, function (){
    // console.log("2");
    console.log(t2 = new Date());
    console.log(t2 - t1);
});
