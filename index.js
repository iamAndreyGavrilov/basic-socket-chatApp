// 1. Import packages
import express from "express";
import http from "http";
import { Server } from "socket.io";

// 2. Create instance
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 3. Serve static files
app.use(express.static("public"));

// 4. Create a connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // 4.1 disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    // 4.2 chat message event
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

})

// 5. Run the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});