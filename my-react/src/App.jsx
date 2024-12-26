import React from 'react'
import Signup from './Auth/Signup'
import Chat from './Chat'
import { Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Profile from './components/Profile/Profile'
import Landing from './components/Landing/Landing'

const App = () => {
  return (
    <Routes>
    {/* Define your open routes */}
    <Route path="/" element={<Landing />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/profile" element={<Profile/>} />
  </Routes>
  )
}

export default App