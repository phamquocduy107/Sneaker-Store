const { uploadSingleFile } = require('../services/fileService.js')
const {
    createProductService,
    getAllProductService,
    updateProductByIdService,
    deleteProductByIdService

} = require('../services/productService.js')
module.exports = {
    postCreateProduct: async (req, res) => {
        let { name, description, brand, price } = req.body;
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {
            //do nothing
        }
        else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }

        let product = await createProductService({
            name: name,
            price: price,
            brand: brand,
            description: description,
            image: imageUrl
        });
        if (product)
            return res.status(200).json({
                EC: 0,
                data: product
            });
        else
            return res.status(200).json({
                EC: -1,
                data: product
            });
    },

    getAllProduct: async (req, res) => {
        let result = await getAllProductService(req.query);
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

    deleteProduct: async (req, res) => {
        let productId = req.body.id;
        let result = await deleteProductByIdService(productId);
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else
            return res.status(200).json({
                EC: -1,
                data: result,
            });
    },

    putUpdateProduct: async (req, res) => {
        let result = await updateProductByIdService(req.body);
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