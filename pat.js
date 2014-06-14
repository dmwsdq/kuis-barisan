// there are 14 functions in pat object representing different patterns,
//  each returning random barisan with its determined pattern

var pat = {
	"aritmetik":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-10,'ma':-1,'p':0.3},{'mi':1,'ma':10,'p':0.3},{'mi':11,'ma':20,'p':0.2},{'mi':21,'ma':100,'p':0.2}]; 
		var b = wRand(mimaps); 
		var r = [a];
		for (var i = 0; i < n-1; i++){
			r.push((r[i]+b));}
		return r;}, 
	"geometrik":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}]; 
		var ras = wRand(mimaps); 
		var r = [a];
		for (var i = 0; i < n-1; i++){
			r.push((r[i]*ras));}
		return r;},
	"aritgeo":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-1,'p':0.2},{'mi':2,'ma':5,'p':0.4},{'mi':6,'ma':9,'p':0.2},{'mi':10,'ma':10,'p':0.2}]; 
		var ras    = wRand(mimaps);
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}];
		var b      = wRand(mimaps);
		var r = [a];
		for (var i = 0; i < n-1; i++){
			r.push(((r[i]+b)*ras));}
		return r;},  
	"geoarit":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-1,'p':0.2},{'mi':2,'ma':5,'p':0.4},{'mi':6,'ma':9,'p':0.2},{'mi':10,'ma':10,'p':0.2}]; 
		var ras    = wRand(mimaps);
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}];
		var b      = wRand(mimaps);
		var r = [a];
		for (var i = 0; i < n-1; i++){
			r.push((r[i]*ras+b));}
		return r;},  
	"aritmetiksarang":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-1,'p':0.2},{'mi':2,'ma':5,'p':0.4},{'mi':6,'ma':9,'p':0.2},{'mi':10,'ma':10,'p':0.2}]; 
		var b = wRand(mimaps);
		var c = wRand(mimaps);
		var r  = [a];
		var rx = [b];
		for (var ix = 0; ix < n-2; ix++){
			rx.push((rx[ix]+c));}
		for (var i = 0; i < n-1; i++){
			r.push((r[i]+rx[i]));}
		return r;},
	"geometriksarang":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}]; 
		var b = wRand(mimaps);
		var c = wRand(mimaps);
		var r  = [a];
		var rx = [b];
		for (var ix = 0; ix < n-2; ix++){
			rx.push((rx[ix]*c));}
		for (var i = 0; i < n-1; i++){
			r.push((r[i]*rx[i]));}
		return r;},
	"aritgeosarang":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-1,'p':0.2},{'mi':2,'ma':5,'p':0.4},{'mi':6,'ma':9,'p':0.2},{'mi':10,'ma':10,'p':0.2}]; 
		var ras    = wRand(mimaps);
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}];
		var ageo   = wRand(mimaps);
		var r  = [a];
		var rx = [ageo];
		for (var ix = 0; ix < n-2; ix++){
			rx.push((rx[ix]*ras));}
		for (var i = 0; i < n-1; i++){
			r.push((r[i]+rx[i]));}
		return r;},
	"geoaritsarang":function(){
		var a = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-1,'p':0.2},{'mi':2,'ma':5,'p':0.4},{'mi':6,'ma':9,'p':0.2},{'mi':10,'ma':10,'p':0.2}]; 
		var aarit    = wRand(mimaps);
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}];
		var b   = wRand(mimaps);
		var r  = [a];
		var rx = [aarit];
		for (var ix = 0; ix < n-2; ix++){
			rx.push((rx[ix]+b));}
		for (var i = 0; i < n-1; i++){
			r.push((r[i]*rx[i]));}
		return r;},
	"slangslingaa":function(){
		var aa = makeA(); var ab = makeA(); var n = makeN();
		var mimaps = [{'mi':-10,'ma':-1,'p':0.3},{'mi':1,'ma':10,'p':0.3},{'mi':11,'ma':20,'p':0.2},{'mi':21,'ma':100,'p':0.2}]; 
		var ba = wRand(mimaps); 
		var mimaps = [{'mi':-10,'ma':-1,'p':0.3},{'mi':1,'ma':10,'p':0.3},{'mi':11,'ma':20,'p':0.2},{'mi':21,'ma':100,'p':0.2}]; 
		var bb = wRand(mimaps); 
		var r = [aa,ab];
		for (var i = 2; i < n; i+=2){
			r.push((r[i-2]+ba));
			r.push((r[i-1]+bb));}			
		return r;},
	"slangslinggg":function(){
		var aa = makeA(); var ab = makeA(); var n = makeN();
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}]; 
		var rasa = wRand(mimaps); 
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}]; 
		var rasb = wRand(mimaps); 
		var r = [aa,ab];
		for (var i = 2; i < n; i+=2){
			r.push((r[i-2]*rasa));
			r.push((r[i-1]*rasb));}			
		return r;},
	"slangslingga":function(){
		var aa = makeA(); var ab = makeA(); var n = makeN();
		var mimaps = [{'mi':-10,'ma':-1,'p':0.3},{'mi':1,'ma':10,'p':0.3},{'mi':11,'ma':20,'p':0.2},{'mi':21,'ma':100,'p':0.2}]; 
		var b = wRand(mimaps); 
		var mimaps = [{'mi':-5,'ma':-2,'p':0.3},{'mi':-9,'ma':-6,'p':0.1},{'mi':-10,'ma':-10,'p':0.1},{'mi':2,'ma':5,'p':0.3},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}]; 
		var ras = wRand(mimaps); 
		var r = [aa,ab];
		if (wRand([{'f':true,'p':0.5},{'f':false,'p':0.5}])){
			for (var i = 2; i < n; i+=2){
				r.push((r[i-2]+b));
				r.push((r[i-1]*ras));}			
		} else {
			for (var i = 2; i < n; i+=2){
				r.push((r[i-2]*ras));
				r.push((r[i-1]+b));}
		}
		return r;},
	"fibonacci":function(){
		var a = makeA(); var b = makeA(); var n = makeN();
		var r = [a,b];
		for (var i = 2; i < n; i++){
			r.push((r[i-2]+r[i-1]));}
		return r;}, 
	"fibonaccix":function(){
		var n = makeN();
		var mimaps = [{'mi':1,'ma':5,'p':0.9},{'mi':6,'ma':7,'p':0.1}];
		var a = wRand(mimaps);
		var b = wRand(mimaps);
		var r = [a,b];
		for (var i = 2; i < n; i++){
			r.push((r[i-2]*r[i-1]));}
		return r;}, 
	"kuadrat":function(){
		var mimaps = [{'mi':5,'ma':5,'p':1}];
		var n = wRand(mimaps);
		var mimaps = [{'mi':2,'ma':5,'p':0.9},{'mi':6,'ma':9,'p':0.1},{'mi':10,'ma':10,'p':0.1}];
		var a = wRand(mimaps);
		var r = [a];
		for (var i = 1; i < n; i++){
			r.push((r[i-1]*r[i-1]));}
		return r;}
};

