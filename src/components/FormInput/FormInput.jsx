import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Clock from '../Clock/Clock';
import { useEffect } from "react";

const FormInput = (props) => {
    const initNameState = {
        inputClass: 'input-name',
        inputValid: false,
        nameInputRef: useRef(null),
    };
    const initZoneState = {
        inputClass: 'input-zone',
        inputValid: false,
        zoneInputRef: useRef(null),
        zoneValue: undefined
    }

    const initialClockState = {
        clocks: [],
    }

    const [clockAppState, setClockAppState] = useState(initialClockState)
    const [inputNameState, setInputNameState] = useState(initNameState);
    const [inputZoneState, setInputZoneState] = useState(initZoneState);
    const [clockTimer, setClockTimer] = useState({
        clocks: []
    })

    const nameInputHandler = () => {
        if (initNameState.nameInputRef.current.value.trim() !== '' && isNaN(initNameState.nameInputRef.current.value.trim())){
            setInputNameState(prevState => ({
                ...prevState,
                inputValid: initNameState.inputValid = true,
                inputClass: prevState.inputClass = 'input-name'
            }));

            return;
        }

        setInputNameState(prevState => ({
            ...prevState,
            inputValid: inputZoneState.inputValid = false,
            inputClass: inputZoneState.inputClass = 'input-name input-err'
        }));

        return;
    }

    const inputZoneHandler = () => {
        const inputValue = inputZoneState.zoneInputRef.current.value.trim();
        if ((!isNaN(inputValue) && inputValue !== '')) {
            if (Number(inputValue) !== 0 && (Number(inputValue) > 12 || Number(inputValue) < -12))  return;

            setInputZoneState(prevState => ({
                ...prevState,
                inputClass:  inputZoneState.inputClass = 'input-zone',
                zoneValue: inputZoneState.zoneValue = inputZoneState.zoneInputRef.current.value,
                inputValid: inputZoneState.inputValid = true,
            }));

            return;
        }
        setInputZoneState(prevState => ({
            ...prevState,
            inputClass: inputZoneState.inputClass = 'input-zone input-err',
            inputValid: inputZoneState.inputValid = false
        }));

        return;
    }

    const acceptBtnHandler = () => {
        if (inputNameState.inputValid && inputZoneState.inputValid) {
            const num = Number(inputZoneState.zoneInputRef.current.value.trim());
            if (num > 12 || num < -12) return;
            const time = getTime(num);
            const id = Math.random().toString(16).slice(2);

            const timer = {
                time: time,
                id: id,
                timeInterval: clockInterval(num)
            }

            setClockTimer(prevState => ({
                ...prevState,
                clocks: [...prevState.clocks, timer]
            }));
        
            
            setClockAppState(prevState => ({
                ...prevState,
                clocks: [...prevState.clocks, {
                    clockId: id, 
                    clockName: inputNameState.nameInputRef.current.value,
                    clockTime: time, 
                    clockZone: num,
                }]
            }));

            
        }
    }

    const clockInterval = () => {
        setInterval(() => {
            setClockAppState(prevState => ({
                ...prevState,
                clocks: prevState.clocks.map((item) => item =  {...item, clockTime: getTime(item.clockZone)})
            }))
        }, 1000);
    }

    useEffect(() => {}, [clockTimer])


  



    const getTime = (num) => {
        const pattern = /\d{2}:\d{2}:\d{2}/gm;
        const utcTime = new Date().toISOString().match(pattern)[0].split('');
        let utcHours = Number(utcTime[0] + utcTime[1]);

        let utcMinutes =  Number(utcTime[3] + utcTime[4]);
        let utcSeconds = Number(utcTime[6] + utcTime[7]);

        Math.sign(num) === 1 ? utcHours = utcHours + num : utcHours = utcHours - Math.abs(num);
        if (utcMinutes < 10) utcMinutes = `0${utcMinutes}`;
        if (utcSeconds < 10) utcSeconds = `0${utcSeconds}`;

        if (utcHours >= 24) utcHours = `0${utcHours - 24}`
        const time = {
            timeZone: inputZoneState.zoneInputRef.current.value.trim(),
            hours: utcHours,
            minutes: utcMinutes,
            seconds: utcSeconds
        };

        return time;
    }



    const removeClock = (id) => {
        setClockAppState(prevState => ({
            ...prevState,
            clocks: prevState.clocks.filter((item) => item.clockId !== id)
        }));
    }

    return (
        <React.Fragment>
            <div className="inputs-wrap">
                <div className="input-name-wrap">
                    <label htmlFor="clock-name">Название</label>
                    <input 
                        className={inputNameState.inputClass} 
                        ref={inputNameState.nameInputRef} 
                        onChange={nameInputHandler} 
                        id="clock-name" 
                        type="text" 
                    />
                </div>
                <div className="input-timezone-wrap">
                    <label htmlFor="clock-timezone">Временная зона</label>
                    <input
                        className={inputZoneState.inputClass}
                        ref={inputZoneState.zoneInputRef} 
                        onChange={inputZoneHandler} 
                        id="clock-timezone" 
                        type="text" 
                    />
                </div>
                <div className="input-btn-wrap">
                    <label>  </label>
                    <button onClick={acceptBtnHandler}>Добавить</button>
                </div>
            </div>

            <div className="clock-result-wrap">
                {clockAppState.clocks.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Clock 
                                {...item.clockTime}
                                id = {item.clockId}
                                name={item.clockName}
                                rmHandler = {removeClock}
                            ></Clock>

                        </React.Fragment>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default FormInput;