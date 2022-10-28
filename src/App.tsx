import React from 'react';
import styled from "styled-components";
import {TaskListProvider} from "./pages/TodoList/TaskListContext";
import TodoList from "./pages/TodoList";

const Header = styled.header`
  background-color: #282c34;
`;

const Container = styled.div`
 text-align: center;
`;

function App() {
    return (
        <Container>
            <Header>
                <h1>Thoughtodos!</h1>
            </Header>
            <TaskListProvider>
                <TodoList />
            </TaskListProvider>
        </Container>
    );
}

export default App;
