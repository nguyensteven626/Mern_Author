const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8000;

//------middleware---------
app.use(cors());
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// require("./config/mongoose.config");
require("./config/mongoose.config");

// const AllMyJokeRoutes = require("./routes/joke.routes");
// AllMyJokeRoutes(app);
//or
require('./routes/author.routes')(app);

app.listen(PORT, () => console.log('>>Server Started at PORT 8000<<'))//always at the end of server.js 
