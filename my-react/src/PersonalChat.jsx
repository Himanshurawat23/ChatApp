import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const PersonalChat = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const userId = 'user123'; 
    const friendId = 'friend456'; 
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log("connected", socket.id);
        });
        socket.emit('register', userId); // Register the user with the backend

        socket.emit('startChat', { fromUserId: userId, toUserId: friendId }); // Start chat with a friend

        socket.on('receiveMessage', ({ fromUserId, message }) => {
            setChatMessages((prev) => [...prev, { fromUserId, message }]);
        });

        return () => {
            socket.disconnect(); // Clean up on component unmount
        };
    }, []);

    const sendMessage = () => {
        socket.emit('privatemessage', { fromUserId: userId, message });
        setChatMessages((prev) => [...prev, { fromUserId: userId, message }]);
        setMessage('');
    };

    return (
        <div>
            <div>
                {chatMessages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.fromUserId === userId ? 'right' : 'left' }}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default PersonalChat;
