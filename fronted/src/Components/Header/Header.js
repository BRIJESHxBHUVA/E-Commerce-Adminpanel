import React, { useEffect, useState } from 'react'
import { IMG_URL } from '../../Redux/AdminSlice'
import {Link} from 'react-router-dom'

const Header = ({setProfile, setSearchQuery}) => {

  const [data, setData] = useState({})
  const [select, setSelect] = useState('home')

  useEffect(()=>{
    const storedUser = sessionStorage.getItem('admin')
    if(storedUser){
      setData(JSON.parse(storedUser))
    }
  },[])

  const handleSearch = (e)=> {
    setSearchQuery(e.target.value)
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-light fs-1" href="#">Sofa's</a>

    <button className="navbar-toggler" style={{background: 'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="second-profile me-3" onClick={()=> setProfile(true)} style={{height: '60px', width: '60px', borderRadius: '50%'}}>
        <img src={`${IMG_URL}/${data.image}`} alt="User" style={{height: '100%', width: '100%', borderRadius: '50%'}} />
      </div>


    <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">

        <li className='nav-item' onClick={()=> setSelect('home')}>
          <Link to='/adminpanel/dashboard' className={`nav-link ${select === 'home' ? 'bg-white rounded' : 'text-light'}`} aria-current="page" href="#">Home</Link>
        </li>

        <li className="nav-item">
          <Link to='/adminpanel/addproduct' className={`nav-link ${select === 'addproduct' ? 'bg-white rounded' : 'text-light'}`} href="#" onClick={()=> setSelect('addproduct')}>Add Product</Link>
        </li>

        <li className="nav-item">
          <Link to='/adminpanel/addcategory' className={`nav-link ${select === 'addcategory' ? 'bg-white rounded' : 'text-light'}`} onClick={()=> setSelect('addcategory')}>Add Category</Link>
        </li>

        <li className="nav-item">
          <Link to='/adminpanel/viewcategory' className={`nav-link ${select === 'category' ? 'bg-white rounded' : 'text-light'}`} onClick={()=> setSelect('category')}>View Category</Link>
        </li>
        
      </ul>
    </div>
      <form className="d-flex me-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search Product" aria-label="Search" onChange={handleSearch}/>
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>

      <div className="profile me-3" onClick={()=> setProfile(true)} style={{height: '60px', width: '60px', borderRadius: '50%'}}>
        <img src={`${IMG_URL}/${data.image}`} alt="User" style={{height: '100%', width: '100%', borderRadius: '50%'}} />
      </div>


  </div>
</nav>
    </div>
  )
}

export default Header
