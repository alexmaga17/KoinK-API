const express = require('express');
const boosterController = require("../controllers/booster.controller.js");
const authController = require("../controllers/auth.controller.js");

// express router
let router = express.Router();

/**
 * @route POST /boosters
 * @group Boosters
 * @param {object} object.body - Booster - eg. {"name":"booster 2","image":"image.svg","price":200,"unlockedAt":2}
 * @returns {object} 200 - New booster
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 
/**
 * @route GET /boosters
 * @group Boosters
 * @returns {object} 200 - An array of all boosters info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */

router.route('/')
    .get(boosterController.findAll)
    .post(boosterController.create);

/**
 * @route GET /boosters/{boosterID}
 * @group Boosters
 * @param {string} boosterID.path - boosterID
 * @returns {object} 200 - An array of a specific booster info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 
 
/**
 * @route PUT /booters/{boosterID}
 * @group Boosters
 * @param {string} boosterID.path - boosterID
 * @returns {object} 200 - An array of a specific booster info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

/**
 * @route DELETE /booters/{boosterID}
 * @group Boosters
 * @param {string} boosterID.path - boosterID
 * @returns {object} 200 - Booster removed with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */     


router.route('/:boosterID')
     .get(boosterController.findById)
     .put(authController.verifyToken, boosterController.update)
     .delete(authController.verifyToken, boosterController.delete);
router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Boosters: what???' });
})

module.exports = router;