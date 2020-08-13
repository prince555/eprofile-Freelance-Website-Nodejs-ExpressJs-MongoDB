const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  uname: {type:String, 
        index: {
            unique: false,        
        }},

        profess: {type:String, 
            index: {
                unique: false,        
            }},

            phnum: {type:String, 
                index: {
                    unique: false,        
                }},

                mail: {type:String, 
                    index: {
                        unique: false,        
                    }},    

                    addr: {type:String, 
                        index: {
                            unique: false,        
                        }},            
                    
                        fbid: {type:String, 
                            index: {
                                unique: false,        
                            }},

                            twid: {type:String, 
                                index: {
                                    unique: false,        
                                }}, 
                                
                                gitid: {type:String, 
                                    index: {
                                        unique: false,        
                                    }},

                                    linid: {type:String, 
                                        index: {
                                            unique: false,        
                                        }},
                                        about: {type:String, 
                                          index: {
                                              unique: false,        
                                          }},
                                      user_name:{
                                          type: String,
                                      },
                                      imagename:{ 
                                        type: String,
                                      },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User1', UserSchema);

module.exports = User;
