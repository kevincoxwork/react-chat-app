
require('dotenv').config();
const matColours = require('./matdes100colours.json');
const moment = require('moment');


//props
let usersArray = [];

const resetUtilsState = () => {
    usersArray = [];
    currentID = 1;
}

const doesUserExist = (userData) => {
    let exists = false;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < usersArray.length; i++) {
            if (userData.chatName === usersArray[i]['chatName']) {
                exists = true;
            }
        }
        resolve({ bool: exists });
    });
}

const generateNewUser = (userData, socketID) => {
    return new Promise((resolve, reject) => {
        let newUser = [];
        let coloridx = Math.floor(Math.random() * matColours.colours.length - 2) + 1;
        newUser['id'] = socketID;
        newUser['chatName'] = userData.chatName;
        newUser['from'] = process.env.HOSTINGSOURCE;
        newUser['roomName'] = userData.roomName;
        newUser['colour'] = matColours.colours[coloridx];
        newUser['time'] = moment().format('yyyy:mm:dd  h:mm:ss a');
        let timeSent = moment().subtract('4', 'hours').format('h:mm:ss a');
        usersArray.push(newUser);
        resolve({ colour: matColours.colours[matColours.colours.length - 1], from: `Admin`, text: `Welcome ` + userData.chatName, time: timeSent, roomName: newUser['roomName'] });
    });
}
const deleteUserByID = (socketID) => {
    let deleted = false;
    let userInfo = '';
    let roomName = '';
    return new Promise((resolve, reject) => {
        for (let i = 0; i < usersArray.length; i++) {
            if (socketID === usersArray[i]['id']) {
                deleted = true;
                userInfo = `${usersArray[i]['chatName']} left the room`;
                roomName = usersArray[i]['roomName'];
                usersArray.splice(i, 1);

            }
        }
        resolve({ bool: deleted, text: userInfo, roomName: roomName });
    });
}

const getUserByID = (socketID) => {
    let user = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < usersArray.length; i++) {
            if (socketID === usersArray[i]['id']) {
                user = usersArray[i];
            }
        }
        resolve({ user: user });
    });
}

const generateJoinedMessage = (userData) => {

    return new Promise((resolve, reject) => {
        let timeSent = moment().subtract('4', 'hours').format('h:mm:ss a');
        resolve({ from: `Admin`, colour: matColours.colours[matColours.colours.length - 1], text: `${userData.chatName} Joined Room`, time: timeSent, roomName: userData['roomName'] });
    });
}

const generateExistingUserMessage = (userData) => {
    return new Promise((resolve, reject) => {
        resolve({ from: `Admin`, colour: matColours.colours[matColours.colours.length - 1], text: `User ${userData.chatName} already exists` });
    });
}

const generateTypingMessage = (userData) => {
    return new Promise((resolve, reject) => {
        resolve({ colour: matColours.colours[matColours.colours.length - 1], from: userData.chatName, text: `${userData.chatName} is typing` });
    });
}

const generateSendingMessage = (message, userData) => {

    return new Promise((resolve, reject) => {
        let timeSent = moment().subtract('4', 'hours').format('h:mm:ss a');
        resolve({ colour: userData['colour'], from: userData['chatName'], text: message, time: timeSent, roomName: userData['roomName'] });
    });
}

const generateDisconnectMessage = (userData) => {

    return new Promise((resolve, reject) => {
        let timeSent = moment().subtract('4', 'hours').format('h:mm:ss a');
        resolve({ colour: matColours.colours[matColours.colours.length - 1], from: `Admin`, text: `${userData['chatName']} left`, time: timeSent, roomName: userData['roomName'] });
    });
}

const getUsers = () => {
    let userInfo = {};
    for (let index = 0; index < usersArray.length; index++) {
        userInfo[index] = { chatName: usersArray[index]['chatName'], roomName: usersArray[index]['roomName'], colour: usersArray[index]['colour'] };
    }

    return new Promise((resolve, reject) => {
        resolve({ users: userInfo });
    });
}

module.exports = { doesUserExist, generateNewUser, resetUtilsState, generateJoinedMessage, getUsers, generateDisconnectMessage, generateExistingUserMessage, deleteUserByID, getUserByID, generateTypingMessage, generateSendingMessage };