import React from "react";
import { useState } from "react";
import { useRef } from "react";

const FormInput = (props) => {
    const initNameState = {
        nameInputRef: useRef(null),
    };
    const initZoneState = {
        zoneInputRef: useRef(null),
        zoneValue: undefined
    }

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
        getTime();
    }

    const getTime = () => {
        const diffTime = inputZoneState.zoneInputRef.current.value;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay= new Date().getDay();
        const currentHours = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const currentSeconds = new Date().getSeconds();
        const grinvich = new Date(Date.UTC(currentYear, currentMonth, currentDay));
        console.log(grinvich)
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
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default FormInput;