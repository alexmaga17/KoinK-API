const db = require("../models/index.js");
const Quizz = db.quizzes;

//Criar um novo quizz
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

// Receber todos os quizzes
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

//Encontrar quizz por ID
exports.findByID = async (req, res) => {
    try {
        const quizz = await Quizz.findById(req.params.quizzID)
            .exec();
        // no data returned means there is no tutorial in DB with that given ID 
        if (quizz === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any quizz with ID ${req.params.quizzID}.`
            });
        // on success, send the tutorial data
        res.json({ success: true, quizz: quizz });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving quizz with ID ${req.params.quizzID}.`
        });
    }
};

// Atualizar informação de algum quizz
exports.update = async (req, res) => {
    // validate request body data

    if (!req.body) {
        res.status(400).json({ message: "O corpo da solicitação não pode estar vazio!" });
        return;
    }
    try {
        const quizz = await Quizz.findByIdAndUpdate(req.params.quizzID, req.body,
            {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }
        ).exec();

        if (!quizz)
            return res.status(404).json({
                message: `Não é possível atualizar o usuário com id=${req.params.quizzID}.`
            });
        res.status(200).json({
            message: `Quizz com id=${req.params.quizzID} foi atualizado com sucesso.`
        });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao atualizar o quizz com id=${req.params.quizzID}.`
        });
    };
}

// Apagar um quizz
exports.delete = async (req, res) => {
    try{
        const quizz =  await Quizz.findById(req.params.quizzID)
        .exec();
        if (quizz === null){
            return res.status(404).json({
                success: false, msg: `Não foi encontrado nenhum quizz com o ID ${req.params.quizzID}.`
            });
        
        }else{
            await Quizz.deleteOne({_id:req.params.quizzID}).exec();
            res.status(200).json({success: true, msg: `Quizz com ID ${req.params.quizzID} removido.`});
        }
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Ocorreu um erro ao eliminar este quizz."
        });

    }
};
