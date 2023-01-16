/**
 * @typedef Quizz
 * @property {string} title.required
 * @property {array} questions.required
 */

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                title:{type: 'string',required: true},
                questions:{type:'array',required: true},

            },
            { timestamps: false }
        );
    // creates a new model Tutorial using the defined schema above
    const Quizz = mongoose.model("quizz", schema);
    return Quizz;
};