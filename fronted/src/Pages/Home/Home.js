import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Category from '../../Components/Category/Category'
import Dashboard from '../../Components/Dashboard/Dashboard'
import AddProduct from '../../Components/AddProduct/AddProduct'
import {Routes, Route} from 'react-router-dom'
import AddCategory from '../../Components/AddCategory/AddCategory'
import EditProduct from '../../Components/Edit/EditProduct'
import ViewCategory from '../../Components/ViewCategory/ViewCategory'
import EditCategory from '../../Components/Edit/EditCategory'
import Profile from '../../Components/Profile/Profile'

const Home = () => {

  const [profile, setProfile] = useState(false)

  return (
    <div style={{backgroundColor: '#f6f6f6'}}>
        <Header setProfile={setProfile}/>
        <Category/>
        <Profile profile={profile} setProfile={setProfile}/>
      <Routes>
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='addproduct' element={<AddProduct/>} />
        <Route path='addcategory' element={<AddCategory/>} />
        <Route path='editproduct' element={<EditProduct/>} />
        <Route path='viewcategory' element={<ViewCategory/>} />
        <Route path='editcategory' element={<EditCategory/>} />
       </Routes>
    </div>
  )
}

export default Home
