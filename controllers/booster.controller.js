const db = require("../models/index.js");
const Booster = db.boosters;

//Create a new post
exports.create = async (req, res) => {
    // create a document (instance of model Post)
    const booster = new Booster({
        name: req.body.name,
        image: req.body.image,
        price:req.body.price,
        unlockedAt: req.body.unlockedAt
    });

    try {
        await booster.save(); // save Tutorial in the database
        console.log(booster)
        res.status(201).json({ success: true, msg: "New booster created.", URL: `/boosters/${booster._id}` });
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
                success: false, msg: err.message || "Ocorreu um erro ao criar este booster"
            });
    }

};

// Receber todos as categorias
exports.findAll = async (req, res) => {
    const id = req.query.id;

    let condition = id ? { id: new RegExp(id, 'i') } : {};

    try {
        let data = await Booster
            .find(condition)
            .exec();
        res.status(200).json({success: true, boosters: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu um erro ao obter os boosters."
        });

    }
};

//Encontrar avatar por id
exports.findById = async (req, res) => {
    try {
        let data = await Booster
            .find({ _id: req.params.id})
            .exec(); 
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Ocorreu um erro ao obter esse booster"
        });

    }
};