const jwt = require('jsonwebtoken')
const Admin = require('../Model/AdminSchema')

module.exports.verifyToken = async (req, res, next)=> {
    const token = res.header('Authorization')?.replace('Bearer ', '')
    if(!token){
        res.status(401).json({success: false, message: 'Access Denied. No token provided.'})
    }
    try {
        const verified = jwt.verify(token, 'admin')
        req.user = await Admin.findById(verified.id)
        next()
    } catch (error) {
        res.status(400).json({success: false, message: 'Invalid Token', error})
    }
}