var express = require('express');
var router = express.Router();
var config = require('../config');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  //res.redirect('/login');
  res.json( "Error 403 Access Denied/Forbidden" );
}

// GUARDAR RESULTADO SEMANAL
// POST guardarHistoria
router.post('/grabar', isAuthenticated, function(req, res){

	Player = mongoose.model('Player');
	Player.find({}).sort( {points : -1} ).exec(function(err, players){
		if (err) throw err;

		var playersH = []; // Historico semanal
		var fecha = new Date(); //Fecha actual
		for (i = 0; i< players.length; i++){
			playersH[i] = {
				fecha : fecha,
				playerId : players[i]._id,
				rank : i+1,
				points : players[i].points
			}
			// Actualizo el rankAnterior
			Player.update(
				{ _id: players[i]._id },
				{ 	$set: { rankAnterior : i +1 }
				}, function(err, pUpdated){
					if (err) 
						console.log("Error al actualizar rankAnterior de "
							+ players[i]._id);
					console.log("updating");
			});
		}

		PlayerHist = mongoose.model('PlayersHist');
		PlayerHist.create( playersH,
		function(err, phs){
			if (err) throw err;

			console.log("Historial Semanal GRABADO");
			res.end("Exito al grabar");
		});
	});
});

router.get("/list", isAuthenticated, function(req, res){

	PlayerHist = mongoose.model('PlayersHist');
	PlayerHist.aggregate([
	{
    	$group : { _id : "$fecha", 
    				players : { $sum : 1}
        }
    },
    { 
    	$sort : { _id : -1}
    }],
 	function(err, results){
		return res.json(results);
	});
});


module.exports = router;
