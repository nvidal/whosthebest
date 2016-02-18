var express = require('express');
var router = express.Router();

//var monk = require('monk');
//var db = monk('localhost:27017/WTB');



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
	Player.find({}, function(err, players){
		if (err) throw err;

		if (players.length < 2){
			console.log("length "+ players.length);
			res.json({});
			return;
		}
			

		var num = Math.floor(Math.random() * players.length);
		var num2 = num;
		while (num === num2){
			num2 = Math.floor(Math.random() * players.length);
		};
		var ranPlayer = [players[num], players[num2]];
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
			var result = player;
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
var LIMITE_NIVEL_PROTEGIDO = 30;
var NIVEL_PROTEGIDO = 50;
function obtenerNivel (player) {
	//return 10;
	if ( player.times < LIMITE_NIVEL_PROTEGIDO )
			return NIVEL_PROTEGIDO;
	else{
		var aux = Math.round( player.points / 200); // 2000 = 10, 4000 = 20, 1000 = 5
		if (aux < 1)
			aux = 45;
		return (NIVEL_PROTEGIDO - aux) / 2; // 2000 = 20, 4000 = 15, 1000 = 22.5, max = 2.5
	}
};

module.exports = router;
