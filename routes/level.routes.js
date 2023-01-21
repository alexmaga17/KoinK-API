const express = require('express');
const levelController = require("../controllers/level.controller.js");

// express router
let router = express.Router();

/**
 * @route POST /levels
 * @group Levels
 * @param {object} object.body - Level - eg. {"number":"2","xpToNext":500}
 * @returns {object} 200 - New level
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 

/**
 * @route GET /levels
 * @group Levels
 * @returns {object} 200 - An array of all levels info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */
router.route('/')
    .get(levelController.findAll)
    .post(levelController.create);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Levels: what???' });
})

module.exports = router;