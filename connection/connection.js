const mongoose = require('mongoose'); 

let connection = mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority', {useNewUrlParser: true }).then((success) => {
    console.log('success');
}).catch((error) => {
    console.log(error)
})

exports.connection = connection; 