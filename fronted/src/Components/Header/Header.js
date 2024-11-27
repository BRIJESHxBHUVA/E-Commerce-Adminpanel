import React, { useEffect, useState } from 'react'
import { IMG_URL } from '../../Redux/AdminSlice'

const Header = ({setProfile}) => {

  const [data, setData] = useState({})

  useEffect(()=>{
    const storedUser = sessionStorage.getItem('admin')
    if(storedUser){
      setData(JSON.parse(storedUser))
    }
  },[])


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Sofa's</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none">

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>

        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
        
      </ul>
    </div>
      <form className="d-flex me-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
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
