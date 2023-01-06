const db = require("../models/index.js");
const Mission = db.missions;

//Create a new post
exports.create = async (req, res) => {
    // create a document (instance of model Post)
    const mission = new Mission({
        description:req.body.description,
        goal:req.body.goal,
        reward:req.body.reward
    });

    try {
        await mission.save(); // save Tutorial in the database
        console.log(mission)
        res.status(201).json({ success: true, msg: "New mission created.", URL: `/missions/${mission._id}` });
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
                success: false, msg: err.message || "Ocorreu um erro ao criar esta missão"
            });
    }

};

// Receber todos as categorias
exports.findAll = async (req, res) => {
    const id = req.query.id;

    let condition = id ? { id: new RegExp(id, 'i') } : {};

    try {
        let data = await Mission
            .find(condition)
            .exec();
        res.status(200).json({success: true, missions: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu um erro ao obter as missões."
        });

    }
};

//Encontrar categoria por nome
exports.findById = async (req, res) => {
    try {
        let data = await Mission
            .find({ missin: req.params.id})
            .exec(); 
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Some error occurred while retrieving that category"
        });

    }
};

// //Atualizar informação de categoria
// exports.update = async (req, res) => {
//     res.status(200).json({success: true, msg:'SUCESSO'});
// };

// //Apagar uma categoria
// exports.delete = async (req, res) => {
//     res.status(200).json({success: true, msg:'SUCESSO'});
// };