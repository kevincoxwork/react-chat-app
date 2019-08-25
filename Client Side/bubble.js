import React from 'react';
import './../App.css';

const Bubble = props => {
    return (
        <div className="MessageBubble" style={{ backgroundColor: props.color }}>
            <span style={{ fontSize: 'smaller', fontWeight: 'bold', float: "left" }}>
                {props.message.from} says:
            </span>
            <span style={{ fontSize: 'smaller', float: "right" }}>{props.message.roomName}</span>
            <br />
            <span style={{ fontSize: 'smaller', float: "right" }}>{props.message.time}</span>

            <br />
            <span style={{ float: "left" }}>{props.message.text}</span>
        </div>
    );
};
export default Bubble;