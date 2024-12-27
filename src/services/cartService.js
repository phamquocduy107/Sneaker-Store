const { Carts } = require('../models/cart.model');
const aqp = require('api-query-params');
const { Products } = require('../models/product.model');

module.exports = {
    createCartService: async (cartData) => {
        if (cartData.type === "CREATE-CART") {
            try {
                let result = await Carts.create(cartData);
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        if (cartData.type === "ADD-PRODUCT") {
            try {
                let myCart = await Carts.findById(cartData.cartId).exec();
                for (let i = 0; i < cartData.productArr.length; i++) {
                    let product = cartData.productArr[i];
                    myCart.products.push(product);
                    // const { price } = await Products.findById(product.productId);
                    // myCart.totalPrice += (price * product.quantity);
                }
                let result = await myCart.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        if (cartData.type === "REMOVE-PRODUCT") {
            try {
                let myCart = await Carts.findById(cartData.cartId).exec();
                for (let i = 0; i < cartData.productArr.length; i++) {
                    let product = (await myCart.products.find(async (x) => { await x.productId.toString() === cartData.productArr[i]; }));
                    myCart.products.pull(product);
                    // const { price } = await Products.findById(product.productId);
                    // myCart.totalPrice -= (price * product.quantity);
                }
                let result = await myCart.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

    },

    getAllCartService: async (queryString) => {
        try {
            const page = queryString.page;
            const { filter, limit, population } = aqp(queryString);
            let result = null;
            delete filter.page;
            if (page && limit) {
                let offset = (page - 1) * limit;
                result = await Carts.find(filter).populate(population).populate({ path: 'products', populate: 'productId' }).skip(offset).limit(limit).exec();
                for (let i = 0; i < result.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < result[i].products.length; j++) {
                        const { price } = await Products.findById(result[i].products[j].productId);
                        sum += price * result[i].products[j].quantity;
                    }
                    result[i].totalPrice = sum;
                    result[i].save();
                }
                return result;
            }
            else
                result = await Carts.find({});
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    },

    deleteCartByIdService: async (cartId) => {
        try {
            let result = null;
            if (Array.isArray(cartId))
                result = await Carts.delete({ _id: { $in: cartId } });
            else
                result = await Carts.deleteById(cartId);
            return result;
        } catch (error) {
            return null;
        }
    },

    updateCartByIdService: async (data) => {
        try {
            let result = await Carts.updateOne({ _id: data.id }, { ...data });
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }
}