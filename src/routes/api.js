const express = require('express');
const routerAPI = express.Router();
const {
    postCreateProduct,
    getAllProduct,
    deleteProduct,
    putUpdateProduct
} = require('../controller/productController.js');

const {
    postCreateCart,
    getAllCart,
    deleteCart,
    putUpdateCart
} = require('../controller/cartController.js');

const {
    postCreateInventory,
    getAllInventory,
    deleteInventory,
    putUpdateInventory
} = require('../controller/inventoryController.js');

const {
    postCreateOrder,
    getAllOrder,
    putUpdateOrder,
    deleteOrder
} = require('../controller/orderController.js');

const {
    postCreateUser,
    getUserByName,
    getAllUser,
    deleteUser,
    putUpdateUser
} = require('../controller/userController.js')

routerAPI.get('/test', (req, res) => {
    res.send('test api');
});

//Product
routerAPI.post('/product', postCreateProduct);
routerAPI.get('/product', getAllProduct);
routerAPI.delete('/product', deleteProduct);
routerAPI.put('/product', putUpdateProduct);

//Cart
routerAPI.post('/cart', postCreateCart);
routerAPI.get('/cart', getAllCart);
routerAPI.delete('/cart', deleteCart);
routerAPI.put('/cart', putUpdateCart);

//Inventory
routerAPI.post('/inventory', postCreateInventory);
routerAPI.get('/inventory', getAllInventory);
routerAPI.delete('/inventory', deleteInventory);
routerAPI.put('/inventory', putUpdateInventory);

//Order
routerAPI.post('/order', postCreateOrder);
routerAPI.get('/order', getAllOrder);
routerAPI.delete('/order', deleteOrder);
routerAPI.put('/order', putUpdateOrder);

//Signup
routerAPI.post('/signup', postCreateUser);
//Login
routerAPI.get('/login', getUserByName);
//Customer
routerAPI.get('/user', getAllUser);
routerAPI.delete('/user', deleteUser);
routerAPI.put('/user', putUpdateUser);

module.exports = routerAPI;