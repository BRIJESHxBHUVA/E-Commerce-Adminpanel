import React, { useEffect } from 'react'
import './Category.css'
import {useDispatch, useSelector} from 'react-redux'
import { getCategory, IMG_URL } from '../../Redux/CategorySlice'

const Category = () => {

  const dispatch = useDispatch()
  const {loading, error, categories} = useSelector((state)=> state.category)

  useEffect(()=> {
    dispatch(getCategory())
  },[dispatch])

  return (
    <div className='category shadow mt-3'>
      {categories.map((el, i)=> (
         <div className="category-box" key={i}>
         <img src={`${IMG_URL}/${el.image}`} alt="" />
         <h4 className='mt-4 fs-6'>{el.category}</h4>
       </div>
      ))}
     
    </div>
  )
}

export default Category
