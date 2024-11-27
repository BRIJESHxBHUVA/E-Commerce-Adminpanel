import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.default.withCredentials = true
const URL = 'http://localhost:5000/admin'
export const IMG_URL = 'http://localhost:5000/Images/Admin'

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async(data, {rejectWithValue})=> {
    try {
        const response = await axios.post(`${URL}/login`, data)
        console.log(response.data)

        sessionStorage.setItem('adminToken', response.data.token)
        sessionStorage.setItem('admin', JSON.stringify(response.data.user))

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const NewAdmin = createAsyncThunk('admin/NewAdmin', async(data, {rejectWithValue})=> {
    try {
        const response = await axios.post(`${URL}/signup`, data, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})


const initialState = {
    admins: [],
    loading: false,
    error: null
}

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(loginAdmin.pending, (state, action)=> {
            state.loading = true
            state.error = null
        })

        builder.addCase(loginAdmin.fulfilled, (state, action)=> {
            state.loading = false
            state.admins = action.payload
        })

        builder.addCase(loginAdmin.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })


        // For add admin

        builder.addCase(NewAdmin.pending, (state, action)=>{
            state.loading = true
            state.error = null
        })

        builder.addCase(NewAdmin.fulfilled, (state, action)=> {
            state.loading = false
            state.admins.push(action.payload)
        })

        builder.addCase(NewAdmin.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default AdminSlice.reducer