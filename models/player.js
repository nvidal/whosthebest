var Config = require('../config');
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	name : String,
	lastname : String,
	url : { type : String, default : Config.default.urlImg },
	points : { type : Number, default : Config.default.points},
	times : { type : Number, default : Config.default.times}
});

mongoose.model('Player', PlayerSchema);
