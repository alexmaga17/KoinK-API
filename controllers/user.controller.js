const jwt = require("jsonwebtoken"); //JWT tokens creation (sign()) 
const bcrypt = require("bcryptjs"); //password encryption

const config = require("../config/db.config.js");
const db = require("../models");
const User = db.users;
const Avatar = db.avatars;

//Create a new user
exports.create = async (req, res) => {
    // create a document (instance of model Tutorial)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        missions:[
            {
                description:"Ganha 100 coins",
                goal:100,
                reward:50,
                progress:0,
                completed:false
            },
            {
                description:"Joga o RocketPig",
                goal:1,
                reward:25,
                progress:0,
                completed:false
            },
            {
                description:"Joga o Pigzz",
                goal:1,
                reward:25,
                progress:0,
                completed:false
            },
            {
                description:"Joga o Monopólio",
                goal:1,
                reward:25,
                progress:0,
                completed:false
            }
        ],
        password:bcrypt.hashSync(req.body.password,10),
    });
    try {
        if( await User.findOne({email:req.body.email}) || await User.findOne({username:req.body.username}) ){
            return res.status(403).json({success: false, msg: "Esse utilizador já está registado!"})
        }else if(req.body.password.length < 8 ){
            return res.status(403).json({success: false, msg: "Palavra passe muito curta!"})
        }else{
            await user.save();
            res.status(201).json({ success: true, msg: "New user created.", URL: `/users/${user._id}` });
        }
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
                success: false, msg: err.message || "Ocorreu um erro ao criar este utilizador!"
            });
    }

};

// Receber todos os utilizadores
exports.findAll = async (req, res) => {
      try {
        let users = await User.find({})
        .exec();
        res.status(200).json({success: true, users: users});
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
        const user = await User.findById(req.params.userID)
            .exec();
        // no data returned means there is no tutorial in DB with that given ID 
        if (user === null)
            return res.status(404).json({
                success: false, msg: `Cannot find any user with ID ${req.params.userID}.`
            });
        // on success, send the tutorial data
        res.json({ success: true, user: user });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Error retrieving user with ID ${req.params.userID}.`
        });
    }
};


// Atualizar informação de algum utilizador
exports.update = async (req, res) => {
    // validate request body data

    if (!req.body) {
        res.status(400).json({ message: "O corpo da solicitação não pode estar vazio!" });
        return;
    }
    if (req.loggedUserId !== req.params.userID) {
        //console.log(req.loggedUserId);
        return res.status(403).json({
            success: false, msg: "Esta solicitação está disponível apenas para o proprio utilizador"
        });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.userID, req.body,
            {
                returnOriginal: false,
                runValidators: true,
                useFindAndModify: false
            }
        ).exec();

        if (!user)
            return res.status(404).json({
                message: `Não é possível atualizar o usuário com id=${req.params.userID}.`
            });
        res.status(200).json({
            message: `User com id=${req.params.userID} foi atualizado com sucesso.`
        });
    } catch (err) {
        res.status(500).json({
            message: `Erro ao atualizar o user com id=${req.params.userID}.`
        });
    };
}

// Apagar um utilizador
exports.delete = async (req, res) => {
    try{
        const user =  await User.findById(req.params.userID)
        .exec();
        if (user === null){
            return res.status(404).json({
                success: false, msg: `Não foi encontrado nenhum utilizador com o ID ${req.params.userID}.`
            });
        
        }else{
            await User.deleteOne({_id:req.params.userID}).exec();
            res.status(200).json({success: true, msg: `Utilizador com ID ${req.params.userID} removido.`});
        }
    }
    catch (err) {
        res.status(500).json({
            message:
                err.message || "Ocorreu um erro ao eliminar este utilizador."
        });

    }
};

//Adicionar um avatar ao inventário
exports.buyAvatar = async (req, res) => {
    try {
        if (req.loggedUserId !== req.params.userID) {
            console.log(req.loggedUserId);
            return res.status(403).json({
                success: false, msg: "Este pedido está disponível apenas para o proprio utilizador"
            });
        }

        const avatar = await Avatar.findById(req.params.avatarID)
            .exec();

        if (avatar === null) {
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum avatar com ID ${req.params.avatarID}.`
            });
        }

        const user = await User.findById(req.params.userID)
            .exec();


        if (user === null)
            return res.status(404).json({
                success: false, msg: `Não é possível encontrar nenhum utilizador com ID ${req.params.userID}.`
            });

        user.inventory.avatars.push(avatar)
        await user.save()

        res.status(200).json({
            message: `Avatar comprado com sucesso! ${user.inventory.avatars}`
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: `Erro ao recuperar o utilizador com ID ${req.params.userID}.`
        });
    }
};

//Fazer login
exports.login = async (req, res) => {
    try{
        if (!req.body || !req.body.username || !req.body.password)
            return res.status(400).json({ success: false, msg: "Preenche todos oso campos!" });
        const user = await User
        .findOne({ username: req.body.username})
        .exec();
        console.log(user);

        if (!user) return res.status(404).json({ success: false, msg: "Utilizador não encontrado!." });   
        
        const check = bcrypt.compareSync( req.body.password, user.password );
        if (!check) return res.status(401).json({ success:false, accessToken:null, msg:"Credenciais erradas!" });

        const token = jwt.sign({ id: user._id, username:user.username },
            config.SECRET, { expiresIn: '24h' // 24 hours
        });
        console.log("---------------------------");
        console.log('logged in');
        console.log("---------------------------");
        return res.status(200).json({ success: true, accessToken: token, user:user });
            

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
                success: false, msg: err.message || "Ocorreu um erro ao fazer login."
            });
    }
};



