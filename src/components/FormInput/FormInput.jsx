import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Clock from '../Clock/Clock';

const FormInput = (props) => {
    const initNameState = {
        nameInputRef: useRef(null),
    };
    const initZoneState = {
        zoneInputRef: useRef(null),
        zoneValue: undefined
    }

    const initialClockState = {
        clocks: [],
    }

    const [clockState, setClockState] = useState(initialClockState)
    const [inputNameState, setInputNameState] = useState(initNameState);
    const [inputZoneState, setInputZoneState] = useState(initZoneState);

    const nameInputHandler = () => {
        console.log(inputNameState.nameInputRef.current.value);
    }

    const inputZoneHandler = () => {
        console.log(inputZoneState.zoneInputRef.current.value)
        setInputZoneState(prevState => ({
            ...prevState,
            zoneValue: prevState.zoneValue = inputZoneState.zoneInputRef.current.value,
        }))
    }

    const acceptBtnHandler = () => {
        const time = getTime();
        setClockState(prevState => ({
            clocks: [...prevState.clocks, <Clock></Clock>]
        }));
    }

    const getTime = () => {
        const num = Number(inputZoneState.zoneInputRef.current.value.trim());
        if (num > 12 || num < -12) return  null;
        const diffTime = inputZoneState.zoneInputRef.current.value;
        const pattern = /\d{2}:\d{2}:\d{2}/gm;
        const utcTime = new Date().toISOString().match(pattern)[0].split('');
        let utcHours = Number(utcTime[0] + utcTime[1]);
        const utcMinutes =  Number(utcTime[3] + utcTime[4]);
        const utcSeconds = Number(utcTime[6] + utcTime[7]);
        Math.sign(num) === -1 ? utcHours = utcHours - num : utcHours = utcHours + num;
        const time = {
            timeZone: inputZoneState.zoneInputRef.current.value.trim(),
            hours: utcHours,
            minutes: utcMinutes,
            seconds: utcSeconds
        };

        return time;
    }


    return (
        <React.Fragment>
            <div className="inputs-wrap">
                <div className="input-name-wrap">
                    <label htmlFor="clock-name">Название</label>
                    <input ref={inputNameState.nameInputRef} onChange={nameInputHandler} id="clock-name" type="text" />
                </div>
                <div className="input-timezone-wrap">
                    <label htmlFor="clock-timezone">Временная зона</label>
                    <input ref={inputZoneState.zoneInputRef} onChange={inputZoneHandler} id="clock-timezone" type="text" />
                </div>
                <div className="input-btn-wrap">
                    <label>  </label>
                    <button onClick={acceptBtnHandler}>Добавить</button>
                </div>
            </div>

            <div className="clock-result-wrap">
                {console.log(clockState.clocks)}
                {clockState.clocks.map((clock, i) => {
                    return (
                        <React.Fragment key={i}>
                            {clock}
                        </React.Fragment>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default FormInput;