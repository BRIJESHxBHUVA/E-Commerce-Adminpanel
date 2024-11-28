import React, { useEffect } from 'react'
import './Product.css'
import {useDispatch, useSelector} from 'react-redux'
import { DeleteProduct, getProduct } from '../../Redux/ProductSlice'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading/Loading'

const Product = ({ products }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error} = useSelector((state)=> state.product)

    useEffect(()=> {
        try {
            dispatch(getProduct())
        } catch (error) {
            console.log(error)
        }
    },[dispatch])

    const HandleDelete = (id)=> {
        try {
            dispatch(DeleteProduct(id))
        } catch (error) {
            console.log(error)
        }
    }

    const HandleEdit = (id)=> {
        sessionStorage.setItem('ProductId', id)
        navigate('/adminpanel/editproduct')
    }

  return (
    <div className='all-products'>
        
        {!loading? products.map((el, i)=> (
            <div className="product-card" key={i}>
            <img src={`http://localhost:5000/Images/Product/${el.image}`} alt="" />
            <div className="product-card-details">
                <p className='mt-1'>{el.name}</p>
                <h5>₹ {el.price}</h5>
                <div className="buttons">
                    <button className='btn btn-danger' onClick={()=> HandleEdit(el._id)}>EDIT</button>
                    <button className='btn btn-primary' onClick={()=> HandleDelete(el._id)}>DELETE</button>
                </div>
            </div>
        </div>
        )) : <Loading/>}
       

    </div>
  )
}

export default Product
