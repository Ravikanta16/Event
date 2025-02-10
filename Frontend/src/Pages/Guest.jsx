import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
    const [email,setEmail]=useState('')
    const [userName,setUserName]=useState('')
    // const [userData,setUserData]=useState({})
    const {userData,setUserData}=useContext(UserDataContext)
    const navigate=useNavigate()

    const submitHandler= async (e)=>{
        e.preventDefault();

        setUserData({
            username:userName,
            email:email
        })
        
        navigate('/home')
        setEmail('')
        setUserName('')
    }
    return (
        <div className='p-7 h-screen w-full flex justify-between flex-col'>
        <div>
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className='text-xl font-medium mb-2'>Enter Your Name</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={userName}
                    onChange={(e)=>{
                        setUserName(e.target.value)}
                    }
                    required type='text' 
                    placeholder='enter your name'   
                
                />  

                <h1 className='text-xl font-medium mb-2'>Enter Your Email</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)}
                    }
                    required type='email' 
                    placeholder='email@example.com'
                />
                <button className='w-full rounded bg-black text-white font-bold px-2 py-2'>Join as Guest</button>
            </form> 

        </div>
        </div>
    );
};

export default Guest;