const db = require("../models/index.js");
const Level = db.levels;

//Create a new level
exports.create = async (req, res) => {

    const level = new Level({
        number:req.body.number,
        xpToNext:req.body.xpToNext,
    });

    try {
        await level.save(); 
        console.log(level)
        res.status(201).json({ success: true, msg: "New level created.", URL: `/levels/${level._id}` });
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
                success: false, msg: err.message || "Ocorreu um erro ao criar este nível"
            });
    }

};

// Receber todos os níveis
exports.findAll = async (req, res) => {

    try {
        let data = await Level
            .find({})
            .exec();
        res.status(200).json({success: true, levels: data});
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || "Ocorreu um erro ao obter os níveis."
        });

    }
};
