import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


axios.default.withCredentials = true
const URL = 'https://e-commerce-adminpanel-1.onrender.com/product'
export const PRODUCT_URL = 'https://e-commerce-adminpanel-1.onrender.com/Images/Product'

export const getProduct = createAsyncThunk('product/getProduct', async(_, {rejectWithValue})=> {
    try {
        const response = await axios.get(`${URL}/allproduct`)
        console.log(response.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const AddNewProduct = createAsyncThunk('product/AddNewProduct', async(data, {rejectWithValue})=> {

    try {
        const response = await axios.post(`${URL}/addproduct`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const DeleteProduct = createAsyncThunk('product/DeleteProduct', async(id, {rejectWithValue})=> {
    try {
        const response = await axios.delete(`${URL}/deleteproduct?id=${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const EditedProduct = createAsyncThunk('product/EditedProduct', async(data, {rejectWithValue})=> {
    try {
        const id = sessionStorage.getItem('ProductId')
        const response = await axios.put(`${URL}/edit?id=${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    products: [],
    loading: false,
    error: null
}

const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(getProduct.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(getProduct.fulfilled, (state, action)=> {
            state.loading = false
            state.products = action.payload
        })

        builder.addCase(getProduct.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For add new product

        builder.addCase(AddNewProduct.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(AddNewProduct.fulfilled, (state, action)=> {
            state.loading = false
            state.products.push(action.payload)
        })

        builder.addCase(AddNewProduct.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Delete Product

        builder.addCase(DeleteProduct.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(DeleteProduct.fulfilled, (state, action)=> {
            state.loading = false
        })

        builder.addCase(DeleteProduct.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For Edit Product

        builder.addCase(EditedProduct.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(EditedProduct.fulfilled, (state, action)=> {
            state.loading = false
            state.products.push(action.payload)
        })

        builder.addCase(EditedProduct.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default ProductSlice.reducer