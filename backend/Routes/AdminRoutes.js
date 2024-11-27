const express = require('express')
const router = express.Router()
const AdminCTL = require('../Controller/AdminController')

router.post('/signup' ,AdminCTL.addAdmin)
router.post('/login', AdminCTL.loginAdmin)


module.exports = router