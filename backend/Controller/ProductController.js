const Product = require('../Model/ProductSchema')
const Category = require('../Model/CategorySchema')
const path = require('path')
const fs = require('fs')

module.exports.addProduct = async(req, res)=> {
    try {
        if(req.file){
            req.body.image = req.file.filename
        }

        const category = await Category.findById(req.body.category);
        const subcategory = await Category.findById(req.body.subcategory);

        if (!category || !subcategory) {
            return res.status(404).json({ success: false, message: 'Category or Subcategory not found' });
        }

        const data = await Product.create(req.body)
        res.status(200).json({success: true, message: 'Product added successfully. ', data})

    } catch (error) {
        res.status(400).json({success: false, message: 'Error while add new product. ', error})
    }
}

module.exports.allProduct = async(req, res)=> {
    try {
        const data = await Product.find({}).populate('category').populate('subcategory')
        if(data.length <= 0){
           return res.status(404).json({success: false, message: 'Product not found'})
        }

        res.status(200).json({success: true, message: 'Product get successfully', data})
        console.log(data)
        // console.log(data.subcategory.subcategory)

    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while get products ', error})
    }
}

module.exports.deleteProduct = async(req, res)=> {
    try {
        const deleteimage = await Product.findById(req.query.id)

        if(deleteimage.image){
            const oldImage = path.join(__dirname, '../Images/Product/', deleteimage.image)
            fs.unlinkSync(oldImage)
        }

        const data = await Product.findByIdAndDelete(req.query.id)
        res.status(200).json({success: true, message: 'Product deleted successfully.', data})

    } catch (error) {
        res.status(400).json({success: false, message: 'Error coming while delete product ', error})
    }
}
