//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

var express = require('express');
var router = express.Router();


// GET getAll
router.get('/', function(req, res){
	Player = mongoose.model('Player');
	Player.find({}, function(err, players){
		if (err) throw err;

		res.json(players);
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

// DELETE delete
router.delete('/:id', function(req, res){
	Player = mongoose.model('Player');
	Player.remove({ _id: req.params.id }, 
		function(err, player){
			if (err) throw err;

			res.json(player);
	});
});

// POST -> new
router.post('/', function(req, res){
	if (req.body.name == null || req.body.name === ""){
		res.json("Name is required");
	}
	else if (req.body.lastname == null || req.body.lastname === ""){
		res.json("Lastame is required");
	}
	else{
		if( req.body.url == null || req.body.url === ""){
			var playerJson = {
			name : req.body.name,
			lastname : req.body.lastname
			}
		}
		else{
			var playerJson = {
				name : req.body.name,
				lastname : req.body.lastname,
				url : req.body.url
			}
		}
		Player = mongoose.model('Player');
		Player.create( playerJson,
		function(err, player){
			if (err) throw err;

			res.json(player);
		});
	}
});

// PUT editOne
router.put('/:id', function(req, res){
	var name = req.body.name;
	var lastname = req.body.lastname;
	/*var times = req.body.times;
	var points = req.body.points;*/
	var url = req.body.url;

	if (name == null || name === ""){
		res.json("Name is required");
	}
	else if (lastname == null || lastname === ""){
		res.json("Lastame is required");
	}
	/*else if (times == null || times ===""){
		res.json("Times is required");
	}
	else if (points == null || points ===""){
		res.json("Points is required");
	}*/
	else {
		if( req.body.url == null || req.body.url === ""){
			var playerJson = {
				name : name,
				lastname : lastname/*,
				points : points,
				times : times*/
			}
		}
		else{
			var playerJson = {
				name : name,
				lastname : lastname,
				url : url/*,
				points : points,
				times : times*/
			}

		Player = mongoose.model('Player');
		Player.update( { _id: req.params.id },
			playerJson,
			function(err, player) {
				if(err) throw err;

				res.json(player);
			})

		}
	}
});


module.exports = router;
