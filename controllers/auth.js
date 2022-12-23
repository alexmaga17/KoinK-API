const jwt = require("jsonwebtoken"); 

exports.verifyToken = (req, res, next) => {
    // search token in headers most commonly used for authorization
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header == 'undefined')
        return res.status(401).json({ 
            success: false, 
            msg: "No token provided!"
        });

    const bearer = header.split(' '); // Authorization: Bearer <token>
    //const token = bearer[1];
    let token = "";
    if(bearer[1]){
        token = bearer[1];
    }else{
        token = bearer[0];
    }
    
    try {
        let decoded = jwt.verify(token, "my-API-ultra-secure-and-ultra-long-secret");
        req.loggedUserId = decoded.id; // save user ID and role into request object
        req.loggedUsername = decoded.username; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }
};
