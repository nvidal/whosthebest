var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ClubSchema = new Schema({
	id: String,
	name: String,
	image: String,
});

mongoose.model('Club', ClubSchema);
