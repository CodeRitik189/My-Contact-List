const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactlist_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'eroor in connecting'));
//up and running then print the message
db.once('open',function(){
    console.log('successfully connected to the databse');
})