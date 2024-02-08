import styled from "styled-components";
import {ChangeEvent, useState} from "react";

export const TimeHelper = () => {

    const [destinationTime, setDestinationTime] = useState<string>("");
    const [travelTime, setTravelTime] = useState<string>("");
    const [reserveTime, setReserveTime] = useState<string>("00:05");
    const [startTime, setStartTime] = useState<string>("");

    function setDestinationTimeHandler(e: ChangeEvent<HTMLInputElement>) {
        setDestinationTime(e.currentTarget.value);
    }

    function setTravelTimeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTravelTime(e.currentTarget.value);
    }

    function setReserveTimeHandler(e: ChangeEvent<HTMLInputElement>) {
        setReserveTime(e.currentTarget.value);
    }

    function getMinutes(destinationTime: string) {
        var c = destinationTime.split(':');
        console.log(c[0]);
        if (c[0] === "") c[0] = "0";
        if (c[1] === "") c[1] = "0";
        return parseInt(c[0]) * 60 + parseInt(c[1]);
    }

    function processTimeHandler() {
        var destMinutes = getMinutes(destinationTime);
        var trMinutes = getMinutes(travelTime);
        var resMinutes = getMinutes(reserveTime);
        var result = destMinutes - trMinutes - resMinutes;
        var resHours = Math.floor(result/60) === 0 ? '00' : '' + Math.floor(result/60);
        var resMins = result % 60 === 0 ? "00" : result % 60;
        setStartTime(+ resHours + ":" + resMins);
    }

    return (
        <TimeHelperContainer>
            <Header>Привет! Я помогу тебе приехать вовремя!</Header>
            <span>  1. Введи, во сколько тебе надо быть на месте:  </span>
            <input type={"time"} onChange={setDestinationTimeHandler} value={destinationTime}/>
            <br/>
            <span>  2. Введи, сколько тебе добираться до места:  </span>
            <input type={"time"} onChange={setTravelTimeHandler} value={travelTime}/>
            <br/>
            <span>  3. Введи, насколько заранее ты хочешь приехать:  </span>
            <input type={"time"} onChange={setReserveTimeHandler} value={reserveTime}/>
            <br/>
            <button onClick={processTimeHandler}>Посчитать!</button>
            <br/>
            {startTime && <span>Тебе надо выйти в {startTime}</span>}
        </TimeHelperContainer>
    )
}

const TimeHelperContainer = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    width:15em;
    height:25em;
    margin-left: -8em; /*set to a negative number 1/2 of your width*/
    border: 1px solid #ccc;
    background-color: #f3f3f3;
    `

const Header = styled.h3`
    padding: 7px;
    color: #676767;
`