import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../Reuseable/InputField'
import Header from '../Reuseable/Header'
import { registerRoutes } from '../../Utils/AppRoutes'
import axios from 'axios'
const Register = () => {

  const navigate = useNavigate()
  const [registerValues, setRegisterValues] = useState({
    user_name: '',
    user_email: '',
    user_pass: '',
    conf_pass: ''
  })
  const handleChange = (event) => {
    setRegisterValues({ ...registerValues, [event.target.name]: event.target.value })
  }

  
  const handleValidations = () => {

    const { user_name, user_email, user_pass, conf_pass } = registerValues;
    if (user_pass !== conf_pass) {
      alert('Password and confirm password should be same.')
    } else if (user_pass.length < 8) {
      alert('Password must be longer than 8 digits.')
    } else if (user_name === '') {
      alert('User name is required.')
    } else if (user_name.length < 4) {
      alert('User name must be longer than 4 characters.')
    } else if (user_email === '') {
      alert('User email is required.')
    } else {
      return true;
    }
    return false
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (handleValidations()) {

      const { user_name, user_email, user_pass } = registerValues;
      const { data } = await axios.post(registerRoutes, {
        userName: user_name, userEmail: user_email, userPassword: user_pass
      });
      if (data.status === false) {
        alert(data.msg)
      }

      if (data.status === true) {
        localStorage.setItem('Chat-Data', JSON.stringify(data.user))
        navigate('/chat')
      }

    }

  }
  useEffect(()=>{
    if(localStorage.getItem('Chat-Data')){
        navigate('/chat')
    }
}, [])

  return (
    <div className='bg-slate-900 w-screen h-screen flex flex-col justify-center items-center'>
      <form className='flex flex-col items-center div_container' onSubmit={(e) => handleSubmit(e)}>
        <Header />
        <InputField
          autocomplete="off"
          className='bg-transparent outline-none text-white'
          name='user_name'
          id='input_field'
          placeholder='Name'
          type='text'
          onChange={(e) => handleChange(e)}
        />

        <InputField
          autocomplete="off"
          className='bg-transparent outline-none text-white'
          name='user_email'
          id='input_field'
          placeholder='Email'
          type='email'
          onChange={(e) => handleChange(e)}
        />

        <InputField
          autocomplete="off"
          className='bg-transparent outline-none text-white'
          name='user_pass' id='input_field'
          placeholder='Password'
          type='password'
          onChange={(e) => handleChange(e)}
        />

        <InputField
          autocomplete="off"
          className='bg-transparent outline-none text-white'
          name='conf_pass'
          id='input_field'
          placeholder='Confirm password'
          type='password'
          onChange={(e) => handleChange(e)}
        />

        <button className='join_btn text-white uppercase pointer text-xl outline-none ' type='submit' >
          Create User
        </button>
        <span className='text-white uppercase'>Already have account? <Link to='/login'> Sign In</Link></span>
      </form>
    </div>
  )
}

export default Register
