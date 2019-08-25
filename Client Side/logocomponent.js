import React from 'react';
import logo from './logo.png';
import '../App.css';
// Kevin Cox - Project 1
// INFO 3069
// 2019-03-04
//logoconponent.js
class Logo extends React.PureComponent {

    state = {
        length: 0,
        width: 0
    };
    componentDidMount() {
        let sizePassed = this.props.size;
        //change the demensions based on the passed 'size'
        if (sizePassed === 'large') {
            this.setState({ length: 300, width: 300 });
        } else if (sizePassed === 'medium') {
            this.setState({ length: 200, width: 200 });
        } else if (sizePassed === 'small') {
            this.setState({ length: 100, width: 100 });
        }

    }

    render() {
        const { length, width } = this.state;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1%' }}>
                <img width={width} height={length} src={logo} alt="Website Logo"></img>
            </div >
        );
    }
}
export default Logo;
