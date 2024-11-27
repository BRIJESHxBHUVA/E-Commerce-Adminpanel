const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const path = require('path')
const db = require('./Database/db')

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.use('/admin', require('./Routes/AdminRoutes'))
app.use('/category', require('./Routes/CategoryRoutes'))
app.use('/product', require('./Routes/ProductRoutes'))

app.use('/Images', express.static(path.join(__dirname, 'Images')))
app.use('/Images/Category', express.static(path.join(__dirname, 'Images/Category')))
app.use('/Images/Product', express.static(path.join(__dirname, 'Images/Product')))

app.listen(port, (err)=> {
    if(err){
        console.log('Server Starting Error', err)
    }else{
        console.log(`Server Starting on Port ${port}`)
    }
})