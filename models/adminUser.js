var mongoose = require('mongoose');
Schema = mongoose.Schema;

var AdminUserSchema = new Schema({
	username: String,
    password: String,
    email: String
});

mongoose.model('AdminUser', AdminUserSchema);
