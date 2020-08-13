const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    qualif: {type:String, 
        index: {
            unique: false,        
        }},

        eschool: {type:String, 
            index: {
                unique: false,        
            }},

            ebatch: {type:String, 
                index: {
                    unique: false,        
                }},

                edetails: {type:String, 
                    index: {
                        unique: false,        
                    }},
                    user_name:{
                        required: true,
                        type: String,
                    },

    date:{
        type: Date, 
        default: Date.now }
});

var projectModel = mongoose.model('proj', userSchema);
module.exports=projectModel;