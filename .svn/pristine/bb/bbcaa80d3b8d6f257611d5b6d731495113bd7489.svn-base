var mongoose = require('mongoose');
Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	name : String,
	lastname : String,
	url : { type : String, default : 'http://www.goear.com/static/bands/1/d/5/b/a/1d5ba8476509e7e68dea55d7dda9aa2e/oliver-atom_9652.jpg' },
	points : { type : Number, default : 2000},
	times : { type : Number, default : 0}
});

mongoose.model('Player', PlayerSchema);
