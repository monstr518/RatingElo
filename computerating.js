// computerating.js


// Вычисление рейтинга Эло.
// RAB - [RA,RB] - Рейтинги игроков до игры.
// NAB - [NA,NB] - Количества сыгранных игр до этой.
// SA - фактически набранное игроком A количество очков (1 очко за победу, 0,5 — за ничью и 0 — за поражение).
var ComputeRatingELO = (RAB,NAB,SA)=>{
	var SB = 1 - SA;
	
	// Количество очков, которое наберёт игрок A в партии с B.
	var EA = (RA,RB)=>{
		var futer = 1 + Math.pow(10,(RB-RA)/400);
		return 1 / futer;
		};
		
	// Коэффициент. Возраст здесь не учитывается.
	// R - Рейтинг игрока до игры.
	// N - Количество сыгранных до этой игры игр.
	var K = (R,N)=>{
		if(N<=30)return 40;
		if(R>=2400)return 10;
		return 20;
		};
	
	var NewRA = RAB[0] + K(RAB[0],NAB[0])*(SA-EA(RAB[0],RAB[1]));
	var NewRB = RAB[1] + K(RAB[1],NAB[1])*(SB-EA(RAB[1],RAB[0]));
	
	return [NewRA,NewRB]; // Новый RAB, после этой игры.
};



/*
var test = ()=>{
	console.log(ComputeRatingELO([0,0],[0,0],1)); // [ 20, -20 ]
	console.log(ComputeRatingELO([100,100],[4,2],0)); // [ 80, 120 ]
	console.log(ComputeRatingELO([100,100],[4,2],0.5)); // [ 100, 100 ]
};

test();
*/


// Для NAB - [NA,NB] нужно добавить по единичке.
module.exports = ComputeRatingELO;
