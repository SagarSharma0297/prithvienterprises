const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema(

    {   
        createdAt:Date,
        username:String,
        password:String,
        role:String,
        firstName:String,
        lastName:String,
        identifier:String,
      
    },
    {
        collection:'users'
    }
);

const model = mongoose.model('UserSchema',UserSchema);

module.exports = model;