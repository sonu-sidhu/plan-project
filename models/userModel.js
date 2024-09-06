const mongoose = require('mongoose');

const SubsSchema = new mongoose.Schema({
    username: String,
    subscription: String,
    name: String,
    packagetitle: String,
    plantype: String,
    packagetenue: String,
    startdate: Date,
    enddate: Date,
    paymenttype: String,
    price: Number
},
    {
        timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Subscription = mongoose.model('subscription', SubsSchema);
module.exports = Subscription;