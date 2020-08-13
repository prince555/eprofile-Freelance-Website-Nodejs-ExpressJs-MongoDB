const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prince:9949606614@cluster0-rnlcj.mongodb.net/eprofile?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    username: {type:String, 
        index: {
            unique: false,        
        }},

        profession: {type:String, 
            index: {
                unique: false,        
            }},

            contactnumber: {type:String, 
                index: {
                    unique: false,        
                }},

                email: {type:String, 
                    index: {
                        unique: false,        
                    }},    

                    address: {type:String, 
                        index: {
                            unique: false,        
                        }},            
                    
                        facebook: {type:String, 
                            index: {
                                unique: false,        
                            }},

                            twitter: {type:String, 
                                index: {
                                    unique: false,        
                                }}, 
                                
                                github: {type:String, 
                                    index: {
                                        unique: false,        
                                    }},

                                    linkedin: {type:String, 
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

var personalModel = mongoose.model('per', userSchema);
module.exports=personalModel;