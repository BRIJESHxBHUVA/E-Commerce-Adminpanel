import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../Redux/ProductSlice'
import CategorySlice from '../Redux/CategorySlice'
import AdminSlice from '../Redux/AdminSlice'

export const store = configureStore({
    reducer: {
        product: ProductSlice,
        category: CategorySlice,
        admin: AdminSlice,
    }
})
