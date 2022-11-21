const mongoose = require('mongoose');

const InfinitySchema =  new mongoose.Schema(
    {
        registration_number:String,
        chasis_number:String,
        engine_number:String,
        model_name:String,
        customer_name:String,
        bank_name:String,
        state_name:String,
        bkt:String,
        loan_number:String,
        phone_number:String,
        due_amount:String,
        emi_amount:String,
    },
    {
        collection:'infinity'
    }
);

const model = mongoose.model('InfinitySchema',InfinitySchema);

module.exports = model;