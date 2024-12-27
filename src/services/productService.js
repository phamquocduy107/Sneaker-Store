const { Products } = require('../models/product.model.js');
const aqp = require('api-query-params');

module.exports = {

    createProductService: async (productData) => {
        try {
            let result = await Products.create({
                name: productData.name,
                price: productData.price,
                brand: productData.brand,
                description: productData.description,
                image: productData.image
            })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getAllProductService: async (queryString) => {
        try {
            let result = null;
            if (queryString.limit && queryString.page) {
                let offset = (page - 1) * limit;
                let { filter } = aqp(queryString);
                delete filter.page;
                result = await Products.find(filter).skip(offset).limit(limit).exec();
            }
            else
                result = await Products.find({});
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    },
    
    deleteProductByIdService: async (productId) => {
        try {
            let result = null;
            if (Array.isArray(productId))
                result = await Products.delete({ _id: { $in: productId } });
            else
                result = await Products.deleteById(productId);
            return result;
        } catch (error) {
            return null;
        }
    },

    updateProductByIdService: async (data) => {
        try {
            let result = await Products.updateOne({ _id: data.id }, { ...data });
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }
}