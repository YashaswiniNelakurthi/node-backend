const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');
const path = require('path');
// const cors = require('cors');

mongoose.connect(config.get('VA.dbConfig.dbURL'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
db.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

const port = config.get('VA.port') || 3002;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded form data
app.use(express.json());
// app.use('/', express.static(path.join(__dirname, '/public'))); //serve static files

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Accept-Control-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({

        })
    }
    next();    
})

app.get('/', (req, res)=>{
    res.send('default route');
});

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;