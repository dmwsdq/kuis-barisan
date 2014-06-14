// SETTINGS
var N_SOAL = 10;
var N_OPSI = 4;
var WAKTU = 60;
var TEKS_INTRO = 'Kuis Barisan adalah sebuah permainan yang menguji insting anda tentang barisan bilangan. Anda akan dihadapkan pada '+N_SOAL+' soal. Masing-masing memiliki '+N_OPSI+' pilihan jawaban yang harus anda pilih dalam waktu '+ WAKTU +' detik. <br /> Info: Crash mungkin terjadi. Gunakan Chrome agar apabila terjadi crash hanya satu tab ini yang terpengaruh. Jangan refresh agar permainan tidak berulang. <br />Kontak: dar.web.id @dmwsdq';
var TEKS_TANYA = 'Manakah angka yang tepat untuk melengkapi barisan di atas?';

// DON'T ALTER THESE
var standing = {};
var question = [];
var counter;

// GENERAL FUNCTIONS 

// clone things (breaking references) using JSON
function clone(i){
	return JSON.parse ( JSON.stringify (i) );
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
// returns shuffled array
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// randomizing will reverse or not reverse array
function randRev(a){
	if ( Math.random() < 0.5 ){
		return a;
	} else {
		return a.reverse();
	}
}

// randomizing will multiply by -1 or not array
function rSign(a){
	if ( Math.random() < 0.5 ){
		return a;
	} else {
		return a*-1;
	}
}

// randomizing between mix and max
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// randomizing, weighted, expressed as mimaps (mins-maxes-possibilities), 
// eg: [{'mi':1,'ma':3,'p':0.7},{'mi':4,'ma':10,'p':0.3}]
// order doesn't matter, just make sure that total of p = 1
function wRand(mimaps){
	var target = Math.random();
	var count = 0;
	for (var i = 0; i < mimaps.length; i++ ){
		count += mimaps[i]['p'];
		if (count > target){
			return ( rand(mimaps[i]['mi'],mimaps[i]['ma']) || mimaps[i]['f'] );
		}
	}
	return false;
}

// returning a random number with the same digit with number supplied
function rSameDig(v) {
	var temp = clone(v);
	if (v < 0) {temp = temp*-1;}
  	var basetenlog =  Math.log(temp) / Math.LN10;
  	var max = Math.pow(10,Math.ceil(basetenlog))-1; 
  	var min = Math.pow(10,Math.floor(basetenlog)); 
  	if (v < 0) {return rSign(rand(min, max));}
  	return rand(min, max);
}


// to start the timer -> do startTimer(howmanysecs)
// taken from anonymous - stackoverflow
function startTimer(secs){
	count=secs;
	counter=setInterval(timer, 1000);
	return;
}

function timer(){
  count=count-1;
  if (count === 5) {
  	 toastr.warning('5 detik lagi');
  }
  if (count <= 0){
  	 clearInterval(counter);
     $("#timer").html("0");
  	 var thisq = question[standing['u']]; 
     toastr.error('WAKTU HABIS! Jawaban: '+ thisq['v'] +'!<br /><br />'+thisq['s']+' adalah '+ thisq['b'] + '<br /><br />Tetap Semangat!');
     standing['u']+=1;
     standing['s']+=1;
   	 $("#container").append("<button type='button' class='btn' id='lanjut' onclick='displayBoard()'>LANJUT</div>"); 
     return;
  }
  //Do code for showing the number of seconds here
  document.getElementById("timer").innerHTML=count; 
} 

// UNDERLYING FUNCTIONS for pat.js

// a should be more likely between 1-10, but sometimes it's 11-20, less often 21-100
function makeA(){
	var mimaps = [{'mi':1,'ma':10,'p':0.5},{'mi':11,'ma':20,'p':0.3},{'mi':21,'ma':100,'p':0.2}];
	return wRand(mimaps);
}

// n should be more likely between 5-7, but sometimes it's any other int below 10
function makeN(){
	var mimaps = [{'mi':5,'ma':7,'p':0.7},{'mi':8,'ma':10,'p':0.3}];
	return wRand(mimaps);
}

// INITIALIZATIONS

// randomly choose among fxs in pat.js
function choosePat(){
	mimaps = [{'f':"aritmetik",'p':0.30},
			  {'f':"geometrik",'p':0.30},
			  {'f':"aritgeo",'p':0.01},
			  {'f':"geoarit",'p':0.01},
			  {'f':"aritmetiksarang",'p':0.01},
			  {'f':"geometriksarang",'p':0.01},
			  {'f':"aritgeosarang",'p':0.01},
			  {'f':"geoaritsarang",'p':0.01},
			  {'f':"slangslingaa",'p':0.15},
			  {'f':"slangslinggg",'p':0.01},
			  {'f':"slangslingga",'p':0.01},
			  {'f':"fibonacci",'p':0.15},
			  {'f':"fibonaccix",'p':0.01},
			  {'f':"kuadrat",'p':0.01},
			  ];
	return wRand(mimaps);
}

// returning the name of baris
function nameBaris(b){
	switch(b){
		case "aritmetik"      : return "Barisan Aritmetika biasa."; break;
		case "geometrik"      : return "Barisan Geometri biasa."; break;
		case "aritgeo"        : return "Pola bilangan dijumlah/dikurangi, kemudian dikali/dibagi"; break;
		case "geoarit"        : return "Pola bilangan dikali/dibagi, kemudian dijumlah/dikurangi"; break;
		case "aritmetiksarang": return "Barisan aritmetika bertingkat."; break;
		case "geometriksarang": return "Barisan geometri bertingkat."; break;
		case "aritgeosarang"  : return "Barisan aritmetika yang bedanya merupakan barisan geometri."; break;
		case "geoaritsarang"  : return "Barisan geometri yang rasionya merupakan barisan aritmetika."; break;
		case "slangslingaa"   : return "Pola selang-seling dua barisan aritmetika biasa.";  break;
		case "slangslinggg"   : return "Pola selang-seling dua barisan geometri biasa.";  break;
		case "slangslingga"   : return "Pola selang-seling barisan geometri biasa dan aritmetika biasa.";  break;
		case "fibonacci"      : return "Barisan Fibonacci biasa."; break;
		case "fibonaccix"     : return "Seperti barisan Fibonacci, tapi berupa perkalian."; break;
		case "kuadrat"        : return "Barisan bilangan kuadrat."; break;
		default				  : return "Error. Barisan tak dikenali."; break;
	}
}

// blank which takes the position along the barisan
function makeBlank(n){
	return rand(0,n-1);	
}

// makeJ
function makeJ(v){
	var j = [v];
	while (j.length < N_OPSI){
		var newJ = rSameDig(v);
		if (j.indexOf(newJ) < 0) {
			j.push(newJ);
		}
	}
	shuffle(j);
	return j;
}

// make question
function makeQuestion(){
	var question = [];
	while (question.length < N_SOAL){
		var q = {'b':'','s':[],'j':[],'blank':0,'k':0,'v':0};
		var temp = choosePat(); 
		q['b']   = nameBaris(temp);
		q['s']   = randRev(pat[temp]());
		q['blank']   = makeBlank(q['s'].length);
		q['v']   = q['s'][q['blank']];
		q['j']   = makeJ(q['v']);
		q['k']   = q['j'].indexOf(q['v']);
		question.push(q);
	}
	return question;
}

// make standing
function makeStanding(){
	return {"n":"","s":0,"b":0,"u":0};
}

// tanyakan nama, dan merandom question
function inisialisasi(){
	toastr.info('Hai! Mari main!');
	$("#container").html("");
	$("#container").append("<span align='center'> NAMA  </span> <input type='text' placeholder='Nama Kamu' id='namaIN'> <br /> <br /> <button type='button' class='btn' id='submitIN'>MULAI</button>");
	$("#container").append("<br /> <br /> <div id='TEKS_INTRO'>"+TEKS_INTRO+"</div>");
		
	$('#submitIN').click(function(){
		var n = $('#namaIN').val();
		var valid = false;
		for(i in n){
			if('abcdefghijklmnopqrstuvwxyz'.indexOf(n[i].toLowerCase()) > -1){
				valid = true;
				break;
			}
		}
		if(valid){
			question = makeQuestion();
			standing = makeStanding();
    		standing['n'] = n;
    		displayBoard();
 		} else {
			toastr.error('Nama harus mengandung huruf.');
		}
  	});
	return null;
}

// ANSWERING

function displayTimer(){
	$("#container").append("Waktu tersisa: <span id= 'timer'></span> detik <br />");
	startTimer(WAKTU);
}

function displaySkor(){
	$("#container").append('Benar <span class="badge">'+standing['b']+'</span>  Salah <span class="badge">'+standing['s']+'</span> <br />');
	return;
}

// tampilkan soal
function displaySoal(){
    var u     = standing['u'];
    var s  	  = question[u]['s'];
    var blank = question[u]['blank'];
    var ds 	  = clone(s); 
    ds[blank] = ".....";
    $("#container").append('<div class="panel panel-default"><div class="panel-heading">Soal ke-'+(u+1)+'</div><div class="panel-body">'+ds+'<br />'+TEKS_TANYA+'</div></div>');
    return null;
}

//tampilkan opsi
function displayOpsi(){
	var u = standing['u'];
    var j = question[u]['j'];
    $("#container").append('<div class="list-group">');
    for (var i in j){
    	$("#container").append('<a href="#" class="list-group-item" id="'+i+'" onclick="evaluateAnswer(this.id)">'+j[i]+'</a>   ');
    }
    $("#container").append('</div>');
    return null;
}

// wrapper for ANSWERING display functions
function displayBoard(){
	$("#container").html("");
	displayTimer();
	displaySkor();
	displaySoal();
	displayOpsi();
	return null;
}

// EVALUATE ANSWER

// mengevaluasi jawaban
function evaluateAnswer(i){
	clearInterval(counter); 
	var answerPos  = parseInt(i);
	var thisq	   = question[standing['u']]; 
	var correctPos = thisq['k'];
	if (correctPos === answerPos){
		toastr.success('Jawaban '+ thisq['v'] +' benar! '+thisq['s']+' adalah '+ thisq['b']);
		standing['b'] += 1;
        standing['u'] += 1;
	} else {
		toastr.error('Jawaban '+ thisq['j'][answerPos] +' salah! Seharusnya '+ thisq['v'] +'!<br /><br />'+thisq['s']+' adalah '+ thisq['b'] + '<br /><br />Tetap Semangat!');
		standing['s'] += 1;
        standing['u'] += 1;
    }
    if(!isGameOver()){
    	displayBoard();
    }
	return null;
}

// TERMINATION

// taking a notes on players
function xxkb(){
		$.ajax({
	    	type: 'POST',
	    	url: 'http://localhost/xxxx/kblog.php', /* change this to your own address **/
	    	data: {'n':standing['n'],'b':standing['b'],'s':standing['s']},
	    	success: function(msg){
						return;
	    			}
		});
		return null;
}

// apabila game over
function isGameOver(){
	if(standing['u'] >= N_SOAL){
		$("#container").html('');
		$("#container").append("<br/>SELESAI. Perolehan akhir: <br/>");
		displaySkor();
		toastr.success('Wah akhirnya selesai!');
		xxkb();
		$("#container").append("<button type='button' class='btn' id='submitIN' onclick='inisialisasi()'>LAGI</button> <br/>");
		return true;
	} else {
		return false;
	}
}
