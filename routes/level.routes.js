const express = require('express');
constlevelController = require("../controllers/level.controller.js");

// express router
let router = express.Router();


router.route('/')
    .get(levelController.findAll)
    .post(alevelontroller.create);

router.route('/:id')
     .get(levelController.findById)

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Levels: what???' });
})

module.exports = router;