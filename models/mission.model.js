/**
 * @typedef Mission
 * @property {string} description.required
 * @property {string} goal.required
 * @property {string} reward.required
 */

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                description:{type: 'string',required: true},
                goal:{type: 'string',required: true},
                reward:{type: 'string',required: true}
            },
            { timestamps: false }
        );
    // creates a new model Tutorial using the defined schema above
    const Mission = mongoose.model("mission", schema);
    return Mission;
};