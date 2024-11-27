const express = require('express')
const router = express.Router()
const multer = require('multer')
const CategoryCTL = require('../Controller/CategoryController')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/Category')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

router.get('/allcategory' ,CategoryCTL.getCategory)
router.post('/addcategory', upload ,CategoryCTL.addCategory)
router.delete('/deletecategory', CategoryCTL.deleteCategory)
router.post('/editcategory', CategoryCTL.editCategory)
router.put('/edit', upload ,CategoryCTL.edit)

module.exports = router