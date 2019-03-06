const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session');

const app = new express()

app.use(bodyParser.json())
app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}))
app.use('/', router)

app.get('/', function(req, res){
    let sess = req.session
    sess.username = 'velopert'
    console.log(sess.username)
});

module.exports = app;
