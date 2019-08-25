import React from 'react';
import ReactDOM from 'react-dom';
import { ListItem } from '@material-ui/core';
import Bubble from './bubble';
import Triangle from './triangle';
class MessageBubble extends React.Component {
    componentDidMount = () => {
        let userDOM = ReactDOM.findDOMNode(this);
        userDOM.scrollIntoView({ block: 'end', behavior: 'smooth' });
        userDOM.blur();
    };


    render() {
        let color = this.props.color;
        let float = this.props.float;
        return (
            <div style={{
                float: `${float}`,
                display: 'inline', width: "51%",
                position: "relative",
                height: "100px"
            }}>
                <ListItem ref="message" style={{
                    textAlign: 'left', marginBottom: '5px'
                }}>
                    <Bubble message={this.props.message} color={color} />
                    <Triangle float={float} color={color} />
                </ListItem>
                &nbsp;
</div>
        );
    }
}
export default MessageBubble;