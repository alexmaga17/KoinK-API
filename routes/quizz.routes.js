const express = require('express');
const quizzController = require("../controllers/quizz.controller.js");

// express router
let router = express.Router();

/**
 * @route POST /quizzes
 * @group Quizzes
 * @param {object} object.body - Quizz - eg. {"title":"quizz3","questions":[]}
 * @returns {object} 200 - New quizz
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
    */ 

/**
 * @route GET /quizzes
 * @group Quizzes
 * @returns {object} 200 - An array of all quizzes info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */

router.route('/')
    .get(quizzController.findAll)
    .post(quizzController.create);

/**
 * @route GET /quizzes/{quizzID}
 * @group Quizzes
 * @param {string} quizzID.path - quizzID
 * @returns {object} 200 - An array of a specific quizz info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */   

/**
 * @route PUT /quizzes/{quizzID}
 * @group Quizzes
 * @param {string} quizzID.path - quizzID
 * @returns {object} 200 - An array of a specific quizz info
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */ 

/**
 * @route DELETE /quizzes/{quizzID}
 * @group Quizzes
 * @param {string} quizzID.path - quizzID
 * @returns {object} 200 - Quizz removed with success
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 401 - Invalid Token
 * @security Bearer
  */     

router.route('/:quizzID')
    .get(quizzController.findByID)
    .put(quizzController.update)
    .delete(quizzController.delete);

router.all('*', function (req, res) {
    //send an predefined error message 
    res.status(404).json({ message: 'Quizzes: what???' });
})

module.exports = router;