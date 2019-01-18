const express = require('express');

const app = express();

const router = require('./routes');

app.use('/', router);

app.listen(4000, () => {
    console.log('port 4000');
});


