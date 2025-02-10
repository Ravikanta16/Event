import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';

const CreateEvent = () => {
    const [eventName,setEventName]=useState('')
    const [date,setDate]=useState('')
    const [description,setDescription]=useState('')
    // const [password,setPassword]=useState('')
    const [events,setEvents]=useState({})

    const navigate = useNavigate();

    const {userData,setUserData} = useContext(UserDataContext)

    const submitHandler= async (e)=>{
        e.preventDefault();

        console.log(userData)
        const newEvent = {
            title:eventName,
            time:date,
            description:description,
            createdBy:userData.username
        }


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/event/create`,newEvent);
        if(response.status === 201){
            const data=response.data;
            setEvents(data.user)  
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
        
        setEventName('')
        setDate('')
        setDescription('')
    }
    return (
        <div className='p-7 h-screen w-full flex justify-between flex-col'>
        <div>
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className='text-lg font-medium mb-2'>Event Name</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='text'
                    placeholder='event name'
                    value={eventName}
                    onChange={(e)=>{
                        setEventName(e.target.value)}
                    }
                
                />
                
                <h1 className='text-lg font-medium mb-2'>Date</h1>
                <input 
                    className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='date' 
                    placeholder='dd/mm/yyyy'
                    value={date}
                    onChange={(e)=>{
                        setDate(e.target.value)}
                    }
                
                />
                <h1 className='text-lg font-medium mb-2'>Enter Description</h1>
                <textarea 
                    className='bg-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='text' 
                    placeholder='Write a description'
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value)}
                    }
                />
                <button className='w-full rounded bg-black text-white font-bold px-2 py-2'>Create Event</button>
            </form> 
        </div>
        </div>
    );
};

export default CreateEvent;