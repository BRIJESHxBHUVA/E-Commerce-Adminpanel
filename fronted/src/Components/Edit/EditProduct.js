import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {EditedProduct} from '../../Redux/ProductSlice'
import { getCategory } from '../../Redux/CategorySlice'

const EditProduct = () => {
    const [editProduct, setEditProduct] = useState({
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
            setEditProduct((prevstate)=>({
            ...prevstate,
            [name]: files[0],
          }))
        }else{
            setEditProduct((prevstate)=>({
            ...prevstate,
            [name]: value,
          }))
        }
      }


      const HandleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(EditedProduct(editProduct))
          console.log(editProduct)
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
                <input type="text" placeholder='Product Name' name='name' value={editProduct.name} required onChange={HandleChange} />
                <input type="text" placeholder='Product Price' name='price' value={editProduct.price} required onChange={HandleChange} />
                <input type="file" placeholder='Prodct Image' name='image' onChange={HandleChange} required />
                <select name='category' className='p-3 mt-2' onChange={HandleChange} >
                    <option>Default</option>
                    {categories.map((el, i)=>(
                       
                        <option key={i} value={el._id}>{el.category}</option>

                    ))}
                </select>
                <select name='subcategory' className='p-3 mt-3' onChange={HandleChange} >
                    <option>Default</option>
                    {categories.map((el, i)=>(
                        
                        <option key={i} value={el._id}>{el.subcategory}</option>
                       
                    ))}
                </select>
                <button type='submit'>Update Product</button>
            </form>
           
        </div>
    </div>
  )
}

export default EditProduct
