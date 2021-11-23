var RADIO = 250;
var POINTS = 150;
XSIZE = 2;

var coordsInt = generatePairs(POINTS, XSIZE);

var grades = 360/POINTS
var coordinates = [];
let randomColor = '#' + Math.random().toString(16).slice(2, 8);

for(var i=0; i< POINTS; i++){
  	x = Math.cos(0.0175*grades*i-1.575) * RADIO;
  	y = Math.sin(0.0175*grades*i-1.575) * RADIO;

  	coordinates.push({'x':(RADIO+x),'y':(RADIO+y)});
}

if(localStorage.getItem('n') === null) localStorage.setItem('n', 0);

var canvas = new fabric.StaticCanvas('c');

n = parseInt(localStorage.getItem('n'));

document.getElementById("coord").innerHTML = coordsInt[n][0] + " - " + coordsInt[n][1];
document.getElementById("progress").innerHTML = (n+1) + " de " + coordsInt.length
for(let i = 0; i <= n; i++) drawLine(i);

$("body").click(function(e) {
    var divWidth = $("body").width();        
    var clickX = e.clientX;
    if (clickX > divWidth/2) {
    	if((n + 1) < coordsInt.length){
    		n += 1;
    		drawLine(n);
    	}
    } else {
    	if((n - 1) >= 0){
    		n -= 1;
    		canvas._objects.pop();
    		canvas.renderAll();
    	}
    }
    localStorage.setItem('n', n)
    document.getElementById("coord").innerHTML = coordsInt[n][0] + " - " + coordsInt[n][1];
    document.getElementById("progress").innerHTML = (n+1) + " de " + coordsInt.length
});


function drawLine(n){
	var c1 = [coordinates[coordsInt[n][0]].x, coordinates[coordsInt[n][0]].y];
  	var c2 = [coordinates[coordsInt[n][1]].x, coordinates[coordsInt[n][1]].y];
	//var line = new fabric.Line([c1[0],c1[1],c2[0],c2[1]], {strokeWidth: 1, stroke: '#39ff14'});
	var line = new fabric.Line([c1[0],c1[1],c2[0],c2[1]], {strokeWidth: 1, stroke: randomColor});
  	canvas.add(line);
}

function generatePairs(n, m){
	let pairs = [];
	let pairsChecker = {}

	for(let i = 0; i < n; i++){
		a = (i * m) % n;
		if(a == i) continue;
		pair = [i, a]
		if(a < i) pair = [a, i]
		if(pairsChecker[""+pair] === undefined){
			pairsChecker[""+pair] = true;
			pairs.push(pair);
		}
	}
	return pairs.sort(sortPairs);
}


function sortPairs(a, b) {
	if(a[0] < b[0]) return -1;
	if(a[0] === b[0] && a[1] < b[1]) return -1;
	if(a[0] === b[0] && a[1] > b[1]) return 1;
	if(a[0] > b[0]) return 1;
}
