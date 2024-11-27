import React, { useState } from 'react'
import './Login.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { loginAdmin, NewAdmin } from '../../Redux/AdminSlice'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState(false)
    const [usersLogin, setUsersLogin] = useState({
        email: '', 
        password: ''
      })
  
      const [signUp, setSignUp] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        image: ''
      })

      const handleLogin = (e)=> {
        const {name, value} = e.target
        setUsersLogin((prevstate)=>({
          ...prevstate,
          [name]: value,
        }))
      }

      const AdminLogin = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(loginAdmin(usersLogin))
          if(success){
            navigate('/adminpanel/dashboard')
          }
        } catch (error) {
          console.log('User Login error', error)
        }
       
      }

      const HandleChange = (e)=> {
        const {name, value, files} = e.target
        if(name === 'image'){
          setSignUp((prevstate)=>({
            ...prevstate,
            [name]: files[0],
          }))
        }else{
          setSignUp((prevstate)=>({
            ...prevstate,
            [name]: value,
          }))
        }
      }


      const HandleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const success = await dispatch(NewAdmin(signUp))
          if(success){
            setLogin(false)
          }
          console.log(signUp)
        } catch (error) {
          console.log('User Register Error', error)
        }
      }


  return (
    <div className='main'>
        <div className="login-page">
            {!login ? (
                 <form onSubmit={AdminLogin}>
                 <input type="text" name='email' placeholder='You Email' required onChange={handleLogin} />
                 <input type="password" name='password' placeholder='You Password' required onChange={handleLogin} />
                 <button type='submit'>Login</button>
                 <center><p>Create a new account <span onClick={()=> setLogin(true)} style={{color: '#06bbcc'}}>Click here</span></p></center>
                
                
             </form>

            ) : (

                <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='You Name' name='name' value={signUp.name} required onChange={HandleChange} />
                <input type="email" placeholder='You Email' name='email' value={signUp.email} required onChange={HandleChange} />
                <input type="text" placeholder='You Phone' name='phone' value={signUp.phone} required onChange={HandleChange} />
                <input type="password" placeholder='You Password' name='password' value={signUp.password} required onChange={HandleChange} />
                <input type="file" placeholder='You Image' name='image' onChange={HandleChange} required />
                <button type='submit'>Sign Up</button>
                
               <center> <p>Already have an account ? <span onClick={()=> setLogin(false)} style={{color: '#06bbcc'}}>Login here</span></p></center>
            </form>

            )}
           
        </div>
    </div>
  )
}

export default Login
