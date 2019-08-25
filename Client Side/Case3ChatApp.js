import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Card, Dialog, DialogTitle, ListItem, ListItemAvatar, Avatar, ListItemText, Button, TextField, RadioGroup, Radio, FormControlLabel, Typography } from '@material-ui/core';
import io from 'socket.io-client';
import theme from './theme';
import MessageBubbleList from './messagebubblelist';
import TopBar from './topbar';
import './../App.css';
import Logo from './logocomponent';

class Case3ChatApp extends React.PureComponent {
    state = {
        open: false,
        socket: null,
        messages: [],
        users: [],
        chatName: '',
        messageDisabled: true,
        chatNameDisabled: true,
        hideRoomTextBox: true,
        roomName: '',
        roomNameDisabled: true,
        roomList: [],
        nameHelper: 'A Unique Name Is Required',
        roomHelper: 'A Room Is Required',
        messageHelper: 'A Message Is Required',
        msg: '',
        isTyping: false,
        isTypingText: '',
        hideJoinObjects: false
    };

    componentDidMount = () => {
        // connect to server
        const socket = io.connect();
        socket.on('welcome', this.onWelcome);
        socket.on('updatedlistRooms', this.listRooms);
        socket.on('getCurrentUsers', this.listUsers);
        socket.on('nameexists', this.usernameExists);
        socket.on('someonejoined', this.addMessage);
        socket.on('someoneleft', this.addMessage);
        socket.on('someoneistyping', this.userIsTyping);
        socket.on('newmessage', this.addMessage);

        socket.emit('listRooms');

        this.setState({ socket: socket });
    };
    usernameExists = dataFromServer => {
        this.setState({ nameHelper: dataFromServer.text, chatNameDisabled: true, chatName: '' });
    }

    userIsTyping = dataFromServer => {
        this.setState({ isTypingText: dataFromServer.text });
    }

    listUsers = dataFromServer => {
        this.setState({ users: dataFromServer });
    }

    listRooms = dataFromServer => {
        this.setState({ roomList: dataFromServer });
    }

    onWelcome = dataFromServer => {
        this.addMessage(dataFromServer);
        this.setState({ hideJoinObjects: true });
    };

    addMessage = dataFromServer => {
        let newMessages = this.state.messages;
        newMessages.push(dataFromServer);
        this.setState({ messages: newMessages });

        //react was not updating the component until a window interaction (mouseclick, or keyboard input) - assuming react coding issue
        this.forceUpdate();
    };

     

    // handler for Join button click
    handleJoin = () => {
        this.state.socket.emit('join', {
            chatName: this.state.chatName,
            roomName: this.state.roomName
        });
    };
    // handler for name TextField entry
    onNameChange = e => {
        if (e.target.value === "")
            this.setState({ chatName: e.target.value, chatNameDisabled: true, nameHelper: 'A Unique Name Is Required' });
        else {
            this.setState({ chatName: e.target.value, chatNameDisabled: false, nameHelper: '' });
        }

    };

    onRoomChange = e => {
        if (e.target.value === "")
            this.setState({ roomName: e.target.value, roomNameDisabled: true, roomHelper: 'A Room Is Required' });
        else {
            this.setState({ roomName: e.target.value, roomNameDisabled: false, roomHelper: '', });
        }

    };

    onRoomChangeRadio = e => {

        this.setState({ roomName: e.target.value, roomNameDisabled: false, hideRoomTextBox: false, roomHelper: '' })
    }

    // handler for message TextField entry
    onMessageChange = e => {
        if (e.target.value === "")
            this.setState({ msg: e.target.value, messageDisabled: true, messageHelper: 'A Message Is Required' });
        else
            this.setState({ msg: e.target.value, messageDisabled: false, messageHelper: '' });


        if (this.state.isTyping === false) {
            this.state.socket.emit('typing', { from: this.state.chatName });
            this.setState({ isTyping: true });
        }
    };

    // handler for send message button
    handleSendMessage = e => {
        e.preventDefault();
        this.state.socket.emit(
            'message',
            { from: this.state.chatName, text: this.state.msg },
            err => { }
        );
        this.setState({ msg: '', isTyping: false });
    };

