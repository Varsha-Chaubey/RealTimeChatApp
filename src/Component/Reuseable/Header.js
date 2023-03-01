import React from 'react'
import logo from '../../assets/image.png'
const Header = () => {
  return (
    <div className='head_container flex justify-center items-center'>
       <div className='logo_img'>
          <img src={logo} alt='logo' />
        </div>
        <h1 className='text-3xl	text-white text-center uppercase title_heading' >Chat App</h1>
    </div>
  )
}

export default Header
