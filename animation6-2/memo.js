
// MEMO:
// 「最初から」の実装
var obj = SVG.circle(10, 20, 5);
console.log(obj.attr("cx"));

// erase Chrome'character "l"
var tmp = searchSVGElementIndex("google", "text", 1);
var x = 300, y = 50, width = 400, height = 250;
// setChromeBrowser("chrome", 300, 50, 400, 250, "URL:"); // no url.
var googleColor = ["#0080FF", "#FA5858", "#FFFF00", "#0080FF", "#FA5858"];
var google = SVG.text(x + (width / 4) + 10, y + 21 + (height / 2), ["G", "o", "o", "g", "e"]).attr({ strokeWidth: 3, fontSize: 50, opacity: 1 });
SVGAry[tmp];
for(var i = 0; i < googleColor.length; i++){
    google.selectAll("tspan")[i].animate({ fill: googleColor[i], stroke: googleColor[i]}, 400);
}
SVGAry[tmp] = google;

