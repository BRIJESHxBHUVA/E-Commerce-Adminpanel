const express = require('express')
const router = express.Router()
const multer = require('multer')
const ProductCTL = require('../Controller/ProductController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images/Product')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

router.post('/addproduct', upload, ProductCTL.addProduct)
router.get('/allproduct', ProductCTL.allProduct)
router.delete('/deleteproduct', ProductCTL.deleteProduct)


module.exports = router