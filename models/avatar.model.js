module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                name:{type: 'string',required: true},
                image:{type: 'string',required: true},
                price:{type: 'number',required: true},
                unlockedAt:{type: 'number',required: true}
            },
            { timestamps: false }
        );
    // creates a new model Tutorial using the defined schema above
    const Avatar = mongoose.model("avatar", schema);
    return Avatar;
};