    generateUsersList() {

        let userList = [];

        let numberOfElements = 0;
        //get number of elements.
        if (this.state.users.length !== 0) {
            numberOfElements = JSON.stringify(this.state.users['users']);
            numberOfElements = numberOfElements.split('chatName').length - 1;
        }
        for (let index = 0; index < numberOfElements; index++) {
            console.log(index);
            userList.push(
                <ListItem key={this.state.users['users'][index].chatName}>
                    <ListItemAvatar>
                        <Avatar style={{ color: '#fff', backgroundColor: this.state.users['users'][index].colour }}>
                            {this.state.users['users'][index].chatName.substring(0, 1)}
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={this.state.users['users'][index].chatName} />
                    <ListItemText primary={this.state.users['users'][index].roomName} />
                </ListItem>);
        }
        return userList;

    }

    createRoomRadioButtons() {
        let radioItems = [];
        for (let i = 0; i < this.state.roomList.length; i++) {
            radioItems.push(<FormControlLabel key={this.state.roomList[i] + i.toString()} value={this.state.roomList[i]} control={<Radio />} label={this.state.roomList[i]} />);
        }
        return (
            <RadioGroup
                aria-label="Existing Rooms"
                name="ExistingRooms"
                onChange={this.onRoomChangeRadio}
            >
                {radioItems}
            </RadioGroup>
        );

    }

    handleOpenDialog = () => {
        this.state.socket.emit('users');
        this.setState({ open: true })
    };
    handleCloseDialog = () => this.setState({ open: false });


    render() {
        const { open, hideJoinObjects, chatName, isTypingText, chatNameDisabled, nameHelper, messageDisabled, roomHelper, messageHelper, msg, messages, roomName, roomNameDisabled, hideRoomTextBox } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <TopBar viewDialog={this.handleOpenDialog} />
                    <Dialog
                        open={open}
                        onClose={this.handleCloseDialog}
                        style={{ margin: 20 }}
                    >
                        <DialogTitle style={{ textAlign: 'center' }}>
                            Connected Users
                </DialogTitle>
                        {open && (
                            this.generateUsersList()
                        )}
                    </Dialog>
                </div>



                {!hideJoinObjects && (
                    <Card>
                        <Typography variant="h4" style={{ paddingTop: "20px", textAlign: 'center' }}>Case 3 - Chat App</Typography>
                        <Logo size="small"></Logo>
                        <Card>
                            <React.Fragment>
                                <TextField
                                    onChange={this.onNameChange}
                                    placeholder="Enter A Username"
                                    autoFocus={true}
                                    required
                                    value={chatName}
                                    error={chatNameDisabled}
                                    helperText={nameHelper}
                                />
                                <br />

                            </React.Fragment>
                        </Card>
                        <br />
                        <Card>
                            <Typography variant="h5" style={{ padding: "1%", textAlign: "center" }}>Join Existing or Enter Room Name</Typography>


                            {true &&
                                this.createRoomRadioButtons()
                            }

                            {hideRoomTextBox &&
                                <TextField
                                    onChange={this.onRoomChange}
                                    placeholder="Room Name"
                                    autoFocus={true}
                                    required

                                    value={roomName}
                                    error={roomNameDisabled}
                                    helperText={roomHelper}
                                />
                            }


                        </Card>
                        <Button
                            onClick={this.handleJoin}
                            color="primary"
                            variant="contained"

                            disabled={(chatNameDisabled || roomNameDisabled)}

                            style={{ marginTop: '1em' }}
                        >
                            Join
                        </Button>
                    </Card>
                )}

                {hideJoinObjects && (


                    <div>
                        <div className="MessagesList">
                            <MessageBubbleList messages={messages} chatName={chatName} />
                        </div>


                        <React.Fragment>
                            <TextField
                                onChange={this.onMessageChange}
                                placeholder="Message"
                                autoFocus={true}
                                required
                                error={messageDisabled}
                                helperText={messageHelper}
                                value={msg}
                            />
                            <p>{isTypingText}</p>
                            <Button
                                onClick={this.handleSendMessage}
                                color="primary"
                                variant="contained"
                                disabled={messageDisabled}
                                style={{ marginTop: '1em' }}
                            >
                                Send
                            </Button>

                        </React.Fragment>
                    </div>
                )}
            </MuiThemeProvider>
        );
    }
}
export default Case3ChatApp;