import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling'],
    reconnection: true
});

const Home = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [participantCounts, setParticipantCounts] = useState({});
    const [userId, setUserId] = useState('');
    const [eventId, setEventId] = useState('');
    const [joinedEvents, setJoinedEvents] = useState({});
    const {userData,setUserData}=useContext(UserDataContext)

    useEffect(() => {
        if (userData?.username) {
            setUserId(userData.username);
        }
    }, [userData]);

    useEffect(() => {
        fetchEvents();
        setupSocketListeners();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/event/`);
            console.log(response)
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const setupSocketListeners = () => {
        socket.on('connect', () => {
            console.log('Connected!');
            statusDiv.textContent = 'Connected! Socket ID: ' + socket.id;
        });

        socket.on('connect_error', (error) => {
            console.error('Connection Error:', error);
            statusDiv.textContent = 'Connection Error: ' + error.message;
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
            statusDiv.textContent = 'Disconnected: ' + reason;
        });

        socket.on('participant_count', (updatedCounts) => {
            console.log(updatedCounts);
            setParticipantCounts(updatedCounts);
            console.log(participantCounts);
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/event/search?search=${searchTerm}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/event/delete/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleJoin = async (e,eventdata,userId) => {
        e.preventDefault();
        setEventId(eventdata)
        socket.emit('join-event', eventdata, userId);
        setJoinedEvents((prev) => ({ ...prev, [eventdata]: true }));
    };

    useEffect(() => {
        console.log(joinedEvents,"jhbjhb");
    
    }, [joinedEvents]);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-violet-300 text-pink-400 p-4 flex justify-between items-center">
                <div className="text-lg font-bold">Swissmote!</div>
            </header>

            <main className="flex-grow p-4">
                <div className="mb-4 flex">
                    <input
                        type="text"
                        className="border rounded p-2 flex-grow"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <button className="bg-blue-400 rounded text-white p-2 ml-2">Search</button> */}
                    <button
                        className="bg-blue-400 rounded text-white p-2 ml-2"
                        onClick={(e)=>{
                            handleSearch(e)}
                        }
                    >
                        Search
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event) => (
                        <div key={event.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-bold">{event.title}</h2>
                            <p className="text-gray-600">{new Date(event.time).toLocaleDateString()}</p>
                            <p className="mt-2">{event.description}</p>
                            <p className="mt-2 text-blue-500">
                                Attendees: {participantCounts[eventId] || 0}
                            </p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-green-500 text-white p-2 rounded"
                                    onClick={(e) => {
                                        handleJoin(e,event.title, userId)}
                                    }
                                    disabled={joinedEvents[eventId]}
                                >
                                    {joinedEvents[eventId] ? 'Joined' : 'Join'}
                                </button>
                                <button
                                    className="bg-green-500 text-white p-2 rounded"
                                    onClick={(e) => {
                                        handleDelete(e,event.id)}
                                    }
                                >
                                    Delete
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