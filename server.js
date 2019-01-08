require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express() 

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(logger('dev'))
app.use(cors())

app.use(urlencodedParser);
app.use(jsonParser);

app.use('/api/', router);

const PORT = process.env.PORT || 3002

app.listen(PORT, _ => console.log(`server running on port *${PORT}`))