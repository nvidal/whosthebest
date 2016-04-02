var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PositionSchema = new Schema({
	id: String,
	name: String
});

mongoose.model('Position', PositionSchema);