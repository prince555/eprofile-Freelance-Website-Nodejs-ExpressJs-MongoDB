const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;

var uploadSchema =new mongoose.Schema({
	imagename: String,

});

var uploadModel = mongoose.model('uploadimage', uploadSchema);
module.exports=uploadModel;