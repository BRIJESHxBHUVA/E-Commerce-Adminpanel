const Admin = require('../Model/AdminSchema')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const path = require('path')
const fs = require('fs')

module.exports.addAdmin = async(req, res)=> {
    try {
        const useremail = await Admin.findOne({email: req.body.email})

        if(useremail){
            return res.status(400).json({success: false, message: 'Email already exist.'})
        }

        if(req.file){
            req.body.image = req.file.filename
        }

        req.body.createdAT = moment().format('LLLL')

        const data = await Admin.create(req.body)
        res.status(200).json({success: true, message: 'Admin Register Successfully.', data})

    } catch (error) {
        res.status(400).json({success: false, message: 'Signup error ', error})
    }
}

module.exports.loginAdmin = async (req, res)=> {
    try {
        const user = await Admin.findOne({email: req.body.email})
        if(user){
            if(user.password === req.body.password){
                const token = jwt.sign({id: user._id}, 'admin', {expiresIn: '5h'}) 
                res.status(200).json({success: true, message: 'Login Successfully. ', token, user})
            }else{
                res.status(400).json({success: false, message: 'Invalid password'})
            }
        }else{
            res.status(400).json({success: false, message: "Invalid email address."})
        }
    } catch (error) {
        res.status(400).json({success: false, message: 'Admin login error ', error})
    }
}
