const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors');
const morgan = require('morgan')
const helmet = require('helmet');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');  //e.g. of custom middleware
const home = require('./routes/home');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
//const movies1 = require('./routes/movies-1');
const mongodb = require('./mongo-vidly');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use('/', home);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
//app.use('/api/movies', movies1);

//app.use(logger);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled ...')
}

console.log(`The environment Name : ${config.get('name')}`);
console.log(`The database is hosted on : ${config.get('database.host')} and the password is ${config.get('database.password')}`);


const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));
mongodb();