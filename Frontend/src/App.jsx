import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './Pages/Start';
import Home from './Pages/Home';
import UserLogin from './Pages/userLogin';
import UserSignUp from './Pages/userSignUp'; 
import {UserDataContext} from './context/UserContext.jsx'
import { useContext } from 'react';
import CreateEvent from './Pages/CreateEvent';
import Guest from './Pages/Guest';


const App = () => {
  const ans = useContext(UserDataContext)
  // console.log(ans.user)

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/CreateEvent" element={<CreateEvent />} />
      <Route path="/guest" element={<Guest />} />
    </Routes>
  );
};

export default App;