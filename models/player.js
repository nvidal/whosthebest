var Config = require('../config');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	name : String,
	lastname : String,
	club : String,
	position : String,
	image : { type : String, default : Config.default.urlImg },
	points : { type : Number, default : Config.default.points},
	times : { type : Number, default : Config.default.times},
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});
PlayerSchema.plugin(mongoosePaginate);

mongoose.model('Player', PlayerSchema);
