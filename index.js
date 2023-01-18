require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;	 	
//const host = process.env.HOST; 	

// const corsOptions = {
//     origin: "http://localhost:8080"
// };

const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./swagger_conf'); 
expressSwagger(options); 

app.use(cors());
app.use(express.json());
// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to KoinK REST API' });
});

// routing middleware
app.use('/users', require('./routes/user.routes.js'))
app.use('/quizzes', require('./routes/quizz.routes.js'))
app.use('/missions', require('./routes/mission.routes.js'))
app.use('/avatars', require('./routes/avatar.routes.js'))
app.use('/levels', require('./routes/level.routes.js'))


// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})
app.listen(port, () => console.log(`App listening on PORT ${port}`));
//app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));
