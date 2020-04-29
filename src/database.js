const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rent-car-db4', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db is connected')
}).catch((err) => {
    console.log(`error: ${err}`)
});

