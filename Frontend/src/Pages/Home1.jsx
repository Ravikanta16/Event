import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
    const [event, setEvent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/event/`);
            console.log(response)
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // const handleSearch = async () => {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/event/?search=${searchTerm}`);
    //         setEvent(response.data);
    //     } catch (error) {
    //         console.error('Error searching events:', error);
    //     }
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${import.meta.env.VITE_BASE_URL}/event/${id}`);
    //         fetchEvents();
    //     } catch (error) {
    //         console.error('Error deleting event:', error);
    //     }
    // };

    // const handleJoin = (id) => {
    //     // Implement join event logic here
    //     console.log(`Joining event with id: ${id}`);
    // };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-violet-300 text-pink-400 p-4 flex justify-between items-center">
                <div className="text-lg font-bold">Swissmote!</div>
            </header>

            <main className="flex-grow p-4">
                <div className="mb-4 flex">
                    {/* <input
                        type="text"
                        className="border rounded p-2 flex-grow"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-400 rounded text-white p-2 ml-2">Search</button>
                    {/* <button
                        className="bg-blue-400 rounded text-white p-2 ml-2"
                        onClick={handleSearch}
                    >
                        Search
                    </button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.map((event) => (
                        <div key={event.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-bold">{event.title}</h2>
                            <p className="text-gray-600">{new Date(event.time).toLocaleDateString()}</p>
                            <p className="mt-2">{event.description}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-green-500 text-white p-2 rounded"
                                    onClick={() => handleJoin(event.id)}
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="p-4 flex justify-center">
                <Link to='/CreateEvent' className="bg-red-500 text-white p-2 rounded">Create New Event</Link>
            </footer>
        </div>
    );
};

export default Home;