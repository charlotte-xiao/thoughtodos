import React from "react";
import styled from "styled-components";
import TaskPage from "./pages/TaskPage";
import { Provider } from "react-redux";
import { store } from "./store/Store";

const Header = styled.header`
  h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
    padding: 2rem;
  }

  background: linear-gradient(0.25turn, #c21500, #ffc500);
  -webkit-background-clip: text;
  color: transparent;
`;

const Container = styled.div`
  background-color: #b2cef5;
  font-family: "Google Sans", sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Header>
        <h1>Thoughtodos!</h1>
      </Header>
      <Provider store={store}>
        <TaskPage />
      </Provider>
    </Container>
  );
}

export default App;
