const express = require('express');
const quizzController = require("../controllers/quizz.controller.js");

// express router
let router = express.Router();


router.route('/')
    .get(quizzController.findAll)
    .post(quizzController.create);

router.route('/:id')
    .get(quizzController.findByID)
    // .put(missionController.update)
    // .delete(missionController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Quizzes: what???' });
})

module.exports = router;