import React, { useState } from 'react'
import '../../Pages/Login/Login.css'
import {useDispatch, useSelector} from 'react-redux'
import { Addcategory } from '../../Redux/CategorySlice'
import {useNavigate} from 'react-router-dom'

const AddCategory = () => {

    const [addCategory, setAddCategory] = useState({
        category: '',
        subcategory: '',
        image: '',
      })

      const dispatch = useDispatch()
      const navigate = useNavigate()
      const {loading, error, categories} = useSelector((state)=> state.category)


      const HandleChange = (e)=> {
        const {name, value, files} = e.target
        if(name === 'image'){
            setAddCategory((prevstate)=>({
            ...prevstate,
            [name]: files[0],
          }))
        }else{
            setAddCategory((prevstate)=>({
            ...prevstate,
            [name]: value,
          }))
        }
      }


      const HandleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(Addcategory(addCategory))
          if(success){
            navigate('/adminpanel/dashboard')
          }
        } catch (error) {
          console.log('User Register Error', error)
        }
      }


  return (
    <div className='main'>
        <div className="login-page">
           
                <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='Category Name' name='category' value={addCategory.category} required onChange={HandleChange} />
                <input type="text" placeholder='Sub-Category Name' name='subcategory' value={addCategory.subcategory} required onChange={HandleChange} />
                <input type="file" placeholder='Prodct Image' name='image' onChange={HandleChange} required />
              
                <button type='submit'>Add Category</button>
            </form>
           
        </div>
    </div>
  )
}

export default AddCategory
