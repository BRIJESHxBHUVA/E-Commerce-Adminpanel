const express = require('express')
const router = express.Router()
const AdminCTL = require('../Controller/AdminController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images/Admin')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

router.post('/signup', upload ,AdminCTL.addAdmin)
router.post('/login', AdminCTL.loginAdmin)


module.exports = router