import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Product from '../Product/Product'
import {useDispatch, useSelector} from 'react-redux'

const Dashboard = ({searchQuery}) => {

  const [sortOption, setSortOption] = useState('') 
  const [priceSort, setPriceSort] = useState('') 
  const [filter, setFilter] = useState(false)

  const {products} = useSelector((state)=> state.product)
  
  const sortByName = (a, b)=> {
    if(sortOption === 'AtoZ'){
      return a.name.localeCompare(b.name)
    }else if(sortOption === 'ZtoA'){
      return b.name.localeCompare(a.name)
    }
    return 0
  }

  const sortByPrice = (a, b)=> {
    if(priceSort === 'lowToHigh'){
      return a.price - b.price
    }else if(priceSort === 'highToLow'){
      return b.price - a.price
    }
    return 0
  }

  const SortAndFilteredProduct = [...products].filter((product)=> product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b)=> {
    const nameSort = sortByName(a, b)
    if(nameSort !== 0) {
      return nameSort
    } 
    return sortByPrice(a, b)
  })

  useEffect(()=> {
    console.log(SortAndFilteredProduct)
  },[sortOption, priceSort, products, searchQuery])
  
  return (
    <div className='dashboard'>
      <div className="filter">
        <div className="filter-option" onClick={()=> setPriceSort('highToLow')}>
            Price High to Low
        </div>
        <div className="filter-option" onClick={()=> setPriceSort('lowToHigh')}>
            Price Low to High
        </div>
        <div className="filter-option" onClick={()=> setSortOption('AtoZ')}>
            A to Z
        </div>
        <div className="filter-option" onClick={()=> setSortOption('ZtoA')}>
            Z to A
        </div>
      </div>

      <div className="product">
        <div className="filter-sidebar position-sticky top-0 left-0" onClick={()=> setFilter(true)}>
        <i className="fa-solid fa-filter"></i>
        </div>
       <Product products={SortAndFilteredProduct} />

      </div>

     { filter && <div className="second-filter">
      <div className="inner-filter">
        <div className="inner-filter-option" onClick={()=> setPriceSort('highToLow')}>
            Price High to Low
        </div>
        <div className="inner-filter-option" onClick={()=> setPriceSort('lowToHigh')}>
            Price Low to High
        </div>
        <div className="inner-filter-option" onClick={()=> setSortOption('AtoZ')}>
            A to Z
        </div>
        <div className="inner-filter-option" onClick={()=> setSortOption('ZtoA')}>
            Z to A
        </div>
        <div className="inner-filter-option bg-danger text-white" onClick={()=> setFilter(false)}>
           Close
        </div>
      </div>
      </div>}

    </div>
  )
}

export default Dashboard
