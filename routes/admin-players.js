//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var Config = require('../config');
var express = require('express');
var router = express.Router();
var multer = require('multer');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  //res.redirect('/login');
  res.json( "Error 403 Access Denied/Forbidden" );
}

function findPlayerSorted(query, res){
	Player = mongoose.model('Player');
	Player.find(query).sort( {points : -1} ).exec(function(err, players){
		if (err) throw err;

		res.json(players);
	});
};

/* ADMIN-USER
var bCrypt = require('bcrypt-nodejs');
var User = require('../models/adminUser');
// Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
// GET user
router.get('/user', isAuthenticated, function(req, res){
	res.json(req.user);
});
router.put('/user/:pass', isAuthenticated, function(req, res){
	var User = new User();
	User.update();
});
*/



// GET getAll
router.get('/', isAuthenticated, function(req, res){
	//console.log(req);
	findPlayerSorted({}, res);
});

// GET getPage
router.get('/page/:page', isAuthenticated, function(req, res){
	Player = mongoose.model('Player');
	Player.paginate( {}, 
		{ sort: {points : -1}, limit: 10, page: req.params.pag },
		function(err, players) {
    		return res.json(players.docs);
  	});

});

// GET getOne
router.get('/:id', isAuthenticated, function(req, res){
	Player = mongoose.model('Player');
	Player.findOne({ _id: req.params.id }, 
		function(err, player){
			if (err) throw err;

			res.json(player);
	});
});

// DELETE delete
router.delete('/:id', isAuthenticated, function(req, res){
	Player = mongoose.model('Player');
	Player.remove({ _id: req.params.id }, 
		function(err, player){
			if (err) throw err;

			res.json(player);
	});
});

// POST -> new
router.post('/', isAuthenticated, function(req, res){
	var name = req.body.name;
	var lastname = req.body.lastname;
	var image = req.body.image;
	var position = req.body.position;
	var club = req.body.club;

	if (name == null || name === ""){
		res.json("Name is required");
	}
	else if (lastname == null || lastname === ""){
		res.json("Lastame is required");
	}
	else if (position == null || position === ""){
		res.json("Position is required");
	}
	else if (club == null || club === ""){
		res.json("Club is required");
	}
	else{
		if( req.body.image == null || req.body.image === ""){
			var playerJson = {
				name : name,
				lastname : lastname,
				position : position,
				club : club,
				updated_date : new Date()/*,
				points : points,
				times : times*/
			}
		}
		else{
			var playerJson = {
				name : name,
				lastname : lastname,
				image : image,
				position : position,
				club : club,
				updated_date : new Date()/*,
				points : points,
				times : times*/
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
router.put('/:id', isAuthenticated, function(req, res){
	var name = req.body.name;
	var lastname = req.body.lastname;
	/*var times = req.body.times;
	var points = req.body.points;*/
	var image = req.body.image;
	var position = req.body.position;
	var club = req.body.club;

	if (name == null || name === ""){
		res.json("Name is required");
	}
	else if (lastname == null || lastname === ""){
		res.json("Lastame is required");
	}
	else if (position == null || position === ""){
		res.json("Position is required");
	}
	else if (club == null || club === ""){
		res.json("Club is required");
	}
	/*else if (times == null || times ===""){
		res.json("Times is required");
	}
	else if (points == null || points ===""){
		res.json("Points is required");
	}*/
	else {
		if( req.body.image == null || req.body.image === ""){
			var playerJson = {
				name : name,
				lastname : lastname,
				position : position,
				club : club,
				updated_date : new Date()/*,
				points : points,
				times : times*/
			}
		}
		else{
			var playerJson = {
				name : name,
				lastname : lastname,
				image : image,
				position : position,
				club : club,
				updated_date : new Date()/*,
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


//POST restAllPlayer 
router.post('/reset', isAuthenticated, function(req, res){

	Player = mongoose.model('Player');
	Player.update( { }, 
		{ $set: { points : Config.default.points,
				  times : Config.default.times,
				  updated_date : Date.now 
		} },
		{ multi : true },
		function(err, players){
			if (err) throw err;

			res.json(players);
		});
});

// Grabar archivo
router.post('/upload', isAuthenticated, function(req, res){

	// MULTER - SUBIR ARCHIVOS
	var storage = multer.diskStorage({
	  destination : function (req, file, cb){
	    cb(null, './adminApp/files/')
	  },
	  filename : function (req, file, cb){
	    cb(null, file.fieldname+".json")
	  }
	});
	var upload = multer({ storage : storage}).single('playersFile');

	upload(req, res, function(err){
		if (err) 
			return res.end("Error uploading file."+err);
			//throw err;

		insertFromFile();
		res.end("File is uploaded");
	})
});

function insertFromFile(){

	var Player = mongoose.model('Player');
	var playerSet = require('../adminApp/files/playersFile.json');//[{"name":"j1"},{"name":"j2"},{"name":"j3"}];

	//var jugCol = [{"position":"Arquero","club":"CERRO","name":"Sebastián","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=47612","lastname":"Britos"},{"position":"Arquero","club":"CERRO","name":"Sebastián","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=47611","lastname":"Fuentes"},{"position":"Arquero","club":"CERRO","name":"Sebastián","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=55844","lastname":"Medina"},{"position":"Defensa","club":"CERRO","name":"Agustín","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=50047","lastname":"Sant' Anna"},{"position":"Defensa","club":"CERRO","name":"Andrés","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=55321","lastname":"Ravecca"},{"position":"Defensa","club":"CERRO","name":"Angelo","image":"http://www.auf.org.uy/Portal/ImageViewer.ashx?id=50048","lastname":"Pizzorno"}];
console.log("-------");
//var colec = jugCol.jugador;
//console.log(jugCol.jugador);

	//Player.create(playerSet, onInsert);
	
	/*console.log("insertado");*/
	for (var i = playerSet.length ; i >= 0; i--) {
		try {
			Player.create(playerSet[i], onInsert);
		} catch(error){
			console.error(error);
		}
		console.log("["+i+"]");
	};

	function onInsert(err, docs) {
	    if (err) {
	        // TODO: handle error
	        console.info("ERROR: ");
	        throw err;
	    } else {
	        console.info('%d jugadores were successfully stored.', docs.length);
	        //res.json("OKEY");
	    }
	}
};

module.exports = router;
