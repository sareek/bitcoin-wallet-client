import React from 'react';
import './styles.css';

const Timer = (props) => {
        return (
            <div>{ (props.minutes !== 0 && props.seconds > 10) ? 
                <span>{props.minutes}:{props.seconds}</span>
                : <span style={{color:"red"}} className="blink_text">{props.minutes}:{props.seconds}</span>
            }
            </div>
        )
}

class TimerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0,
        }
        this.secondsRemaining;
        this.intervalHandle;
    }

    componentDidMount() {
        this.startCountDown();
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    tick = () => {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);

        this.setState({
            minutes: min,
            seconds: sec
        })

        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds
            })
        }

        if (min < 10) {
            this.setState({
                minutes: "0"+min
            })
        }

        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
            this.props.handleTimeOver(0,0)
        }

        this.secondsRemaining--;

    }

    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.props.minutes;
        this.secondsRemaining = time * 60;
    }

    render() {
                return (
            <div>
                <Timer minutes={this.state.minutes} seconds={this.state.seconds} />
            </div>
        )
    }

}

export default TimerComponent;

