import React from "react";

const Clock = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            <div className="clock-wrap">
                <div className="clock-title-wrap">
                    <h4>{props.name}</h4>
                </div>
                <div className="clock-body">
                    <div className="rm-btn-wrap"><span className="rm-btn"></span></div>
                    <span className="hours">{props.hours}</span> 
                    <span className="minutes">{props.minutes}</span> 
                    <span className="seconds">{props.seconds}</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Clock;