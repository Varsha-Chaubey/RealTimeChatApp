import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';

import closeIcon from '../../assets/closeIcon.png'
import sendLogo from '../../assets/send.png'
import { allUsersRoutes } from '../../Utils/AppRoutes';
import Contacts from '../Pages/Contacts';
const ENDPOINT = 'http://localhost:5000/'
const Chat = () => {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    useEffect(async () => {
        if (!localStorage.getItem('Chat-Data')) {
            navigate('/login')
        }else{
            setCurrentUser(await JSON.parse(localStorage.getItem('Chat-Data')));
        }
    }, [])

    useEffect( async()=> {
        if(currentUser){
            const data = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
            setContacts(data.data)
        }
    },[])
    //     console.log(socket)
    //     //  socket.emit => send data to backed (server)
    //     socket.emit('joined', { userDetails })

    //     socket.on('welcome', (data) => {
    //         console.log(data.user, data.message)
    //     })

    //     socket.on('userJoined', (data) => {
    //         console.log(data.user, data.message)
    //     })
    //     socket.on('leave', (data)=> {
    //         console.log(data.user, data.message)
    //     })
    //     return () => {
    //         socket.emit('disconnectUser')
    //         socket.off();
    //     }
    // }, [])

    return (
        <div className='chat_body bg-slate-900 w-screen h-screen flex justify-center flex-col items-center '>
            <div className='chat_container grid '>
                <Contacts contacts= {contacts} currentUser= {currentUser}/>
                {/* <div className='chat_header bg-pink-800 flex justify-between items-center'>
                    <h2>Chat App</h2>
                    <a href="/"><img src={closeIcon} alt="close" /></a>
                </div>
                <div className='chat_box'> </div>
                <div className='input_box flex'>
                    <input className='p-2  outline-none' id='chat_input' placeholder='Enter Your Name' type="text" />
                    <button className='send_btn text-white pointer bg-pink-800 '>
                        <img src={sendLogo} alt="send" />
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Chat
