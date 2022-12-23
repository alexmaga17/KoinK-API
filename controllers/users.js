const jwt = require("jsonwebtoken"); //JWT tokens creation (sign()) 
const bcrypt = require("bcryptjs"); //password encryption

const User = require('../models/users').user

//Registar cliente
exports.create = async (req, res) => {
    // create a document (instance of model Tutorial)
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        nif: req.body.nif,
        local: req.body.local,
        username: req.body.username,
        password:bcrypt.hashSync(req.body.password,10),
    });
    try {
        await user.save();
        res.status(201).json({ success: true, msg: "New user created.", URL: `/users/${user._id}` });
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
                success: false, msg: err.message || "Ocorreu um erro ao criar este utilizador"
            });
    }

};

// Fazer login
exports.login = async (req, res) => {
    try{
        if (!req.body || !req.body.username || !req.body.password)
            return res.status(400).json({ success: false, msg: "Must provide username and password." });
        
        const user = await User
        .findOne({ username: req.body.username})
        .exec();
        console.log(user);

        if (!user) return res.status(404).json({ success: false, msg: "User not found." });   
        
        const check = bcrypt.compareSync( req.body.password, user.password );
        if (!check) return res.status(401).json({ success:false, accessToken:null, msg:"Invalid credentials!" });

        const token = jwt.sign({ id: user.id, username:user.username },
            "my-API-ultra-secure-and-ultra-long-secret", { expiresIn: '24h' // 24 hours
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
                success: false, msg: err.message || "Some error occurred while loggin in."
            });
    }
};

//Encontrar por ID
exports.getById = async (req, res) => {

    User.find({_id:req.params.id}).then((result)=>{
        if(result) {
            res.status(200).json(result)
        } else {
            res.status(404).send('not found') 
        }
    }).catch((err)=> {
        res.status(400).send('error')
    })
};

//Editar dados
exports.updateById = function(req, res) {

    if(!req.body)
    return res.status(404).json({
        success: false, msg: `You have to provide new stuff!`
    });
    else{
        const user = User.findByIdAndUpdate (req.params.id,req.body,{
            runValidators:true,
            useFindAndModify:false
        }).exec();
    // on success, send the post data
    res.json({ success: true, user: user});
    }
}

// Listar todos os clientes
exports.listAll = function(req, res) {

    User.find({}).then((result)=>{
        if(result) {
            res.status(200).json(result)
        } else {
            res.status(404).send('not found') 
        }
    }).catch((err)=> {
        res.status(400).send('error')
    })
}

//Apagar info de cliente
exports.deleteById = function(req, res) {

    User.deleteOne({_id:req.params.id}).then((result)=>{
        if(result) {
            res.status(200).json(result)
        } else {
            res.status(404).send('not found') 
        }
    }).catch((err)=> {
        res.status(400).send('error')
    })
}


