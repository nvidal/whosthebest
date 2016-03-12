var Config = require('../config');
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  //res.redirect('/login');
  res.json( "Error 403 Access Denied/Forbidden" );
}


router.get("/", isAuthenticated, function(req, res){
	Player = mongoose.model('Player');
	Player.aggregate(
		{ 
		$group : {_id : null, 
				totalTimes : { $sum : "$times" }, 
				totalPoints : { $sum : "$points" },
                avgPoints : { $avg : "$points" }, 
                avgTimes : { $avg : "$times" },
                totalPlayers : {$sum : 1 },
                maxTimes : {$max : "$times"}, 
                minTimes : {$min : "$times"}
            }
     	}, 
     	function(err, result){
			return res.json(result[0]);
	});
});

router.get("/clubs", isAuthenticated, function(req, res){
	Player = mongoose.model('Player');
	Player.aggregate(
		{ 
		$group : {_id : "$club", 
				totalTimes : { $sum : "$times" }, 
				totalPoints : { $sum : "$points" },
                avgPoints : { $avg : "$points" }, 
                avgTimes : { $avg : "$times" },
                totalPlayers : {$sum : 1 },
                maxTimes : {$max : "$times"}, 
                minTimes : {$min : "$times"}
            }
     	},
	    { 
	    	$sort : { avgPoints : 1}
	    },
     	function(err, results){
			return res.json(results);
	});
});


module.exports = router;
