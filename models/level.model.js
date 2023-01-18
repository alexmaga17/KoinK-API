/**
 * @typedef Level
 * @property {number} number.required
 * @property {number} xpToNext.required
 */


module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                number:{type: 'number',required: true},
                xpToNext:{type: 'number',required: true}
            },
            { timestamps: false }
        );
    // creates a new model Tutorial using the defined schema above
    const Level = mongoose.model("level", schema);
    return Level;
};