import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
const UserSignUp = () => {
    // const [firstName,setFirstName]=useState('')
    // const [lastName,setLastName]=useState('')
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const [userData,setUserData]=useState({})

    const navigate = useNavigate();

    const {userData,setUserData} = useContext(UserDataContext)

    const submitHandler= async (e)=>{
        e.preventDefault();

        // setUserData({
        //     fullName:{
        //         firstName:firstName,
        //         lastName:lastName
        //     },
        //     email:email,
        //     password:password
        // })

        const newUser = {
            username:userName,
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`,newUser);
        if(response.status === 201){
            const data=response.data;
            setUserData(data.user)  
            localStorage.setItem('token',data.token)
            navigate('/home')
        }

        setUserName('')
        setEmail('')
        setPassword('')
    }
    return (
        <div className='p-7 h-screen w-full flex justify-between flex-col'>
        <div>
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className='text-lg font-medium mb-2'>What's your Name?</h1>
                <div className='flex gap-4'>
                    <input 
                        className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                        required type='text'
                        placeholder='full name'
                        value={userName}
                        onChange={(e)=>{
                            setUserName(e.target.value)}
                        }
                
                    />
                </div>
                
                <h1 className='text-lg font-medium mb-2'>Email Address</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='email' 
                    placeholder='email@example.com'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)}
                    }
                
                />
                <h1 className='text-lg font-medium mb-2'>Enter Password</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='password' 
                    placeholder='password'
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)}
                    }
                />
                <button className='w-full rounded bg-black text-white font-bold px-2 py-2'>Create Account</button>
            </form> 
            <p className='justify-center mb-2'>Already have an account?<Link to='/login' className='text-blue-400'>Login here</Link></p>
        </div>
        </div>
    );
};

export default UserSignUp;