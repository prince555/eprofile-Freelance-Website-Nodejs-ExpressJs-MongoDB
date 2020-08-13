const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    fname: {type:String, 
        index: {
            unique: false,        
        }},

        fpercent: {type:String, 
            index: {
                unique: false,        
            }},
            user_name:{
                required: true,
                type: String,
                index: {
                    unique: false,
                }
            },

    date:{
        type: Date, 
        default: Date.now }
});

var profModel = mongoose.model('profes', userSchema);
module.exports=profModel;