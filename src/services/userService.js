const { query } = require('express');
const { Users } = require('../models/user.model')
const aqp = require('api-query-params');
module.exports = {
    createUserService: async (data) => {
        if (data.type === "CREATE-USER") {
            try {
                let { name } = data;
                let checkedName = await Users.findOne({ name: name });
                if (checkedName) {
                    return null;
                }
                else
                    return await Users.create(data);
            } catch (error) {
                console.log('error:', error);
                return null;
            }
        }

        if (data.type === "ADD-CART") {
            try {
                let myCustomer = await Users.findById(data.id).exec();
                for (let i = 0; i < data.cartArr.length; i++) {
                    myCustomer.carts.push(data.cartArr[i])
                }
                let result = await myCustomer.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        if (data.type === "REMOVE-CART") {
            try {
                let myCustomer = await Users.findById(data.id).exec();
                for (let i = 0; i < data.cartArr.length; i++) {
                    myCustomer.carts.pull(data.cartArr[i])
                }
                let result = await myCustomer.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        if (data.type === "ADD-ORDER") {
            try {
                let myCustomer = await Users.findById(data.id).exec();
                for (let i = 0; i < data.cartArr.length; i++) {
                    myCustomer.orders.push(data.cartArr[i])
                }
                let result = await myCustomer.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        if (data.type === "REMOVE-ORDER") {
            try {
                let myCustomer = await Users.findById(data.id).exec();
                for (let i = 0; i < data.cartArr.length; i++) {
                    myCustomer.orders.pull(data.cartArr[i])
                }
                let result = await myCustomer.save();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }

    },

    getUserByNameService: async (data) => {
        try {
            let { name, password } = data;
            let foundCustomer = await Users.findOne({ name });
            if (foundCustomer) {
                if (foundCustomer.password === password)
                    return foundCustomer;
                else
                    return null;
            }
            else {
                return null;
            }
        } catch (error) {

        }
    },

    getAllUserService: async (queryString) => {
        try {
            const page = queryString.page;
            const { filter, limit, population } = aqp(queryString);
            let result = null;
            delete filter.page;
            if (page && limit) {
                let offset = (page - 1) * limit;
                result = await Users.find(filter).populate(population).skip(offset).limit(limit).exec();
            }
            else
                result = await Users.find({});
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    },

    deleteUserByIdService: async (userId) => {
        try {
            let result = null;
            if (Array.isArray(userId))
                result = await Users.delete({ _id: { $in: userId } });
            else
                result = await Users.deleteById(userId);
            return result;
        } catch (error) {
            return null;
        }
    },

    updateUserByIdService: async (data) => {
        try {
            let result = await Users.updateOne({ _id: data.id }, { ...data });
            return result;
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }
}