const express = require('express');
const app = express();
require('dotenv').config();
require('./database');

app.use(express.json());
app.set('port', process.env.PORT || 3000);


//routes

app.use(require('./routes/vehicle'));
app.use(require('./routes/rent'));
app.use(require('./routes/summary'));



app.listen(app.get('port'), () => {
    console.log('server running on port ' + app.get('port'));
});