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
import Footer from '../../Components/Footer/Footer'

const Home = () => {

  const [profile, setProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') 

  return (
    <div style={{backgroundColor: '#f6f6f6'}}>
        <Header setProfile={setProfile} setSearchQuery={setSearchQuery}/>
        <Category/>
        <Profile profile={profile} setProfile={setProfile}/>
      <Routes>
        <Route path='dashboard' element={<Dashboard searchQuery={searchQuery} />} />
        <Route path='addproduct' element={<AddProduct/>} />
        <Route path='addcategory' element={<AddCategory/>} />
        <Route path='editproduct' element={<EditProduct/>} />
        <Route path='viewcategory' element={<ViewCategory/>} />
        <Route path='editcategory' element={<EditCategory/>} />
       </Routes>
       <Footer/>
    </div>
  )
}

export default Home
