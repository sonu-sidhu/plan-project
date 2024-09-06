const userModel = require('../models/userModel');
const planModel = require('../models/planModel');
const packageModel = require('../models/PackageModel');
const { v4: uuidv4 } = require('uuid');

exports.createSubscription = async (req, res) => {

    const { subscription, name, package, plantype, packagetenue, startdate, enddate, paymenttype, price } = req.body;
    const username = uuidv4();

    if (!subscription || !package || !price) {
        return res.status(400).json({
            status: 400,
            message: 'all fields are required'
        });
    }
    else {
        const user = await userModel.create({
            username: username,
            subscription: subscription,
            name: name,
            package: package,
            plantype: plantype,
            packagetenue: packagetenue,
            startdate: startdate,
            enddate: enddate,
            paymenttype: paymenttype,
            price: price
        });

        if (user) {
            return res.status(200).json({
                status: 200,
                message: 'Data inserted successfully!'
            });
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'Something went wrong'
            });
        }
    }
};

exports.getSubData = async (req, res) => {
    const plantype = req.query.plantype;
    const searchQuery = req.query.search;

    let query = {};

    if (plantype) {
        query.plantype = plantype;
    }

    if (searchQuery) {
        query.$or = [
            { subscription: { $regex: searchQuery, $options: 'i' } },
            { name: { $regex: searchQuery, $options: 'i' } },
            { package: { $regex: searchQuery, $options: 'i' } }
        ];
    }

    try {
        const allData = await userModel.find(query);

        if (allData && allData.length > 0) {
            return res.status(200).json({
                status: 'success',
                data: allData
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'No data found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

exports.deleteSingleRecord = async (req, res) => {

    const username = req.query.username;

    const checkRecord = await userModel.findOne({ username: username });

    if (checkRecord) {
        await userModel.deleteOne({ username: username });
        return res.status(200).json({
            status: 'success',
            message: 'Record deleted successfully!'
        });
    }
    else {
        return res.status(400).json({
            status: 'fail',
            message: 'Data not found'
        });
    }
}

exports.createPlan = async (req, res) => {

    const { name, type, price, packagetype, packageprice, packagerate } = req.body;

        const planData = await planModel.create({
            name: name,
            type: type,
            price: price,
        });

         await packageModel.create({
            planid: planData?._id,
            packagetype: packagetype,
            packageprice: packageprice,
            packagerate: packagerate,
        });

        if (planData) {
            return res.status(200).json({
                status: 200,
                message: 'Plan created successfully!'
            });
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'Something went wrong'
            });
        }
};

exports.createPackage = async (req, res) => {

    const { planid, price, rate } = req.body;
    const packageid = uuidv4();

    if (!type || !price || !rate) {
        return res.status(400).json({
            status: 400,
            message: 'all fields are required'
        });
    }
    else {
        const user = await packageModel.create({
            packageid: packageid,
            type: type,
            price: price,
            rate: rate,
        });

        if (user) {
            return res.status(200).json({
                status: 200,
                message: 'Plan created successfully!'
            });
        }
        else {
            return res.status(400).json({
                status: 400,
                message: 'Something went wrong'
            });
        }
    }
};

