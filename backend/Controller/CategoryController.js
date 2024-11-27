const Category = require('../Model/CategorySchema')
const fs = require('fs')
const path = require('path')

module.exports.addCategory = async(req, res)=> {
    try {
        const prevcategory = await Category.findOne({category: req.body.category})
        if(prevcategory){
            res.status(400).json({success: false, message: 'Category already exist.'})
        }

        if(req.file){
            req.body.image = req.file.filename
        }

        const data = await Category.create(req.body)
        res.status(200).json({success: true, message: 'Category added successfully.', data})

    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while add categoey ',error})
    }
}

module.exports.getCategory = async(req, res)=> {
    try {
        const data = await Category.find({})
        if(data.length <= 0) {
           return res.status(404).json({success: false, message: 'Category not found'})
        }
        res.status(200).json({success: true, message: 'Category get successfully. ', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while get category ', error})
    }
}

module.exports.deleteCategory = async(req, res)=> {
    try {
        const categoryImage = await Category.findById(req.query.id)

        if(categoryImage.image){
            const oldImage = path.join(__dirname, '../Images/Category/', categoryImage.image)
            fs.unlinkSync(oldImage)
        }

        const data = await Category.findByIdAndDelete(req.query.id)
        res.status(200).json({success: true, message: 'Category deleted successfully. ', data})
    } catch (error) {
        res.status(400).json({success: truez, message: 'Error coming while delete category. ',error})
    }
}

module.exports.editCategory = async(req, res)=> {
    try {
        const data = await Category.findById(req.query.id)
        res.status(200).json({success: true, message: 'Edit category data get successfully. ', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while edit category', error})
    }
}

module.exports.edit = async(req, res)=> {
    try {

        const categoryImage = await Category.findById(req.query.id)

        if(categoryImage.image){
            const oldImage = path.join(__dirname, '../Images/Category/', categoryImage.image)
            fs.unlinkSync(oldImage)
        }
        
        req.body.image = req.file.filename

        const data = await Category.findByIdAndUpdate(req.query.id, req.body)
        res.status(201).json({success: true, message: 'Category edited successfully. ', data})
    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while edit category. ',error})
    }
}