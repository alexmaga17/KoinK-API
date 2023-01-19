const express = require('express');
const boosterController = require("../controllers/booster.controller.js");

// express router
let router = express.Router();


router.route('/')
    .get(boosterController.findAll)
    .post(boosterController.create);

router.route('/:id')
     .get(boosterController.findById)

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Boosters: what???' });
})

module.exports = router;