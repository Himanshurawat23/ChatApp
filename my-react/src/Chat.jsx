import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { Send, Search, Phone, MoreVertical } from 'lucide-react';
import { Videocam as VideoCamera } from '@mui/icons-material';
import Navbar from '../src/Shared/Navbar';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

// const socket = io('http://localhost:8080', { withCredentials: true });

const Chat = () => {
  const [socket, setSocket] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useSelector((store)=>store.auth)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('1'); // Mock current user ID; replace with auth logic
  useEffect(() => {
    // Register current user with the backend
    const socket = io('http://localhost:5500', { withCredentials: true });
    setSocket(socket);
    console.log(user)
    setCurrentUser(user._id ? user._id : null)
    socket.emit('register', user);

    // Listen for updates to online users
    socket.on('onlineUsers', (users) => {
      console.log(users)
      setOnlineUsers(users.filter((userId) => userId !== currentUser));
    });

    // Listen for incoming private messages
    socket.on('receiveMessage', ({ fromUserId, message }) => {
      if (selectedUser && selectedUser.id === fromUserId) {
        setMessages((prev) => [...prev, { sender: fromUserId, text: message }]);
      }
    });


    return () => {
      socket.disconnect();
    };
  }, [currentUser, selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      // Send message via socket
      socket.emit('privatemessage', {
        fromUserId: currentUser,
        toUserId: selectedUser.id,
        message,
      });

      // Append the message locally
      setMessages([...messages, { sender: 'You', text: message }]);
      setMessage('');
    }
  };

  const startChat = (user) => {
    setSelectedUser(user);
    socket.emit('startChat', { fromUserId: currentUser, toUserId: user.id });
    setMessages([]); // Clear messages when a new chat starts
  };

  const filteredUsers = onlineUsers.map((userId) => ({
    id: userId,
    name: `User ${userId}`, // Mock user data; replace with actual user data if available
    online: true,
    status: 'Online',
  }));

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 bg-gray-50 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            {filteredUsers
              .filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => startChat(user)}
                  className={`flex items-center p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50 
                  ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="relative">
                    <Avatar src={`/api/placeholder/48/48`} className="w-12 h-12" />
                    {user.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{user.status}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 bg-white shadow-sm flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Avatar src={`/api/placeholder/48/48`} className="w-12 h-12" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-sm text-gray-500">{selectedUser.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <VideoCamera className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-6 py-3 shadow-sm
                        ${msg.sender === 'You' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none'}`}
                    >
                      <p className="break-words">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 bg-white shadow-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-6 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="p-3 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Welcome to Messages</h3>
                <p className="text-gray-500 mt-2">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
