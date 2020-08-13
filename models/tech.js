const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    sname: {type:String, 
        index: {
            unique: false,        
        }},

        percent: {type:String, 
            index: {
                unique: false,        
            }},
            user_name:{
                type: String,
            },

    date:{
        type: Date, 
        default: Date.now }
});

var techModel = mongoose.model('tech', userSchema);
module.exports=techModel;