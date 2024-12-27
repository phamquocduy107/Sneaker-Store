const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const inventorySchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.ObjectId, ref: 'Products', required: true},
    countInStock: {type: Number, required: true}
})

inventorySchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Inventories = mongoose.model('Inventories', inventorySchema);

module.exports = {
    Inventories,
    inventorySchema
};