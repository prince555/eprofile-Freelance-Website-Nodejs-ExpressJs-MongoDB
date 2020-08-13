const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    about: {type:String, 
        index: {
            unique: false,        
        }},
    user_name:{
        required: true,
        type: String,
        index: {
            unique: true,
        }
    },
    date:{
        type: Date, 
        default: Date.now }
});

var aboutModel = mongoose.model('about', userSchema);
module.exports=aboutModel;