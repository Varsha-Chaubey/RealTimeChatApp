import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../Reuseable/Header';
import InputField from '../Reuseable/InputField';
import { signInRoute } from '../../Utils/AppRoutes'
import axios from 'axios'
const LoginPage = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        user_name: '',
        user_pass: ''
    })

   
    const handleChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
    }

    const handleValidations = () => {

        const { user_name, user_pass } = userDetails;
        if (user_pass === '') {
            alert('User name and password is required.')
        } else if (user_name.length === '') {
            alert('User name and password is required.')
        } else {
            return true;
        }
        return false
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidations()) {

            const { user_name, user_pass } = userDetails;
            const { data } = await axios.post(signInRoute, {
                userName: user_name, userPassword: user_pass
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
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center div_container'>
                <Header />
                <InputField
                    className='bg-transparent outline-none text-white'
                    name='user_name'
                    id='input_field'
                    placeholder='Name'
                    value={userDetails.user_name}
                    type="text"
                    onChange={(e) => handleChange(e)}
                    min='3'
                />

                <InputField
                    className='bg-transparent outline-none text-white'
                    name='user_pass'
                    id='input_field'
                    placeholder='Password'
                    value={userDetails.user_pass}
                    type="password"
                    onChange={(e) => handleChange(e)}
                />

                <button className='join_btn text-white uppercase pointer text-xl outline-none ' type='submit' >
                    Create User
                </button>
                <span className='text-white uppercase'>Don't have account? You should <Link to='/'> Sign Up</Link></span>
            </form>
        </div>
    )
}

export default LoginPage;
