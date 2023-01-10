const express = require('express');
const avatarController = require("../controllers/avatar.controller.js");

// express router
let router = express.Router();


router.route('/')
    .get(avatarController.findAll)
    .post(avatarController.create);

router.route('/:id')
     .get(avatarController.findById)
    // .put(missionController.update)
    // .delete(missionController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: ' Avatars: what???' });
})

module.exports = router;