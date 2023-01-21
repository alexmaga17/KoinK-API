const db = require("../models/index.js");
const Mission = db.missions;


exports.create = async (req, res) => {

    const mission = new Mission({
        description:req.body.description,
        goal:req.body.goal,
        reward:req.body.reward
    });

    try {
        await mission.save();
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

exports.findById = async (req, res) => {
    try {
        let data = await Mission
            .find({ missin: req.params.missionID})
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

exports.update = async (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "O corpo da solicitação não pode estar vazio!" });
        return;
    }
    try {
        const mission = await Mission.findByIdAndUpdate(req.params.missionID, req.body,
            {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }
        ).exec();

        if (!mission)
            return res.status(404).json({
                message: `Não é possível atualizar o usuário com id=${req.params.missionID}.`
            });
        res.status(200).json({
            message: `Quizz com id=${req.params.missionID} foi atualizado com sucesso.`
        });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao atualizar o quizz com id=${req.params.missionID}.`
        });
    };
};

exports.delete = async (req, res) => {
    try{
        const mission =  await Mission.findById(req.params.missionID)
        .exec();
        if (mission === null){
            return res.status(404).json({
                success: false, msg: `Não foi encontrado nenhum quizz com o ID ${req.params.missionID}.`
            });
        
        }else{
            await Mission.deleteOne({_id:req.params.missionID}).exec();
            res.status(200).json({success: true, msg: `Missão com ID ${req.params.missionID} removido.`});
        }
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Ocorreu um erro ao eliminar este missão."
        });

    }
};
