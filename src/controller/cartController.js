const {
    createCartService,
    getAllCartService,
    deleteCartByIdService,
    updateCartByIdService
} = require('../services/cartService.js')

module.exports = {
    postCreateCart: async (req, res) => {
        let result = await createCartService(req.body);
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

    getAllCart: async (req, res) => {
        let result = await getAllCartService(req.query)
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

    deleteCart: async (req, res) => {
        let cartId = req.body.id;
        let result = await deleteCartByIdService(cartId);
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

    putUpdateCart: async (req, res) => {
        let cart = await updateCartByIdService(req.body);
        if (cart)
            return res.status(200).json({
                EC: 0,
                data: cart
            });
        else {
            return res.status(200).json({
                EC: -1,
                data: cart
            });
        }
    },
}