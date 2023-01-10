const db = require("../models/index.js");
const Quizz = db.quizzes;

//Create a new quizz
exports.create = async (req, res) => {
    // create a document (instance of model Quizz)
    const quizz = new Quizz({
        title: req.body.title,
        questions:req.body.questions
    });

    try {
        await quizz.save(); // save Quizz in the database
        console.log(quizz)
        res.status(201).json({ success: true, msg: "New quizz created.", URL: `/quizzes/${quizz._id}` });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        }
        else
            res.status(500).json({
                success: false, msg: err.message || "Ocorreu um erro ao criar este quizz"
            });
    }

};

// Receber todos as categorias
exports.findAll = async (req, res) => {
    try {
      let quizzes = await Quizz.find({})
      .exec();
      res.status(200).json({success: true, quizzes: quizzes});
  }
  catch (err) {
      res.status(500).json({
          success: false, msg: err.message || "Some error occurred while retrieving the users."
      });

  }
};

//Encontrar users por ID
exports.findByID = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.id)
            .exec();
        // no data returned means there is no tutorial in DB with that given ID 
        if (quizz === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any quizz with ID ${req.params.id}.`
            });
        // on success, send the tutorial data
        res.json({ success: true, quizz: quizz });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving quizz with ID ${req.params.id}.`
        });
    }
};
