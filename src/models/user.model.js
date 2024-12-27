const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "customer"
        },
        phone: String,
        email: String,
        address: String,
        image: String,
        description: String,
        carts : [{type: mongoose.Schema.ObjectId, ref: 'Carts'}],
        orders: [[{type: mongoose.Schema.ObjectId, ref: 'Orders'}]]
    },
    {
        timestamps: true
    });
    userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users,
    userSchema
};
