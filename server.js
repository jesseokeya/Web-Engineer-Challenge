require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
const app = express() 

// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;


app.use(logger('dev'))
app.use(cors())

app.use(urlencodedParser);
app.use(jsonParser);

app.use('/api/', router);

const PORT = process.env.PORT || 3001

app.listen(PORT, _ => console.log(`server running on port *${PORT}`))