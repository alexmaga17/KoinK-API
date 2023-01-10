const express = require('express');
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");


// express router
let router = express.Router();


router.route('/')
    .get(userController.findAll)
    .post(userController.create);

router.route('/login')
    .post(userController.login);    

router.route('/:userID') 
    .get(/*authController.verifyToken,*/ userController.findByID)
 
router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'USERS: what???' });
})

module.exports = router;