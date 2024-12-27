const {
    createUserService,
    getUserByNameService,
    getAllUserService,
    updateUserByIdService,
    deleteUserByIdService
} = require('../services/userService')

module.exports = {
    postCreateUser: async (req, res) =>   {
        let result = await createUserService(req.body);
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

    getUserByName: async (req, res) =>  {
        let result = await getUserByNameService(req.body);
        if (result)
            return res.status(200).json({
                EC: 0,
                data: result
            });
        else
            return res.status(200).json({
                EC: -1,
                data: result,
                des: "Username or password is wrong!"
            });
    },

    getAllUser: async (req, res) => {
        let result = await getAllUserService(req.query);
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

    deleteUser: async (req, res) => {
        let userId = req.body.id;
        let result = await deleteUserByIdService(userId);
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

    putUpdateUser: async (req, res) => {
        let result = await updateUserByIdService(req.body);
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
