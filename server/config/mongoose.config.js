const mongoose = require("mongoose")
const DB_NAME = "authors_db";

mongoose.connect("mongodb://localhost/" + DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`esatablished ${DB_NAME}`))
    .catch(errorObj => console.log(`something went wrong`, errorObj))