import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    // const [userData,setUserData]=useState({})
    const {userData,setUserData}=useContext(UserDataContext)
    const navigate=useNavigate()

    const submitHandler= async (e)=>{
        e.preventDefault();

        const UserDetails = {
            username:userName,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,UserDetails);
        if(response.status === 200){
            const data=response.data;
            setUserData(data.user)  
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
        // setUserData({
        //     email:email,
        //     password:password
        // })
        setUserName('')
        setPassword('')
    }
    return (
        <div className='p-7 h-screen w-full flex justify-between flex-col'>
        <div>
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className='text-xl font-medium mb-2'>What's your Name?</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={userName}
                    onChange={(e)=>{
                        setUserName(e.target.value)}
                    }
                    required type='text' 
                    placeholder='name'
                
                />
                <h1 className='text-xl font-medium mb-2'>Enter Password</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)}
                    }
                    required type='password' 
                    placeholder='password'
                />
                <button className='w-full rounded bg-black text-white font-bold px-2 py-2'>Login</button>
            </form> 
            <p className='justify-center'>New here?<Link to='/signup' className='text-blue-400'>Create New Account</Link></p>

        </div>
        <div>
            <Link to='/guest' className='flex justify-center bg-green-700 w-full rounded font-bold px-2 py-2'>Guest Login</Link>
        </div>
        </div>
    );
};

export default UserLogin;