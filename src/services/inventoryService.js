const { Inventories } = require('../models/inventory.model');
const aqp = require('api-query-params');

module.exports = {
    createInventoryService: async (inventoryData) => {
        try {
            let result = await Inventories.create(inventoryData);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getAllInventoryService: async (queryString) => {
        try {
            const page = queryString.page;
            const { filter, limit, population } = aqp(queryString);
            let result = null;
            delete filter.page;
            if (page && limit) {
                let offset = (page - 1) * limit;
                result = await Inventories.find(filter).populate(population).skip(offset).limit(limit).exec();
            }
            else
                result = await Inventories.find({});
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    },

    deleteInventoryByIdService: async (inventoryId) => {
        try {
            let result = null;
            if (Array.isArray(inventoryId))
                result = await Inventories.delete({ _id: { $in: inventoryId } });
            else
                result = await Inventories.deleteById(inventoryId);
            return result;
        } catch (error) {
            return null;
        }
    },

    updateInventoryByIdService: async (data) => {
        try {
            let result = await Inventories.updateOne({ _id: data.id }, { ...data });
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }
}