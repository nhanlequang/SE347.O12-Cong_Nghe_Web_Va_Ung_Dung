const express = require('express');
const { 
    getAllUser,
    addAddressCtrl,
    deleteUser,
    getAllBuyer,
    updateActiveBuyer,
    saveVoucherBuyer
} = require('../../controller/userController/UserController');
const verify = require('../../middlewares/auth/verify');

const userRoutes = express.Router();

userRoutes.get('/', verify.verifyToken, getAllUser);

userRoutes.delete('/:id', verify.verifyTokenAndAdmin, deleteUser);

userRoutes.put('/addresses/addAddress/:id', addAddressCtrl);

userRoutes.get('/get-all-buyers', getAllBuyer);

userRoutes.post('/update-active-buyer/:id', updateActiveBuyer);

userRoutes.post('/save-voucher-buyer', saveVoucherBuyer);


module.exports = userRoutes;