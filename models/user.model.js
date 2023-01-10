module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                username:{ type: 'string', required: true},
                email:{ type: 'string', required:true},
                password:{ type: 'string', required:true},
                curr_avatar:{ type: 'string'},
                inventory:{},
                level:{},
                stats:{},
                missions:{type:'array', default:[]},
                coins:{type: 'number'},
                ranking:{type: 'number'},
                lives:{type: 'number', min:0, max: 4},
                sound:{type: 'boolean'},
            }
        );
    // creates a new model Tutorial using the defined schema above
    const User = mongoose.model("user", schema);
    return User;
};