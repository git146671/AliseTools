import React from 'react';
import './App.css';
import {TimeHelper} from "./components/TimeHelper";
import styled from "styled-components";

function App() {
  return (
    <MainContainer>
      <TimeHelper/>
    </MainContainer>
  );
}

const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #3b3b3b;
    `
export default App;
