import React, { useEffect, useState } from 'react'
import '../../Pages/Login/Login.css'
import {useDispatch, useSelector} from 'react-redux'
import { getCategory } from '../../Redux/CategorySlice'
import { AddNewProduct } from '../../Redux/ProductSlice'
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
 
      const [addProduct, setAddProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
        subcategory: '',
      })

      const dispatch = useDispatch()
      const navigate = useNavigate()
      const {loading, error, categories} = useSelector((state)=> state.category)


      const HandleChange = (e)=> {
        const {name, value, files} = e.target
        if(name === 'image'){
            setAddProduct((prevstate)=>({
            ...prevstate,
            [name]: files[0],
          }))
        }else{
            setAddProduct((prevstate)=>({
            ...prevstate,
            [name]: value,
          }))
        }
      }


      const HandleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(AddNewProduct(addProduct))
          console.log(addProduct)
          if(success){
            navigate('/adminpanel/dashboard')
          }
        } catch (error) {
          console.log('User Register Error', error)
        }
      }

      useEffect(()=> {
        dispatch(getCategory())
      },[])


  return (
    <div className='main'>
        <div className="login-page">
           
                <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='Product Name' name='name' value={addProduct.name} required onChange={HandleChange} />
                <input type="text" placeholder='Product Price' name='price' value={addProduct.price} required onChange={HandleChange} />
                <input type="file" placeholder='Prodct Image' name='image' onChange={HandleChange} required />
                <select name='category' className='p-3 mt-2' onChange={HandleChange}>
                <option>Default</option>
                    {categories.map((el, i)=>(
                        <option key={i} value={el._id}>{el.category}</option>
                    ))}
                </select>
                <select name='subcategory' className='p-3 mt-3' onChange={HandleChange}>
                <option>Default</option>
                    {categories.map((el, i)=>(
                        <option key={i} value={el._id}>{el.subcategory}</option>
                    ))}
                </select>
                <button type='submit'>Add Product</button>
            </form>
           
        </div>
    </div>
  )
}

export default AddProduct
