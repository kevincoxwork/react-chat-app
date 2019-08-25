import React from 'react';
import { List } from '@material-ui/core';
import MessageBubble from './messagebubble';
const MessageBubbleList = props => {

    let messages = [];

    for (let i = 0; i < props.messages.length; i++) {

        if (props.messages[i].from === props.chatName) {
            //if our message, add to right side
            messages.push(<MessageBubble float="right" color={props.messages[i].colour} key={i.toString()} message={props.messages[i]} />);
        } else {
            messages.push(<MessageBubble float="left" color={props.messages[i].colour} key={i.toString()} message={props.messages[i]} />);
        }

        messages.push(<br key={i.toString() + "a"}></br>);

    }

    return <List>{messages}</List>;
};
export default MessageBubbleList;