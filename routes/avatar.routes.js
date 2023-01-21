const express = require('express');
const avatarController = require("../controllers/avatar.controller.js");
const authController = require("../controllers/auth.controller.js");

// express router
let router = express.Router();
/**
 * @route POST /avatars
 * @group Avatars
 * @param {object} object.body - Avatar - eg. {"name":"avatar 2","image":"image.svg","price":200,"unlockedAt":2}
 * @returns {object} 200 - New avatar
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 
/**
 * @route GET /avatars
 * @group Avatars
 * @returns {object} 200 - An array of all avatars info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */

router.route('/')
    .get(avatarController.findAll)
    .post(avatarController.create);

/**
 * @route GET /avatars/{avatarID}
 * @group Avatars
 * @param {string} avatarID.path - avatarID
 * @returns {object} 200 - An array of a specific avatar info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 
 
/**
 * @route PUT /avatars/{avatarID}
 * @group Avatars
 * @param {string} avatarID.path - avatarID
 * @returns {object} 200 - An array of a specific avatar info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

/**
 * @route DELETE /avatars/{avatarID}
 * @group Avatars
 * @param {string} avatarID.path - avatarID
 * @returns {object} 200 - Avatar removed with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */     

router.route('/:id')
        .get(avatarController.findById)
        .put(authController.verifyToken, avatarController.update)
        .delete(authController.verifyToken, avatarController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Avatars: what???' });
})

module.exports = router;