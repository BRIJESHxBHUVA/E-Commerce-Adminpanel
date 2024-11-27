const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bhuvabrijesh14:Cga0r3ZKZaBoJe4E@cluster0.452vb.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce Adminpanel')

const db = mongoose.connection;

db.once('open', (err)=> {
    if(err){
        console.log('Database connection error', err)
    }else{
        console.log('Database connection successfully.')
    }
})

module.exports = db



// Password: Cga0r3ZKZaBoJe4E
// Username: bhuvabrijesh14

// mongodb+srv://bhuvabrijesh14:Cga0r3ZKZaBoJe4E@cluster0.452vb.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce Adminpanel