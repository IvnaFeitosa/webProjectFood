const mongoose = require('mongoose');


const FoodSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    expirationDate:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Food', FoodSchema);