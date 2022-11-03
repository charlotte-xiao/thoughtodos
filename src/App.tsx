import React from 'react';
import styled from "styled-components";
import TaskPage from "./pages/TaskPage";
import {Provider} from "react-redux";
import {store} from "./store/Store";

const Header = styled.header`
    h1 {
        font-size: 2rem;
        font-weight: 800;
    }
    background: linear-gradient(0.25turn, #c21500, #ffc500);
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
            <Provider store={store}>
                <TaskPage/>
            </Provider>
        </Container>
    );
}

export default App;
