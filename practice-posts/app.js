const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const app = new express()

app.use(bodyParser.json())
app.use('/', router);

app.listen(3000, () => console.log('3000 listen'));
