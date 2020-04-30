const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db is connected')
}).catch((err) => {
    console.log(`error: ${err}`)
});

