const express = require('express');
const dotEnv = require('dotenv')

dotEnv.config()

const app = express();

require('./database');

app.use(express.json());

//routes
app.use(require('./routes/vehicle'));
app.use(require('./routes/rent'));
app.use(require('./routes/summary'));

app.get('/',(req, res) => {
    try {
        res.send({message: 'rent car api'})
    } catch (error) {
        res.status(503).send()
    }
})

module.exports = {
    app
}