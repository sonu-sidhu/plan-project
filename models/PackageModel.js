const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    planid: String,
    packagetype: String,
    packageprice: Number,   
    packagerate: Number,   
},
    {
        timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Package = mongoose.model('package', packageSchema);
module.exports = Package;