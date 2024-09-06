const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
},


    {
        timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Plan = mongoose.model('plan', planSchema);
module.exports = Plan;