
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Connect to the db
const password = 'dev$7e3';
const encodedPassword = encodeURIComponent(password);
const url = `mongodb://safehomes:${encodedPassword}@127.0.0.1:27017/safehome`;


//Connect methode of mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Connect methode of mongoose
const store = new MongoDBStore({
    uri: url,
    collection: 'sessions',
    

 });
 module.exports = store;
//include employee model

require('./datastructure');