import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {DeleteCategory, getCategory, IMG_URL} from '../../Redux/CategorySlice'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading/Loading'

const ViewCategory = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categories, loading} = useSelector((state)=> state.category)

    useEffect(()=> {
        dispatch(getCategory())
    },[])

    const HandleDelete = (id)=> {
        dispatch(DeleteCategory(id))
    }

    const HandleEdit = (id)=> {
        sessionStorage.setItem('CategoryId', id)
        navigate('/adminpanel/editcategory')
    }

  return (
    <div className='viewcategory mt-5 overflow-auto'>
      <table className='table table-striped text-center'>
        <thead>
            <tr>
            <th>No</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Image</th>
            <th colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody>
          {!loading && categories.map((el, i)=>(
            <tr key={i}>
                <td>{i+1}</td>
                <td>{el.category}</td>
                <td>{el.subcategory}</td>
                <td><img src={`${IMG_URL}/${el.image}`} height={50} width={100} alt="" /></td>
                <td><button className='btn btn-primary' onClick={()=> HandleEdit(el._id)}>EDIT</button></td>
                <td><button className='btn btn-danger' onClick={()=> HandleDelete(el._id)}>DELETE</button></td>
            </tr>
           )) }
        </tbody>
      </table>

      {loading && <center>
      <Loading/>
      </center>}
    </div>
  )
}

export default ViewCategory
