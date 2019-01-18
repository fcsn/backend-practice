const express = require('express');
const router = express.Router();
const jsonData = require('./data.json');

const MaskMan = require('maskman.js').MaskMan;
const snake_case = require('maskman.js').snake_case;
const camelCase = require('maskman.js').camelCase;

const objectCamelCase = {nodeSns: 'node'}

const result = MaskMan.convert(objectCamelCase).to(snake_case);

router.get('/', function(req, res) {
    console.log(result)
    res.json(jsonData);
});

module.exports = router;
