const express = require('express');
const { Server } = require('socket.io');
const createServer = require('http');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./router/user.js');
const connectDb = require('./Database/Db.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = createServer.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

connectDb();
app.use('/user', userRoutes);

const userSocketMap = {}; // Maps userId to socket.id
const activeChats = {}; // Maps a userId to the userId they are chatting with

const getOnlineUsers = () => Object.keys(userSocketMap);
const getAllUsers = []
io.on('connection', (socket) => {
    console.log("Person connected to socket", socket.id);

    // Handle user registration
    socket.on('register', (user) => {
        userSocketMap[user._id] = socket.id; // Map userId to socket.id
        console.log(`User ${user.username} connected with socket ${socket.id}`);
        console.log(getOnlineUsers())
        io.emit('onlineUsers', getOnlineUsers()); // Notify all clients about online users
    });

    // Handle private messages
    socket.on('privatemessage', ({ fromUserId, toUserId, message }) => {
        const recipientSocketId = userSocketMap[toUserId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('receiveMessage', { fromUserId, message });
            console.log(`Message from ${fromUserId} to ${toUserId}: ${message}`);
        } else {
            console.log(`User ${toUserId} not connected`);
        }
    });

    // Handle chat initiation
    socket.on('startChat', ({ fromUserId, toUserId }) => {
        activeChats[fromUserId] = toUserId;
        activeChats[toUserId] = fromUserId; // Make it bidirectional
        console.log(`${fromUserId} started a chat with ${toUserId}`);
    });

    // Notify disconnection and update online users
    socket.on('disconnect', () => {
        for (const [userId, id] of Object.entries(userSocketMap)) {
            if (id === socket.id) {
                delete userSocketMap[userId];
                break;
            }
        }
        io.emit('onlineUsers', getOnlineUsers()); // Notify all clients about updated online users
        console.log("User disconnected", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
