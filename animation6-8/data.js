
function insertFirefoxImage(){
    var redCircle, yellowCircle, greenCircle;
    var i = SVG.image("Firefox-logo.png", 435, 140, 150, 150).attr({ opacity: 1 });
    var x = 300, y = 50, r = 5;
    redCircle = SVG.circle(x + 20, y + 16, r).attr({ fill: "#FA5858", opacity: 1 });
    yellowCircle = SVG.circle(x + 42, y + 16, r).attr({ fill: "#FFFF00", opacity: 1 });
    greenCircle = SVG.circle(x + 64, y + 16, r).attr({ fill: "#2EFE2E", opacity: 1 });
    SVGAry.push(i);            SVGIDLog.push(["firefox", "png"]);
    SVGAry.push(redCircle);    SVGIDLog.push(["redCircle", "circle"]);
    SVGAry.push(yellowCircle); SVGIDLog.push(["yellowCircle", "circle"]);
    SVGAry.push(greenCircle);  SVGIDLog.push(["greenCircle", "circle"]);
}

function setupAllSVGData(){
    /* browser */
    setBrowser(300, 50, 430, 280, "file:///hoge/ex06-8.html", [ ]);
    insertFirefoxImage();
    /* url */
    
}
