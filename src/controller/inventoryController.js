const {
    createInventoryService,
    getAllInventoryService,
    deleteInventoryByIdService,
    updateInventoryByIdService
} = require('../services/inventoryService.js')

module.exports = {
    postCreateInventory: async (req, res) => {
        let result = await createInventoryService(req.body);
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else
            return res.status(200).json({
                EC: -1,
                data: result
            });
    },

    getAllInventory: async (req, res) => {
        let result = await getAllInventoryService(req.query)
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else
            return res.status(200).json({
                EC: -1,
                data: result
            });
    },

    deleteInventory: async (req, res) => {
        let inventoryId = req.body.id;
        let result = await deleteInventoryByIdService(inventoryId);
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else
            return res.status(200).json({
                EC: -1,
                data: result
            });
    },

    putUpdateInventory: async (req, res) => {
        let Inventory = await updateInventoryByIdService(req.body);
        if (Inventory)
            return res.status(200).json({
                EC: 0,
                data: Inventory
            });
        else {
            return res.status(200).json({
                EC: -1,
                data: Inventory
            });
        }
    },
}