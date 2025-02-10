import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://imgs.search.brave.com/ofJcEgtacK21aMDyde4qzBDwWxWsokGbV58vD7mlLsc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9ybWF0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvY29uY2Vy/dC1ldmVudC1waG90/b2dyYXBoeS5qcGc)] h-screen w-full pt-3 flex justify-between flex-col'>
            
            <div className="flex flex-col justify-center items-center h-screen">
                <h2 className="text-2xl font-bold text-black">
                    Let's Enjoy
                </h2>
                <Link to='/login' className='text-2xl rounded text-white mt-4 py-3'>Continue</Link>
            </div>
                
            </div>
        </div>
    );
};

export default Start;