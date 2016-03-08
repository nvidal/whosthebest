var express = require('express');
var router = express.Router();
var config = require('../config');


// GET getAll
router.get('/', function(req, res){
	Player = mongoose.model('Player');
	Player.find({}, function(err, players){
		if (err) throw err;

		res.json(players);
	});

});

// GET getTopTen
router.get('/top', function(req, res){
	Player = mongoose.model('Player');
	Player.find({}).sort({points : -1}).limit(10).exec(function(err, players) {
    	return res.json(players);
  	});

});

// GET getRandom : return 2 player select randomly
router.get('/random', function(req, res){
	//var collection = db.get('players');
	Player = mongoose.model('Player');
	/*Player.find({}, function(err, players){
		if (err) throw err;

		var num = Math.floor(Math.random() * players.length);
		var num2 = num;
		while (num === num2){
			num2 = Math.floor(Math.random() * players.length);
		};
		var ranPlayer = [players[num], players[num2]];
		res.json(ranPlayer);
	});*/
	Player.find({}).sort({points : -1}).exec(function(err, players){
		if (err) throw err;

		// Jugador_1 = j1, Jugador_2 en [a ..i.. b]
		var j1 = Math.floor(Math.random() * players.length);
		var a = j1;
		var b = j1;
		if ( players.length > config.select.minLength)
			var j = Math.floor(players.length / config.select.ventana); //10%
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
		res.json(ranPlayer);
	});

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
//	getPlayer(req.body.id1, res);
//	getPlayer(req.body.id2, res);

	var p1 = req.body.player1;
	var p2 = req.body.player2;
	p1.points = calculatePoints(p1, p2, 1);
	p2.points = calculatePoints(p2, p1, 0);

	Player = mongoose.model('Player');
	//player 1
	Player.update({
		_id: p1._id
	},{
		$set: { points : p1.points,
				times : p1.times +1
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
					times : p2.times +1
					}
		},
		function(err, player2){
			if (err) throw err;

			//var result = {player, player2};
			var result = player2;
			res.json(result);
		});
	});
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