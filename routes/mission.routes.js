const express = require('express');
const missionController = require("../controllers/mission.controller.js");

// express router
let router = express.Router();


router.route('/')
    .get(missionController.findAll)
    .post(missionController.create);

router.route('/:id')
    .get(missionController.findById)
    // .put(missionController.update)
    // .delete(missionController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' MISSIONS: what???' });
})

module.exports = router;