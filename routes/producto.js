const express = require('express');
const app = express();

app.post('/', (req, res) => {

    console.log(req.body);

    res.status(200).json({
        message: 'ok'
    })

})

module.exports = app;