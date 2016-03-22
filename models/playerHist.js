var Config = require('../config');
var mongoose = require('mongoose');

Schema = mongoose.Schema;

var PlayerHistSchema = new Schema({
	fecha : { type: Date, default: Date.now }, //'2016-03-20' 
	playerId : Schema.Types.ObjectId,
	rank : Number,
	points : { type : Number, default : Config.default.points}
});

mongoose.model('PlayersHist', PlayerHistSchema);
