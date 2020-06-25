const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

require('./db_queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', apiRouter);

app.listen(3000, () => {
    console.log("It's alive!");
});

