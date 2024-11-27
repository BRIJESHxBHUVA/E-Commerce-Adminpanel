import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { UpdateCategory } from '../../Redux/CategorySlice'

const EditCategory = () => {
    const [editCategory, setEditCategory] = useState({
        category: '',
        subcategory: '',
        image: '',
      })

      
      const dispatch = useDispatch()
      const navigate = useNavigate()


      const HandleChange = (e)=> {
        const {name, value, files} = e.target
        if(name === 'image'){
            setEditCategory((prevstate)=>({
            ...prevstate,
            [name]: files[0],
          }))
        }else{
            setEditCategory((prevstate)=>({
            ...prevstate,
            [name]: value,
          }))
        }
      }


      const HandleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(UpdateCategory(editCategory))
          if(success){
            navigate('/adminpanel/viewcategory')
          }
        } catch (error) {
          console.log('User Register Error', error)
        }
      }



  return (
    <div className='main'>
        <div className="login-page">
           
                <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='Category Name' name='category' value={editCategory.category} required onChange={HandleChange} />
                <input type="text" placeholder='Sub-Category Name' name='subcategory' value={editCategory.subcategory} required onChange={HandleChange} />
                <input type="file" placeholder='Category Image' name='image' onChange={HandleChange} required />
               
                <button type='submit'>Update Category</button>
            </form>
           
        </div>
    </div>
  )
}

export default EditCategory
