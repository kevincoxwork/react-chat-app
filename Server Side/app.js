const utils = require('./chatroomUtils');
require('dotenv').config();
const socketIO = require('socket.io');
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
let server = http.createServer(app);
let io = socketIO(server);

let listRooms = [];
listRooms.push('main');



// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use(function (req, res, next) {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});


app.use(express.static('public'));


io.on('connection', async (socket) => {

    socket.on('listRooms', async () => {
        socket.emit('updatedlistRooms', listRooms);
        });

    socket.on('join', async client => {
        let doesUserExist = await utils.doesUserExist(client);

        //check to see if user already exists
        if (!doesUserExist.bool) {

            if (!listRooms.includes(client.roomName)) {
                listRooms.push(client.roomName);
                socket.broadcast.emit('updatedlistRooms', listRooms);

            }

            socket.join(client.roomName);

            socket.emit('welcome', await utils.generateNewUser(client, socket['id']));

            socket.to(client.roomName).emit('someonejoined', await utils.generateJoinedMessage(client, socket['id']));
        } else {

            socket.emit('nameexists', await utils.generateExistingUserMessage(client));
        }
    });

    socket.on('disconnect', async () => {
        let userInfo = await utils.getUserByID(socket['id']);
        let disconnectSuccessful = await utils.deleteUserByID(socket['id']);

        socket.to(disconnectSuccessful.roomName).emit('someoneleft', await utils.generateDisconnectMessage(userInfo.user));
    });

    socket.on('typing', async (clientData) => {
        let grabbedUser = await utils.getUserByID(socket['id']);

        socket.to(grabbedUser.user.roomName).emit('someoneistyping', await utils.generateTypingMessage(grabbedUser.user));
    });

    socket.on('message', async (clientData) => {
        let grabbedUser = await utils.getUserByID(socket['id']);
        socket.to(grabbedUser.user.roomName).emit('someoneistyping', { text: '' });
        io.in(grabbedUser.user.roomName).emit('newmessage', await utils.generateSendingMessage(clientData.text, grabbedUser.user));
    });

    socket.on('users', async () => {
        socket.emit('getCurrentUsers', await utils.getUsers());
    });
});



server.listen(port, () => console.log(`starting on port ${port}`));