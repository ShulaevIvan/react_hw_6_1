import React from "react";

const Clock = () => {
    return (
        <React.Fragment>
            <div className="clock-wrap">
                <div className="clock-body">
                    <div className="rm-btn-wrap"><span className="rm-btn"></span></div>
                    <span className="hours">XX</span> 
                    <span className="minutes">XX</span> 
                    <span className="seconds">XX</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Clock;