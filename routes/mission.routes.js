const express = require('express');
const missionController = require("../controllers/mission.controller.js");

// express router
let router = express.Router();
/**
 * @route POST /missions
 * @group Missions
 * @param {object} object.body - Mission - eg. {"description":"mission 2","goal":500,"reward":550}
 * @returns {object} 200 - New mission
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 
/**
 * @route GET /missions
 * @group Missions
 * @returns {object} 200 - An array of all missions info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */
router.route('/')
    .get(missionController.findAll)
    .post(missionController.create);

/**
 * @route GET /missions/{id}
 * @group Users
 * @param {string} id.path - id
 * @returns {object} 200 - An array of a specific mission info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */       

router.route('/:id')
    .get(missionController.findById)
    // .put(missionController.update)
    // .delete(missionController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'MISSIONS: what???' });
})

module.exports = router;