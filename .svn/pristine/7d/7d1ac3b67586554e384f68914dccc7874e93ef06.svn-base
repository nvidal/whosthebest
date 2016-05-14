var express = require('express');
var router = express.Router();

function findPuestoSorted(query, res){
	Puesto = mongoose.model('Puesto');
	Puesto.find(query).sort( {name : 1} ).exec(function(err, puestos){
		if (err) throw err;

		res.json(puestos);
	});
};

// GET getAll
router.get('/', function(req, res){
	findPuestoSorted({}, res);
});



module.exports = router;