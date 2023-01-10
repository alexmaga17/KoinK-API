const db = require("../models/index.js");
const Avatar = db.avatars;

//Create a new post
exports.create = async (req, res) => {
    // create a document (instance of model Post)
    const avatar = new Avatar({
        name: req.body.name,
        image: req.body.image,
        price:req.body.price,
        unlockedAt: req.body.unlockedAt
    });

    try {
        await avatar.save(); // save Tutorial in the database
        console.log(avatar)
        res.status(201).json({ success: true, msg: "New avatar created.", URL: `/avatars/${avatar._id}` });
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
                success: false, msg: err.message || "Ocorreu um erro ao criar este avatar"
            });
    }

};

// Receber todos as categorias
exports.findAll = async (req, res) => {
    const id = req.query.id;

    let condition = id ? { id: new RegExp(id, 'i') } : {};

    try {
        let data = await Avatar
            .find(condition)
            .exec();
        res.status(200).json({success: true, avatars: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu um erro ao obter os avatars."
        });

    }
};

//Encontrar avatar por id
exports.findById = async (req, res) => {
    try {
        let data = await Avatar
            .find({ _id: req.params.id})
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