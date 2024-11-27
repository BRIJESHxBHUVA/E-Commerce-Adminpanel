import React from 'react'
import './Dashboard.css'
import Product from '../Product/Product'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="filter">
        <div className="filter-option">
            Price High to Low
        </div>
        <div className="filter-option">
            Price Low to High
        </div>
        <div className="filter-option">
            A to Z
        </div>
        <div className="filter-option">
            Z to A
        </div>
      </div>

      <div className="product">

       <Product/>

      </div>
    </div>
  )
}

export default Dashboard
