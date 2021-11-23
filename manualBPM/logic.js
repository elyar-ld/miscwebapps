var initialTime = 0;
var values = [];
		
function measure(){
	timeAux = (new Date()).getTime();
	if(initialTime !== 0){
		values.push(60/((timeAux - initialTime)/1000));
		if(values.length > 30) values = values.slice(1,30);
		let sum = values.reduce((previous, current) => current += previous);
		let avg = sum / values.length;
		document.getElementById("measure").innerHTML = avg.toFixed(2);
	}
	initialTime = timeAux;
	chngimg();
}

function chngimg() {
	var img = document.getElementById('metronome');
	if ((img.src).indexOf('metronome.png')!=-1) img.src  = 'imgs/metronome2.png';
	else img.src  = 'imgs/metronome.png';
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('service-worker.js')
			.then(function() { console.log('Service Worker Registered'); });
}