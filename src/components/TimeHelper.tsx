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
        if (c[0] === "") c[0] = "0";
        if (c[1] === "") c[1] = "0";
        return parseInt(c[0]) * 60 + parseInt(c[1]);
    }

    function processTimeHandler() {
        if (destinationTime === "" || travelTime === "" || reserveTime === "") {
            setStartTime("заполни все пустые поля!")
        } else {
            var destMinutes = getMinutes(destinationTime);
            var trMinutes = getMinutes(travelTime);
            var resMinutes = getMinutes(reserveTime);
            var result = destMinutes - trMinutes - resMinutes;
            var resHours = Math.floor(result / 60) === 0 ? '00' : '' + Math.floor(result / 60);
            var resMins = result % 60 === 0 ? "00" : "" + result % 60;
            if (resMins.length === 1) {
                resMins = "0" + resMins;
            }
            setStartTime('' + resHours + ":" + resMins);
        }
    }

    return (
        <TimeHelperContainer>
            <Header>Привет. Я помогу тебе приехать вовремя.</Header>
            <span>  1. Во сколько тебе надо быть на месте:  </span>
            <StyledInput type={"time"} onChange={setDestinationTimeHandler} value={destinationTime}/>
            <br/>
            <span>  2. Сколько тебе добираться до места:  </span>
            <StyledInput type={"time"} onChange={setTravelTimeHandler} value={travelTime}/>
            <br/>
            <span>  3. Насколько заранее ты хочешь приехать:  </span>
            <StyledInput type={"time"} onChange={setReserveTimeHandler} value={reserveTime}/>
            <br/>
            <StyledBtn onClick={processTimeHandler}>Посчитать</StyledBtn>
            <br/>
            {startTime && <span>Тебе надо выйти в: {startTime}</span>}
        </TimeHelperContainer>
    )
}

const TimeHelperContainer = styled.div`
    position: fixed;
    top: 5%;
    left: 50%;
    width:300px;
    height:400px;
    margin-left: -155px; /*set to a negative number 1/2 of your width*/
    border: 2px solid #33fff2;
    background-color: #3b3b3b;
    color: #33fff2;
    padding: 17px;  
    font-size: 20px;
    `

const Header = styled.h3`
    padding: 0 7px;
    color: #33fff2;
    
`

const StyledInput = styled.input`
    background-color: #33fff2;
    width: 80px;
    height: 25px;
`

const StyledBtn = styled.button`
    background-color: #33fff2;
    width: 110px;
    height: 40px;
    color: #3b3b3b;
    font-size: 18px;
    border-radius: 4px;
    margin: 10px 0 5px 95px;
`