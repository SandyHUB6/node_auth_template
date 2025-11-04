const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const authRoutes = require("./routes/authRoutes"); 
const userRoutes = require("./routes/userRoutes"); 

const WebSocket = require('ws');

// Create a WebSocket server completely detached from the HTTP server.
const wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('this is a message');
});



dbConnect();

const app = express();


app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes );


const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

