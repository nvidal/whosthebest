var express = require('express');
var router = express.Router();

function findPositionSorted(query, res){
	Position = mongoose.model('Position');
	Position.find(query).sort( {name : 1} ).exec(function(err, positions){
		if (err) throw err;

		res.json(positions);
	});
};

// GET getAll
router.get('/', function(req, res){
	findPositionSorted({}, res);
});



module.exports = router;