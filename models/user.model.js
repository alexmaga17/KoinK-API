/**
 * @typedef User
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} curr_avatar
 * @property {object} inventory
 * @property {object} level
 * @property {object} stats
 * @property {array} missions
 * @property {number} coins
 * @property {number} ranking
 * @property {number} lives
 * @property {boolean} sound
 */

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                username:{ type: 'string', required: true},
                email:{ type: 'string', required:true},
                password:{ type: 'string', required:true},
                curr_avatar:{ type: 'string', default:""},
                inventory:{
                    avatars:{ type: 'array', default:[]},
                    boosters:{ type: 'array', default:[]}
                },
                level:{
                    number:{ type: 'number', default:1},
                    experience:{ type: 'number', default:0}
                },
                stats:{
                    highscores:{
                        rocketpig:{ type: 'number', default:0},
                        pigzz:{ type: 'number', default:0}
                    }
                },
                missions:{type:'array', default:[]},
                coins:{type: 'number', default:0},
                ranking:{type: 'number',default:1},
                lives:{type: 'number', min:0, max: 4, default:4},
                sound:{type: 'boolean', default:true},
            }
        );
    // creates a new model Tutorial using the defined schema above
    const User = mongoose.model("user", schema);
    return User;
};