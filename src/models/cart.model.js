const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const { userSchema } = require('./user.model');

const cartSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true },
        products: [{
            productId: { type: mongoose.Schema.ObjectId, ref: 'Products', required: true },
            quantity: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

cartSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Carts = mongoose.model('Carts', cartSchema);

module.exports = {
    Carts,
    cartSchema
};