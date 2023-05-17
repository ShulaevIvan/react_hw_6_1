import React from "react";
import Clock from "../Clock/Clock";

class RenderClock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="App-clocks-container">
                {this.props.clocks.map((clock) => {
                    return (
                        <Clock
                            key={clock.id}
                            id={clock.id}
                            name={clock.name}
                            userTimezone={clock.userTimezone}
                            onDeleteClick={this.props.rmEvent}
                        />
                    );
                })}
            </div>
        );
    }
}

export default RenderClock;