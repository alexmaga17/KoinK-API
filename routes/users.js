const express = require('express'); 
const { body, validationResult } = require('express-validator')
const router = express.Router()
const controller = require('../controllers/users')
const auth = require('../controllers/auth.js')

/**
 * @route POST /users/login
 * @group Users
 * @param {object} object.body - User - eg. {"username": "alex", "password": 2008}
 * @returns {object} 200 - Token and user info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */

 router.route('/login')
 .post(controller.login); 

/**
 * @route POST /users/register
 * @group Users
 * @param {object} object.body - User - eg. {"name":"alex", "email":"alex@gmail.com","username": "alex", "password": 2008}
 * @returns {object} 200 - New user
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */ 

router.route('/register') 
    .post(controller.create);

/**
 * @route PUT /users/update
 * @group Users
 * @param {string} id.path - Client ID
 * @param {object} object.body -  Update User - eg. {"local": "porto"}
 * @returns {object} 200 - Update made
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */  

 router.route('/:id').put(auth.verifyToken, function(req, res) {
    controller.updateById(req, res)
})

/**
 * @route GET /users
 * @group Users
 * @returns {object} 200 - Sucess - an array of clients
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */  

 router.route('/').get(function(req, res) {
    controller.listAll(req, res)
})

/**
 * @route DELETE /users/{id}
 * @group Users
 * @param {string} id.path - User Id
 * @returns {object} 200 - Client deleted
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */ 

 router.route('/:id').delete(auth.verifyToken, function(req, res) {
    controller.deleteById(req, res)
})

/**
 * @route GET /users/{id}
 * @group Users
 * @param {string} id.path - User Id
 * @returns {object} 200 - Client deleted
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
 */ 

 router.route('/:id').get(auth.verifyToken, function(req, res) {
    controller.getById(req, res)
})

module.exports = router; 