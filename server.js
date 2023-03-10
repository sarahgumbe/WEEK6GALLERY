const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database

const MONGODB_URI = 'mongodb://SGumbe:Ziza2015.@ac-yk8mriz-shard-00-00.dxfb7mn.mongodb.net:27017,ac-yk8mriz-shard-00-01.dxfb7mn.mongodb.net:27017,ac-yk8mriz-shard-00-02.dxfb7mn.mongodb.net:27017/?ssl=true&replicaSet=atlas-1d1hbr-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })




// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;