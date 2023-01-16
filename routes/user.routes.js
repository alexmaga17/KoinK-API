const express = require('express');
const userController = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");


// express router
let router = express.Router();

/**
 * @route POST /users
 * @group Users
 * @param {object} object.body - User - eg. {"username":"jose","email":"jose@gmail.com","password":"12345678"}
 * @returns {object} 200 - New user
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 

/**
 * @route GET /users/
 * @group Users
 * @returns {object} 200 - An array of all users info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */

router.route('/')
    .get(userController.findAll)
    .post(userController.create);

/**
 * @route POST /users/login
 * @group Users
 * @param {object} object.body - User - eg. {"username": "joao", "password": "12345678"}
 * @returns {object} 200 - Token and user info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */    

router.route('/login')
    .post(userController.login); 
    
/**
 * @route GET /users/{userID}
 * @group Users
 * @param {string} userID.path - userID
 * @returns {object} 200 - An array of a specific user info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */   

/**
 * @route PUT /users/{userID}
 * @group Users
 * @param {string} userID.path - userID
 * @returns {object} 200 - An array of a specific user info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

/**
 * @route DELETE /users/{userID}
 * @group Users
 * @param {string} userID.path - userID
 * @returns {object} 200 - User removed with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

router.route('/:userID') 
    .get(authController.verifyToken, userController.findByID)
    .put(authController.verifyToken, userController.update)
    .delete(authController.verifyToken, userController.delete);

/**
 * @route PUT /users/{userID}/avatars/{avatarID}
 * @group Users
 * @param {string} userID.path - userID
 * @param {string} avatarID.path - avatarID
 * @returns {object} 200 - An array of the user´s avatars
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

router.route('/:userID/avatars/:avatarID')
    .put(authController.verifyToken, userController.buyAvatar);    
 
router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'USERS: what???' });
})

module.exports = router;