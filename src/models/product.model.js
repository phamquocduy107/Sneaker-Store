const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: String,
        description: String,
        brand: String,
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

productSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Products = mongoose.model('Products', productSchema);

module.exports = {
    Products,
    productSchema
};