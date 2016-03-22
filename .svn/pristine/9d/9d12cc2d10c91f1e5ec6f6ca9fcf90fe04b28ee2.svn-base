var express = require('express');
var router = express.Router();
var config = require('../config');
var mongoosePaginate = require('mongoose-paginate');


function findPlayerSorted(query, res){
	Player = mongoose.model('Player');
	Player.find(query).sort( {points : -1} ).exec(function(err, players){
		if (err) throw err;

		res.json(players);
	});
};

// GET getAll
router.get('/', function(req, res){
	findPlayerSorted({}, res);
});

//GET byClub
router.get('/club/:club', function(req, res){
	findPlayerSorted({ club : req.params.club }, res);
});
//GET byPosition
router.get('/position/:position', function(req, res){
	findPlayerSorted({ position : req.params.position }, res);
});
//GET byClubAndPosition
router.get('/club/:club/position/:position', function(req, res){
	findPlayerSorted({ 
		club : req.params.club,
		position : req.params.position }, res);
});

// GET getTopTen
router.get('/top', function(req, res){
	Player = mongoose.model('Player');
	Player.find({}).sort({points : -1}).limit(10).exec(function(err, players) {
    	return res.json(players);
  	});

});

// GET paginado
router.get('/top/:pag', function(req, res){
	Player = mongoose.model('Player');
	Player.paginate( {}, 
		{ sort: {points : -1}, limit: 10, page: req.params.pag },
		function(err, players) {
    	return res.json(players);
  	});

});

//GET RankingPorClub
router.get('/clubs', function(req, res){
	Player = mongoose.model('Player');
	Player.aggregate(
		{ 
		$group : {_id : "$club", 
                avgPoints : { $avg : "$points" }, 
                avgTimes : { $avg : "$times" },
                avgDraws : { $avg : "$draw" },
                totalPlayers : {$sum : 1 }
            }
     	},
	    { 
	    	$sort : { avgPoints : -1}
	    },
     	function(err, results){
			return res.json(results);
	});
});



//************************//
// Escojo el tamanio sobre el cual voy a elegir jugadores
// 1 de 5 veces : top50 
function lengthRandom(length){
	if (length < 50)
		return length;

	var res = Math.floor(Math.random() * 5);
	if (res === 1)
		return 50;
	else
		return length;
}

// GET getRandom : return 2 player select randomly
router.get('/random', function(req, res){
	console.time("timer-random");
	console.time("timer-random1");

	Player = mongoose.model('Player');
	Player.find({}).sort({points : -1}).exec(function(err, players){
		if (err) throw err;

		// Jugador_1 = j1, Jugador_2 en [a ..i.. b]
		var length = lengthRandom(players.length);
		var j1 = Math.floor(Math.random() * length);
		var a = j1;
		var b = j1;
		if ( players.length > config.select.minLength)
			var j = Math.floor(players.length * config.select.ventana); //10%
		else
			var j = config.select.minVentana;
		var fin = false;
		while (j>1 && !fin){
			if (a-1 >0){
				a--;
				j--;
			}
			if (b+1 < players.length){
				b++;
				j--;
			}
			fin = (a == 0) && (b==players.length);
		}
		// Elijo random j2
		var j2 = j1;
		while (j1 === j2){
			j2 = Math.floor(Math.random() * (b-a)) + a;
		};

		var ranPlayer = [players[j1], players[j2]];
		Player.update(
		{	_id: ranPlayer[0]._id },
		{ 	$set: { draw : ranPlayer[0].draw +1 }
		}, function(err, player){
			if (err) 
				console.log("error al sumar draw");
		});
		Player.update(
		{	_id: ranPlayer[1]._id },
		{ 	$set: { draw : ranPlayer[1].draw +1 }
		}, function(err, player){
			if (err) 
				console.log("error al sumar draw");
		});
		console.log("["+j1+"-"+j2+"]");
		res.json(ranPlayer);
		console.timeEnd("timer-random1");
	});
	console.timeEnd("timer-random");
});


// GET getOne
router.get('/:id', function(req, res){
	Player = mongoose.model('Player');
	Player.findOne({ _id: req.params.id }, 
		function(err, player){
			if (err) throw err;

			res.json(player);
	});
});


// POST -> vote
// req: -id1 -id2
/*	double q1 = Math.pow(10, j.getPuntos()/400);
		double q2 = Math.pow(10, ptsRival/400);
		double esperado = q1 / (q1+q2);
		int nivel = obtenerNivel(j);
	{ 
		j1.points = j1.points + (),
		j1.times ++ 
	}
*/
function getPlayer(id, res){
	//var res = 1;
	Player = mongoose.model('Player');
	Player.findOne({ _id: id }, 
		function(err, player){
			if (err) throw err;

			res.json(player);
	});
};

router.post('/vote', function(req, res){
	console.time("timer-vote");
//	getPlayer(req.body.id1, res);
//	getPlayer(req.body.id2, res);

	var p1 = req.body.player1;
	var p2 = req.body.player2;
	console.log("Antes: [P1:"+p1.points+"- P2:"+p2.points+"]");
	p1.points = calculatePoints(p1, p2, 1);
	p2.points = calculatePoints(p2, p1, 0);
	console.log("Resultado: [P1:"+p1.points+"-P2:"+p2.points+"]");

	Player = mongoose.model('Player');
	//player 1
	Player.update({
		_id: p1._id
	},{
		$set: { points : p1.points,
				times : p1.times +1,
				updated_date : new Date()
			 	}
	},
	function(err, player){
		if (err) throw err;

		//res.json(player);
		//player 2
		Player.update({
			_id: p2._id
		},{
			$set: { points : p2.points,
					times : p2.times +1,
					updated_date : new Date()
					}
		},
		function(err, player2){
			if (err) throw err;

			//var result = {player, player2};
			var result = player2;
			res.json(result);
		});
	});
	console.timeEnd("timer-vote");
});



// result = 1 if p1 win, = 0 if p1 lose.
function calculatePoints(p1, p2, result){
	var q1 = Math.pow(10, p1.points / 400);
	var q2 = Math.pow(10, p2.points / 400);
	var esperado = q1 / (q1 + q2);
	var nivel = obtenerNivel(p1);
	var res = p1.points + (nivel * (result - esperado));
	if ( res > 0 )
		return res;
	else
		return 0;
};

// Retorna el nivel del jugador
function obtenerNivel (player) {
	//return 10;
	if ( player.times < config.vote.LIMITE_NIVEL_PROTEGIDO )
			return config.vote.NIVEL_PROTEGIDO;
	else{
		var aux = Math.round( player.points / 200); // 2000 = 10, 4000 = 20, 1000 = 5
		if (aux < 1)
			aux = 45;
		return (config.vote.NIVEL_PROTEGIDO - aux) / 2; // 2000 = 20, 4000 = 15, 1000 = 22.5, max = 2.5
	}
};

module.exports = router;