var Config = require('../config');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var PuestoSchema = require('./puesto');

Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	name : String,
	lastname : String,
	club : String,
	position : String,
	puestos : [PuestoSchema],
	image : { type : String, default : Config.default.urlImg },
	points : { type : Number, default : Config.default.points},
	times : { type : Number, default : Config.default.times},
	draw : { type : Number, default : Config.default.draw},
	rankAnterior : { type : Number, default : 0 },
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});
PlayerSchema.plugin(mongoosePaginate);

mongoose.model('Player', PlayerSchema);
