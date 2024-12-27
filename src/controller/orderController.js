const {
    createOrderService,
    getAllOrderService,
    deleteOrderByIdService,
    updateOrderByIdService
} = require('../services/orderService.js')

module.exports = {
    
    postCreateOrder: async (req, res) => {
        let result = await createOrderService(req.body);
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

    getAllOrder: async (req, res) => {
        let result = await getAllOrderService(req.query)
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

    deleteOrder: async (req, res) => {
        let orderId = req.body.id;
        let result = await deleteOrderByIdService(orderId);
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

    putUpdateOrder: async (req, res) => {
        let result = await updateOrderByIdService(req.body);
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else {
            return res.status(200).json({
                EC: -1,
                data: result
            });
        }
    },
}