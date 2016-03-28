
function insertFirefoxImage(){
    var redCircle, yellowCircle, greenCircle;
    var i = SVG.image("Firefox-logo.png", 410, 120, 150, 150).attr({ opacity: 1 });
    var x = 300, y = 50, r = 5;
    redCircle = SVG.circle(x + 20, y + 16, r).attr({ fill: "#FA5858", opacity: 1 });
    yellowCircle = SVG.circle(x + 42, y + 16, r).attr({ fill: "#FFFF00", opacity: 1 });
    greenCircle = SVG.circle(x + 64, y + 16, r).attr({ fill: "#2EFE2E", opacity: 1 });
    SVGAry.push(i); SVGPushLog.push(["firefox", "png"]);
    SVGAry.push(redCircle);    SVGPushLog.push(["redCircle", "circle"]);
    SVGAry.push(yellowCircle); SVGPushLog.push(["yellowCircle", "circle"]);
    SVGAry.push(greenCircle);  SVGPushLog.push(["greenCircle", "circle"]);
}

