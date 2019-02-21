const express =require('express')
const router = require('./router')

const app = new express()

app.use('/', router);

app.listen(3000, () => console.log('3000 listen'));
