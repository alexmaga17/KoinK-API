const express = require('express');
const app = express(); 
const port = 3000; 
// const moviesRoute = require('./routes/movies'); 
const usersRoute = require('./routes/users');
const connection = require('./connection/connection')

// Swagger
const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./swagger_conf'); 
expressSwagger(options); 

app.use(express.json());  
// app.use('/movies', moviesRoute);
app.use('/users', usersRoute);


app.listen(port, () => console.log(`listening on port ${port}`));