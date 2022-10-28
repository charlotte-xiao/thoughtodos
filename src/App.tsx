import React from 'react';
import styled from "styled-components";
import {TaskProvider} from "./pages/TaskPage/TaskContext";
import Task from "./pages/TaskPage";

const Header = styled.header`
    h1 {
        font-size: 2rem;
        font-weight: 800;
    }
    background: linear-gradient(0.25turn, #c21500, #ffc500);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;

const Container = styled.div`
    background-color: white;
    font-family: "Google Sans", sans-serif;
    width: 60%;
    margin: 0 auto;
    text-align: center;
`;

function App() {
    return (
        <Container>
            <Header>
                <h1>Thoughtodos!</h1>
            </Header>
            <TaskProvider>
                <Task/>
            </TaskProvider>
        </Container>
    );
}

export default App;
