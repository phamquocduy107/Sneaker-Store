const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const { cartSchema } = require('./cart.model.js');
const orderSchema = new mongoose.Schema(
    {
        cartId: { type: mongoose.Schema.ObjectId, ref: 'Carts', required: true},
        shipService: String,
        payMethod: String,
        dateCreate: Date
    },
    {
        timestamps: true
    }
);

orderSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = {
    Orders,
    orderSchema
};