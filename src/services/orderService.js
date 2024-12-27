const { Orders } = require('../models/order.model');
const aqp = require('api-query-params');

module.exports = {
    createOrderService: async (orderData) => {
        try {
            let result = await Orders.create(orderData);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getAllOrderService: async (queryString) => {
        try {
            const page = queryString.page;
            const { filter, limit, population } = aqp(queryString);
            let result = null;
            delete filter.page;
            if (page && limit) {
                let offset = (page - 1) * limit;
                result = await Orders.find(filter).populate(population).skip(offset).limit(limit).exec();
            }
            else
                result = await Orders.find({});
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    },

    deleteOrderByIdService: async (orderId) => {
        try {
            let result = null;
            if (Array.isArray(orderId))
                result = await Orders.delete({ _id: { $in: orderId } });
            else
                result = await Orders.deleteById(orderId);
            return result;
        } catch (error) {
            return null;
        }
    },

    updateOrderByIdService: async (data) => {
        try {
            let result = await Orders.updateOne({ _id: data.id }, { ...data });
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }
}