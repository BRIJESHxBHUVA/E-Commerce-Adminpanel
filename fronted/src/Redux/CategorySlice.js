import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.default.withCredentials = true
const URL = 'https://e-commerce-adminpanel-1.onrender.com/category'
export const IMG_URL = 'https://e-commerce-adminpanel-1.onrender.com/Images/Category'

export const getCategory = createAsyncThunk('category/getCategory', async(_, {rejectWithValue})=> {
    try {
        const response = await axios.get(`${URL}/allcategory`)
        console.log(response.data)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const Addcategory = createAsyncThunk('category/Addcategory', async(data, {rejectWithValue})=> {
    try {
        const response = await axios.post(`${URL}/addcategory`, data, {
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

export const DeleteCategory = createAsyncThunk('category/DeleteCategory', async(id, {rejectWithValue})=> {
    try {
        const response = await axios.delete(`${URL}/deletecategory?id=${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const UpdateCategory = createAsyncThunk('category/UpdateCategory', async(data, {rejectWithValue})=> {
    try {
        const id = sessionStorage.getItem('CategoryId')
        const response = await axios.put(`${URL}/edit?id=${id}`, data, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


const initialState = {
    categories: [],
    loading: false,
    error: null
}

const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(getCategory.pending, (state, action)=> {
            state.loading = false
            state.error = null
        })

        builder.addCase(getCategory.fulfilled, (state, action)=> {
            state.loading = false
            state.categories = action.payload
        })

        builder.addCase(getCategory.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For add new ctegory

        builder.addCase(Addcategory.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(Addcategory.fulfilled, (state, action)=> {
            state.loading = false
            state.categories.push(action.payload)
        })

        builder.addCase(Addcategory.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For delete category

        builder.addCase(DeleteCategory.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(DeleteCategory.fulfilled, (state, action)=> {
            state.loading = false
        })

        builder.addCase(DeleteCategory.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For edit category

        builder.addCase(UpdateCategory.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(UpdateCategory.fulfilled, (state, action)=> {
            state.loading = false
            state.categories.push(action.payload)
        })

        builder.addCase(UpdateCategory.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default CategorySlice.reducer